import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr'
import type { Database } from './supabase'

export const createSupabaseServerClient = () => {
  const cookieHeader = process.env.SUPABASE_COOKIE_HEADER || ''

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    {
      cookies: {
        getAll: () => parseCookieHeader(cookieHeader),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach((cookie) => {
            // Handle cookie setting in server context
          })
        },
      },
    },
  )
}
