# Restaurant Menu QR Code Ordering System

A modern, interactive restaurant menu application that allows customers to scan QR codes at their tables and place orders online with integrated Stripe payments.

## Features

- **QR Code Scanning**: Tables have unique QR codes that link directly to the menu
- **Interactive Menu**: Browse items by category (Starters, Main, Dessert, Drinks, Alcoholic Drinks, Snacks)
- **Shopping Cart**: Add items to cart with quantity management
- **Stripe Payments**: Secure payment processing
- **User Authentication**: NextAuth V5 with email/password and GitHub OAuth
- **Order History**: Users can view their past orders
- **Restaurant Management**: Admin functionality for managing menus
- **Responsive Design**: Works seamlessly on mobile and desktop devices

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth V5
- **Payments**: Stripe
- **Infrastructure**: Terraform (AWS ECS, RDS, ALB)
- **Containerization**: Docker & Docker Compose

## Prerequisites

- Node.js 20+
- npm or yarn
- PostgreSQL 15+
- Docker & Docker Compose (for containerized development)
- AWS Account (for production deployment)
- Stripe Account
- GitHub OAuth App (optional, for GitHub login)

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd restaurant-menu-app
```

### 2. Environment Setup

```bash
# Copy example env file
cp .env.example .env.local

# Update .env.local with your credentials:
# - DATABASE_URL: PostgreSQL connection string
# - NEXTAUTH_SECRET: Generate a random secret (use `openssl rand -base64 32`)
# - Stripe keys from your Stripe dashboard
# - GitHub OAuth credentials (optional)
```

### 3. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 4. Set Up Database

```bash
# Generate Prisma client
npx prisma generate

# Create database and run migrations
npx prisma migrate dev

# (Optional) Seed database with sample data
npx prisma db seed
```

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Docker Compose (Recommended for Local Development)

```bash
# Create .env file with your credentials
cp .env.example .env

# Start all services
docker-compose up

# Run migrations inside container
docker-compose exec app npx prisma migrate dev

# Stop services
docker-compose down
```

The app will be available at `http://localhost:3000`.

## Project Structure

```
restaurant-menu-app/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication routes
│   │   ├── restaurants/  # Restaurant data
│   │   ├── orders/       # Order management
│   │   └── checkout/     # Stripe checkout
│   ├── components/       # React components
│   │   ├── Cart.tsx      # Shopping cart
│   │   ├── MenuItem.tsx  # Menu item card
│   │   └── MenuTabs.tsx  # Category tabs
│   ├── store/            # Zustand stores
│   ├── auth/             # Auth pages (signin, signup)
│   ├── menu/             # Menu page
│   ├── accounts/         # User account page
│   └── layout.tsx        # Root layout
├── lib/
│   ├── auth.ts           # NextAuth configuration
│   └── prisma.ts         # Prisma client
├── prisma/
│   └── schema.prisma     # Database schema
├── infrastructure/
│   └── terraform/        # Terraform IaC files
├── Dockerfile            # Container configuration
└── docker-compose.yml    # Local development stack
```

## Database Schema

### User Model
- User authentication and profile information
- NextAuth sessions and accounts
- Order history

### Restaurant Model
- Restaurant information and details
- Menu items categorized by type
- Table management with QR codes

### MenuItem Model
- Food/drink items with pricing
- Category classification
- Image and description

### Order Model
- Order tracking and status
- Line items with quantities and prices
- Stripe payment integration

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/[...nextauth]` - NextAuth routes

### Restaurants
- `GET /api/restaurants/table?qrCode={code}` - Get restaurant from QR code
- `GET /api/restaurants/{id}/menus` - Get restaurant menu items

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's order history

### Payments
- `POST /api/checkout` - Create Stripe checkout session

## Authentication Flow

1. **Email/Password**: Register or sign in with credentials
2. **GitHub OAuth**: Sign in using GitHub account
3. **Session Management**: JWT-based sessions with NextAuth
4. **Protected Routes**: API routes protected with session validation

## Development Workflow

### Environment Variables

Create `.env.local` with these variables:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/restaurant_menu

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# GitHub OAuth (optional)
GITHUB_ID=your-github-id
GITHUB_SECRET=your-github-secret
```

### Running Tests

```bash
npm run test
```

### Building for Production

```bash
npm run build
npm start
```

## AWS Deployment with Terraform

### Prerequisites
- AWS CLI configured with credentials
- Terraform installed (v1.0+)

### Deployment Steps

1. **Prepare Terraform variables:**

```bash
cd infrastructure/terraform
cp terraform.tfvars.example terraform.tfvars

# Edit terraform.tfvars with your values
nano terraform.tfvars
```

2. **Initialize and validate Terraform:**

```bash
terraform init
terraform plan
```

3. **Deploy infrastructure:**

```bash
terraform apply
```

4. **Get outputs:**

```bash
terraform output
```

### Infrastructure Components

- **VPC**: Virtual Private Cloud with public and private subnets
- **RDS**: PostgreSQL managed database with automated backups
- **ECS**: Container orchestration for the Next.js app
- **ALB**: Application Load Balancer for traffic distribution
- **CloudWatch**: Logging and monitoring
- **Security Groups**: Network access control

## Stripe Integration

### Setup

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe dashboard
3. Add keys to `.env.local`

### Payment Flow

1. User adds items to cart
2. User clicks "Checkout"
3. Order is created in database
4. Stripe checkout session is initiated
5. User completes payment
6. Order status updates and user sees confirmation

### Webhook Handling

For production, implement webhook handlers to update order status when payments are confirmed.

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Create a Pull Request

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check DATABASE_URL in .env.local
- Ensure database user has correct permissions

### NextAuth Issues
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Clear cookies and session storage in browser

### Stripe Issues
- Verify API keys are correct
- Check Stripe account is in test mode for development
- Use Stripe test card: 4242 4242 4242 4242

### Docker Issues
```bash
# Clean up containers and volumes
docker-compose down -v

# Rebuild images
docker-compose build --no-cache

# Restart services
docker-compose up
```

## Production Checklist

- [ ] Set strong `NEXTAUTH_SECRET`
- [ ] Configure HTTPS/SSL certificates
- [ ] Set up database backups
- [ ] Configure Stripe webhook handlers
- [ ] Enable CloudWatch monitoring
- [ ] Set up error logging and alerting
- [ ] Configure Auto Scaling for ECS
- [ ] Implement rate limiting on APIs
- [ ] Set up CDN for static assets
- [ ] Configure database encryption
- [ ] Enable WAF on ALB
- [ ] Set up email notifications for orders

## License

MIT License - see LICENSE file for details

## Support

For issues and feature requests, please create an issue on GitHub.

## Security

- Never commit `.env` files with sensitive data
- Always use HTTPS in production
- Validate and sanitize user inputs
- Keep dependencies updated
- Use prepared statements for database queries (Prisma does this automatically)
- Enable CORS only for trusted domains
