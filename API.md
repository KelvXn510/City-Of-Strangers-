# API Documentation

## Base URL
```
Development: http://localhost:3000/api
Production: https://cityofstrangers.com/api
```

## Authentication

All authenticated endpoints require an Authorization header with a valid JWT token from Supabase:

```
Authorization: Bearer <supabase_jwt_token>
```

## Common Response Format

### Success Response
```json
{
  "status": "success",
  "data": { }
}
```

### Error Response
```json
{
  "error": "Error message",
  "status": "error",
  "code": "ERROR_CODE"
}
```

## Endpoints

### Authentication

#### Register User
**POST** `/auth/register`

Request:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

Response:
```json
{
  "user": {
    "id": "user_id",
    "email": "user@example.com"
  },
  "session": {
    "access_token": "jwt_token",
    "refresh_token": "refresh_token"
  }
}
```

#### Login
**POST** `/auth/login`

Request:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

Response: Same as register

#### Reset Password
**POST** `/auth/reset-password`

Request:
```json
{
  "email": "user@example.com"
}
```

Response:
```json
{
  "message": "Password reset email sent"
}
```

### Stories

#### Create Story
**POST** `/stories`

Requires authentication.

Request:
```json
{
  "title": "Story Title",
  "content": "Story content here...",
  "category": "Love",
  "districtId": "district_id"
}
```

Response:
```json
{
  "id": "story_id",
  "userId": "user_id",
  "districtId": "district_id",
  "title": "Story Title",
  "content": "Story content here...",
  "status": "PENDING_REVIEW",
  "createdAt": "2024-06-11T12:00:00Z"
}
```

#### Get Stories by District
**GET** `/stories?districtId=:districtId&limit=20&offset=0`

Response:
```json
{
  "stories": [
    {
      "id": "story_id",
      "title": "Story Title",
      "summary": "AI-generated summary",
      "emotionalTags": ["love", "regret"],
      "viewCount": 42,
      "saveCount": 5,
      "createdAt": "2024-06-11T12:00:00Z"
    }
  ],
  "total": 150
}
```

#### Get Story Details
**GET** `/stories/:id`

Response:
```json
{
  "id": "story_id",
  "title": "Story Title",
  "content": "Full story content...",
  "emotionalTags": ["love", "regret"],
  "viewCount": 43,
  "saveCount": 5,
  "district": {
    "id": "district_id",
    "name": "Library of Unsent Conversations"
  },
  "favorites": []
}
```

#### Toggle Favorite
**POST** `/stories/:id`

Requires authentication.

Response:
```json
{
  "isFavorited": true
}
```

### Court Cases

#### Create Court Case
**POST** `/court/cases`

Requires authentication.

Request:
```json
{
  "title": "Should I change careers?",
  "situation": "I've been working in finance for 10 years...",
  "question": "Should I switch to a creative field?",
  "context": "Additional context about the dilemma",
  "districtId": "district_id"
}
```

Response:
```json
{
  "id": "case_id",
  "title": "Should I change careers?",
  "status": "OPEN",
  "closesAt": "2024-06-13T12:00:00Z",
  "createdAt": "2024-06-11T12:00:00Z",
  "opinions": []
}
```

#### Get Cases by District
**GET** `/court/cases?districtId=:districtId&limit=20&offset=0`

Response:
```json
{
  "cases": [
    {
      "id": "case_id",
      "title": "Should I change careers?",
      "status": "OPEN",
      "opinions": [
        {
          "id": "opinion_id",
          "opinion": "I think you should...",
          "createdAt": "2024-06-11T13:00:00Z"
        }
      ],
      "verdict": null
    }
  ],
  "total": 25
}
```

#### Get Case Details
**GET** `/court/cases/:id`

Response:
```json
{
  "id": "case_id",
  "title": "Should I change careers?",
  "situation": "Full situation...",
  "question": "Full question...",
  "status": "OPEN",
  "closesAt": "2024-06-13T12:00:00Z",
  "opinions": [
    {
      "id": "opinion_id",
      "opinion": "Opinion content...",
      "questions": [],
      "createdAt": "2024-06-11T13:00:00Z"
    }
  ],
  "verdict": null
}
```

#### Submit Opinion
**POST** `/court/cases/:id`

Requires authentication.

Request:
```json
{
  "opinion": "I think you should consider...",
  "questions": ["What about...?"]
}
```

Response:
```json
{
  "id": "opinion_id",
  "caseId": "case_id",
  "opinion": "I think you should consider...",
  "questions": ["What about...?"],
  "createdAt": "2024-06-11T14:00:00Z"
}
```

### Admin Endpoints

#### Get Dashboard Stats
**GET** `/admin/stats`

Requires admin role.

Response:
```json
{
  "totalUsers": 1500,
  "totalStories": 12000,
  "totalCases": 450,
  "totalReports": 23,
  "activeUsers": 350
}
```

#### Get Pending Content
**GET** `/admin/moderation?limit=50`

Requires admin role.

Response:
```json
[
  {
    "id": "story_id",
    "title": "Story Title",
    "content": "Story content...",
    "status": "PENDING_REVIEW",
    "user": {
      "id": "user_id",
      "email": "user@example.com"
    },
    "createdAt": "2024-06-11T12:00:00Z"
  }
]
```

#### Moderate Content
**POST** `/admin/moderation`

Requires admin role.

Request:
```json
{
  "contentId": "story_id",
  "action": "approve|reject|archive|delete",
  "reason": "Optional reason"
}
```

Response:
```json
{
  "success": true
}
```

#### Get Reports
**GET** `/admin/reports?status=PENDING&limit=50`

Requires admin role.

Response:
```json
[
  {
    "id": "report_id",
    "reason": "HARASSMENT",
    "description": "This content is offensive...",
    "status": "PENDING",
    "story": {
      "id": "story_id",
      "title": "Story Title"
    },
    "reportedBy": {
      "id": "user_id",
      "email": "reporter@example.com"
    },
    "createdAt": "2024-06-11T12:00:00Z"
  }
]
```

#### Review Report
**POST** `/admin/reports`

Requires admin role.

Request:
```json
{
  "reportId": "report_id",
  "action": "dismiss|uphold",
  "adminNotes": "Reviewed and found content violates guidelines"
}
```

Response:
```json
{
  "id": "report_id",
  "status": "UPHELD",
  "adminNotes": "Reviewed and found content violates guidelines",
  "reviewedAt": "2024-06-11T15:00:00Z"
}
```

## Error Codes

| Code | Status | Description |
|------|--------|-------------|
| UNAUTHORIZED | 401 | Missing or invalid authentication token |
| FORBIDDEN | 403 | User lacks required permissions |
| NOT_FOUND | 404 | Resource not found |
| BAD_REQUEST | 400 | Invalid request parameters |
| CONFLICT | 409 | Resource already exists |
| RATE_LIMITED | 429 | Too many requests |
| INTERNAL_ERROR | 500 | Server error |

## Rate Limiting

- Authentication endpoints: 5 requests per minute per IP
- API endpoints: 60 requests per minute per user
- Admin endpoints: 100 requests per minute per admin

## Pagination

Use `limit` and `offset` parameters for pagination:

```
GET /api/stories?districtId=123&limit=20&offset=40
```

Default limit: 20
Maximum limit: 100

## Sorting

Most endpoints support `sortBy` and `sortOrder`:

```
GET /api/stories?sortBy=createdAt&sortOrder=desc
```

Valid sortBy values: `createdAt`, `viewCount`, `saveCount`, `title`
Valid sortOrder values: `asc`, `desc`

## Filtering

Common filter parameters:

```
GET /api/stories?status=APPROVED&category=Love
```

---

For more information, see [README.md](README.md) and [ARCHITECTURE.md](ARCHITECTURE.md)
