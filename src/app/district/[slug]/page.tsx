'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SubmissionForm from '@/components/SubmissionForm'
import PageTransition from '@/components/PageTransition'

interface DistrictPageProps {
  params: {
    slug: string
  }
}

export default function DistrictPage({ params }: DistrictPageProps) {
  const [showSubmissionForm, setShowSubmissionForm] = useState(false)

  const districtMap: Record<string, any> = {
    'library-unsent-conversations': {
      id: '1',
      name: 'Library of Unsent Conversations',
      icon: '📚',
      color: '#8b5cf6',
      description: 'A collection of messages never sent. Words left unspoken.',
      type: 'LIBRARY_UNSENT_CONVERSATIONS',
    },
    'museum-almost': {
      id: '2',
      name: 'Museum of Almost',
      icon: '⚡',
      color: '#06b6d4',
      description: 'Stories of the lives that almost happened.',
      type: 'MUSEUM_ALMOST',
    },
    'court-decisions': {
      id: '3',
      name: 'Court of Human Decisions',
      icon: '⚖️',
      color: '#ef4444',
      description: 'Submit your dilemmas. Let the community weigh in.',
      type: 'COURT_DECISIONS',
    },
    'cemetery-former-selves': {
      id: '4',
      name: 'Cemetery of Former Selves',
      icon: '🪦',
      color: '#6b7280',
      description: 'Bury who you used to be. Honor the versions of yourself that have passed.',
      type: 'CEMETERY_FORMER_SELVES',
    },
    'observatory': {
      id: '5',
      name: 'Observatory',
      icon: '🔭',
      color: '#a78bfa',
      description: 'Write predictions about your future.',
      type: 'OBSERVATORY',
    },
  }

  const district = districtMap[params.slug]

  if (!district) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h1 className="text-4xl font-serif font-bold text-slate-100">District not found</h1>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Header */}
        <section className="relative px-4 py-16 overflow-hidden">
          <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 50%, ${district.color}15, transparent)` }} />
          
          <div className="relative mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-6xl mb-4">{district.icon}</div>
              <h1 className="text-5xl font-serif font-bold text-slate-50 mb-4">
                {district.name}
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl mb-8">
                {district.description}
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowSubmissionForm(!showSubmissionForm)}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
              >
                {showSubmissionForm ? 'Cancel' : '+ Add to City'}
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Submission Form */}
        {showSubmissionForm && (
          <section className="px-4 py-12 border-t border-slate-800">
            <div className="mx-auto max-w-2xl">
              <SubmissionForm
                districtId={district.id}
                districtName={district.name}
                districtType={district.type}
                onSuccess={() => setShowSubmissionForm(false)}
              />
            </div>
          </section>
        )}

        {/* Stories/Content Section */}
        <section className="px-4 py-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-serif font-bold text-slate-100 mb-8">
              Stories from {district.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-lg border border-slate-700 bg-slate-900/30 hover:bg-slate-800/50 transition-colors"
                >
                  <h3 className="text-lg font-serif font-bold text-slate-100 mb-3">
                    Story Title {index}
                  </h3>
                  <p className="text-slate-400 mb-4">
                    This is where stories would appear. Content is moderated before appearing in the city.
                  </p>
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>👁 142</span>
                    <span>💾 23</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-center mt-12 p-8 rounded-lg border border-slate-700 bg-slate-900/20"
            >
              <p className="text-slate-400 mb-4">
                This is a preview of the district experience. Stories appear here once created and approved.
              </p>
              <a href="/auth/register" className="text-purple-400 hover:text-purple-300 font-medium">
                Create an account to start contributing →
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
