"use client"

import { useEffect, useState } from 'react'
import { getCategories } from '@/lib/sanityClient'

export function SanityTestComponent() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories()
        setCategories(data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return <div className="p-4 border rounded">Loading Sanity data...</div>
  }

  return (
    <div className="p-4 border rounded bg-blue-50">
      <h3 className="font-bold mb-2">🎉 Live Sanity Data:</h3>
      <ul className="space-y-1">
        {categories.map((category) => (
          <li key={category._id} className="text-sm">
            <strong>{category.title}</strong>: {category.description}
          </li>
        ))}
      </ul>
      <p className="text-xs text-gray-600 mt-2">
        This data is coming live from your Sanity CMS! Try changing a category title in the Studio.
      </p>
    </div>
  )
} 