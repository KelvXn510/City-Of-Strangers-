'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-slate-100 mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-slate-200">
                  Our Mission
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-slate-200">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-100 mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-slate-200">
                  Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-slate-200">
                  Report Content
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-100 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-slate-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-slate-200">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-100 mb-4">Contact</h3>
            <p className="text-sm text-slate-400">hello@cityofstrangers.com</p>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-500">
          <p>&copy; 2024 The City of Strangers. All memories are sacred.</p>
        </div>
      </div>
    </footer>
  )
}
