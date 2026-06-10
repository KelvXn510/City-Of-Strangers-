'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import DistrictCard from '@/components/DistrictCard'
import PageTransition from '@/components/PageTransition'

interface District {
  id: string
  name: string
  slug: string
  description: string
  type: string
  icon: string
  themeColor: string
  order: number
}

export default function Home() {
  const router = useRouter()
  const [districts, setDistricts] = useState<District[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // For MVP, load default districts
    const defaultDistricts = [
      {
        id: '1',
        name: 'Library of Unsent Conversations',
        slug: 'library-unsent-conversations',
        description: 'A collection of messages never sent. Words left unspoken. The conversations that exist only in our hearts.',
        type: 'LIBRARY_UNSENT_CONVERSATIONS',
        icon: '📚',
        themeColor: '#8b5cf6',
        order: 1,
      },
      {
        id: '2',
        name: 'Museum of Almost',
        slug: 'museum-almost',
        description: 'Stories of the lives that almost happened. The alternate paths not taken. The "what ifs" that shaped who we became.',
        type: 'MUSEUM_ALMOST',
        icon: '⚡',
        themeColor: '#06b6d4',
        order: 2,
      },
      {
        id: '3',
        name: 'Court of Human Decisions',
        slug: 'court-decisions',
        description: 'Submit your dilemmas. Let the community weigh in. Receive an AI verdict from multiple perspectives.',
        type: 'COURT_DECISIONS',
        icon: '⚖️',
        themeColor: '#ef4444',
        order: 3,
      },
      {
        id: '4',
        name: 'Cemetery of Former Selves',
        slug: 'cemetery-former-selves',
        description: 'Bury who you used to be. Honor the versions of yourself that have passed. Digital gravestones for transformation.',
        type: 'CEMETERY_FORMER_SELVES',
        icon: '🪦',
        themeColor: '#6b7280',
        order: 4,
      },
      {
        id: '5',
        name: 'Observatory',
        slug: 'observatory',
        description: 'Write predictions about your future. Leave messages for yourself. Set reminders to see if you were right.',
        type: 'OBSERVATORY',
        icon: '🔭',
        themeColor: '#a78bfa',
        order: 5,
      },
    ]
    setDistricts(defaultDistricts)
    setIsLoading(false)
  }, [])

  const handleSelectDistrict = (slug: string) => {
    router.push(`/district/${slug}`)
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Hero Section */}
        <section className="relative px-4 py-20 md:py-32">
          <div className="mx-auto max-w-7xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-50 mb-6">
                Welcome to The City
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 mb-8 max-w-2xl mx-auto">
                A virtual city built entirely from anonymous human experiences. No followers. No likes. Just
                authentic stories.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => router.push('/explore')}
                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
              >
                Explore the City
              </button>
              <button
                onClick={() => router.push('/auth/register')}
                className="px-8 py-3 border border-purple-500 text-purple-400 hover:bg-purple-900/20 font-medium rounded-lg transition-colors"
              >
                Create an Account
              </button>
            </motion.div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </section>

        {/* Districts Map */}
        <section className="relative px-4 py-20">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-50 mb-4">
                Five Districts Await
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Each district tells a different kind of story. Explore them all.
              </p>
            </motion.div>

            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-slate-400">Loading the city...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {districts.map((district, index) => (
                  <motion.div
                    key={district.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <DistrictCard {...district} onSelect={handleSelectDistrict} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-20 border-t border-slate-800">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <div className="text-center">
                <div className="text-4xl mb-4">🔐</div>
                <h3 className="text-xl font-serif font-bold text-slate-100 mb-2">
                  Truly Anonymous
                </h3>
                <p className="text-slate-400">
                  Your identity is protected. Share freely without judgment.
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-serif font-bold text-slate-100 mb-2">
                  AI-Powered Insights
                </h3>
                <p className="text-slate-400">
                  Advanced AI analyzes emotions and provides thoughtful perspectives.
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-serif font-bold text-slate-100 mb-2">
                  No Social Metrics
                </h3>
                <p className="text-slate-400">
                  No followers, no likes, no competition. Just authentic connection.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
