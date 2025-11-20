# Build stage
FROM node:20-bullseye AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build Next.js
RUN npm run build

# Runtime stage
FROM node:20-bullseye-slim

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apt-get update && apt-get install -y dumb-init && rm -rf /var/lib/apt/lists/*

# Copy package files and prisma schema
COPY package*.json ./
COPY prisma ./prisma

# Install production dependencies using npm install (not ci) to get fresh Debian binaries
RUN npm install --legacy-peer-deps --omit=dev

# Regenerate Prisma client for Debian environment (this creates glibc binaries)
RUN npm install --legacy-peer-deps prisma && npx prisma generate

# Create non-root user
RUN addgroup --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs

# Copy build artifacts (excluding node_modules and prisma-generated files from builder)
COPY --from=builder --chown=nodejs:nodejs /app/.next ./.next
COPY --from=builder --chown=nodejs:nodejs /app/public ./public

# Set environment
ENV NODE_ENV=production

USER nodejs

EXPOSE 3000

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["npm", "start"]
