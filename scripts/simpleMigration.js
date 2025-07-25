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

async function simpleMigration() {
  try {
    console.log('Starting simple migration...')
    
    // Test with a single age group first
    console.log('Creating test age group...')
    const testAgeGroup = await client.create({
      _type: 'ageGroup',
      title: 'Test Age Group',
      slug: {
        _type: 'slug',
        current: 'test-age-group'
      },
      description: 'Test description',
      minAge: 0,
      maxAge: 1,
      order: 0,
      isActive: true
    })
    
    console.log('Successfully created test age group:', testAgeGroup._id)
    
    // If that works, let's create a real one
    console.log('Creating real age group...')
    const realAgeGroup = await client.create({
      _type: 'ageGroup',
      title: 'Prenatal',
      slug: {
        _type: 'slug',
        current: 'prenatal'
      },
      description: 'Students in Prenatal',
      minAge: 0,
      maxAge: 0,
      order: 0,
      isActive: true
    })
    
    console.log('Successfully created real age group:', realAgeGroup._id)
    
  } catch (error) {
    console.error('Migration failed:', error.message)
    console.error('Full error:', error)
  }
}

simpleMigration() 