# Quick Start Guide

Get The City of Strangers running locally in 5 minutes.

## Prerequisites

- Node.js 20.x or higher
- npm or yarn
- A Supabase account
- An OpenAI API key

## Step 1: Clone & Install (2 minutes)

```bash
# Clone the repository
git clone <repository-url>
cd city-of-strangers

# Install dependencies
npm install
```

## Step 2: Configure Environment (1 minute)

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your credentials:
# NEXT_PUBLIC_SUPABASE_URL=your_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
# SUPABASE_SERVICE_ROLE_KEY=your_key
# OPENAI_API_KEY=your_key
# DATABASE_URL=your_db_url
```

## Step 3: Setup Database (1 minute)

```bash
# Push schema to database
npm run db:push

# Seed with default districts
npm run db:seed
```

## Step 4: Start Development Server (1 minute)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## Common Commands

```bash
# Run tests
npm run test

# Run E2E tests
npm run test:e2e

# Check types
npm run type-check

# Access Prisma Studio
npm run db:studio

# Build for production
npm run build
```

## Testing the Application

### 1. Create an Account
- Go to http://localhost:3000/auth/register
- Enter email and password
- Click "Create Account"

### 2. Explore Districts
- Go to http://localhost:3000/explore
- Click on any district to explore
- View sample stories and content

### 3. Submit Content
- Click "+ Add to City" on any district page
- Fill in the submission form
- Click "Submit to City"
- Content will be pending moderation

### 4. Access Admin Dashboard
- Go to http://localhost:3000/admin/dashboard
- View statistics
- Review pending content
- Manage reports

## Troubleshooting

### "Cannot find module '@/...'"
- Ensure `tsconfig.json` paths are correct
- Restart dev server

### "Database connection error"
- Check DATABASE_URL in .env.local
- Verify Supabase project is running
- Check network connectivity

### "OpenAI API errors"
- Verify OPENAI_API_KEY is correct
- Check OpenAI account has credits
- Monitor usage in OpenAI dashboard

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

## Environment Variables Explained

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public Supabase API key |
| `SUPABASE_SERVICE_ROLE_KEY` | Private Supabase service key |
| `DATABASE_URL` | PostgreSQL connection string |
| `OPENAI_API_KEY` | OpenAI API key for AI features |
| `NEXT_PUBLIC_APP_URL` | Your application URL |
| `JWT_SECRET` | Secret for JWT token signing |

## File Organization Quick Reference

```
src/
├── app/          # Pages and API routes
├── components/   # React components
├── lib/          # Libraries and integrations
├── types/        # TypeScript types
├── utils/        # Helper functions
└── hooks/        # Custom React hooks

prisma/
├── schema.prisma # Database schema
└── seed.ts       # Seed data

tests/
├── unit/         # Unit tests
└── e2e/          # E2E tests
```

## Next Steps

1. **Read the Documentation**
   - [README.md](README.md) for overview
   - [ARCHITECTURE.md](ARCHITECTURE.md) for system design
   - [API.md](API.md) for endpoint documentation

2. **Explore the Code**
   - Start with `src/app/page.tsx` (homepage)
   - Check `src/components/` for UI components
   - Review `src/lib/openai.ts` for AI integration

3. **Run Tests**
   ```bash
   npm run test
   npm run test:e2e
   ```

4. **Deploy to Production**
   - Follow [DEPLOYMENT.md](DEPLOYMENT.md)
   - Deploy to Vercel with one click

## Getting Help

- 📖 Check [README.md](README.md)
- 🏗️ See [ARCHITECTURE.md](ARCHITECTURE.md)
- 📝 Review [API.md](API.md)
- 🚀 Follow [DEPLOYMENT.md](DEPLOYMENT.md)
- 💬 Open an issue on GitHub
- 📧 Email: hello@cityofstrangers.com

---

**That's it!** You now have The City of Strangers running locally. 🏙️

For production deployment, see [DEPLOYMENT.md](DEPLOYMENT.md).
