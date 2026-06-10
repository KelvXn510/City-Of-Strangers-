'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

interface SubmissionFormProps {
  districtId: string
  districtName: string
  districtType: string
  onSuccess?: () => void
}

export default function SubmissionForm({
  districtId,
  districtName,
  districtType,
  onSuccess,
}: SubmissionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          districtId,
        }),
      })

      if (!response.ok) throw new Error('Failed to submit')

      toast.success('Submission received! Awaiting moderation.')
      setFormData({ title: '', content: '', category: '' })
      onSuccess?.()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Submission failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Title
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500"
          placeholder="Give your contribution a title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Content
        </label>
        <textarea
          required
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={8}
          className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
          placeholder="Share your story, message, or experience..."
        />
      </div>

      {districtType === 'LIBRARY_UNSENT_CONVERSATIONS' && (
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-purple-500"
          >
            <option value="">Select a category</option>
            <option value="Love">Love</option>
            <option value="Friendship">Friendship</option>
            <option value="Family">Family</option>
            <option value="Regret">Regret</option>
            <option value="Closure">Closure</option>
            <option value="Other">Other</option>
          </select>
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 text-white font-medium rounded transition-colors"
      >
        {isSubmitting ? 'Submitting...' : 'Submit to City'}
      </motion.button>

      <p className="text-xs text-slate-400 text-center">
        Your identity is protected. All submissions are reviewed by our moderation team.
      </p>
    </motion.form>
  )
}
