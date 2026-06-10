'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import PageTransition from '@/components/PageTransition'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Login failed')

      toast.success('Welcome back to the City!')
      router.push('/')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-8">
            <h1 className="text-3xl font-serif font-bold text-slate-100 mb-2 text-center">
              Return to the City
            </h1>
            <p className="text-slate-400 text-center mb-8">
              Sign in to your account to continue
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  placeholder="••••••••"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 text-white font-medium rounded transition-colors"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </motion.button>
            </form>

            <p className="text-center text-sm text-slate-400 mt-6">
              New to the City?{' '}
              <a href="/auth/register" className="text-purple-400 hover:text-purple-300 font-medium">
                Create an account
              </a>
            </p>

            <p className="text-center text-sm text-slate-400 mt-4">
              <a href="/auth/reset-password" className="text-slate-500 hover:text-slate-400">
                Forgot your password?
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  )
}
