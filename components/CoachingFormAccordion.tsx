"use client"

import * as React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  getAvailableCategories, 
  getAvailableTopics, 
  isCategoryAvailable,
  isTopicAvailable,
  getAllCategories
} from "../lib/topicLogicData";

interface CoachingFormAccordionProps {
  onStepChange?: (step: number) => void;
  onCompletedStepsChange?: (completedSteps: number[]) => void;
}

export default function CoachingFormAccordion({ 
  onStepChange, 
  onCompletedStepsChange 
}: CoachingFormAccordionProps) {
  // Student data with ages
  const students = [
    { id: 1, name: "Nick", age: "11th grade" },
    { id: 2, name: "Christopher", age: "8th grade" },
    { id: 3, name: "Sarah", age: "5th grade" }
  ];

  // State for form values
  const [step, setStep] = React.useState(0); // 0, 1, 2
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([]); // Track completed steps
  const [selectedStudent, setSelectedStudent] = React.useState<typeof students[0] | null>(null);
  const [category, setCategory] = React.useState("");
  const [topic, setTopic] = React.useState("");
  const [note, setNote] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [error, setError] = React.useState("");
  
  // Conditional data based on selected student
  const [availableCategories, setAvailableCategories] = React.useState<string[]>([]);
  const [availableTopics, setAvailableTopics] = React.useState<string[]>([]);

  // Update available categories when student selection changes
  React.useEffect(() => {
    if (selectedStudent) {
      const categories = getAvailableCategories(selectedStudent.age);
      setAvailableCategories(categories);
      
      // Reset category and topic selections if current ones are no longer available
      if (category && !categories.includes(category)) {
        setCategory("");
        setTopic("");
        setAvailableTopics([]);
      }
    } else {
      setAvailableCategories([]);
      setCategory("");
      setTopic("");
      setAvailableTopics([]);
    }
  }, [selectedStudent, category]);

  // Update available topics when category selection changes
  React.useEffect(() => {
    if (selectedStudent && category) {
      const topics = getAvailableTopics(category, selectedStudent.age);
      setAvailableTopics(topics);
      
      // Reset topic selection if current one is no longer available
      if (topic && !topics.includes(topic)) {
        setTopic("");
      }
    } else {
      setAvailableTopics([]);
      setTopic("");
    }
  }, [category, selectedStudent, topic]);



  // Notify parent of step changes
  React.useEffect(() => {
    onStepChange?.(step);
  }, [step, onStepChange]);

  // Notify parent of completed steps changes
  React.useEffect(() => {
    onCompletedStepsChange?.(completedSteps);
  }, [completedSteps, onCompletedStepsChange]);

  // Validation per step
  function validateStep(idx: number) {
    if (idx === 0) {
      if (!selectedStudent) return "Please select a student.";
      if (!category) return "Please select a category.";
      // Additional validation for age-appropriate selections
      if (selectedStudent && category && !isCategoryAvailable(category, selectedStudent.age)) {
        return "Selected category is not available for this student's age.";
      }
    }
    if (idx === 1) {
      if (!topic) return "Please select a topic.";
      // Additional validation for age-appropriate topic
      if (selectedStudent && category && topic && !isTopicAvailable(category, topic, selectedStudent.age)) {
        return "Selected topic is not available for this student's age.";
      }
    }
    if (idx === 2) {
      if (!date || !time) return "Please select a date and time.";
      if (!phone) return "Please enter a phone number.";
    }
    return "";
  }

  function handleContinue(idx: number) {
    const err = validateStep(idx);
    if (err) {
      setError(err);
      return;
    }
    setError("");
    
    // Special handling for step 0 (student/category selection)
    if (idx === 0) {
      // Mark step 0 as completed
      if (!completedSteps.includes(0)) {
        setCompletedSteps([...completedSteps, 0]);
      }
      
      // Remove step 1 (topic selection) from completed steps so it reopens as accordion
      // This ensures users can choose appropriate topics for the new student/category
      setCompletedSteps(prev => prev.filter(s => s !== 1));
      setStep(1);
      return;
    }
    
    // For other steps, use normal logic
    if (!completedSteps.includes(idx)) {
      setCompletedSteps([...completedSteps, idx]);
    }
    
    const nextStep = idx + 1;
    setStep(nextStep);
  }

  function handleEdit(stepIndex: number) {
    // Remove from completed steps and go back to that step
    setCompletedSteps(completedSteps.filter(s => s !== stepIndex));
    setStep(stepIndex);
    setError("");
  }

  // Handle accordion value change
  function handleAccordionChange(value: string) {
    if (value) {
      const stepNum = parseInt(value.replace('step', ''));
      setStep(stepNum);
    }
  }

  // Summary components
  const Step1Summary = () => (
    <div className="border border-gray-100 rounded-2xl p-4 mb-4 bg-white transform transition-all duration-500 ease-out animate-in slide-in-from-top-4 fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium text-xl text-gray-800">{category} Appointment</h3>
          <p className="text-gray-700">For {selectedStudent?.name} ({selectedStudent?.age})</p>
        </div>
        <Button 
          variant="outline" 
          size="default" 
          onClick={() => handleEdit(0)}
          className="text-blue-700 border-gray-300 hover:bg-blue-50 transition-all duration-200 hover:scale-105"
        >
          Edit
        </Button>
      </div>
    </div>
  );

  const Step2Summary = () => (
    <div className="border rounded-lg p-4 mb-4 bg-white transform transition-all duration-500 ease-out animate-in slide-in-from-top-4 fade-in">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg text-gray-900">Topic Selected</h3>
          <p className="text-gray-600">{topic}</p>
          {note && <p className="text-gray-500 text-sm mt-1">Note: {note}</p>}
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleEdit(1)}
          className="text-blue-600 border-blue-600 hover:bg-blue-50 transition-all duration-200 hover:scale-105"
        >
          Edit
        </Button>
      </div>
    </div>
  );

  return (
    <div className="w-full mx-auto font-sans">
      <Accordion.Root 
        type="single" 
        value={`step${step}`} 
        onValueChange={handleAccordionChange}
        collapsible 
        className="w-full"
      >
        {/* Step 1 - Show summary if completed, accordion if not */}
        {completedSteps.includes(0) ? (
          <Step1Summary />
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4 transform transition-all duration-500 ease-out animate-in slide-in-from-bottom-4 fade-in">
            <Accordion.Item value="step0" className="border-none">
              <Accordion.Header>
                <Accordion.Trigger className="w-full text-left font-semibold text-lg">
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-8 pt-2 pb-8 space-y-12 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1">
                <div>
                  <div className="mb-4 font-medium text-xl text-gray-800">Choose a student <span className="text-red-500">*</span></div>
                  <div className="grid grid-cols-3 gap-4">
                    {students.map((s, index) => {
                      const initials = s.name.split(' ').map(name => name[0]).join('').toUpperCase();
                      const avatarColors = [
                        "bg-blue-700",     // Nick - Blue
                        "bg-success-500",    // Christopher - Green
                        "bg-purple-700",   // Sarah - Purple
                      ];
                      const avatarColor = avatarColors[index];
                      const availableCategoriesCount = getAvailableCategories(s.age).length;
                      
                      return (
                        <label key={s.id} className={`px-4 py-6 rounded-xl border cursor-pointer hover:bg-gray-25 transition-colors flex flex-col items-center justify-center ${selectedStudent?.id === s.id ? "ring-blue-700 ring-2 border-0 hover:bg-blue-25" : "border-gray-400"}`}>
                          <input
                            type="radio"
                            name="student"
                            value={s.id.toString()}
                            checked={selectedStudent?.id === s.id}
                            onChange={() => setSelectedStudent(s)}
                            className="sr-only"
                          />
                          <div className={`w-8 h-8 ${avatarColor} rounded-full flex items-center justify-center mb-2`}>
                            <span className="text-white font-medium text-sm">{initials}</span>
                          </div>
                          <div className="font-medium text-gray-800 text-center">{s.name}</div>
                          <div className="text-xs text-gray-700 text-center">{s.age}</div>
                          <div className="text-xs text-gray-500 text-center">{availableCategoriesCount} categories available</div>
                        </label>
                      );
                    })}
                  </div>
                  <button className="flex items-center text-blue-700 hover:text-blue-700 mt-3 text-sm font-medium">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add student
                  </button>
                </div>
                
                <div>
                  <div className="mb-4 font-medium text-xl text-gray-800">Choose a category <span className="text-red-500">*</span></div>
                  {!selectedStudent && (
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center text-gray-600">
                      Please select a student first to see available categories
                    </div>
                  )}
                  {selectedStudent && (
                    <div className="grid grid-cols-2 gap-4">
                      {getAllCategories().map((categoryName) => {
                        const isAvailable = selectedStudent ? isCategoryAvailable(categoryName, selectedStudent.age) : false;
                        const availableTopicsCount = selectedStudent ? getAvailableTopics(categoryName, selectedStudent.age).length : 0;
                        
                        // Category descriptions
                        const categoryDescriptions: { [key: string]: string } = {
                          "Academic Foundations": "Setting your student up for success in education and beyond",
                          "College Admissions": "Learn how to make informed decisions about college planning—including academic and extracurricular opportunities, applications, and college selection—from a team of former admissions officers.",
                          "College Finance": "Advice on managing college costs and aid",
                          "College to Career": "Advice on navigating the transition to the workplace",
                          "Financial Wellness": "Advice on building and maintaining smart money habits",
                          "Paying for College": "Financial aid, scholarships, and college cost planning",
                          "Saving for College": "College savings strategies and planning",
                          "Education Loan Repayment": "Managing and repaying student loans"
                        };
                        
                        return (
                          <label 
                            key={categoryName} 
                            className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                              !isAvailable 
                                ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60" 
                                : category === categoryName 
                                  ? "ring-blue-700 ring-2 border-white hover:bg-blue-25" 
                                  : "border-gray-400 hover:bg-gray-50"
                            }`}
                          >
                            <input
                              type="radio"
                              name="category"
                              value={categoryName}
                              checked={category === categoryName}
                              onChange={() => isAvailable && setCategory(categoryName)}
                              disabled={!isAvailable}
                              className="sr-only"
                            />
                            <div className={`font-medium ${isAvailable ? "text-gray-800" : "text-gray-500"}`}>
                              {categoryName}
                            </div>
                            <div className={`text-sm mt-1 ${isAvailable ? "text-gray-700" : "text-gray-400"}`}>
                              {categoryDescriptions[categoryName] || "Category description"}
                            </div>
                            {isAvailable && (
                              <div className="text-xs text-blue-600 mt-2">
                                {availableTopicsCount} topics available
                              </div>
                            )}
                            {!isAvailable && (
                              <div className="text-xs text-gray-400 mt-2">
                                Not available for {selectedStudent.age}
                              </div>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
                
                {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}
                <Button type="button" variant="default" size="lg" onClick={() => handleContinue(0)} className="w-full !text-lg bg-yellow-500 hover:bg-yellow-400 text-blue-800 rounded-xl font-semibold px-6 !py-8">Continue</Button>
              </Accordion.Content>
            </Accordion.Item>
          </div>
        )}

        {/* Step 2 - Show summary if completed, accordion if step >= 1 and not completed */}
        {completedSteps.includes(1) ? (
          <Step2Summary />
        ) : step >= 1 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-4 overflow-hidden transform transition-all duration-500 ease-out animate-in slide-in-from-bottom-4 fade-in">
            <Accordion.Item value="step1" className="border-none">
              <Accordion.Header>
                <Accordion.Trigger className="hidden">
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="p-6 space-y-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1">
                <div>
                  <div className="mb-4 font-medium text-gray-900">Choose a topic in {category} <span className="text-red-500">*</span></div>
                  {selectedStudent && (
                    <div className="mb-4 text-sm text-gray-600">
                      Available topics for {selectedStudent.name} ({selectedStudent.age}): {availableTopics.length}
                    </div>
                  )}
                  {availableTopics.length === 0 ? (
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center text-gray-600">
                      {!selectedStudent || !category ? "Please select a student and category first" : "No topics available for this combination"}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {availableTopics.map((topicTitle) => (
                        <label key={topicTitle} className={`p-4 rounded-xl border cursor-pointer hover:bg-gray-50 transition-colors ${topic === topicTitle ? "ring-blue-700 ring-2 border-0 hover:bg-blue-25" : "border-gray-400"}`}>
                          <input
                            type="radio"
                            name="topic"
                            value={topicTitle}
                            checked={topic === topicTitle}
                            onChange={() => setTopic(topicTitle)}
                            className="sr-only"
                          />
                          <div className="font-medium text-md text-gray-800">{topicTitle}</div>
                          <div className="text-sm text-gray-700 mt-1">
                            {selectedStudent && `Available for ${selectedStudent.age} students`}
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <div className="mb-4 font-medium text-gray-900">Add a note to your coach</div>
                  <Textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Value" className="min-h-[100px] rounded-xl border-gray-200" />
                </div>
                {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}
                <Button type="button" size="lg" onClick={() => handleContinue(1)} className="w-full !text-lg bg-yellow-500 hover:bg-yellow-400 text-blue-800 rounded-xl font-semibold px-6 !py-8">Continue</Button>
              </Accordion.Content>
            </Accordion.Item>
          </div>
        )}

        {/* Step 3 - Only show if step >= 2 */}
        {step >= 2 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-4 overflow-hidden transform transition-all duration-500 ease-out animate-in slide-in-from-bottom-4 fade-in">
            <Accordion.Item value="step2" className="border-none">
              <Accordion.Header>
                <Accordion.Trigger className="hidden">
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="p-6 space-y-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1">
                <div>
                  <div className="mb-4 font-medium text-gray-900">Choose a date</div>
                  <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="rounded-xl border-gray-200" />
                </div>
                <div>
                  <div className="mb-4 font-medium text-gray-900">Choose a time</div>
                  <Input type="time" value={time} onChange={e => setTime(e.target.value)} className="rounded-xl border-gray-200" />
                </div>
                <div>
                  <div className="mb-4 font-medium text-gray-900">Phone number</div>
                  <Input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="(000) 000-0000" className="rounded-xl border-gray-200" />
                </div>
                <div>
                  <div className="mb-4 font-medium text-gray-900">Attach a document (optional)</div>
                  <Input type="file" className="rounded-xl border-gray-200" />
                </div>
                {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}
                <Button type="button" className="w-auto bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 py-2">Schedule Appointment</Button>
              </Accordion.Content>
            </Accordion.Item>
          </div>
        )}
      </Accordion.Root>
    </div>
  );
} 