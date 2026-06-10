# System Architecture

## Overview

The City of Strangers is built on a modern, scalable architecture designed for performance, security, and maintainability.

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                             │
│  Next.js 15 (React 19) + Tailwind + Framer Motion              │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      API Gateway Layer                           │
│   Next.js API Routes + Server Actions                           │
│   Rate Limiting | Authentication | Request Validation          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                     Business Logic Layer                         │
│  Prisma ORM | OpenAI Integration | Content Moderation           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      Data Layer                                  │
│  PostgreSQL (Supabase) | Row Level Security                    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    External Services                             │
│  Supabase Auth | OpenAI API | Vercel Deployment               │
└─────────────────────────────────────────────────────────────────┘
```

## Technology Stack Rationale

### Frontend: Next.js 15
- **Why**: App Router enables modern server components and streaming
- **Benefits**: Server-side rendering, automatic code splitting, API routes
- **Alternatives Considered**: Remix, SvelteKit (but Next.js has better ecosystem)

### Styling: Tailwind CSS
- **Why**: Utility-first, dark-mode support, excellent performance
- **Benefits**: Rapid development, consistent design system
- **Customization**: Extended with custom animations and color palette

### Animations: Framer Motion
- **Why**: GPU-accelerated animations for smooth transitions
- **Benefits**: Excellent for page transitions and interactive elements
- **Performance**: Hardware acceleration reduces jank

### Database: PostgreSQL + Prisma
- **Why**: Strong relational model for complex relationships
- **Prisma Benefits**: Type-safe ORM, migrations, visual schema explorer
- **Hosting**: Supabase for managed PostgreSQL with auth integration

### Authentication: Supabase Auth
- **Why**: Deeply integrated with database, JWT-based
- **Security**: Built-in MFA, password hashing, session management
- **Benefits**: Row Level Security policies at database level

### AI: OpenAI API
- **Why**: Leading LLM capabilities for content analysis
- **Models**: GPT-4o-mini for cost-effective analysis
- **Integration**: Async calls with error handling

### Deployment: Vercel
- **Why**: Seamless Next.js integration, global Edge Network
- **Features**: Automatic deployments, preview URLs, analytics
- **Scaling**: Serverless functions, automatic scaling

## Data Flow Architecture

### User Submission Flow

```
User Form Input
    ↓
Client-side Validation (Zod)
    ↓
API Route: POST /api/stories
    ↓
Authentication Check
    ↓
AI Analysis (OpenAI)
    ├→ Emotional Analysis
    ├→ Content Classification
    └→ Harmful Content Detection
    ↓
Create Story Record
    ├→ Main Story
    ├→ AI Insights
    └→ Status (PENDING_REVIEW or APPROVED)
    ↓
Response to Client
    ↓
UI Confirmation & Redirection
```

### Content Moderation Flow

```
Flagged Content (AI or User Report)
    ↓
Added to Moderation Queue
    ↓
Admin Dashboard Display
    ↓
Admin Review & Decision
    ├→ Approve → APPROVED status
    ├→ Reject → REJECTED status
    ├→ Archive → ARCHIVED status
    └→ Delete → Content removed
    ↓
Log Action in AdminLog
    ↓
Notify User (if applicable)
```

### Court Case Verdict Generation

```
Case Submission
    ↓
Open for 48 hours
    ↓
Community Opinions Collected
    ↓
Case Auto-closes at 48h
    ↓
Trigger Verdict Generation
    ↓
OpenAI Analysis (5 Perspectives)
    ├→ Logical
    ├→ Emotional
    ├→ Risk
    ├→ Optimistic
    └→ Long-term
    ↓
Store Verdict
    ↓
Create Notification for Case Creator
```

## Database Schema Design

### User Management
- Separate authentication (Supabase) from profiles (Prisma)
- Role-based access control (USER, ADMIN)
- Audit trail for all user actions

### Content Organization
- Districts as primary organizational unit
- Stories linked to districts and users
- Status tracking (PENDING_REVIEW, APPROVED, REJECTED, ARCHIVED, REMOVED)

### AI Integration Points
- AIInsight model stores all AI analysis results
- Flagged content detected automatically
- Manual review queue for edge cases

### Audit & Compliance
- AdminLog tracks all administrative actions
- Report system with status tracking
- Notification history maintained

## API Route Structure

```
/api/
├── /auth/
│   ├── register          # User registration
│   ├── login             # Authentication
│   └── reset-password    # Password recovery
├── /stories/
│   ├── [id]/             # Get/update individual story
│   └── /favorites        # Favorite management
├── /court/
│   └── /cases/
│       ├── [id]/         # Case details & opinions
│       └── /verdict      # Generate verdict (admin only)
├── /predictions/         # Future predictions & reminders
├── /admin/
│   ├── /stats            # Dashboard statistics
│   ├── /moderation       # Content moderation queue
│   ├── /reports          # Review user reports
│   ├── /users            # User management
│   └── /districts        # District management
└── /notifications/       # User notifications
```

## Performance Optimization

### Frontend Optimization
- **Code Splitting**: Automatic with Next.js dynamic imports
- **Image Optimization**: Next.js Image component with lazy loading
- **CSS**: Tailwind purges unused styles in production
- **Animations**: GPU-accelerated with Framer Motion

### Database Optimization
- **Indexes**: Created on frequently queried fields
  - userId on stories, cases, predictions
  - districtId on stories, cases
  - status on stories (for moderation queue)
  - createdAt (for sorting)
- **Connection Pooling**: Managed by Supabase
- **Query Optimization**: Prisma optimized queries

### API Optimization
- **Caching**: HTTP cache headers on appropriate endpoints
- **Compression**: gzip by default with Next.js
- **Rate Limiting**: Implemented on authentication routes
- **Pagination**: Large result sets paginated

### Deployment Optimization
- **Edge Caching**: Vercel Edge Network
- **CDN**: Global distribution of assets
- **Compression**: Automatic minification and compression
- **Prefetching**: Preload critical resources

## Security Architecture

### Authentication & Authorization
```
User Login
    ↓
Supabase JWT Token
    ↓
Stored in Secure HttpOnly Cookie
    ↓
API Route Middleware Verification
    ↓
Role Check for Protected Routes
    ↓
Request Processing or 401 Response
```

### Data Protection
- All connections use TLS 1.2+
- Passwords hashed by Supabase (bcrypt)
- Session tokens expire automatically
- Refresh tokens for extended sessions

### Content Moderation
- AI-powered automatic detection
- Manual review by admins
- User reporting system
- Report reason tracking

### Database Security
- Row Level Security (RLS) policies in Supabase
- Service role key kept server-side
- Public key for client-side operations
- SQL injection prevention via Prisma

## Scalability Considerations

### Horizontal Scaling
- Vercel handles serverless function scaling
- No state stored in server memory
- Session data in database

### Database Scaling
- Connection pooling managed by Supabase
- Read replicas available for high-traffic queries
- Automatic backup and disaster recovery

### API Scaling
- Rate limiting prevents abuse
- Caching reduces database load
- Async AI operations don't block responses

### Future Optimization
- Message queue for AI processing
- Redis cache layer for frequently accessed data
- Search index (Elasticsearch) for advanced queries

## Error Handling & Monitoring

### Application Errors
- Try-catch blocks in API routes
- Validation errors with detailed messages
- Graceful fallbacks in UI

### Monitoring Strategy
- Vercel Analytics for performance
- Error tracking (Sentry recommended)
- Database query logging
- API response time tracking

### Alerting
- Deployment failures
- API error rate threshold
- Database connection failures
- AI API quota warnings

## Development Workflow

### Local Development
- Docker Compose for PostgreSQL (optional)
- Supabase local development
- Environment variables in .env.local

### Testing Strategy
- Unit tests for utilities and business logic
- Integration tests for API routes
- E2E tests for user flows
- Manual testing before deployment

### Code Quality
- TypeScript for type safety
- ESLint for code consistency
- Prettier for formatting
- Pre-commit hooks for validation

## Deployment Pipeline

```
Code Push to Main
    ↓
GitHub Actions Trigger
    ↓
Run Tests & Linting
    ↓
Build & Type Check
    ↓
Deploy to Vercel Preview
    ↓
Run E2E Tests
    ↓
Deploy to Production
    ↓
Update DNS/CDN
```

## Disaster Recovery

### Backup Strategy
- Supabase daily automated backups
- Point-in-time recovery available
- Manual backups before major updates

### Failover Plan
- Automatic health checks
- CDN failover for static assets
- Database read replicas

### Recovery Procedures
- Vercel deployment rollback (1-click)
- Database rollback via migrations
- DNS failover to backup infrastructure

## Future Architecture Considerations

1. **Microservices**: As the platform scales, separate AI processing service
2. **Message Queue**: Redis/RabbitMQ for async processing
3. **Search Engine**: Elasticsearch for advanced search capabilities
4. **Cache Layer**: Redis for frequently accessed data
5. **Analytics**: BigQuery or similar for detailed analytics
6. **CDN**: CloudFlare or Fastly for enhanced edge caching
7. **Video/Audio**: When expanding beyond text-only MVP

---

This architecture is designed to be both powerful and maintainable, allowing for growth while keeping complexity manageable.
