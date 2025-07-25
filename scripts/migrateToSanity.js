require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

// Import the data directly since we can't use ES modules in Node.js script
const AGE_GROUPS = [
  'Prenatal',
  'Newborn', 
  'Age 1',
  'Age 2',
  'Age 3',
  'Pre-K',
  'Kindergarten',
  '1st grade',
  '2nd grade',
  '3rd grade',
  '4th grade',
  '5th grade',
  '6th grade',
  '7th grade',
  '8th grade',
  '9th grade',
  '10th grade',
  '11th grade',
  '12th grade',
  'Postgraduate'
];

const CATEGORY_DESCRIPTIONS = {
  "College Admissions": "Advice for college selection, applications and more",
  "College Finance": "Advice on saving/paying for college, managing costs and aid",
  "Personal Finance": "Advice on building and maintaining smart money habits",
  "Education Planning": "Setting your student up for success in education and beyond",
  "Career Planning": "Advice on navigating the transition to the workplace"
};

const TOPICS_BY_CATEGORY = {
  "Education Planning": [
    {
      topic: "Navigating Middle School",
      availableAges: ["4th grade", "5th grade", "6th grade", "7th grade", "8th grade"]
    },
    {
      topic: "The Elementary School Experience",
      availableAges: ["Kindergarten", "1st grade", "2nd grade", "3rd grade", "4th grade", "5th grade"]
    },
    {
      topic: "Associate to Bachelor's: Starting a College Career At a Two-Year School/Community College",
      availableAges: ["11th grade", "12th grade"]
    },
    {
      topic: "Understanding the College Major: From Undecided to Employed",
      availableAges: ["10th grade", "11th grade", "12th grade", "Postgraduate"]
    },
    {
      topic: "The High School Plan",
      availableAges: ["8th grade", "9th grade", "10th grade", "11th grade"]
    },
    {
      topic: "Alternatives to a 4-Year Degree",
      availableAges: ["9th grade", "10th grade", "11th grade", "12th grade"]
    }
  ],
  "College Admissions": [
    {
      topic: "Admission to the Ivies and Other Highly Selective Schools: Strategies for Success",
      availableAges: ["9th grade", "10th grade", "11th grade"]
    },
    {
      topic: "Admissions Basics",
      availableAges: ["9th grade", "10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "Alternatives to a 4-Year Degree",
      availableAges: ["9th grade", "10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "College Selection for Students with Learning and Other Disabilities",
      availableAges: ["10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "Navigating the UC Application",
      availableAges: ["11th grade", "12th grade"]
    },
    {
      topic: "Preparing College Applications",
      supportingText: "Get expert guidance on crafting compelling college applications that stand out to admissions committees",
      availableAges: ["12th grade"]
    },
    {
      topic: "Selecting Best Fit Colleges",
      supportingText: "Find the perfect college matches based on your academic profile, interests and career goals",
      availableAges: ["11th grade", "12th grade"]
    },
    {
      topic: "The College Transfer Process",
      availableAges: ["Postgraduate"]
    },
    {
      topic: "The Common Application: What You Need to Know",
      availableAges: ["11th grade", "12th grade"]
    },
    {
      topic: "Writing Your Best College Essay",
      availableAges: ["12th grade"]
    },
    {
      topic: "Senior Summer: Navigating the College Transition",
      availableAges: ["12th grade"]
    }
  ],
  "College Finance": [
    {
      topic: "College Savings Strategies",
      availableAges: ["Prenatal", "Newborn", "Age 1", "Age 2", "Age 3", "Pre-K", "Kindergarten", "1st grade", "2nd grade", "3rd grade", "4th grade", "5th grade", "6th grade", "7th grade", "8th grade", "9th grade", "10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "Financial Aid and Scholarships",
      availableAges: ["9th grade", "10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "Student Loan Management",
      availableAges: ["11th grade", "12th grade", "Postgraduate"]
    }
  ],
  "Career Planning": [
    {
      topic: "Career Exploration and Planning",
      availableAges: ["9th grade", "10th grade", "11th grade", "12th grade", "Postgraduate"]
    },
    {
      topic: "Internship and Job Search Strategies",
      availableAges: ["11th grade", "12th grade", "Postgraduate"]
    },
    {
      topic: "Resume Building and Interview Preparation",
      availableAges: ["11th grade", "12th grade", "Postgraduate"]
    }
  ],
  "Personal Finance": [
    {
      topic: "Budgeting and Money Management",
      availableAges: ["9th grade", "10th grade", "11th grade", "12th grade", "Postgraduate"]
    },
    {
      topic: "Credit and Debt Management",
      availableAges: ["11th grade", "12th grade", "Postgraduate"]
    },
    {
      topic: "Investing Basics",
      availableAges: ["11th grade", "12th grade", "Postgraduate"]
    }
  ]
};

// Initialize Sanity client
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || '41bg4ejx',
  dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_TOKEN, // You'll need a write token
  apiVersion: '2024-07-25',
  useCdn: false,
})

async function migrateData() {
  try {
    console.log('Starting data migration to Sanity...')

    // 1. Create Age Groups
    console.log('Creating age groups...')
    const ageGroupDocs = AGE_GROUPS.map((age, index) => ({
      _type: 'ageGroup',
      title: age,
      slug: {
        _type: 'slug',
        current: age.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      },
      description: `Students in ${age}`,
      minAge: index === 0 ? 0 : index - 1, // Approximate ages
      maxAge: index === AGE_GROUPS.length - 1 ? null : index,
      order: index,
      isActive: true
    }))

    const ageGroupIds = {}
    for (const ageGroup of ageGroupDocs) {
      const result = await client.create(ageGroup)
      ageGroupIds[ageGroup.title] = result._id
      console.log(`Created age group: ${ageGroup.title}`)
    }

    // 2. Create Categories
    console.log('Creating categories...')
    const categoryDocs = Object.keys(TOPICS_BY_CATEGORY).map((category, index) => ({
      _type: 'category',
      title: category,
      slug: {
        _type: 'slug',
        current: category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      },
      description: CATEGORY_DESCRIPTIONS[category] || `Topics related to ${category}`,
      sectionDescription: `Our expert coaches specialize in ${category.toLowerCase()} to provide you with the most relevant guidance.`,
      order: index,
      isActive: true
    }))

    const categoryIds = {}
    for (const category of categoryDocs) {
      const result = await client.create(category)
      categoryIds[category.title] = result._id
      console.log(`Created category: ${category.title}`)
    }

    // 3. Create Topics
    console.log('Creating topics...')
    const allTopics = new Set()
    Object.values(TOPICS_BY_CATEGORY).forEach(categoryTopics => {
      categoryTopics.forEach(topic => {
        allTopics.add(topic.topic)
      })
    })

    const topicDocs = Array.from(allTopics).map((topicTitle, index) => ({
      _type: 'topic',
      title: topicTitle,
      slug: {
        _type: 'slug',
        current: topicTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').substring(0, 96)
      },
      supportingText: '', // Will be populated from relationships
      detailedDescription: `Comprehensive guidance on ${topicTitle.toLowerCase()}`,
      isFeatured: false, // Will be determined by presence of supporting text
      order: index,
      isActive: true,
      tags: []
    }))

    const topicIds = {}
    for (const topic of topicDocs) {
      const result = await client.create(topic)
      topicIds[topic.title] = result._id
      console.log(`Created topic: ${topic.title}`)
    }

    // 4. Create Topic-Category-Age Relationships
    console.log('Creating topic-category-age relationships...')
    let relationshipCount = 0
    for (const [categoryName, topics] of Object.entries(TOPICS_BY_CATEGORY)) {
      for (const topic of topics) {
        const ageGroupRefs = topic.availableAges.map(age => ({
          _type: 'reference',
          _ref: ageGroupIds[age]
        }))

        const relationship = {
          _type: 'topicCategoryAge',
          topic: {
            _type: 'reference',
            _ref: topicIds[topic.topic]
          },
          category: {
            _type: 'reference',
            _ref: categoryIds[categoryName]
          },
          ageGroups: ageGroupRefs,
          isActive: true,
          order: relationshipCount,
          notes: topic.supportingText ? `Has supporting text: ${topic.supportingText}` : ''
        }

        await client.create(relationship)
        relationshipCount++
        console.log(`Created relationship: ${topic.topic} in ${categoryName}`)
      }
    }

    console.log(`Migration completed! Created ${Object.keys(ageGroupIds).length} age groups, ${Object.keys(categoryIds).length} categories, ${Object.keys(topicIds).length} topics, and ${relationshipCount} relationships.`)

  } catch (error) {
    console.error('Migration failed:', error)
  }
}

// Run migration if this script is executed directly
if (require.main === module) {
  migrateData()
}

module.exports = { migrateData } 