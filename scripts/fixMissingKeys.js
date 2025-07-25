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

async function fixMissingKeys() {
  try {
    console.log('Fixing missing keys...')
    
    // Get all documents that might have missing keys
    const allDocuments = await client.fetch(`
      *[_type in ["ageGroup", "category", "topic", "topicCategoryAge"]] {
        _id,
        _type,
        _rev
      }
    `)
    
    console.log(`Found ${allDocuments.length} documents to check`)
    
    // Add _key to each document
    const patches = allDocuments.map(doc => ({
      id: doc._id,
      patch: {
        set: {
          _key: generateKey()
        },
        ifRevisionID: doc._rev
      }
    }))
    
    // Apply patches in batches
    const batchSize = 10
    for (let i = 0; i < patches.length; i += batchSize) {
      const batch = patches.slice(i, i + batchSize)
      
      const transaction = client.transaction()
      batch.forEach(({ id, patch }) => {
        transaction.patch(id, patch)
      })
      
      await transaction.commit()
      console.log(`Fixed keys for batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(patches.length / batchSize)}`)
    }
    
    console.log('✅ All missing keys have been fixed!')
    
  } catch (error) {
    console.error('❌ Error fixing keys:', error)
  }
}

fixMissingKeys() 