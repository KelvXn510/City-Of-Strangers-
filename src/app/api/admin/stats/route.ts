import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminStats, getPendingContent, getReports, approveContent, rejectContent } from '@/utils/admin'
import { requireAdmin } from '@/utils/auth'

export async function GET(request: NextRequest) {
  try {
    await requireAdmin()

    const stats = await getAdminStats()

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Get stats error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch stats' },
      { status: 401 },
    )
  }
}
