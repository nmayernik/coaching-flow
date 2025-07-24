'use client'

import { useEffect } from 'react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

export default function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only run in development mode
    if (process.env.NODE_ENV === 'development') {
      import('@axe-core/react').then((axe) => {
        axe.default(React, ReactDOM, 1000)
      }).catch((error) => {
        console.log('Axe accessibility setup failed:', error)
      })
    }
  }, [])

  return <>{children}</>
} 