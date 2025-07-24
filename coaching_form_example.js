// CoachingReservationForm.jsx
// Example implementation of the coaching reservation form with conditional logic

import React, { useState, useEffect } from 'react';
import { 
  getAvailableCategories, 
  getAvailableTopics, 
  isCategoryAvailable,
  getAllCategories,
  getAllTopicsInCategory 
} from './topicLogicData';

const CoachingReservationForm = () => {
  const [selectedChild, setSelectedChild] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableTopics, setAvailableTopics] = useState([]);

  // Example children data - replace with your actual data structure
  const exampleChildren = [
    { id: 1, name: "Emma", age: "5th grade" },
    { id: 2, name: "Liam", age: "Pre-K" },
    { id: 3, name: "Sophia", age: "11th grade" },
    { id: 4, name: "Noah", age: "Newborn" }
  ];

  // Update available categories when child selection changes
  useEffect(() => {
    if (selectedChild) {
      const categories = getAvailableCategories(selectedChild.age);
      setAvailableCategories(categories);
      
      // Reset category and topic selections
      setSelectedCategory('');
      setSelectedTopic('');
      setAvailableTopics([]);
    } else {
      setAvailableCategories([]);
      setSelectedCategory('');
      setSelectedTopic('');
      setAvailableTopics([]);
    }
  }, [selectedChild]);

  // Update available topics when category selection changes
  useEffect(() => {
    if (selectedChild && selectedCategory) {
      const topics = getAvailableTopics(selectedCategory, selectedChild.age);
      setAvailableTopics(topics);
      
      // Reset topic selection
      setSelectedTopic('');
    } else {
      setAvailableTopics([]);
      setSelectedTopic('');
    }
  }, [selectedCategory, selectedChild]);

  const handleChildSelect = (child) => {
    setSelectedChild(child);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedChild || !selectedCategory || !selectedTopic) {
      alert('Please select a child, category, and topic');
      return;
    }

    // Handle form submission
    console.log('Form submitted:', {
      child: selectedChild,
      category: selectedCategory,
      topic: selectedTopic
    });
    
    alert(`Booking request submitted for ${selectedChild.name}:\nCategory: ${selectedCategory}\nTopic: ${selectedTopic}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Book a Coaching Session</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Child Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Child
          </label>
          <div className="grid grid-cols-2 gap-2">
            {exampleChildren.map((child) => (
              <button
                key={child.id}
                type="button"
                onClick={() => handleChildSelect(child)}
                className={`p-3 text-left rounded-lg border-2 transition-colors duration-200 ease-out ${
                  selectedChild?.id === child.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium">{child.name}</div>
                <div className="text-sm text-gray-500">{child.age}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Topic Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategorySelect(e.target.value)}
            disabled={!selectedChild}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">
              {selectedChild ? 'Choose a category...' : 'Select a child first'}
            </option>
            {getAllCategories().map((category) => {
              const isAvailable = selectedChild ? isCategoryAvailable(category, selectedChild.age) : false;
              return (
                <option 
                  key={category} 
                  value={category}
                  disabled={!isAvailable}
                  className={isAvailable ? '' : 'text-gray-400'}
                >
                  {category} {!isAvailable && '(Not available for this age)'}
                </option>
              );
            })}
          </select>
          
          {selectedChild && (
            <div className="mt-2 text-sm text-gray-600">
              Available categories for {selectedChild.name} ({selectedChild.age}): {availableCategories.length}
            </div>
          )}
        </div>

        {/* Topic Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Topic
          </label>
          <select
            value={selectedTopic}
            onChange={(e) => handleTopicSelect(e.target.value)}
            disabled={!selectedCategory}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">
              {selectedCategory ? 'Choose a topic...' : 'Select a category first'}
            </option>
            {availableTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
          
          {selectedCategory && (
            <div className="mt-2 text-sm text-gray-600">
              Available topics: {availableTopics.length}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!selectedChild || !selectedCategory || !selectedTopic}
                      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 ease-out"
        >
          Book Session
        </button>
      </form>

      {/* Debug Information */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-800 mb-2">Debug Information</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <div>Selected Child: {selectedChild ? `${selectedChild.name} (${selectedChild.age})` : 'None'}</div>
          <div>Selected Category: {selectedCategory || 'None'}</div>
          <div>Selected Topic: {selectedTopic || 'None'}</div>
          <div>Available Categories: {availableCategories.length}</div>
          <div>Available Topics: {availableTopics.length}</div>
        </div>
      </div>
    </div>
  );
};

export default CoachingReservationForm;