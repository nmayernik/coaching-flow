// Avatar colors for students - expanded color palette
export const avatarColors = [
  "bg-blue-700",     // Blue
  "bg-green-600",    // Green  
  "bg-purple-700",   // Purple
  "bg-orange-600",   // Orange
  "bg-pink-600",     // Pink
  "bg-indigo-600",   // Indigo
  "bg-red-600",      // Red
  "bg-teal-600",     // Teal
  "bg-yellow-600",   // Yellow
  "bg-cyan-600",     // Cyan
  "bg-rose-600",     // Rose
  "bg-emerald-600",  // Emerald
];

// Category descriptions (topic copy for category cards)
export const categoryDescriptions: { [key: string]: string } = {
  "Intro to College Coach": "An introduction to your benefit and how we can help your family",
  "College Admissions": "Support for college planning, selection, applications and more",
  "College Finance": "Guidance on college savings, managing tuition and maximizing aid",
  "Personal Finance": "Assistance with building smart money habits in your family",
  "Education Planning": "Advice that sets your student up for success in school and beyond",
  "Career Planning": "Help for college students on preparing for the workforce",
  // Big C Coaching (onebh) topics
  "Education for Working Learners": "Support for degree planning and balancing work and school",
  "Career / Non-Degree": "Career exploration and non-degree pathways",
  "Skills + Learning": "Skill assessments and learning pathways",
  "Financial": "Tuition, aid, and budgeting for education",
  "Executive": "Leadership and executive education",
};

// Category section descriptions
export const categorySectionDescriptions: { [key: string]: string } = {
  "Education Planning": "Education Planning topics are supported by our team of experienced educators and academic counselors.",
  "College Admissions": "College Admissions topics are fielded by our team of former admissions advisors at universities around the world.",
  "College Finance": "College Finance topics are handled by our former college finance officers who specialize in education funding.",
  "Career Planning": "Career Planning topics are guided by our network of career coaches and industry professionals.",
  "Personal Finance": "Personal Finance topics are led by our team of certified financial planners and money management experts."
};

// Function to organize topics - now uses dynamic featured topics from topicLogicData
export const organizeTopics = (topics: string[], category: string, childAge: string) => {
  // Import the helper functions from topicLogicData
  const { getFeaturedTopics } = require('@/lib/topicLogicData');
  
  const featuredTopics = getFeaturedTopics(category, childAge).map((t: { topic: string }) => t.topic);
  const featured = topics.filter(topic => featuredTopics.includes(topic));
  const regular = topics.filter(topic => !featuredTopics.includes(topic)).sort((a, b) => a.localeCompare(b));
  return { featured, regular };
};

// Function to get featured topic descriptions
export const getFeaturedTopicDescriptions = (category: string, childAge: string) => {
  const { getFeaturedTopics } = require('@/lib/topicLogicData');
  
  const featuredTopics = getFeaturedTopics(category, childAge);
  const descriptions: { [key: string]: string } = {};
  
  featuredTopics.forEach((topic: { topic: string; supportingText: string }) => {
    descriptions[topic.topic] = topic.supportingText;
  });
  
  return descriptions;
};

// Function to get avatar color for a student by index
export const getAvatarColor = (index: number) => {
  return avatarColors[index % avatarColors.length];
};

// Function to get initials from a name
export const getInitials = (name: string) => {
  return name.split(' ').map(part => part[0]).join('').toUpperCase();
};

// Time conversion utility
export const convertDisplayTimeToValue = (displayTime: string): string => {
  const timeMap: { [key: string]: string } = {
    '9:00 AM': '09:00',
    '10:00 AM': '10:00',
    '11:00 AM': '11:00',
    '12:00 PM': '12:00',
    '1:00 PM': '13:00',
    '2:00 PM': '14:00',
    '3:00 PM': '15:00',
    '4:00 PM': '16:00',
    '5:00 PM': '17:00'
  };
  return timeMap[displayTime] || displayTime;
};

// Function to convert value time back to display time
export const convertValueTimeToDisplay = (valueTime: string): string => {
  const timeMap: { [key: string]: string } = {
    '09:00': '9:00 AM',
    '10:00': '10:00 AM',
    '11:00': '11:00 AM',
    '12:00': '12:00 PM',
    '13:00': '1:00 PM',
    '14:00': '2:00 PM',
    '15:00': '3:00 PM',
    '16:00': '4:00 PM',
    '17:00': '5:00 PM'
  };
  return timeMap[valueTime] || valueTime;
};

// Function to format date for display
export const formatDateForDisplay = (dateString: string): string => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

// Short date for success screen badge (e.g. { month: "Oct", day: "1" })
export const formatShortDateForBadge = (dateString: string): { month: string; day: string } => {
  if (!dateString) return { month: '', day: '' };
  const d = new Date(dateString);
  return {
    month: d.toLocaleDateString('en-US', { month: 'short' }),
    day: d.getDate().toString(),
  };
}; 