# The City of Strangers

A production-ready full-stack web application featuring a virtual city built entirely from anonymous human experiences. No followers. No likes. Just authentic stories.

## Overview

The City of Strangers is an innovative platform where users contribute anonymous stories, messages, and experiences that form the fabric of a living digital city. Each contribution becomes a location, artifact, or story within the city, creating an immersive, literary, and deeply human experience.

### Core Values
- **Anonymity**: Complete protection of user identities
- **Authenticity**: No metrics, no competition, no social posturing
- **Thoughtfulness**: Designed for reflection and genuine connection
- **AI Integration**: Sophisticated analysis without intrusion

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Server Actions
- **Database**: PostgreSQL, Prisma ORM
- **Authentication**: Supabase Auth
- **AI**: OpenAI API (GPT-4o-mini)
- **Deployment**: Vercel

## Project Structure

```
.
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   ├── auth/              # Authentication pages
│   │   ├── admin/             # Admin dashboard
│   │   ├── district/          # District pages
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   ├── lib/                   # Core libraries
│   │   ├── supabase.ts       # Supabase client
│   │   ├── prisma.ts         # Prisma singleton
│   │   └── openai.ts         # OpenAI integration
│   ├── types/                 # TypeScript types
│   ├── utils/                 # Utility functions
│   └── hooks/                 # React hooks
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed data
├── tests/
│   ├── e2e/                   # End-to-end tests
│   └── unit/                  # Unit tests
└── public/                    # Static assets
```

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- PostgreSQL database (local or Supabase)
- Supabase account
- OpenAI API key

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd city-of-strangers
   ```

2. **Run setup script**
   ```bash
   # On macOS/Linux
   chmod +x setup.sh
   ./setup.sh

   # On Windows
   setup.bat
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your credentials:
   - Supabase URL and API keys
   - OpenAI API key
   - Database URL
   - Admin credentials for initial setup

4. **Initialize the database**
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   Open [http://localhost:3000](http://localhost:3000)

## Features

### Five Districts

1. **Library of Unsent Conversations** 📚
   - Store messages never sent
   - Categorized by type: Love, Friendship, Family, Regret, Closure
   - AI emotional tagging and summarization

2. **Museum of Almost** ⚡
   - Stories about life paths not taken
   - Alternate timeline generation
   - Life theme identification

3. **Court of Human Decisions** ⚖️
   - Submit difficult life dilemmas
   - Community voting and opinions
   - AI-generated verdicts from 5 perspectives

4. **Cemetery of Former Selves** 🪦
   - Bury previous versions of yourself
   - Digital gravestones for transformation
   - Reflection storage

5. **Observatory** 🔭
   - Write predictions about your future
   - Receive reminders at chosen dates
   - Track personal growth

### Core Features

- **Anonymous Submissions**: No user profiles or identity exposure
- **AI Analysis**: Emotional tagging, content classification, harm detection
- **Community Moderation**: User reporting system
- **Admin Dashboard**: Comprehensive moderation and analytics tools
- **Content Management**: Dynamic district creation, featured content
- **Notifications**: Reminders and updates
- **Analytics**: Track platform metrics and trends

## API Documentation

### Authentication Routes

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/reset-password` - Reset password

### Story Routes

- `POST /api/stories` - Create story
- `GET /api/stories?districtId=X` - List stories by district
- `GET /api/stories/[id]` - Get story details
- `POST /api/stories/[id]` - Toggle favorite

### Court Routes

- `POST /api/court/cases` - Create court case
- `GET /api/court/cases?districtId=X` - List cases
- `POST /api/court/cases/[id]` - Submit opinion
- `GET /api/court/cases/[id]` - Get case details

### Admin Routes

- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/moderation` - Pending content
- `POST /api/admin/moderation` - Moderate content
- `GET /api/admin/reports` - User reports
- `POST /api/admin/reports` - Review report

## Database Schema

The application uses a comprehensive Prisma schema with the following models:

- **User**: Account and role management
- **District**: City districts and their configuration
- **Story**: User contributions to districts
- **CourtCase**: Dilemmas submitted for community input
- **CourtOpinion**: Community responses to cases
- **CourtVerdict**: AI-generated verdicts
- **Prediction**: Future predictions with reminders
- **FormerSelf**: Digital gravestones
- **Report**: User reporting system
- **AIInsight**: AI analysis results
- **Notification**: User notifications
- **AdminLog**: Audit trail of admin actions

See [prisma/schema.prisma](prisma/schema.prisma) for complete details.

## Testing

### Unit Tests
```bash
npm run test
npm run test:watch
```

### End-to-End Tests
```bash
npm run test:e2e
```

### Type Checking
```bash
npm run type-check
```

## Deployment

### Deploy to Vercel

1. **Connect repository to Vercel**
   ```bash
   vercel login
   vercel link
   ```

2. **Set environment variables in Vercel**
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
   - OPENAI_API_KEY
   - DATABASE_URL
   - JWT_SECRET

3. **Deploy**
   ```bash
   vercel deploy --prod
   ```

### Database Migration

Migrations are handled automatically:
```bash
npm run db:migrate
```

To create a new migration:
```bash
npm run db:migrate -- --name migration_name
```

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint and Prettier configuration
- Use functional components and React hooks
- Implement error handling with try-catch blocks

### API Conventions
- RESTful routes
- Consistent error responses
- Authentication required for protected routes
- Input validation with Zod

### Component Structure
- Keep components focused and reusable
- Use Framer Motion for animations
- Implement loading and error states
- Mobile-first design approach

## Environment Variables

Create `.env.local` with these variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/city_db

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change_me

# JWT
JWT_SECRET=your_jwt_secret

# Features
FEATURE_AI_MODERATION=true
FEATURE_ANALYTICS=true
FEATURE_NOTIFICATIONS=true
```

## Production Checklist

- [ ] All environment variables set in Vercel
- [ ] Database migrations applied
- [ ] Admin account created
- [ ] Content moderation policies established
- [ ] Rate limiting configured
- [ ] CORS properly configured
- [ ] Error logging setup (Sentry/LogRocket)
- [ ] Security headers configured
- [ ] SSL certificate validated
- [ ] Backups configured
- [ ] Monitoring and alerts setup
- [ ] Load testing completed

## Performance Optimization

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic with Next.js
- **Caching**: Optimized with Next.js Cache Control
- **Database**: Indexed queries, connection pooling
- **API**: Response caching where applicable
- **Frontend**: Framer Motion GPU acceleration

## Security Measures

- **Authentication**: Supabase JWT tokens
- **Authorization**: Role-based access control
- **Data Protection**: End-to-end anonymity
- **API Protection**: Rate limiting, input validation
- **Content Moderation**: AI detection + human review
- **Audit Logging**: All admin actions tracked
- **CORS**: Configured for allowed origins
- **HTTPS**: Enforced in production

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests: `npm run test`
4. Run linter: `npm run lint`
5. Submit pull request

## License

Proprietary - The City of Strangers

## Support

For issues and questions:
- Open GitHub issues
- Email: hello@cityofstrangers.com
- Documentation: See `/docs` directory

---

Built with care for authentic human connection. 🏙️
