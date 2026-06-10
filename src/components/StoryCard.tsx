'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface StoryCardProps {
  id: string
  title: string
  summary?: string
  emotionalTags: string[]
  viewCount: number
  saveCount: number
  createdAt: Date
  districtSlug: string
}

export default function StoryCard({
  id,
  title,
  summary,
  emotionalTags,
  viewCount,
  saveCount,
  createdAt,
  districtSlug,
}: StoryCardProps) {
  const date = new Date(createdAt)
  const timeAgo = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60))

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="p-4 rounded-lg border border-slate-700 bg-slate-900/30 hover:bg-slate-800/50 transition-colors group"
    >
      <h4 className="font-serif font-bold text-slate-100 mb-2 line-clamp-2 group-hover:text-slate-50">
        {title}
      </h4>

      {summary && (
        <p className="text-sm text-slate-400 line-clamp-2 mb-3">
          {summary}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mb-3">
        {emotionalTags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs bg-purple-900/30 text-purple-300 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
        <span>{timeAgo}h ago</span>
        <div className="flex gap-3">
          <span>👁 {viewCount}</span>
          <span>💾 {saveCount}</span>
        </div>
      </div>

      <Link
        href={`/district/${districtSlug}/story/${id}`}
        className="inline-block text-sm text-purple-400 hover:text-purple-300 font-medium"
      >
        Read Story →
      </Link>
    </motion.div>
  )
}
