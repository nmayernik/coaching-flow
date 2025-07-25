// Topic Logic Data Structure for Coaching Reservation Flow
// Generated from updated-topics-7-25.csv

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

// Topics organized by category with available age groups and supporting text
export const TOPICS_BY_CATEGORY = {
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
      availableAges: ["12th grade", "Postgraduate"]
    },
    {
      topic: "The High School Plan",
      supportingText: "Choosing high school courses and planning extracurricular activities",
      availableAges: ["8th grade", "9th grade", "10th grade", "11th grade"]
    }
  ],
  "Career Planning": [
    {
      topic: "Building a Resume: Applying for and Gaining Experience in College",
      availableAges: ["Postgraduate"]
    },
    {
      topic: "College to Career: Networking and the Job Search",
      availableAges: ["Postgraduate"]
    },
    {
      topic: "Exploring Careers in College: Finding the Right Fit",
      availableAges: ["12th grade", "Postgraduate"]
    }
  ],
  "Personal Finance": [
    {
      topic: "Building Financial Independence: Money Skills for Teens and Young Adults",
      availableAges: ["10th grade", "11th grade", "12th grade", "Postgraduate"]
    },
    {
      topic: "Money Management for Young Professionals",
      availableAges: ["Postgraduate"]
    },
    {
      topic: "Raising Money-Smart Kids",
      availableAges: ["Prenatal", "Newborn", "Age 1", "Age 2", "Age 3", "Pre-K", "Kindergarten", "1st grade", "2nd grade", "3rd grade", "4th grade", "5th grade", "6th grade", "7th grade", "8th grade"]
    }
  ],
  "College Finance": [
    {
      topic: "Saving for College",
      supportingText: "Learn smart strategies to save money and plan financially for your child's education. It's never too soon!",
      availableAges: ["Prenatal", "Newborn", "Age 1", "Age 2", "Age 3", "Pre-K", "Kindergarten", "1st grade", "2nd grade", "3rd grade", "4th grade", "5th grade", "6th grade", "7th grade", "8th grade", "9th grade", "10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "Balancing Act: How to Save for College and Retirement While Repaying Student Loans",
      availableAges: ["Prenatal", "Newborn", "Age 1", "Age 2", "Age 3", "Pre-K", "Kindergarten", "1st grade", "2nd grade", "3rd grade", "4th grade", "5th grade", "6th grade", "7th grade", "8th grade", "9th grade", "10th grade", "11th grade", "12th grade", "Postgraduate"]
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
      availableAges: ["6th grade", "7th grade", "8th grade", "9th grade", "10th grade", "11th grade", "12th grade"]
    },
    {
      topic: "Maximizing Education Tax Breaks to Reduce College Costs",
      availableAges: ["12th grade", "Postgraduate"]
    },
    {
      topic: "Navigating the FAFSA and Other Financial Aid Applications",
      availableAges: ["11th grade", "12th grade", "Postgraduate"]
    },
    {
      topic: "Paying for College",
      supportingText: "Navigating financial aid, scholarship and payment strategies to make college work for your budget",
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

// Category descriptions for featured display
export const CATEGORY_DESCRIPTIONS = {
  "College Admissions": "Advice for college selection, applications and more",
  "College Finance": "Advice on saving/paying for college, managing costs and aid",
  "Personal Finance": "Advice on building and maintaining smart money habits",
  "Education Planning": "Setting your student up for success in education and beyond",
  "Career Planning": "Advice on navigating the transition to the workplace"
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

// Helper function to get supporting text for a topic
export function getTopicSupportingText(category, topic) {
  if (!TOPICS_BY_CATEGORY[category]) {
    return null;
  }
  
  const topicObj = TOPICS_BY_CATEGORY[category].find(t => t.topic === topic);
  return topicObj ? topicObj.supportingText : null;
}

// Helper function to get featured topics (topics with supporting text)
export function getFeaturedTopics(category, childAge) {
  if (!TOPICS_BY_CATEGORY[category]) {
    return [];
  }
  
  return TOPICS_BY_CATEGORY[category]
    .filter(topicObj => 
      topicObj.availableAges.includes(childAge) && topicObj.supportingText
    )
    .map(topicObj => ({
      topic: topicObj.topic,
      supportingText: topicObj.supportingText
    }));
} 