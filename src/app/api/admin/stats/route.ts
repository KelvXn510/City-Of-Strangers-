import { NextResponse, NextRequest } from 'next/server'
import { getAdminStats } from '@/utils/admin'
import { requireAdmin } from '@/utils/auth'

export async function GET(_request: NextRequest) {
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
