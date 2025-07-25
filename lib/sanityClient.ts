import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '41bg4ejx',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-07-25', // Use today's date or your preferred version
  useCdn: false, // Set to false for fresh data in development
})

// Helper function to get all categories
export async function getCategories() {
  return await client.fetch(`
    *[_type == "category" && isActive == true] | order(order asc) {
      _id,
      title,
      slug,
      description,
      sectionDescription,
      icon,
      order
    }
  `)
}

// Helper function to get all age groups
export async function getAgeGroups() {
  return await client.fetch(`
    *[_type == "ageGroup" && isActive == true] | order(order asc) {
      _id,
      title,
      slug,
      description,
      minAge,
      maxAge,
      order
    }
  `)
}

// Helper function to get topics for a specific category and age group
export async function getTopicsForCategoryAndAge(categorySlug: string, ageGroupTitle: string) {
  return await client.fetch(`
    *[_type == "topicCategoryAge" && isActive == true && 
      category->slug.current == $categorySlug && 
      references(*[_type == "ageGroup" && title == $ageGroupTitle]._id) in ageGroups[]._ref] | order(order asc) {
      topic->{
        _id,
        title,
        slug,
        supportingText,
        detailedDescription,
        isFeatured,
        order,
        tags
      },
      order
    }
  `, { categorySlug, ageGroupTitle })
}

// Helper function to get all topics
export async function getAllTopics() {
  return await client.fetch(`
    *[_type == "topic" && isActive == true] | order(order asc) {
      _id,
      title,
      slug,
      supportingText,
      detailedDescription,
      isFeatured,
      order,
      tags
    }
  `)
}

// Helper function to get featured topics for a category and age
export async function getFeaturedTopics(categorySlug: string, ageGroupTitle: string) {
  return await client.fetch(`
    *[_type == "topicCategoryAge" && isActive == true && 
      category->slug.current == $categorySlug && 
      references(*[_type == "ageGroup" && title == $ageGroupTitle]._id) in ageGroups[]._ref &&
      topic->isFeatured == true] | order(order asc) {
      topic->{
        _id,
        title,
        supportingText
      }
    }
  `, { categorySlug, ageGroupTitle })
} 