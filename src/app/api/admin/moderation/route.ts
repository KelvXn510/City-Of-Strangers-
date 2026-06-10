import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin, getCurrentUser } from '@/utils/auth'
import { approveContent, rejectContent, archiveContent, deleteContent } from '@/utils/admin'

export async function GET(request: NextRequest) {
  try {
    await requireAdmin()

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')

    const content = await prisma.story.findMany({
      where: { status: 'PENDING_REVIEW' },
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { id: true, email: true },
        },
        district: true,
      },
    })

    return NextResponse.json(content)
  } catch (error) {
    console.error('Get pending content error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch pending content' },
      { status: 401 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin()
    const adminUser = await prisma.user.findUnique({ where: { id: user.id } })
    if (!adminUser || adminUser.role !== 'ADMIN') throw new Error('Admin access required')

    const { contentId, action, reason } = await request.json()

    if (!contentId || !action) {
      return NextResponse.json(
        { error: 'contentId and action are required' },
        { status: 400 },
      )
    }

    switch (action) {
      case 'approve':
        await approveContent(contentId, 'story', user.id)
        break
      case 'reject':
        await rejectContent(contentId, 'story', user.id, reason)
        break
      case 'archive':
        await archiveContent(contentId, 'story', user.id)
        break
      case 'delete':
        await deleteContent(contentId, 'story', user.id)
        break
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Moderate content error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to moderate content' },
      { status: 401 },
    )
  }
}
