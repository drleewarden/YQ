# Directory Structure

```
restaurant-menu-app/
├── 📋 Configuration Files
│   ├── .env.example                 # Environment variables template
│   ├── .gitignore                   # Git ignore patterns
│   ├── .dockerignore                # Docker ignore patterns
│   ├── next.config.js               # Next.js configuration
│   ├── tsconfig.json                # TypeScript configuration
│   ├── tailwind.config.ts           # Tailwind CSS configuration
│   ├── postcss.config.js            # PostCSS configuration
│   ├── package.json                 # Node.js dependencies
│   └── package-lock.json            # Dependency lock file
│
├── 📦 Docker & Deployment
│   ├── Dockerfile                   # Production Docker image
│   ├── docker-compose.yml           # Development stack definition
│   └── .dockerignore                # Docker build ignore
│
├── 📚 Documentation
│   ├── README.md                    # Full project documentation
│   ├── QUICKSTART.md                # Quick start guide
│   ├── PROJECT_SUMMARY.md           # Project overview & summary
│   └── DIRECTORY_STRUCTURE.md       # This file
│
├── 🔧 Infrastructure (Terraform)
│   └── infrastructure/
│       └── terraform/
│           ├── main.tf              # VPC, RDS, ECS, ALB configuration
│           ├── variables.tf         # Variable declarations
│           ├── outputs.tf           # Output values
│           └── terraform.tfvars.example  # Example tfvars file
│
├── 💾 Database (Prisma)
│   └── prisma/
│       ├── schema.prisma            # Database schema definition
│       └── seed.ts                  # Sample data seeding script
│
├── 📦 Utilities & Libraries
│   └── lib/
│       ├── auth.ts                  # NextAuth V5 configuration
│       └── prisma.ts                # Prisma client singleton
│
├── 🎨 Main Application (Next.js App Router)
│   └── app/
│       ├── 📄 layout.tsx            # Root layout with providers
│       ├── 📄 page.tsx              # Home/landing page
│       ├── globals.css              # Global styles
│       │
│       ├── 🔐 Authentication Routes
│       │   └── auth/
│       │       ├── signin/
│       │       │   └── page.tsx     # Sign in page
│       │       └── signup/
│       │           └── page.tsx     # Sign up page
│       │
│       ├── 📋 Main Pages
│       │   ├── menu/
│       │   │   └── page.tsx         # Interactive menu (QR-triggered)
│       │   ├── accounts/
│       │   │   └── page.tsx         # User account & order history
│       │   └── order-success/
│       │       └── [id]/
│       │           └── page.tsx     # Order confirmation page
│       │
│       ├── 🧩 React Components
│       │   └── components/
│       │       ├── Providers.tsx    # NextAuth session provider
│       │       ├── Cart.tsx         # Shopping cart component
│       │       ├── MenuItem.tsx     # Menu item card component
│       │       └── MenuTabs.tsx     # Category tabs component
│       │
│       ├── 🛍️ State Management
│       │   └── store/
│       │       └── cart.ts          # Zustand cart store
│       │
│       └── 🔌 API Routes
│           └── api/
│               ├── auth/
│               │   ├── [...]nextauth]/
│               │   │   └── route.ts # NextAuth route handlers
│               │   └── register/
│               │       └── route.ts # User registration endpoint
│               │
│               ├── restaurants/
│               │   ├── table/
│               │   │   └── route.ts # Get restaurant from QR
│               │   └── [id]/
│               │       └── menus/
│               │           └── route.ts # Get menu items
│               │
│               ├── orders/
│               │   └── route.ts     # Create/get orders
│               │
│               └── checkout/
│                   └── route.ts     # Stripe checkout session
│
├── 📂 Public Assets (Next.js)
│   └── public/                      # Static files, images, etc.
│
└── 📄 Project Files
    ├── README.md
    ├── QUICKSTART.md
    ├── PROJECT_SUMMARY.md
    └── DIRECTORY_STRUCTURE.md

```

## File Organization Legend

| Symbol | Meaning |
|--------|---------|
| 📋 | Configuration files |
| 📦 | Dependencies/packages |
| 📚 | Documentation |
| 🔧 | Infrastructure code |
| 💾 | Database files |
| 🎨 | UI/Frontend code |
| 🔐 | Authentication |
| 📋 | Pages |
| 🧩 | Components |
| 🛍️ | State management |
| 🔌 | API/Backend |
| 📂 | Assets |

## Key Directories Explained

### `/app`
Next.js App Router directory containing all pages, components, and API routes.

### `/prisma`
Database schema definition and seed scripts using Prisma ORM.

### `/lib`
Utility functions and configuration (auth, database client).

### `/infrastructure/terraform`
Infrastructure as Code for AWS deployment using Terraform.

### `/app/api`
Backend API endpoints following Next.js API routes pattern:
- Authentication endpoints
- Restaurant/menu data endpoints
- Order management endpoints
- Stripe checkout endpoints

### `/app/components`
Reusable React components:
- Cart management
- Menu items display
- Category navigation
- Session provider

### `/app/store`
Zustand state stores for client-side state management (cart state).

## File Size Overview

```
Large Files:
- node_modules/          - ~500MB (dependencies)
- .next/                 - ~100MB (build artifacts)

Source Code (main files):
- app/**/*.tsx           - ~20KB (components & pages)
- lib/**/*.ts            - ~5KB (utilities)
- prisma/              - ~5KB (schema)
- infrastructure/**     - ~10KB (Terraform)

Configuration:
- Configuration files   - ~5KB (next.config, tailwind, etc.)
```

## Getting Around

**Want to modify the menu?**
→ Edit `/prisma/schema.prisma` and `/prisma/seed.ts`

**Want to add a new page?**
→ Create new file in `/app/[pagename]/page.tsx`

**Want to add an API endpoint?**
→ Create new route in `/app/api/[endpoint]/route.ts`

**Want to modify styling?**
→ Edit `/app/globals.css` or component files (Tailwind classes)

**Want to change authentication?**
→ Edit `/lib/auth.ts`

**Want to modify database?**
→ Edit `/prisma/schema.prisma`

**Want to deploy to AWS?**
→ Use files in `/infrastructure/terraform/`

**Want to containerize?**
→ Use `Dockerfile` and `docker-compose.yml`

---

This structure follows Next.js best practices and is organized for scalability and maintainability.
