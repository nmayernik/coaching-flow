"use client"

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { organizeTopics, getFeaturedTopicDescriptions, categorySectionDescriptions } from "./utils";
import { NoTopicsEmptyState } from "./NoTopicsEmptyState";

interface TopicSelectorProps {
  category: string;
  availableTopics: string[];
  selectedTopic: string;
  note: string;
  studentName?: string;
  onTopicChange: (topic: string) => void;
  onNoteChange: (note: string) => void;
  selectedStudent?: { age: string };
}

export function TopicSelector({ 
  category, 
  availableTopics, 
  selectedTopic, 
  note, 
  studentName,
  onTopicChange, 
  onNoteChange,
  selectedStudent
}: TopicSelectorProps) {
  const childAge = selectedStudent?.age || "";
  const { featured, regular } = organizeTopics(availableTopics, category, childAge);
  const featuredTopicDescriptions = getFeaturedTopicDescriptions(category, childAge);
  const sectionDescription = categorySectionDescriptions[category] || "Our expert coaches specialize in this area to provide you with the most relevant guidance.";

  if (availableTopics.length === 0) {
    return (
      <NoTopicsEmptyState studentName={studentName || "this student"} />
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="mb-1 font-medium text-base leading-[125%] text-gray-800">What is the focus of your call? <span className="text-red-500">*</span></div>
        <div className="mb-4 lg:mb-6 text-xs lg:text-sm text-gray-700">
          {sectionDescription}
        </div>
        
        <div className="space-y-4 lg:space-y-6">
          {/* Featured Topics Section */}
          {featured.length > 0 && (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                {featured.map((topicTitle) => {
                  const description = featuredTopicDescriptions[topicTitle] || "";
                  return (
                    <label 
                      key={topicTitle} 
                      className={`p-4 lg:p-5 rounded-lg lg:rounded-xl border cursor-pointer transition-colors duration-200 ease-out flex flex-col ${
                        selectedTopic === topicTitle 
                          ? "ring-blue-700 ring-2 border-gray-400 hover:bg-blue-25" 
                          : "border-gray-400 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="topic"
                        value={topicTitle}
                        checked={selectedTopic === topicTitle}
                        onChange={() => onTopicChange(topicTitle)}
                        className="sr-only"
                        aria-label={`Select topic: ${topicTitle}${description ? ` - ${description}` : ''}`}
                      />
                      <div className="flex flex-col mb-2">
                        <Badge className="self-start mb-2 bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs font-medium">
                          Most Popular
                        </Badge>
                        <div className="font-medium text-sm lg:text-base text-gray-800">{topicTitle}</div>
                      </div>
                      {description && (
                        <div className="text-xs lg:text-sm text-gray-700">{description}</div>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Regular Topics Section - All topics visible */}
          {regular.length > 0 && (
            <div id="regular-topics-container">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                {regular.map((topicTitle) => (
                  <label 
                    key={topicTitle} 
                    className={`p-3 lg:p-4 rounded-lg lg:rounded-xl border text-base cursor-pointer transition-colors duration-200 ease-out h-16 lg:h-20 flex items-center ${
                      selectedTopic === topicTitle 
                        ? "ring-blue-700 ring-2 border-gray-400 hover:bg-blue-25" 
                        : "border-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="topic"
                      value={topicTitle}
                      checked={selectedTopic === topicTitle}
                      onChange={() => onTopicChange(topicTitle)}
                      className="sr-only"
                      aria-label={`Select topic: ${topicTitle}`}
                    />
                    <div className="font-medium text-gray-800">{topicTitle}</div>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="leading-4 mt-6">
        <label htmlFor="coach-note" className="mb-2 font-medium text-base text-gray-800 block">Add a note to your coach (optional)</label>
        <Textarea 
          id="coach-note"
          value={note} 
          onChange={e => onNoteChange(e.target.value)} 
          placeholder="Add any additional notes for your coach..." 
          className="min-h-[80px] lg:min-h-[100px] rounded-lg lg:rounded-xl border-gray-200 text-sm" 
          aria-describedby="coach-note-description"
        />
        <div id="coach-note-description" className="sr-only">Optional field for additional notes to your coach</div>
      </div>
    </div>
  );
} 