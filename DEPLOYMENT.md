# Deployment Guide

## Production Deployment

### Vercel Deployment

Vercel provides the easiest deployment experience for Next.js applications.

#### Prerequisites
- Vercel account
- GitHub repository
- All environment variables configured

#### Steps

1. **Import project to Vercel**
   - Go to vercel.com
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Configure project settings

2. **Set Environment Variables**
   In Vercel project settings, add:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY
   OPENAI_API_KEY
   DATABASE_URL
   JWT_SECRET
   ```

3. **Deploy**
   - Vercel automatically deploys on push to main branch
   - Preview deployments for pull requests

### Database Setup (Supabase)

1. **Create Supabase Project**
   - Go to supabase.com
   - Create new project
   - Wait for provisioning

2. **Get Connection String**
   - Project Settings → Database → Connection String
   - Copy the PostgreSQL string
   - Set as DATABASE_URL

3. **Run Migrations**
   ```bash
   npm run db:push
   npm run db:seed
   ```

### OpenAI Setup

1. **Get API Key**
   - Go to platform.openai.com
   - Create API key
   - Set OPENAI_API_KEY environment variable

2. **Configure Rate Limits**
   - Set usage limits in OpenAI dashboard
   - Monitor costs in billing section

### Admin Account Setup

1. **Create Initial Admin**
   ```bash
   npm run db:seed -- --create-admin
   ```

2. **Change Default Credentials**
   - Log in to admin dashboard
   - Update password immediately

### SSL Certificate

- Vercel provides free SSL certificates
- Automatic renewal handled
- HTTPS enforced by default

### CDN & Caching

**Vercel Edge Network**
- Automatically uses Edge locations
- Geographic content distribution
- Cache headers optimized

**Configure Cache Policy**
In `next.config.ts`:
```typescript
headers: async () => [
  {
    source: '/api/:path*',
    headers: [
      { key: 'Cache-Control', value: 'no-store' },
    ],
  },
  {
    source: '/(.)*',
    headers: [
      { key: 'Cache-Control', value: 'public, max-age=3600' },
    ],
  },
]
```

### Monitoring & Logging

**Vercel Analytics**
- Enable Web Analytics in Vercel dashboard
- Monitor Core Web Vitals
- Track deployment performance

**Error Tracking** (Optional)
- Set up Sentry for error monitoring
- Configure in environment variables

### Database Backup

**Supabase Automatic Backups**
- Included with project
- Daily backups retained for 7 days

**Manual Backup**
```bash
pg_dump postgresql://... > backup.sql
```

### Security Hardening

1. **Rate Limiting**
   ```typescript
   // In API routes
   import rateLimit from 'express-rate-limit'
   ```

2. **CORS Configuration**
   ```typescript
   // In middleware
   const allowedOrigins = [
     process.env.NEXT_PUBLIC_APP_URL,
     'https://yourdomain.com'
   ]
   ```

3. **Security Headers**
   - Content Security Policy
   - X-Frame-Options
   - X-Content-Type-Options

4. **Data Encryption**
   - Supabase handles encryption at rest
   - TLS 1.2+ for transit

### Performance Tuning

**Database Optimization**
- Create indexes on frequently queried fields
- Monitor slow queries in Supabase

**Image Optimization**
- Use Next.js Image component
- Automatic format conversion
- Responsive image serving

**API Optimization**
- Implement caching headers
- Use compression middleware
- Monitor API response times

### Scaling Considerations

**Supabase Scaling**
- Database connection pooling
- Read replicas for high traffic
- Row Level Security (RLS) policies

**Vercel Scaling**
- Automatic scaling handled
- Serverless functions scale automatically
- Edge middleware for global performance

### Monitoring Dashboard

Set up monitoring for:
- API response times
- Database query performance
- Error rates
- User activity
- AI API usage and costs

### Rollback Procedure

In case of issues:

1. **Vercel Rollback**
   - Click "Deployments"
   - Select previous deployment
   - Click "Redeploy"

2. **Database Rollback**
   ```bash
   npm run db:migrate:revert
   ```

3. **Environment Variable Reset**
   - Revert changes in Vercel dashboard
   - Redeploy

### Post-Deployment Checklist

- [ ] Test authentication flow
- [ ] Verify database connectivity
- [ ] Test all API endpoints
- [ ] Check admin dashboard access
- [ ] Monitor error logs
- [ ] Test email notifications
- [ ] Verify OpenAI integration
- [ ] Check performance metrics
- [ ] Test on multiple devices
- [ ] Verify SSL certificate

### Continuous Integration/Deployment

GitHub Actions workflows included:
- `.github/workflows/tests.yml` - Run tests on push
- `.github/workflows/deploy.yml` - Auto-deploy to Vercel

### Support & Troubleshooting

**Common Issues**

1. **Connection Refused**
   - Check DATABASE_URL
   - Verify Supabase project is running
   - Check IP whitelist

2. **Authentication Fails**
   - Verify Supabase keys
   - Check CORS configuration
   - Review auth settings

3. **API Rate Limiting**
   - Check OpenAI usage
   - Review rate limit policies
   - Monitor API costs

For additional support, contact deployment support or check Vercel/Supabase documentation.
