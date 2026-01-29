"use client"

import { BookOpen, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface HandoffNavigationProps {
  className?: string
}

export function HandoffNavigation({ className = "" }: HandoffNavigationProps) {
  return (
    <Link 
      href="/handoff" 
      className={`inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors opacity-0 ${className}`}
    >
      <BookOpen className="w-4 h-4 mr-2" />
      <span className="text-sm font-medium">Design System</span>
      <ExternalLink className="w-3 h-3 ml-2" />
    </Link>
  )
} 