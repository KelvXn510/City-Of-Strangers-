import { NextResponse, NextRequest } from 'next/server'
import { resetPassword } from '@/utils/auth'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const result = await resetPassword(email)

    return NextResponse.json(
      { message: 'Password reset email sent' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Reset password failed' },
      { status: 500 },
    )
  }
}
