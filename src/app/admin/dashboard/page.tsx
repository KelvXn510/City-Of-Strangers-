'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '@/components/PageTransition'
import toast from 'react-hot-toast'

interface AdminStats {
  totalUsers: number
  totalStories: number
  totalCases: number
  totalReports: number
  activeUsers: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState('overview')

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (!response.ok) throw new Error('Failed to fetch stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to load dashboard')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-serif font-bold text-slate-100 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-slate-400 mb-8">Manage The City of Strangers</p>
          </motion.div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-slate-400">Loading dashboard...</p>
            </div>
          ) : stats ? (
            <>
              {/* Statistics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
                {[
                  { label: 'Total Users', value: stats.totalUsers },
                  { label: 'Total Stories', value: stats.totalStories },
                  { label: 'Court Cases', value: stats.totalCases },
                  { label: 'Reports', value: stats.totalReports },
                  { label: 'Active Users', value: stats.activeUsers },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-lg border border-slate-700 bg-slate-900/30"
                  >
                    <p className="text-sm text-slate-400 mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-100">{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Navigation Tabs */}
              <div className="border-b border-slate-700 mb-8">
                <div className="flex gap-8">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'moderation', label: 'Moderation Queue' },
                    { id: 'reports', label: 'Reports' },
                    { id: 'users', label: 'Users' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id)}
                      className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                        selectedTab === tab.id
                          ? 'text-purple-400 border-purple-500'
                          : 'text-slate-400 border-transparent hover:text-slate-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {selectedTab === 'overview' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="p-6 rounded-lg border border-slate-700 bg-slate-900/30">
                      <h3 className="text-lg font-serif font-bold text-slate-100 mb-4">
                        Daily Activity
                      </h3>
                      <p className="text-slate-400">
                        Activity chart will be displayed here with data from analytics.
                      </p>
                    </div>

                    <div className="p-6 rounded-lg border border-slate-700 bg-slate-900/30">
                      <h3 className="text-lg font-serif font-bold text-slate-100 mb-4">
                        Recent Actions
                      </h3>
                      <p className="text-slate-400">
                        Recent admin actions will be listed here from AdminLog.
                      </p>
                    </div>
                  </div>
                )}

                {selectedTab === 'moderation' && (
                  <div className="p-6 rounded-lg border border-slate-700 bg-slate-900/30">
                    <h3 className="text-lg font-serif font-bold text-slate-100 mb-4">
                      Pending Moderation
                    </h3>
                    <p className="text-slate-400">
                      Stories and content pending review will appear here. Click to approve or reject.
                    </p>
                  </div>
                )}

                {selectedTab === 'reports' && (
                  <div className="p-6 rounded-lg border border-slate-700 bg-slate-900/30">
                    <h3 className="text-lg font-serif font-bold text-slate-100 mb-4">
                      User Reports
                    </h3>
                    <p className="text-slate-400">
                      Reports from users about content or other users will be listed here.
                    </p>
                  </div>
                )}

                {selectedTab === 'users' && (
                  <div className="p-6 rounded-lg border border-slate-700 bg-slate-900/30">
                    <h3 className="text-lg font-serif font-bold text-slate-100 mb-4">
                      User Management
                    </h3>
                    <p className="text-slate-400">
                      Manage users, suspend, ban, or restore user accounts here.
                    </p>
                  </div>
                )}
              </motion.div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-400">Unable to load dashboard</p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
