// Topic Logic Data Structure for Coaching Reservation Flow
// Generated from topiclogic.xlsx

// All available age groups
export const AGE_GROUPS = [
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

// Topics organized by category with available age groups
export const TOPICS_BY_CATEGORY = {
  "Academic Foundations": [
    {
      topic: "Mastering Middle School",
      availableAges: ["4th grade", "5th grade", "6th grade", "7th grade", "8th grade"]
    },
    {
      topic: "The Elementary School Experience",
      availableAges: ["Kindergarten", "1st grade", "2nd grade", "3rd grade", "4th grade", "5th grade"]
    }
  ],
  "College Admissions": [
    {
      topic: "Admission to the Ivies and Other Highly Selective Schools: Strategies for Success",
      availableAges: ["10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "Admissions Basics",
      availableAges: ["6th grade", "7th grade", "8th grade", "9th grade", "10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "College Selection for Students with Learning and Other Disabilities",
      availableAges: ["9th grade", "10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "Navigating the UC Application",
      availableAges: ["10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "Preparing College Applications",
      availableAges: ["9th grade", "10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "Selecting Best Fit Colleges",
      availableAges: ["9th grade", "10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "The College Transfer Process",
      availableAges: ["11th grade", "12th grade", "Postgraduate"]
    },
    {
      topic: "The Common Application: What You Need to Know",
      availableAges: ["10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "Writing Your Best College Essay",
      availableAges: ["10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "Senior Summer: Navigating the College Transition",
      availableAges: ["12th grade"]
    },
    {
      topic: "The High School Plan",
      availableAges: ["8th grade", "9th grade", "10th grade", "11th grade"]
    },
    {
      topic: "Alternatives to a 4-Year Degree",
      availableAges: ["10th grade", "11th grade", "12th grade"]
    }
  ],
  "College to Career": [
    {
      topic: "Career Exploration and Planning for College Students",
      availableAges: ["9th grade", "10th grade", "11th grade", "12th grade", "Postgraduate"]
    },
    {
      topic: "Internships and Job Search Strategies",
      availableAges: ["10th grade", "11th grade", "12th grade", "Postgraduate"]
    },
    {
      topic: "Making the Most of College: Academic and Social Success",
      availableAges: ["11th grade", "12th grade", "Postgraduate"]
    },
    {
      topic: "Networking and Professional Development",
      availableAges: ["10th grade", "11th grade", "12th grade", "Postgraduate"]
    },
    {
      topic: "Transitioning from College to Career",
      availableAges: ["11th grade", "12th grade", "Postgraduate"]
    }
  ],

  "Personal Finance": [
    {
      topic: "Budgeting and Financial Planning for Families",
      availableAges: ["Prenatal", "Newborn", "Age 1", "Age 2", "Age 3", "Pre-K", "Kindergarten", "1st grade", "2nd grade", "3rd grade", "4th grade", "5th grade", "6th grade", "7th grade", "8th grade", "9th grade", "10th grade", "11th grade", "12th grade", "Postgraduate"]
    },
    {
      topic: "Teaching Financial Literacy to Children",
      availableAges: ["Age 3", "Pre-K", "Kindergarten", "1st grade", "2nd grade", "3rd grade", "4th grade", "5th grade", "6th grade", "7th grade", "8th grade", "9th grade", "10th grade", "11th grade", "12th grade"]
    }
  ],
  "College Finance": [
    {
      topic: "Saving for College",
      availableAges: ["Newborn", "Age 1", "Age 2", "Age 3", "Pre-K", "Kindergarten", "1st grade", "2nd grade", "3rd grade", "4th grade", "5th grade", "6th grade", "7th grade", "8th grade"]
    },
    {
      topic: "Paying the Tuition Bill: Use Cash Flow, Savings, and Loans Strategically",
      availableAges: ["11th grade", "12th grade", "Postgraduate"]
    },
    {
      topic: "Education Loan Repayment Strategies",
      availableAges: ["Postgraduate"]
    },
    {
      topic: "Financial Aid Advice that's Too Good to Be True",
      availableAges: ["Newborn", "Age 1", "Age 2", "Age 3", "Pre-K", "Kindergarten", "1st grade", "2nd grade", "3rd grade", "4th grade", "5th grade", "6th grade", "7th grade", "8th grade", "9th grade", "10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "Maximizing Education Tax Breaks to Reduce College Costs",
      availableAges: ["12th grade", "Postgraduate"]
    },
    {
      topic: "Navigating the FAFSA and Other Financial Aid Applications",
      availableAges: ["12th grade", "Postgraduate"]
    },
    {
      topic: "Paying for College",
      availableAges: ["9th grade", "10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "Successful Scholarship Strategies",
      availableAges: ["9th grade", "10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "Understanding and Negotiating Your Financial Aid and Scholarship Offers",
      availableAges: ["11th grade", "12th grade"]
    }
  ]
};

// Helper function to get available categories for a specific age
export function getAvailableCategories(childAge) {
  const availableCategories = [];
  
  Object.keys(TOPICS_BY_CATEGORY).forEach(category => {
    const hasAvailableTopics = TOPICS_BY_CATEGORY[category].some(topicObj => 
      topicObj.availableAges.includes(childAge)
    );
    
    if (hasAvailableTopics) {
      availableCategories.push(category);
    }
  });
  
  return availableCategories;
}

// Helper function to get available topics for a specific category and age
export function getAvailableTopics(category, childAge) {
  if (!TOPICS_BY_CATEGORY[category]) {
    return [];
  }
  
  return TOPICS_BY_CATEGORY[category]
    .filter(topicObj => topicObj.availableAges.includes(childAge))
    .map(topicObj => topicObj.topic);
}

// Helper function to check if a category is available for a specific age
export function isCategoryAvailable(category, childAge) {
  if (!TOPICS_BY_CATEGORY[category]) {
    return false;
  }
  
  return TOPICS_BY_CATEGORY[category].some(topicObj => 
    topicObj.availableAges.includes(childAge)
  );
}

// Helper function to check if a topic is available for a specific age
export function isTopicAvailable(category, topic, childAge) {
  if (!TOPICS_BY_CATEGORY[category]) {
    return false;
  }
  
  const topicObj = TOPICS_BY_CATEGORY[category].find(t => t.topic === topic);
  return topicObj ? topicObj.availableAges.includes(childAge) : false;
}

// Helper function to get all categories
export function getAllCategories() {
  return Object.keys(TOPICS_BY_CATEGORY);
}

// Helper function to get all topics for a category (regardless of age)
export function getAllTopicsInCategory(category) {
  if (!TOPICS_BY_CATEGORY[category]) {
    return [];
  }
  
  return TOPICS_BY_CATEGORY[category].map(topicObj => topicObj.topic);
} 