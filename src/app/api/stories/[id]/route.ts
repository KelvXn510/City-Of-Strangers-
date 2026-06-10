import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/utils/auth'

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAuth()
    const storyId = params.id

    // Check if already favorited
    const existing = await prisma.favorite.findUnique({
      where: {
        userId_storyId: {
          userId: user.id,
          storyId,
        },
      },
    })

    if (existing) {
      // Remove favorite
      await prisma.favorite.delete({
        where: { id: existing.id },
      })
      return NextResponse.json({ isFavorited: false })
    } else {
      // Add favorite
      await prisma.favorite.create({
        data: {
          userId: user.id,
          storyId,
        },
      })
      return NextResponse.json({ isFavorited: true })
    }
  } catch (error) {
    console.error('Toggle favorite error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to toggle favorite' },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const storyId = params.id

    const story = await prisma.story.findUnique({
      where: { id: storyId },
      include: {
        district: true,
        favorites: true,
      },
    })

    if (!story) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 })
    }

    // Increment view count
    await prisma.story.update({
      where: { id: storyId },
      data: { viewCount: { increment: 1 } },
    })

    return NextResponse.json(story)
  } catch (error) {
    console.error('Get story error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch story' },
      { status: 500 },
    )
  }
}
