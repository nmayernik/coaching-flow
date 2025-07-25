import { 
  getCategories, 
  getAgeGroups, 
  getTopicsForCategoryAndAge, 
  getFeaturedTopics 
} from '@/lib/sanityClient'

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

// Cache for category descriptions
let categoryDescriptionsCache: { [key: string]: string } | null = null;

// Cache for category section descriptions
let categorySectionDescriptionsCache: { [key: string]: string } | null = null;

// Function to get category descriptions from Sanity
export const getCategoryDescriptions = async () => {
  if (categoryDescriptionsCache) return categoryDescriptionsCache;
  
  const categories = await getCategories();
  const descriptions: { [key: string]: string } = {};
  
  categories.forEach((category: any) => {
    descriptions[category.title] = category.description || '';
  });
  
  categoryDescriptionsCache = descriptions;
  return descriptions;
};

// Function to get category section descriptions from Sanity
export const getCategorySectionDescriptions = async () => {
  if (categorySectionDescriptionsCache) return categorySectionDescriptionsCache;
  
  const categories = await getCategories();
  const descriptions: { [key: string]: string } = {};
  
  categories.forEach((category: any) => {
    descriptions[category.title] = category.sectionDescription || "Our expert coaches specialize in this area to provide you with the most relevant guidance.";
  });
  
  categorySectionDescriptionsCache = descriptions;
  return descriptions;
};

// Function to organize topics - now uses dynamic featured topics from Sanity
export const organizeTopics = async (topics: string[], category: string, childAge: string) => {
  const featuredTopicsData = await getFeaturedTopics(category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''), childAge);
  const featuredTopics = featuredTopicsData.map((t: any) => t.topic.title);
  
  const featured = topics.filter(topic => featuredTopics.includes(topic));
  const regular = topics.filter(topic => !featuredTopics.includes(topic)).sort((a, b) => a.localeCompare(b));
  return { featured, regular };
};

// Function to get featured topic descriptions from Sanity
export const getFeaturedTopicDescriptions = async (category: string, childAge: string) => {
  const featuredTopics = await getFeaturedTopics(category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''), childAge);
  const descriptions: { [key: string]: string } = {};
  
  featuredTopics.forEach((topic: any) => {
    descriptions[topic.topic.title] = topic.topic.supportingText || '';
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