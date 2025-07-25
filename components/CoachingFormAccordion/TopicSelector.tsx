"use client"

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { organizeTopics, getFeaturedTopicDescriptions, categorySectionDescriptions } from "./utils";

interface TopicSelectorProps {
  category: string;
  availableTopics: string[];
  selectedTopic: string;
  note: string;
  onTopicChange: (topic: string) => void;
  onNoteChange: (note: string) => void;
  selectedStudent?: { age: string };
}

export function TopicSelector({ 
  category, 
  availableTopics, 
  selectedTopic, 
  note, 
  onTopicChange, 
  onNoteChange,
  selectedStudent
}: TopicSelectorProps) {
  const childAge = selectedStudent?.age || "";
  const { featured, regular } = organizeTopics(availableTopics, category, childAge);
  const featuredTopicDescriptions = getFeaturedTopicDescriptions(category, childAge);
  const sectionDescription = categorySectionDescriptions[category] || "Our expert coaches specialize in this area to provide you with the most relevant guidance.";
  
  // Progressive disclosure: show first 6 regular topics initially
  const [showAllTopics, setShowAllTopics] = React.useState(false);
  const initialTopicsCount = 6;
  const hasMoreTopics = regular.length > initialTopicsCount;

  if (availableTopics.length === 0) {
    return (
      <div className="p-3 lg:p-4 bg-gray-50 rounded-lg lg:rounded-xl border border-gray-200 text-center text-gray-600 text-sm">
        No topics available for this combination
      </div>
    );
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      <div>
        <div className="mb-1 font-medium text-lg lg:text-xl text-gray-800">What is the focus of your call? <span className="text-red-500">*</span></div>
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

          {/* Regular Topics Section - Progressive Disclosure */}
          {regular.length > 0 && (
            <div id="regular-topics-container">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                {regular.map((topicTitle, index) => {
                  const isHidden = !showAllTopics && index >= initialTopicsCount;
                  return (
                    <label 
                      key={topicTitle} 
                      className={`p-3 lg:p-4 rounded-lg lg:rounded-xl border text-base cursor-pointer transition-colors duration-200 ease-out h-16 lg:h-20 flex items-center ${
                        selectedTopic === topicTitle 
                          ? "ring-blue-700 ring-2 border-gray-400 hover:bg-blue-25" 
                          : "border-gray-400 hover:bg-gray-50"
                      } ${isHidden ? 'sr-only' : ''}`}
                      aria-hidden={isHidden}
                    >
                      <input
                        type="radio"
                        name="topic"
                        value={topicTitle}
                        checked={selectedTopic === topicTitle}
                        onChange={() => onTopicChange(topicTitle)}
                        className="sr-only"
                        aria-label={`Select topic: ${topicTitle}`}
                        disabled={isHidden}
                      />
                      <div className="font-medium text-gray-800">{topicTitle}</div>
                    </label>
                  );
                })}
              </div>
              
              {/* Show More/Less Button */}
              {hasMoreTopics && (
                <div className="mt-4 lg:mt-6 text-center">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAllTopics(!showAllTopics)}
                    className="text-blue-700 border-gray-300 hover:bg-blue-50 transition-colors duration-200 ease-out"
                    aria-expanded={showAllTopics}
                    aria-controls="regular-topics-container"
                  >
                    {showAllTopics ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-2" />
                        Show fewer topics
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-2" />
                        Show {regular.length - initialTopicsCount} more topics
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div>
        <label htmlFor="coach-note" className="mb-3 lg:mb-4 font-medium text-lg lg:text-xl text-gray-900 block">Add a note to your coach (optional)</label>
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