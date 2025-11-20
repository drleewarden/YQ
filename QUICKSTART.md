# Quick Start Guide

Get the Restaurant Menu QR Code Ordering System up and running in minutes!

## Option 1: Local Development (Using Docker Compose - Recommended)

### Prerequisites
- Docker Desktop installed
- Stripe account (for payment testing)

### Steps

1. **Clone and navigate to project:**
```bash
cd restaurant-menu-app
```

2. **Create environment file:**
```bash
cp .env.example .env
```

3. **Update `.env` with your Stripe keys:**
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

4. **Start all services:**
```bash
docker-compose up
```

The app will be available at `http://localhost:3000`

5. **Initialize database (in another terminal):**
```bash
docker-compose exec app npx prisma migrate dev
docker-compose exec app npx prisma db seed
```

Done! The database is seeded with sample data.

## Option 2: Manual Local Setup

### Prerequisites
- Node.js 20+
- PostgreSQL 15+
- Stripe account

### Steps

1. **Install dependencies:**
```bash
npm install --legacy-peer-deps
```

2. **Create environment file:**
```bash
cp .env.example .env.local
```

3. **Update `.env.local`:**
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/restaurant_menu
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=$(openssl rand -base64 32)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

4. **Start PostgreSQL:**
```bash
# If using brew on macOS
brew services start postgresql

# Or use a PostgreSQL container
docker run -d \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=restaurant_menu \
  -p 5432:5432 \
  postgres:15-alpine
```

5. **Setup database:**
```bash
# Create schema
npx prisma migrate dev

# Seed sample data
npx prisma db seed
```

6. **Start development server:**
```bash
npm run dev
```

Visit `http://localhost:3000`

## Testing the Application

### Access the Home Page
- Navigate to `http://localhost:3000`
- See the QR scanner interface

### View Sample Restaurants
To test the QR code functionality, use this test QR code:
```
RESTAURANT_<restaurant-id>_TABLE_1
```

To find your restaurant ID:
```bash
# Using Prisma Studio
npm run db:studio

# Or query directly
docker-compose exec app npx prisma studio
```

### Create Test Account
1. Go to `http://localhost:3000/auth/signup`
2. Create an account with test credentials:
   - Email: `test@example.com`
   - Password: `TestPassword123`

### Place Test Order
1. Scan QR code (or use test code from Prisma Studio)
2. Browse menu items by category
3. Add items to cart
4. Click "Checkout"
5. Use Stripe test card: **4242 4242 4242 4242**
   - Expiry: Any future date (e.g., 12/25)
   - CVC: Any 3 digits (e.g., 123)

### View Order History
1. Sign in to your account
2. Click "My Account"
3. View your orders in the "Order History" tab

## Available Scripts

```bash
# Development
npm run dev              # Start dev server

# Database
npm run db:push        # Push schema to database
npm run db:migrate     # Run migrations
npm run db:seed        # Seed sample data
npm run db:studio      # Open Prisma Studio (visual DB explorer)

# Production
npm run build          # Build for production
npm start              # Start production server

# Code quality
npm run lint           # Run ESLint
```

## Docker Commands

```bash
# View logs
docker-compose logs -f

# Access app shell
docker-compose exec app sh

# Access database
docker-compose exec postgres psql -U postgres -d restaurant_menu

# Stop services
docker-compose down

# Clean everything (including data)
docker-compose down -v
```

## Environment Variables

### Required
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Random secret for NextAuth
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe public key
- `STRIPE_SECRET_KEY` - Stripe secret key

### Optional
- `GITHUB_ID` - GitHub OAuth app ID
- `GITHUB_SECRET` - GitHub OAuth app secret
- `NEXTAUTH_URL` - App URL (default: http://localhost:3000)

## Troubleshooting

### Docker Issues
```bash
# Reset everything
docker-compose down -v
docker volume prune
docker-compose up --build
```

### Database Issues
```bash
# Reset database
docker-compose exec app npx prisma migrate reset

# Check database connection
docker-compose exec postgres psql -U postgres -d restaurant_menu -c "SELECT 1"
```

### Port Already in Use
```bash
# Change ports in docker-compose.yml or use:
docker-compose down
# Then start again
docker-compose up
```

## Next Steps

1. **Set up Stripe webhook handlers** in production
2. **Configure AWS infrastructure** using Terraform
3. **Add more menu items** using Prisma Studio
4. **Create restaurants and tables** for testing
5. **Implement admin dashboard** for restaurant management
6. **Set up CI/CD pipeline** for deployments

## Support

- Check README.md for detailed documentation
- Review infrastructure/terraform/README.md for deployment
- Visit Stripe documentation: https://stripe.com/docs
- Visit Next.js documentation: https://nextjs.org/docs

## Production Checklist

Before deploying to production:

- [ ] Change `NEXTAUTH_SECRET` to a strong random value
- [ ] Update database connection to production PostgreSQL
- [ ] Switch Stripe to live keys
- [ ] Enable HTTPS/SSL
- [ ] Configure environment variables on hosting platform
- [ ] Set up database backups
- [ ] Configure monitoring and logging
- [ ] Run `npm run build` and test production build locally
- [ ] Set up domain and DNS

Happy coding! 🚀
