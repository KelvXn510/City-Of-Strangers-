import { NextResponse, NextRequest } from 'next/server'
import { signUp } from '@/utils/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const result = await signUp(email, password)

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error('Sign up error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Sign up failed' },
      { status: 500 },
    )
  }
}
