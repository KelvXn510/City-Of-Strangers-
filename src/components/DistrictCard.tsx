'use client'

import { motion } from 'framer-motion'

interface DistrictCardProps {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  themeColor: string
  onSelect: (slug: string) => void
}

export default function DistrictCard({
  name,
  description,
  icon,
  themeColor,
  slug,
  onSelect,
}: DistrictCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(slug)}
      className="p-6 rounded-lg border border-slate-700 bg-slate-900/50 hover:bg-slate-800/50 cursor-pointer transition-colors group"
      style={{
        borderColor: `${themeColor}33`,
        background: `linear-gradient(135deg, rgba(15,17,42,0.5), rgba(15,17,42,0.3))`,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="text-4xl"
          style={{ color: themeColor }}
        >
          {icon}
        </div>
      </div>
      
      <h3 className="text-xl font-serif font-bold text-slate-100 mb-2 group-hover:text-slate-50 transition-colors">
        {name}
      </h3>
      
      <p className="text-sm text-slate-400 line-clamp-3 group-hover:text-slate-300 transition-colors">
        {description}
      </p>

      <motion.div
        className="mt-4 h-1 rounded-full"
        style={{ backgroundColor: themeColor }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}
