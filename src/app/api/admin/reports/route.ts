import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/utils/auth'

export async function GET(request: NextRequest) {
  try {
    await requireAdmin()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')

    const reports = await prisma.report.findMany({
      where: status ? { status: status as any } : {},
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        story: {
          select: { id: true, title: true },
        },
        case: {
          select: { id: true, title: true },
        },
        user: {
          select: { id: true, email: true },
        },
        reportedBy: {
          select: { id: true, email: true },
        },
      },
    })

    return NextResponse.json(reports)
  } catch (error) {
    console.error('Get reports error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch reports' },
      { status: 401 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin()

    const { reportId, action, adminNotes } = await request.json()

    if (!reportId || !action) {
      return NextResponse.json(
        { error: 'reportId and action are required' },
        { status: 400 },
      )
    }

    const report = await prisma.report.update({
      where: { id: reportId },
      data: {
        status: action === 'dismiss' ? 'DISMISSED' : 'UPHELD',
        adminNotes,
        reviewedAt: new Date(),
        reviewedBy: user.id,
      },
    })

    // If upheld, take action on the content
    if (action === 'uphold' && report.storyId) {
      await prisma.story.update({
        where: { id: report.storyId },
        data: { status: 'REMOVED' },
      })
    }

    return NextResponse.json(report)
  } catch (error) {
    console.error('Update report error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update report' },
      { status: 401 },
    )
  }
}
