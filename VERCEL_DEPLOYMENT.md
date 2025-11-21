# Deploying to Vercel

This guide covers the recommended way to deploy your Restaurant Menu QR Code Ordering System to Vercel.

## Why Vercel?

- **Best for Next.js**: Vercel is built by the team behind Next.js
- **Serverless**: Automatic scaling, no infrastructure management
- **Free tier**: Great for testing and small projects
- **Git integration**: Auto-deploy on every push
- **Environment management**: Easy secret/env variable configuration
- **Automatic HTTPS**: All deployments are HTTPS by default

## Prerequisites

- A GitHub account with your code pushed to a repository
- A Vercel account (free signup at https://vercel.com)
- Stripe account (already have test keys)
- A PostgreSQL database provider (see options below)

## Database Options

Choose one:

### Option A: **Vercel Postgres** (Recommended - Easiest)
- Serverless PostgreSQL managed by Vercel
- Free tier: 60 compute hours/month + 250MB storage
- Best for small projects
- Sign up: https://vercel.com/docs/storage/vercel-postgres

### Option B: **Neon** (Free tier)
- Free PostgreSQL database
- Good for development and small projects
- Sign up: https://neon.tech

### Option C: **PlanetScale** (Free tier)
- MySQL database (need to adapt Prisma schema)
- Free tier available
- Requires schema migration

### Option D: **Supabase** (Free tier)
- Firebase-like PostgreSQL
- Great free tier
- Sign up: https://supabase.com

### Option E: **AWS RDS** (Paid, already configured)
- Use your existing Terraform setup
- More expensive but production-ready
- Keep your current infrastructure

## Step-by-Step Deployment

### 1. Prepare Your Code

```bash
# Make sure everything is committed
git status
git add .
git commit -m "Add Vercel deployment configuration"
git push origin main
```

### 2. Set Up Your Database

**For Vercel Postgres:**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Create a Vercel Postgres database
vercel env pull .env.local
```

Your `.env.local` will automatically contain `POSTGRES_PRISMA_URL`.

**For other providers:**
Get your `DATABASE_URL` connection string and save it.

### 3. Connect GitHub to Vercel

1. Go to https://vercel.com/new
2. Select "Import Git Repository"
3. Choose your GitHub repository
4. Click "Import"

### 4. Configure Environment Variables in Vercel

In the Vercel dashboard, go to Settings → Environment Variables and add:

```
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
DATABASE_URL=<from your database provider>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
GITHUB_ID=(optional)
GITHUB_SECRET=(optional)
```

**To generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

Copy the output and paste into Vercel environment variables.

### 5. Deploy

Click "Deploy" in Vercel dashboard or:

```bash
vercel --prod
```

Vercel will automatically:
- Build your Next.js app
- Run `npx prisma migrate deploy`
- Deploy to a live URL
- Set up HTTPS

### 6. Update NextAuth Callback URLs

If using GitHub OAuth:

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Edit your OAuth app
3. Set Authorization callback URL to: `https://your-domain.vercel.app/api/auth/callback/github`

### 7. Update Stripe Webhook (Optional but Recommended)

For production payments:

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-domain.vercel.app/api/webhooks/stripe`
3. Events to listen: `checkout.session.completed`, `payment_intent.succeeded`
4. Copy signing secret and add to Vercel env vars as `STRIPE_WEBHOOK_SECRET`

## Post-Deployment

### Test the Deployment

1. Visit your Vercel URL
2. Test user registration: `/auth/signup`
3. Test ordering:
   - Use Stripe test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
4. Check order history

### Monitor Logs

```bash
# View live logs
vercel logs --prod

# Or in dashboard: Deployments → Logs
```

### Update After Code Changes

Just push to GitHub:
```bash
git push origin main
```

Vercel automatically deploys your changes.

## Comparison: Vercel vs AWS

| Feature | Vercel | AWS (Current) |
|---------|--------|---------------|
| **Setup Time** | 5 minutes | 30+ minutes |
| **Cost** | Free tier / Pay-as-you-go | RDS + ECS + ALB = ~$100-200/month |
| **Scaling** | Automatic | Manual or Auto Scaling |
| **Complexity** | Simple | Complex |
| **Control** | Limited | Full |
| **Best For** | Startups, MVPs, low traffic | Enterprise, high control |

## Troubleshooting

### Database Connection Error
- Verify `DATABASE_URL` is in environment variables
- Check database provider's firewall rules (allow Vercel IPs)
- Run migrations manually: `npx prisma migrate deploy`

### Prisma Migration Fails
- Check `vercel.json` has correct build command
- Verify database user has migration permissions
- Check Prisma schema syntax

### NextAuth Errors
- Ensure `NEXTAUTH_URL` matches your Vercel domain
- Verify `NEXTAUTH_SECRET` is set (not empty)
- Check OAuth callback URLs if using GitHub/Google

### Stripe Errors
- Verify keys are correct (test vs live)
- Check webhook endpoint if using webhooks
- Test with test card: `4242 4242 4242 4242`

## Next Steps

1. **Domain**: Buy a custom domain and configure in Vercel
2. **Email**: Set up transactional emails (Resend, SendGrid)
3. **Analytics**: Add monitoring (Vercel Analytics, LogRocket)
4. **Backups**: Set up automated database backups
5. **CI/CD**: Add automated tests in GitHub Actions

## Resources

- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/learn/basics/deploying-nextjs-app
- Prisma & Vercel: https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/vercel-postgres
- NextAuth.js Docs: https://next-auth.js.org

## Support

For issues:
- Check Vercel Status: https://www.vercelstatus.com
- Vercel Docs: https://vercel.com/docs
- Community: https://github.com/vercel/next.js/discussions
