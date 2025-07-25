require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

// Initialize Sanity client
const client = createClient({
  projectId: '41bg4ejx',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
  apiVersion: '2024-07-25',
  useCdn: false,
})

function generateKey() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

async function fixArrayKeys() {
  try {
    console.log('Fixing missing array keys...')
    
    // Get all topicCategoryAge documents
    const relationships = await client.fetch(`
      *[_type == "topicCategoryAge"] {
        _id,
        _rev,
        ageGroups
      }
    `)
    
    console.log(`Found ${relationships.length} relationships to fix`)
    
    // Fix each relationship
    for (let i = 0; i < relationships.length; i++) {
      const relationship = relationships[i]
      
      if (relationship.ageGroups && Array.isArray(relationship.ageGroups)) {
        // Add _key to each ageGroup reference
        const fixedAgeGroups = relationship.ageGroups.map(ageGroup => ({
          ...ageGroup,
          _key: generateKey()
        }))
        
        // Update the document
        await client
          .patch(relationship._id)
          .set({ ageGroups: fixedAgeGroups })
          .commit()
        
        console.log(`Fixed relationship ${i + 1}/${relationships.length}`)
      }
    }
    
    console.log('✅ All array keys have been fixed!')
    
  } catch (error) {
    console.error('❌ Error fixing array keys:', error)
  }
}

fixArrayKeys() 