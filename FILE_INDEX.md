# Complete File Index

## Configuration Files (10 files)

| File | Purpose |
|------|---------|
| `package.json` | Node.js dependencies and scripts |
| `package-lock.json` | Dependency lock file |
| `.env.example` | Environment variables template |
| `.gitignore` | Git ignore patterns |
| `.dockerignore` | Docker build ignore patterns |
| `next.config.js` | Next.js configuration |
| `tsconfig.json` | TypeScript compiler options |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `postcss.config.js` | PostCSS plugins configuration |
| `.env` | Local environment variables (git-ignored) |

## Docker & Deployment (3 files)

| File | Purpose |
|------|---------|
| `Dockerfile` | Production Docker image definition |
| `docker-compose.yml` | Local development stack (PostgreSQL + App) |
| `.dockerignore` | Files to exclude from Docker build |

## Documentation (5 files)

| File | Purpose |
|------|---------|
| `README.md` | Complete project documentation |
| `QUICKSTART.md` | Quick start guide for setup |
| `PROJECT_SUMMARY.md` | Project overview and summary |
| `DIRECTORY_STRUCTURE.md` | Directory organization guide |
| `FILE_INDEX.md` | This file - complete file listing |

## Infrastructure / Terraform (4 files)

| File | Path | Purpose |
|------|------|---------|
| `main.tf` | `infrastructure/terraform/` | VPC, RDS, ECS, ALB configuration |
| `variables.tf` | `infrastructure/terraform/` | Variable declarations |
| `outputs.tf` | `infrastructure/terraform/` | Output values after deployment |
| `terraform.tfvars.example` | `infrastructure/terraform/` | Example Terraform variables |

## Database / Prisma (2 files)

| File | Path | Purpose |
|------|------|---------|
| `schema.prisma` | `prisma/` | Database schema definition |
| `seed.ts` | `prisma/` | Sample data seeding script |

## Library / Utilities (2 files)

| File | Path | Purpose |
|------|------|---------|
| `auth.ts` | `lib/` | NextAuth V5 configuration |
| `prisma.ts` | `lib/` | Prisma client singleton |

## Layout & Global Files (2 files)

| File | Path | Purpose |
|------|------|---------|
| `layout.tsx` | `app/` | Root layout with NextAuth provider |
| `globals.css` | `app/` | Global styles and CSS reset |

## Pages (6 files)

| File | Path | Purpose |
|------|------|---------|
| `page.tsx` | `app/` | Home/landing page with QR scanner |
| `page.tsx` | `app/menu/` | Interactive restaurant menu |
| `page.tsx` | `app/accounts/` | User profile and order history |
| `page.tsx` | `app/auth/signin/` | Sign in page |
| `page.tsx` | `app/auth/signup/` | Sign up page |
| `page.tsx` | `app/order-success/[id]/` | Order confirmation page |

## Components (4 files)

| File | Path | Purpose |
|------|------|---------|
| `Providers.tsx` | `app/components/` | NextAuth session provider |
| `Cart.tsx` | `app/components/` | Shopping cart component |
| `MenuItem.tsx` | `app/components/` | Menu item card component |
| `MenuTabs.tsx` | `app/components/` | Category tabs component |

## State Management (1 file)

| File | Path | Purpose |
|------|------|---------|
| `cart.ts` | `app/store/` | Zustand cart state store |

## API Routes (6 files)

| File | Path | Purpose |
|------|------|---------|
| `route.ts` | `app/api/auth/[...nextauth]/` | NextAuth route handlers |
| `route.ts` | `app/api/auth/register/` | User registration endpoint |
| `route.ts` | `app/api/restaurants/table/` | Get restaurant from QR code |
| `route.ts` | `app/api/restaurants/[id]/menus/` | Get restaurant menu items |
| `route.ts` | `app/api/orders/` | Create and retrieve orders |
| `route.ts` | `app/api/checkout/` | Stripe checkout session creation |

## Summary Statistics

```
Total Files Created:     41+
Configuration Files:     10
Documentation Files:     5
Infrastructure Files:    4
Database Files:          2
Utility Files:           2
Layout/Global Files:     2
Pages:                   6
Components:              4
State Management:        1
API Routes:              6
Docker Files:            3
```

## File Organization by Feature

### Authentication
- `lib/auth.ts` - NextAuth configuration
- `app/api/auth/[...nextauth]/route.ts` - NextAuth handlers
- `app/api/auth/register/route.ts` - Registration
- `app/auth/signin/page.tsx` - Sign in page
- `app/auth/signup/page.tsx` - Sign up page
- `prisma/schema.prisma` - User models

### Menu & Restaurants
- `app/menu/page.tsx` - Menu page
- `app/api/restaurants/table/route.ts` - QR lookup
- `app/api/restaurants/[id]/menus/route.ts` - Menu items
- `app/components/MenuItem.tsx` - Item component
- `app/components/MenuTabs.tsx` - Category tabs
- `prisma/schema.prisma` - Restaurant models

### Shopping Cart
- `app/store/cart.ts` - Zustand store
- `app/components/Cart.tsx` - Cart component
- Integrated in menu and all pages

### Orders & Payment
- `app/api/orders/route.ts` - Order management
- `app/api/checkout/route.ts` - Stripe integration
- `app/order-success/[id]/page.tsx` - Confirmation
- `app/accounts/page.tsx` - Order history
- `prisma/schema.prisma` - Order models

### User Accounts
- `app/accounts/page.tsx` - Profile & orders
- `lib/auth.ts` - Session management
- `app/components/Providers.tsx` - Session provider

### Infrastructure & Deployment
- `Dockerfile` - Container image
- `docker-compose.yml` - Dev stack
- `infrastructure/terraform/main.tf` - AWS resources
- `infrastructure/terraform/variables.tf` - Variables
- `infrastructure/terraform/outputs.tf` - Outputs

### Database
- `prisma/schema.prisma` - Schema definition
- `prisma/seed.ts` - Sample data
- `lib/prisma.ts` - Client singleton

### Styling
- `tailwind.config.ts` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration
- `app/globals.css` - Global styles

## Quick File Lookup

**Need to change database schema?**
→ `prisma/schema.prisma`

**Need to add authentication?**
→ `lib/auth.ts`

**Need to add a new page?**
→ Create `app/[pagename]/page.tsx`

**Need to add an API endpoint?**
→ Create `app/api/[name]/route.ts`

**Need to modify cart?**
→ `app/store/cart.ts` or `app/components/Cart.tsx`

**Need to style components?**
→ Use Tailwind classes in `.tsx` files or `app/globals.css`

**Need to deploy?**
→ Use files in `infrastructure/terraform/`

**Need local development stack?**
→ Use `docker-compose.yml`

---

All files are organized following Next.js and industry best practices for maximum scalability and maintainability.
