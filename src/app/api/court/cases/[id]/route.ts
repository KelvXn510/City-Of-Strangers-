import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/utils/auth'

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAuth()
    const caseId = params.id
    const { opinion, questions } = await request.json()

    if (!opinion) {
      return NextResponse.json({ error: 'Opinion is required' }, { status: 400 })
    }

    // Verify case exists and is open
    const courtCase = await prisma.courtCase.findUnique({
      where: { id: caseId },
    })

    if (!courtCase) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 })
    }

    if (courtCase.status !== 'OPEN') {
      return NextResponse.json({ error: 'Case is not open for opinions' }, { status: 400 })
    }

    if (new Date() > courtCase.closesAt) {
      await prisma.courtCase.update({
        where: { id: caseId },
        data: { status: 'CLOSED' },
      })
      return NextResponse.json({ error: 'Case has closed' }, { status: 400 })
    }

    const courtOpinion = await prisma.courtOpinion.create({
      data: {
        caseId,
        userId: user.id,
        opinion,
        questions: questions || [],
      },
    })

    return NextResponse.json(courtOpinion, { status: 201 })
  } catch (error) {
    console.error('Submit opinion error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to submit opinion' },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const caseId = params.id

    const courtCase = await prisma.courtCase.findUnique({
      where: { id: caseId },
      include: {
        opinions: {
          orderBy: { createdAt: 'desc' },
        },
        verdict: true,
      },
    })

    if (!courtCase) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 })
    }

    return NextResponse.json(courtCase)
  } catch (error) {
    console.error('Get case error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch case' },
      { status: 500 },
    )
  }
}
