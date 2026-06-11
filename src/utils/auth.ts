import { createSupabaseServerClient } from '../lib/supabase-server'
import { prisma } from '../lib/prisma'

export async function getCurrentUser() {
  const supabase = createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function getCurrentUserFromDb() {
  const user = await getCurrentUser()
  if (!user) return null

  return prisma.user.findUnique({
    where: { id: user.id },
  })
}

export async function isUserAdmin(): Promise<boolean> {
  const user = await getCurrentUserFromDb()
  return user?.role === 'ADMIN'
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}

export async function requireAdmin() {
  const isAdmin = await isUserAdmin()
  if (!isAdmin) {
    throw new Error('Admin access required')
  }
  const user = await getCurrentUser()
  return user!
}

export async function signUp(email: string, password: string) {
  const supabase = createSupabaseServerClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) throw error

  // Create user in database
  if (data.user) {
    await prisma.user.create({
      data: {
        id: data.user.id,
        email: data.user.email || '',
        hashedPassword: '', // Password is managed by Supabase
        role: 'USER',
      },
    })
  }

  return data
}

export async function signIn(email: string, password: string) {
  const supabase = createSupabaseServerClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error

  // Update last login
  if (data.user) {
    await prisma.user.update({
      where: { id: data.user.id },
      data: { lastLoginAt: new Date() },
    })
  }

  return data
}

export async function signOut() {
  const supabase = createSupabaseServerClient()
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function resetPassword(email: string) {
  const supabase = createSupabaseServerClient()
  const { data, error } = await supabase.auth.resetPasswordForEmail(email)
  if (error) throw error
  return data
}

export async function updatePassword(newPassword: string) {
  const supabase = createSupabaseServerClient()
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  })
  if (error) throw error
  return data
}
