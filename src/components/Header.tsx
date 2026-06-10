'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link href="/" className="text-2xl font-serif font-bold text-slate-100">
            The City of Strangers
          </Link>
          <p className="text-xs text-slate-400">A virtual city of anonymous stories</p>
        </motion.div>
        
        <nav className="flex items-center gap-6">
          <Link
            href="/explore"
            className="text-slate-300 hover:text-slate-100 transition-colors"
          >
            Explore
          </Link>
          <Link
            href="/submit"
            className="text-slate-300 hover:text-slate-100 transition-colors"
          >
            Submit
          </Link>
          <Link
            href="/auth/login"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors"
          >
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  )
}
