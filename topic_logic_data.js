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
      topic: "1st Time Call (Optional): Introduction to College Coach - 30 Minutes",
      availableAges: ["8th grade", "9th grade", "10th grade", "11th grade"]
    },
    {
      topic: "Admission to the Ivies and Other Highly Selective Schools: Strategies for Success",
      availableAges: ["10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "Building a Strong College Application: Components and Deadlines",
      availableAges: ["9th grade", "10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "College Admissions 101: What You Need to Know",
      availableAges: ["6th grade", "7th grade", "8th grade", "9th grade", "10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "College Admissions Myths vs. Reality",
      availableAges: ["6th grade", "7th grade", "8th grade", "9th grade", "10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "Early Decision vs. Regular Decision: What's Right for Your Child",
      availableAges: ["9th grade", "10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "Extracurricular Activities and Leadership: How to Stand Out",
      availableAges: ["6th grade", "7th grade", "8th grade", "9th grade", "10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "How to Write a Stellar College Essay",
      availableAges: ["10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "Navigating College Interviews: Tips and Strategies",
      availableAges: ["10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "Preparing for the SAT/ACT: A Parent's Guide",
      availableAges: ["8th grade", "9th grade", "10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "Selecting the Right College: Fit vs. Prestige",
      availableAges: ["9th grade", "10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "Understanding College Rankings: What They Mean and Don't Mean",
      availableAges: ["9th grade", "10th grade", "11th grade", "12th grade"]
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
  "Education Loan Repayment": [
    {
      topic: "Managing Student Loan Debt: Strategies for Success",
      availableAges: ["11th grade", "12th grade", "Postgraduate"]
    },
    {
      topic: "Understanding Loan Forgiveness and Repayment Options",
      availableAges: ["11th grade", "12th grade", "Postgraduate"]
    }
  ],
  "Financial Wellness": [
    {
      topic: "Budgeting and Financial Planning for Families",
      availableAges: ["Prenatal", "Newborn", "Age 1", "Age 2", "Age 3", "Pre-K", "Kindergarten", "1st grade", "2nd grade", "3rd grade", "4th grade", "5th grade", "6th grade", "7th grade", "8th grade", "9th grade", "10th grade", "11th grade", "12th grade", "Postgraduate"]
    },
    {
      topic: "Teaching Financial Literacy to Children",
      availableAges: ["Age 3", "Pre-K", "Kindergarten", "1st grade", "2nd grade", "3rd grade", "4th grade", "5th grade", "6th grade", "7th grade", "8th grade", "9th grade", "10th grade", "11th grade", "12th grade"]
    }
  ],
  "Paying for College": [
    {
      topic: "Financial Aid 101: Understanding the Basics",
      availableAges: ["6th grade", "7th grade", "8th grade", "9th grade", "10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "Navigating the FAFSA: A Step-by-Step Guide",
      availableAges: ["10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "Scholarships and Grants: How to Find and Apply",
      availableAges: ["6th grade", "7th grade", "8th grade", "9th grade", "10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "Understanding College Costs: Tuition, Fees, and Living Expenses",
      availableAges: ["6th grade", "7th grade", "8th grade", "9th grade", "10th grade", "11th grade", "12th grade"]
    }
  ],
  "Saving for College": [
    {
      topic: "529 Plans and Other College Savings Strategies",
      availableAges: ["Prenatal", "Newborn", "Age 1", "Age 2", "Age 3", "Pre-K", "Kindergarten", "1st grade", "2nd grade", "3rd grade", "4th grade", "5th grade", "6th grade", "7th grade", "8th grade", "9th grade", "10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "How Much Should You Save for College?",
      availableAges: ["Prenatal", "Newborn", "Age 1", "Age 2", "Age 3", "Pre-K", "Kindergarten", "1st grade", "2nd grade", "3rd grade", "4th grade", "5th grade", "6th grade", "7th grade", "8th grade", "9th grade", "10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "Starting Early: College Savings for Young Children",
      availableAges: ["Prenatal", "Newborn", "Age 1", "Age 2", "Age 3", "Pre-K", "Kindergarten", "1st grade", "2nd grade", "3rd grade"]
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