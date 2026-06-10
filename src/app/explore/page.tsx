'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import DistrictCard from '@/components/DistrictCard'
import PageTransition from '@/components/PageTransition'
import { useRouter } from 'next/navigation'

const districts = [
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

export default function ExplorePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSelectDistrict = (slug: string) => {
    router.push(`/district/${slug}`)
  }

  const filteredDistricts = districts.filter(
    (district) =>
      district.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      district.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Header */}
        <section className="px-4 py-12 md:py-20">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-50 mb-4">
                Explore the City
              </h1>
              <p className="text-xl text-slate-400 mb-8">
                Five distinct neighborhoods, each telling a different kind of human story.
              </p>

              {/* Search */}
              <div className="relative mb-8 max-w-md">
                <input
                  type="text"
                  placeholder="Search districts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
                <span className="absolute right-3 top-3 text-slate-500">🔍</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Districts Grid */}
        <section className="px-4 py-12">
          <div className="mx-auto max-w-7xl">
            {filteredDistricts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDistricts.map((district, index) => (
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
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-slate-400 text-lg">
                  No districts match your search. Try searching for something else.
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Info Section */}
        <section className="px-4 py-20 border-t border-slate-800">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              <div>
                <h2 className="text-3xl font-serif font-bold text-slate-100 mb-4">
                  How It Works
                </h2>
                <ol className="space-y-4 text-slate-400">
                  <li className="flex gap-4">
                    <span className="text-2xl font-bold text-purple-500 flex-shrink-0">1</span>
                    <span>Choose a district that resonates with you</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-2xl font-bold text-purple-500 flex-shrink-0">2</span>
                    <span>Sign up or log in to contribute</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-2xl font-bold text-purple-500 flex-shrink-0">3</span>
                    <span>Share your story anonymously</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-2xl font-bold text-purple-500 flex-shrink-0">4</span>
                    <span>Our AI analyzes and validates your contribution</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-2xl font-bold text-purple-500 flex-shrink-0">5</span>
                    <span>Your story becomes part of the City</span>
                  </li>
                </ol>
              </div>

              <div>
                <h2 className="text-3xl font-serif font-bold text-slate-100 mb-4">
                  Why Anonymous?
                </h2>
                <p className="text-slate-400 mb-4">
                  Anonymity removes barriers. Without the weight of identity and social consequences, people share their truest selves.
                </p>
                <p className="text-slate-400">
                  In The City of Strangers, you're free to be vulnerable, honest, and completely yourself. Your identity is protected. Your story is sacred.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
