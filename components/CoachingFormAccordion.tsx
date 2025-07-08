"use client"

import * as React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SquarePen, BookOpen, Building, DollarSign, Briefcase, PiggyBank, MessageCircle } from "lucide-react";
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
  onCategoryChange?: (category: string) => void;
}

// DateTimeSelector Component
interface DateTimeSelectorProps {
  selectedDate: string;
  selectedTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

function DateTimeSelector({ selectedDate, selectedTime, onDateChange, onTimeChange }: DateTimeSelectorProps) {
  // Generate fake available dates (next 30 days, excluding weekends)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 45; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends (Saturday = 6, Sunday = 0)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    
    return dates.slice(0, 30); // Return first 30 weekdays
  };

  // Generate fake available times for a given date
  const generateAvailableTimesForDate = (date: Date) => {
    const times = [
      '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
      '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
    ];
    
    // Simulate some times being unavailable by randomly removing some
    const dayOfMonth = date.getDate();
    const unavailableCount = dayOfMonth % 3; // 0, 1, or 2 unavailable slots
    
    return times.slice(0, times.length - unavailableCount);
  };

  const availableDates = generateAvailableDates();
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [selectedDateObj, setSelectedDateObj] = React.useState<Date | null>(
    selectedDate ? new Date(selectedDate) : null
  );

  // Auto-select first available date if none is selected
  React.useEffect(() => {
    if (!selectedDate && availableDates.length > 0) {
      const firstAvailableDate = availableDates[0];
      setSelectedDateObj(firstAvailableDate);
      onDateChange(firstAvailableDate.toISOString().split('T')[0]);
    }
  }, [selectedDate, availableDates, onDateChange]);

  // Calendar generation
  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    // Calculate the minimum number of weeks needed
    const daysInMonth = lastDay.getDate();
    const firstDayOfWeek = firstDay.getDay();
    const weeksNeeded = Math.ceil((daysInMonth + firstDayOfWeek) / 7);
    
    // Check if the last week would be entirely next month
    const totalDays = weeksNeeded * 7;
    const lastWeekStart = totalDays - 7;
    const lastWeekFirstDate = new Date(startDate);
    lastWeekFirstDate.setDate(lastWeekFirstDate.getDate() + lastWeekStart);
    
    // If the entire last week is next month, use one fewer week
    const finalWeeks = lastWeekFirstDate.getMonth() !== month ? weeksNeeded - 1 : weeksNeeded;
    const finalDays = finalWeeks * 7;
    
    // Generate the calculated number of days
    for (let i = 0; i < finalDays; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const calendarDays = generateCalendar();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const isDateAvailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    
    // Don't allow booking for today or past dates
    if (checkDate <= today) {
      return false;
    }
    
    return availableDates.some(availableDate => 
      availableDate.toDateString() === date.toDateString()
    );
  };

  const isDateSelected = (date: Date) => {
    return selectedDateObj && date.toDateString() === selectedDateObj.toDateString();
  };

  const handleDateSelect = (date: Date) => {
    if (isDateAvailable(date)) {
      setSelectedDateObj(date);
      onDateChange(date.toISOString().split('T')[0]);
    }
  };

  const handleTimeSelect = (time: string) => {
    // Convert display time to 24-hour format for the input
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
    
    onTimeChange(timeMap[time] || time);
  };

  const availableTimesForSelectedDate = selectedDateObj ? generateAvailableTimesForDate(selectedDateObj) : [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="mb-3 font-medium text-gray-800 text-sm">Choose a date</div>
          <div className="bg-white border border-gray-200 rounded-xl p-3">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h3 className="font-medium text-gray-800 text-sm">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((date, index) => {
                const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                const isAvailable = isDateAvailable(date);
                const isSelected = isDateSelected(date);
                const isToday = date.toDateString() === new Date().toDateString();
                
                return (
                  <button
                    key={index}
                    onClick={() => handleDateSelect(date)}
                    disabled={!isAvailable}
                    className={`
                      w-8 h-8 text-sm rounded-full transition-colors
                      ${!isCurrentMonth ? 'text-gray-300' : ''}
                      ${isAvailable ? 'hover:bg-blue-50 cursor-pointer text-blue-700' : 'cursor-not-allowed'}
                      ${isSelected ? 'bg-blue-700 text-white hover:bg-blue-600' : ''}
                      ${isToday && !isSelected && isAvailable ? 'bg-white border border-blue-700 text-blue-700' : ''}
                      ${isToday && !isAvailable ? 'bg-white border border-gray-200 text-gray-500' : ''}
                      ${!isAvailable && isCurrentMonth && !isToday ? 'text-gray-400' : ''}
                    `}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Available Times */}
        <div className="lg:col-span-3">
          <div className="mb-3 font-medium text-gray-900 text-sm">Choose a time</div>
          {!selectedDateObj ? (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
              <div className="text-gray-500 text-sm">Please select a date first</div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {availableTimesForSelectedDate.map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className={`
                    w-full p-3 text-center rounded-xl border transition-colors text-sm
                    ${selectedTime === time || 
                      (selectedTime === '09:00' && time === '9:00 AM') ||
                      (selectedTime === '10:00' && time === '10:00 AM') ||
                      (selectedTime === '11:00' && time === '11:00 AM') ||
                      (selectedTime === '12:00' && time === '12:00 PM') ||
                      (selectedTime === '13:00' && time === '1:00 PM') ||
                      (selectedTime === '14:00' && time === '2:00 PM') ||
                      (selectedTime === '15:00' && time === '3:00 PM') ||
                      (selectedTime === '16:00' && time === '4:00 PM') ||
                      (selectedTime === '17:00' && time === '5:00 PM')
                      ? 'ring-blue-700 ring-2 border-white hover:bg-blue-25' 
                      : 'border-gray-400 hover:bg-gray-50'
                    }
                  `}
                >
                  {time}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// PhoneNumberSelector Component
interface PhoneNumberSelectorProps {
  phone: string;
  onPhoneChange: (phone: string) => void;
}

function PhoneNumberSelector({ phone, onPhoneChange }: PhoneNumberSelectorProps) {
  // Mock existing phone numbers on user's account
  const existingPhoneNumbers = [
    { id: 'work', label: 'Work', number: '(555) 123-4567' },
    { id: 'mobile', label: 'Mobile', number: '(555) 987-6543' },
    { id: 'other', label: 'Other', number: '(555) 456-7890' }
  ];

  const [selectedOption, setSelectedOption] = React.useState<string>('');
  const [customPhone, setCustomPhone] = React.useState('');

  // Initialize selected option based on current phone value
  React.useEffect(() => {
    if (phone) {
      const existingMatch = existingPhoneNumbers.find(p => p.number === phone);
      if (existingMatch) {
        setSelectedOption(existingMatch.id);
      } else {
        setSelectedOption('custom');
        setCustomPhone(phone);
      }
    }
  }, [phone]);

  const handleOptionChange = (optionId: string) => {
    setSelectedOption(optionId);
    
    if (optionId === 'custom') {
      onPhoneChange(customPhone);
    } else {
      const selectedNumber = existingPhoneNumbers.find(p => p.id === optionId);
      if (selectedNumber) {
        onPhoneChange(selectedNumber.number);
      }
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const phoneNumber = value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
  };

  const handleCustomPhoneChange = (value: string) => {
    const formattedPhone = formatPhoneNumber(value);
    setCustomPhone(formattedPhone);
    if (selectedOption === 'custom') {
      onPhoneChange(formattedPhone);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Existing phone numbers */}
        {existingPhoneNumbers.map((phoneOption) => (
          <label 
            key={phoneOption.id} 
            className={`block p-4 rounded-xl border cursor-pointer transition-colors ${
              selectedOption === phoneOption.id 
                ? 'ring-blue-700 ring-2 border-white hover:bg-blue-25' 
                : 'border-gray-400 hover:bg-gray-50'
            }`}
          >
            <input
              type="radio"
              name="phone"
              value={phoneOption.id}
              checked={selectedOption === phoneOption.id}
              onChange={() => handleOptionChange(phoneOption.id)}
              className="sr-only"
            />
            <div className="flex justify-center items-center">
              <div className="text-center">
                <div className="font-medium text-gray-800">{phoneOption.label}</div>
                <div className="text-md text-gray-700">{phoneOption.number}</div>
              </div>
            </div>
          </label>
        ))}
        
        {/* Add one-time phone number option */}
        <label className={`flex items-center justify-center p-4 rounded-xl border cursor-pointer transition-colors ${
          selectedOption === 'custom' 
            ? 'ring-blue-700 ring-2 border-white hover:bg-blue-25' 
            : 'border-gray-400 hover:bg-gray-50'
        }`}>
          <input
            type="radio"
            name="phone"
            value="custom"
            checked={selectedOption === 'custom'}
            onChange={() => handleOptionChange('custom')}
            className="sr-only"
          />
          <div className="font-medium text-gray-800 text-center">Add a one time phone number</div>
        </label>
      </div>
      
      {/* Custom phone input - appears outside the grid when selected */}
      {selectedOption === 'custom' && (
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Enter phone number
          </label>
          <Input 
            type="tel" 
            value={customPhone} 
            onChange={e => handleCustomPhoneChange(e.target.value)} 
            placeholder="(000) 000-0000" 
            className="rounded-xl border-gray-200" 
          />
        </div>
      )}
    </div>
  );
}

export default function CoachingFormAccordion({ 
  onStepChange, 
  onCompletedStepsChange,
  onCategoryChange 
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
      // Special handling for "Intro to College Coach"
      if (category === "Intro to College Coach") {
        setAvailableTopics(["Introduction to Your College Coach"]);
        setTopic("Introduction to Your College Coach");
      } else {
        const topics = getAvailableTopics(category, selectedStudent.age);
        setAvailableTopics(topics);
        
        // Reset topic selection if current one is no longer available
        if (topic && !topics.includes(topic)) {
          setTopic("");
        }
      }
    } else {
      setAvailableTopics([]);
      setTopic("");
    }
    
    // Notify parent component of category change
    if (onCategoryChange && category) {
      onCategoryChange(category);
    }
  }, [category, selectedStudent, topic, onCategoryChange]);



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
      if (selectedStudent && category && category !== "Intro to College Coach" && !isCategoryAvailable(category, selectedStudent.age)) {
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
      
      // Special handling for "Intro to College Coach" - skip topic selection
      if (category === "Intro to College Coach") {
        // Auto-complete step 1 and go directly to step 2
        if (!completedSteps.includes(1)) {
          setCompletedSteps(prev => [...prev, 1]);
        }
        setStep(2);
        return;
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
    <div className="border border-gray-100 rounded-2xl p-6 mb-4 bg-white">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
         <h3 className="text-blue-600 font-medium text-sm">Appointment type</h3>
          <p className="font-medium text-gray-800">{category} Appointment</p>
          <p className="text-gray-700 text-sm">For {selectedStudent?.name} ({selectedStudent?.age})</p>
        </div>
        <Button 
          variant="outline" 
          size="default" 
          onClick={() => handleEdit(0)}
          className="text-blue-700 border-gray-300 hover:bg-blue-50 transition-all duration-200"
        >
          <SquarePen className="w-4 h-4" />
          Edit
        </Button>
      </div>
    </div>
  );

  const Step2Summary = () => (
    <div className="border border-gray-100 rounded-2xl p-6 mb-4 bg-white">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-purple-600 font-semibold text-sm">Topic</h3>
          <p className="font-medium text-gray-800">{topic}</p>
          {note && <p className="text-gray-700 text-sm mt-1">Note: {note}</p>}
        </div>
        <Button 
          variant="outline" 
          size="default" 
          onClick={() => handleEdit(1)}
          className="text-blue-700 border-gray-300 hover:bg-blue-50 transition-all duration-200 hover:scale-105"
        >
          <SquarePen className="w-4 h-4 mr-1" />
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
                        <label key={s.id} className={`p-4 h-40 rounded-xl border cursor-pointer hover:bg-gray-25 transition-colors flex flex-col justify-between shadow-sm ${selectedStudent?.id === s.id ? "ring-blue-700 ring-2 border-0 hover:bg-blue-50" : "border-gray-400"}`}>
                          <input
                            type="radio"
                            name="student"
                            value={s.id.toString()}
                            checked={selectedStudent?.id === s.id}
                            onChange={() => setSelectedStudent(s)}
                            className="sr-only"
                          />
                          <div className="space-y-4">
                            <div className={`w-8 h-8 ${avatarColor} rounded-full flex items-center justify-center mb-2`}>
                              <span className="text-white font-medium text-sm">{initials}</span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-800">{s.name}</div>
                              <div className="text-sm text-gray-700">{s.age}</div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-700">{availableCategoriesCount} categories available</div>
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
                      {["Intro to College Coach", ...getAllCategories().filter(cat => cat !== "Intro to College Coach")].map((categoryName) => {
                        const isAvailable = selectedStudent ? (categoryName === "Intro to College Coach" ? true : isCategoryAvailable(categoryName, selectedStudent.age)) : false;
                        const availableTopicsCount = selectedStudent ? (categoryName === "Intro to College Coach" ? 1 : getAvailableTopics(categoryName, selectedStudent.age).length) : 0;
                        
                        // Category descriptions
                        const categoryDescriptions: { [key: string]: string } = {
                          "Intro to College Coach": "Get to know your coach and discuss your goals",
                          "Academic Foundations": "Setting your student up for success in education and beyond",
                          "College Admissions": "Learn how to make informed decisions about college planning—including academic and extracurricular opportunities, applications, and college selection—from a team of former admissions officers.",
                          "College Finance": "Advice on managing college costs and aid",
                          "College to Career": "Advice on navigating the transition to the workplace",
                          "Personal Finance": "Advice on building and maintaining smart money habits"
                        };

                        // Category icons and colors
                        const categoryIcons: { [key: string]: { icon: React.ComponentType<any>, bgColor: string, iconColor: string } } = {
                          "Intro to College Coach": { icon: MessageCircle, bgColor: "bg-indigo-100", iconColor: "text-indigo-600" },
                          "Academic Foundations": { icon: BookOpen, bgColor: "bg-blue-100", iconColor: "text-blue-600" },
                          "College Admissions": { icon: Building, bgColor: "bg-green-100", iconColor: "text-green-600" },
                          "College Finance": { icon: DollarSign, bgColor: "bg-yellow-100", iconColor: "text-yellow-600" },
                          "College to Career": { icon: Briefcase, bgColor: "bg-purple-100", iconColor: "text-purple-600" },
                          "Personal Finance": { icon: PiggyBank, bgColor: "bg-pink-100", iconColor: "text-pink-600" }
                        };
                        
                        return (
                          <label 
                            key={categoryName} 
                            className={`p-4 rounded-xl border cursor-pointer transition-colors h-32 flex ${
                              !isAvailable 
                                ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60" 
                                : category === categoryName 
                                  ? "ring-blue-700 ring-2 border-white hover:bg-blue-25" 
                                  : "border-gray-400 hover:bg-gray-50"
                            }`}
                            onClick={() => {
                              console.log('Clicked category:', categoryName, 'Available:', isAvailable);
                              if (isAvailable) {
                                setCategory(categoryName);
                                console.log('Set category to:', categoryName);
                              }
                            }}
                          >
                            <input
                              type="radio"
                              name="category"
                              value={categoryName}
                              checked={category === categoryName}
                              onChange={(e) => {
                                setCategory(categoryName);
                              }}
                              className="sr-only"
                            />
                            
                            {/* Icon circle */}
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                              isAvailable ? categoryIcons[categoryName]?.bgColor || "bg-gray-100" : "bg-gray-100"
                            }`}>
                              {(() => {
                                const iconData = categoryIcons[categoryName];
                                if (!iconData) return null;
                                const IconComponent = iconData.icon;
                                return (
                                  <IconComponent 
                                    className={`w-5 h-5 ${isAvailable ? iconData.iconColor : "text-gray-400"}`}
                                    strokeWidth={1.5}
                                  />
                                );
                              })()}
                            </div>
                            
                            {/* Content */}
                            <div className="flex flex-col flex-1">
                              <div className={`font-medium ${isAvailable ? "text-gray-800" : "text-gray-500"}`}>
                                {categoryName}
                              </div>
                              <div className={`text-sm mt-1 ${isAvailable ? "text-gray-700" : "text-gray-400"}`}>
                                {categoryDescriptions[categoryName] || "Category description"}
                              </div>

                              {!isAvailable && (
                                <div className="text-xs text-gray-400 mt-2">
                                  Not available for {selectedStudent.age}
                                </div>
                              )}
                              {categoryName === "Intro to College Coach" && (
                                <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full mt-2 self-start">
                                  Recommended
                                </span>
                              )}
                            </div>
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

        {/* Step 2 - Show summary if completed, accordion if step >= 1 and not completed - Hidden for "Intro to College Coach" */}
        {category !== "Intro to College Coach" && completedSteps.includes(1) ? (
          <Step2Summary />
        ) : category !== "Intro to College Coach" && step >= 1 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-4 overflow-hidden transform transition-all duration-500 ease-out animate-in slide-in-from-bottom-4 fade-in">
            <Accordion.Item value="step1" className="border-none">
              <Accordion.Header>
                <Accordion.Trigger className="hidden">
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="p-6 space-y-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1">
                <div>
                  <div className="mb-1 font-medium text-xl text-gray-800">Choose a topic in {category} <span className="text-red-500">*</span></div>
                  <div className="mb-6 text-sm text-gray-700">
                    {(() => {
                      const categoryDescriptions: { [key: string]: string } = {
                        "Academic Foundations": "Academic Foundations topics are supported by our team of experienced educators and academic counselors.",
                        "College Admissions": "College Admissions topics are fielded by our team of former admissions advisors at universities around the world.",
                        "College Finance": "College Finance topics are handled by our certified financial advisors who specialize in education funding.",
                        "College to Career": "College to Career topics are guided by our network of career coaches and industry professionals.",
                        "Personal Finance": "Personal Finance topics are led by our team of certified financial planners and money management experts."
                      };
                      return categoryDescriptions[category] || "Our expert coaches specialize in this area to provide you with the most relevant guidance.";
                    })()}
                  </div>
                  {availableTopics.length === 0 ? (
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center text-gray-600">
                      {!selectedStudent || !category ? "Please select a student and category first" : "No topics available for this combination"}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      {availableTopics.map((topicTitle) => (
                        <label key={topicTitle} className={`p-4 rounded-xl border cursor-pointer hover:bg-gray-50 transition-colors h-20 flex items-center ${topic === topicTitle ? "ring-blue-700 ring-2 border-gray-400 hover:bg-blue-25" : "border-gray-400"}`}>
                          <input
                            type="radio"
                            name="topic"
                            value={topicTitle}
                            checked={topic === topicTitle}
                            onChange={() => setTopic(topicTitle)}
                            className="sr-only"
                          />
                          <div className="font-medium text-md text-gray-800">{topicTitle}</div>
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
                <DateTimeSelector 
                  selectedDate={date} 
                  selectedTime={time} 
                  onDateChange={setDate} 
                  onTimeChange={setTime} 
                />
                <div>
                  <div className="mb-4 font-medium text-gray-900">Phone number</div>
                  <PhoneNumberSelector phone={phone} onPhoneChange={setPhone} />
                </div>
                <div>
                  <div className="mb-4 font-medium text-gray-900">Attach a document (optional)</div>
                  <Input type="file" className="rounded-xl border-gray-200" />
                </div>
                {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}
                <Button type="button" size="lg" className="w-full !text-lg bg-yellow-500 hover:bg-yellow-400 text-blue-800 rounded-xl font-semibold px-6 !py-8">Schedule Appointment</Button>
              </Accordion.Content>
            </Accordion.Item>
          </div>
        )}
      </Accordion.Root>
    </div>
  );
} 