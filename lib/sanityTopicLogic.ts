import { 
  getCategories, 
  getAgeGroups, 
  getTopicsForCategoryAndAge, 
  getFeaturedTopics 
} from './sanityClient'

// New async functions that use Sanity data
export async function getAvailableCategories(childAge: string) {
  const categories = await getCategories()
  const ageGroups = await getAgeGroups()
  
  // Find the age group that matches the child age
  const targetAgeGroup = ageGroups.find(ag => ag.title === childAge)
  if (!targetAgeGroup) return []
  
  // Filter categories that have topics for this age group
  const availableCategories = []
  for (const category of categories) {
    const topics = await getTopicsForCategoryAndAge(category.slug.current, childAge)
    if (topics.length > 0) {
      availableCategories.push(category.title)
    }
  }
  
  return availableCategories
}

export async function getAvailableTopics(category: string, childAge: string) {
  const categories = await getCategories()
  const targetCategory = categories.find(c => c.title === category)
  if (!targetCategory) return []
  
  const topics = await getTopicsForCategoryAndAge(targetCategory.slug.current, childAge)
  return topics.map(t => t.topic.title)
}

export async function getFeaturedTopicsForCategory(category: string, childAge: string) {
  const categories = await getCategories()
  const targetCategory = categories.find(c => c.title === category)
  if (!targetCategory) return []
  
  const featuredTopics = await getFeaturedTopics(targetCategory.slug.current, childAge)
  return featuredTopics.map(t => ({
    topic: t.topic.title,
    supportingText: t.topic.supportingText
  }))
}

export async function getAllCategories() {
  const categories = await getCategories()
  return categories.map(c => c.title)
}

export async function getAllTopicsInCategory(category: string) {
  const categories = await getCategories()
  const targetCategory = categories.find(c => c.title === category)
  if (!targetCategory) return []
  
  // Get all age groups to find all topics in this category
  const ageGroups = await getAgeGroups()
  const allTopics = new Set()
  
  for (const ageGroup of ageGroups) {
    const topics = await getTopicsForCategoryAndAge(targetCategory.slug.current, ageGroup.title)
    topics.forEach(t => allTopics.add(t.topic.title))
  }
  
  return Array.from(allTopics)
}

// Helper function to check if a category is available for a specific age
export async function isCategoryAvailable(category: string, childAge: string) {
  const availableCategories = await getAvailableCategories(childAge)
  return availableCategories.includes(category)
}

// Helper function to check if a topic is available for a specific age
export async function isTopicAvailable(category: string, topic: string, childAge: string) {
  const availableTopics = await getAvailableTopics(category, childAge)
  return availableTopics.includes(topic)
}

// Helper function to get supporting text for a topic
export async function getTopicSupportingText(category: string, topic: string) {
  const categories = await getCategories()
  const targetCategory = categories.find(c => c.title === category)
  if (!targetCategory) return null
  
  const ageGroups = await getAgeGroups()
  
  for (const ageGroup of ageGroups) {
    const topics = await getTopicsForCategoryAndAge(targetCategory.slug.current, ageGroup.title)
    const targetTopic = topics.find(t => t.topic.title === topic)
    if (targetTopic) {
      return targetTopic.topic.supportingText
    }
  }
  
  return null
} 