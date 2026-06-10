export type ContentStatus = 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED' | 'ARCHIVED' | 'REMOVED'
export type CaseStatus = 'OPEN' | 'CLOSED' | 'FEATURED' | 'REMOVED'
export type UserRole = 'USER' | 'ADMIN'

export interface User {
  id: string
  email: string
  emailVerified?: Date
  role: UserRole
  createdAt: Date
  updatedAt: Date
  lastLoginAt?: Date
  isActive: boolean
  isSuspended: boolean
  isBanned: boolean
}

export interface District {
  id: string
  name: string
  slug: string
  description: string
  type: DistrictType
  themeColor: string
  icon: string
  order: number
  isActive: boolean
  isVisible: boolean
  createdAt: Date
  updatedAt: Date
  customFields?: Record<string, any>
}

export type DistrictType =
  | 'LIBRARY_UNSENT_CONVERSATIONS'
  | 'MUSEUM_ALMOST'
  | 'COURT_DECISIONS'
  | 'CEMETERY_FORMER_SELVES'
  | 'OBSERVATORY'
  | 'CUSTOM'

export interface Story {
  id: string
  userId: string
  districtId: string
  title: string
  content: string
  category?: string
  summary?: string
  emotionalTags: string[]
  topicClassification?: string
  status: ContentStatus
  isFeatured: boolean
  viewCount: number
  saveCount: number
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  archivedAt?: Date
}

export interface CourtCase {
  id: string
  userId: string
  districtId: string
  title: string
  situation: string
  question: string
  context?: string
  status: CaseStatus
  openedAt: Date
  closesAt: Date
  closedAt?: Date
  isFeatured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CourtVerdict {
  id: string
  caseId: string
  logicalPerspective: string
  emotionalPerspective: string
  riskPerspective: string
  optimisticPerspective: string
  longTermPerspective: string
  aiModel?: string
  generatedAt: Date
}

export interface Prediction {
  id: string
  userId: string
  districtId: string
  title: string
  content: string
  reminderDate: Date
  isRevealed: boolean
  createdAt: Date
  updatedAt: Date
}

export interface FormerSelf {
  id: string
  userId: string
  districtId: string
  name: string
  reflection: string
  buriedDate: Date
  createdAt: Date
}

export interface Report {
  id: string
  storyId?: string
  caseId?: string
  userId: string
  reportedById: string
  reason: ReportReason
  description?: string
  status: ReportStatus
  createdAt: Date
}

export type ReportReason =
  | 'SPAM'
  | 'HARASSMENT'
  | 'HATE_SPEECH'
  | 'THREATS'
  | 'PERSONAL_INFORMATION'
  | 'SELF_HARM_CONCERNS'
  | 'MISINFORMATION'
  | 'OTHER'

export type ReportStatus = 'PENDING' | 'REVIEWED' | 'DISMISSED' | 'UPHELD' | 'ACTION_TAKEN'

export interface AIInsight {
  id: string
  contentType: string
  emotionalTags?: string[]
  topicClassification?: string
  summary?: string
  flaggedContent: boolean
  flagReason?: string
}
