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

// Category descriptions from CSV
export const categoryDescriptions: { [key: string]: string } = {
  "Intro to College Coach": "Learn how we can support you and discuss your goals",
  "Education Planning": "Setting your student up for success in education and beyond",
  "College Admissions": "Advice for college selection, applications and more",
  "College Finance": "Advice on saving/paying for college, managing costs and aid",
  "Career Planning": "Advice on navigating the transition to the workplace",
  "Personal Finance": "Advice on building and maintaining smart money habits"
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
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}; 