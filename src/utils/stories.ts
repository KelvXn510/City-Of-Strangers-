import { prisma } from '@/lib/prisma'
import { analyzeEmotionalContent, classifyContent, detectHarmfulContent } from '@/lib/openai'

export async function createStory(
  userId: string,
  districtId: string,
  title: string,
  content: string,
  category?: string,
) {
  // Analyze content with AI
  const emotionalAnalysis = await analyzeEmotionalContent(content)
  const classification = await classifyContent(content, 'LIBRARY_UNSENT_CONVERSATIONS')
  const harmCheck = await detectHarmfulContent(content)

  const story = await prisma.story.create({
    data: {
      userId,
      districtId,
      title,
      content,
      category: category || classification.category,
      summary: emotionalAnalysis.summary,
      emotionalTags: emotionalAnalysis.emotionalTags,
      topicClassification: classification.category,
      status: harmCheck.isFlagged ? 'PENDING_REVIEW' : 'APPROVED',
    },
  })

  // Create AI insight record if flagged
  if (harmCheck.isFlagged) {
    await prisma.aIInsight.create({
      data: {
        storyId: story.id,
        userId,
        contentType: 'story',
        insights: classification,
        emotionalAnalysis: emotionalAnalysis,
        flaggedContent: true,
        flagReason: harmCheck.reasons.join(', '),
      },
    })
  }

  return story
}

export async function getAllDistricts() {
  return prisma.district.findMany({
    where: { isActive: true, isVisible: true },
    orderBy: { order: 'asc' },
  })
}

export async function getDistrictBySlug(slug: string) {
  return prisma.district.findUnique({
    where: { slug },
  })
}

export async function getStoriesByDistrict(districtId: string, limit = 20, offset = 0) {
  return prisma.story.findMany({
    where: {
      districtId,
      status: 'APPROVED',
    },
    take: limit,
    skip: offset,
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: {
          id: true,
          role: true,
        },
      },
      favorites: true,
    },
  })
}

export async function getFavoriteCount(storyId: string) {
  return prisma.favorite.count({
    where: { storyId },
  })
}

export async function getStoryCount(districtId: string) {
  return prisma.story.count({
    where: {
      districtId,
      status: 'APPROVED',
    },
  })
}

export async function searchStories(query: string, districtId?: string) {
  return prisma.story.findMany({
    where: {
      AND: [
        districtId ? { districtId } : {},
        {
          OR: [
            { title: { search: query } },
            { content: { search: query } },
            { emotionalTags: { hasSome: [query] } },
          ],
        },
        { status: 'APPROVED' },
      ],
    },
    take: 50,
    orderBy: [{ _relevance: { fields: ['title'], search: query, sort: 'desc' } }],
  })
}

export async function getCourtCasesByDistrict(districtId: string, limit = 20, offset = 0) {
  return prisma.courtCase.findMany({
    where: {
      districtId,
      status: { in: ['OPEN', 'CLOSED', 'FEATURED'] },
    },
    take: limit,
    skip: offset,
    orderBy: { createdAt: 'desc' },
    include: {
      opinions: {
        select: {
          id: true,
          opinion: true,
          createdAt: true,
        },
        take: 3,
      },
      verdict: true,
    },
  })
}
