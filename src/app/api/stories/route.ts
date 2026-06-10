import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/utils/auth'

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    const { title, content, category, districtId } = await request.json()

    if (!title || !content || !districtId) {
      return NextResponse.json(
        { error: 'Title, content, and districtId are required' },
        { status: 400 },
      )
    }

    const story = await prisma.story.create({
      data: {
        userId: user.id,
        districtId,
        title,
        content,
        category,
        status: 'PENDING_REVIEW',
      },
    })

    return NextResponse.json(story, { status: 201 })
  } catch (error) {
    console.error('Create story error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create story' },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const districtId = searchParams.get('districtId')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    if (!districtId) {
      return NextResponse.json({ error: 'districtId is required' }, { status: 400 })
    }

    const stories = await prisma.story.findMany({
      where: {
        districtId,
        status: 'APPROVED',
      },
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
    })

    const total = await prisma.story.count({
      where: {
        districtId,
        status: 'APPROVED',
      },
    })

    return NextResponse.json({ stories, total }, { status: 200 })
  } catch (error) {
    console.error('Get stories error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch stories' },
      { status: 500 },
    )
  }
}
