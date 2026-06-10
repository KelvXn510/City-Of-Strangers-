import { NextResponse, NextRequest } from 'next/server'
import { signIn } from '@/utils/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const result = await signIn(email, password)

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error('Sign in error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Sign in failed' },
      { status: 401 },
    )
  }
}
