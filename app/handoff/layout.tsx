import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Developer Handoff - Design System',
  description: 'Complete design system documentation for the College Coach application',
}

export default function HandoffLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-25">
      {children}
    </div>
  )
} 