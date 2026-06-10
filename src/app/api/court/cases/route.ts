import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/utils/auth'
import { generateCourtVerdict } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    const { title, situation, question, context, districtId } = await request.json()

    if (!title || !situation || !question || !districtId) {
      return NextResponse.json(
        { error: 'Title, situation, question, and districtId are required' },
        { status: 400 },
      )
    }

    // Create case with 48-hour expiration
    const closesAt = new Date(Date.now() + 48 * 60 * 60 * 1000)

    const courtCase = await prisma.courtCase.create({
      data: {
        userId: user.id,
        districtId,
        title,
        situation,
        question,
        context,
        status: 'OPEN',
        closesAt,
      },
    })

    return NextResponse.json(courtCase, { status: 201 })
  } catch (error) {
    console.error('Create court case error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create court case' },
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

    const cases = await prisma.courtCase.findMany({
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
          take: 5,
        },
        verdict: true,
      },
    })

    const total = await prisma.courtCase.count({
      where: {
        districtId,
        status: { in: ['OPEN', 'CLOSED', 'FEATURED'] },
      },
    })

    return NextResponse.json({ cases, total })
  } catch (error) {
    console.error('Get court cases error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch court cases' },
      { status: 500 },
    )
  }
}
