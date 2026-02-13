"use client"

import * as React from "react";
import { getCoachAvailableDates, getCoachAvailableTimesForDate } from "@/lib/mockData";

// Format date as local YYYY-MM-DD (avoids UTC timezone shift)
function toLocalDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// Parse YYYY-MM-DD as local date (avoids UTC midnight shifting to previous day)
function parseLocalDateString(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

interface DateTimeSelectorProps {
  selectedDate: string;
  selectedTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  category?: string;
  selectedCoachId?: string | null;
  /** When true, do not render the "Choose a date and time" section label (parent renders it). */
  hideSectionLabel?: boolean;
}

export function DateTimeSelector({ selectedDate, selectedTime, onDateChange, onTimeChange, category, selectedCoachId = null, hideSectionLabel = false }: DateTimeSelectorProps) {
  // Get available dates based on coach selection (first date is tomorrow)
  const availableDates = React.useMemo(() => {
    return getCoachAvailableDates(selectedCoachId);
  }, [selectedCoachId]);

  // Generate available times for a given date based on coach selection
  const generateAvailableTimesForDate = (date: Date) => {
    return getCoachAvailableTimesForDate(selectedCoachId, date);
  };

  // Open calendar on month of first available date (tomorrow)
  const initialMonth = availableDates.length > 0 ? new Date(availableDates[0]) : new Date();
  const [currentMonth, setCurrentMonth] = React.useState(initialMonth);
  const [selectedDateObj, setSelectedDateObj] = React.useState<Date | null>(
    selectedDate ? parseLocalDateString(selectedDate) : null
  );

  // Default to first available date (tomorrow) when none selected or selection invalid
  React.useEffect(() => {
    if (availableDates.length > 0) {
      const firstAvailableDate = availableDates[0];
      const firstDateString = toLocalDateString(firstAvailableDate);
      const selectedInList = selectedDate && availableDates.some((d) => toLocalDateString(d) === selectedDate);

      if (!selectedDate || !selectedInList) {
        setSelectedDateObj(firstAvailableDate);
        onDateChange(firstDateString);
        setCurrentMonth(new Date(firstAvailableDate.getFullYear(), firstAvailableDate.getMonth()));
      } else {
        setSelectedDateObj(parseLocalDateString(selectedDate));
      }
    }
  }, [selectedDate, availableDates, onDateChange, selectedCoachId]);

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
      onDateChange(toLocalDateString(date));
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

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  return (
    <div>
      {!hideSectionLabel && (
        <div className="mb-3 font-medium text-base text-gray-800">Choose a date and time <span className="text-red-500">*</span></div>
      )}
      <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-5 lg:gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
                          <div className="sr-only">Choose a date <span className="text-red-500">*</span></div>
          <div className="bg-white border border-gray-200 rounded-lg lg:rounded-xl p-3 lg:p-4">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-0.5">
              <button 
                onClick={prevMonth} 
                className="px-3 py-2 bg-white hover:bg-blue-25 rounded-lg transition-colors duration-200 ease-out touch-manipulation"
                style={{ minHeight: '44px', minWidth: '44px' }}
              >
                <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h2 className="font-medium text-sm lg:text-base text-gray-900">
                {new Date(currentMonth.getFullYear(), currentMonth.getMonth()).toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </h2>
              <button 
                onClick={nextMonth} 
                className="px-3 py-2 bg-white hover:bg-blue-25 rounded-lg transition-colors duration-200 ease-out touch-manipulation"
                style={{ minHeight: '44px', minWidth: '44px' }}
              >
                <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Day headers */}
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="text-center text-xs lg:text-sm font-medium text-gray-500 p-2 lg:p-2">
                  {day}
                </div>
              ))}
              
              {/* Calendar days */}
              {generateCalendar().map((date, index) => {
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
                      w-10 h-10 sm:w-10 sm:h-10 lg:w-10 lg:h-10 text-xs lg:text-sm rounded-full transition-colors duration-200 ease-out touch-manipulation
                      ${!isCurrentMonth ? 'text-gray-300' : ''}
                      ${isAvailable ? 'hover:bg-blue-50 active:bg-blue-100 cursor-pointer text-blue-700' : 'cursor-not-allowed'}
                      ${isSelected ? 'bg-blue-700 text-white hover:bg-blue-600 active:bg-blue-800' : ''}
                      ${isToday && !isSelected && isAvailable ? 'bg-white border border-blue-700 text-blue-700' : ''}
                      ${isToday && !isAvailable ? 'bg-white border border-gray-200 text-gray-500' : ''}
                      ${!isAvailable && isCurrentMonth && !isToday ? 'text-gray-400' : ''}
                    `}
                    style={{ minHeight: '40px', minWidth: '40px' }}
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
                          <div className="sr-only">Choose a time <span className="text-red-500">*</span></div>
          <div className="text-sm lg:text-base font-medium mb-3 text-gray-800">
            {selectedDateObj ? `Available times on ${selectedDateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}` : 'Available times'}
          </div>
          {!selectedDateObj ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg lg:rounded-xl p-4 lg:p-6 text-center">
              <div className="text-gray-500 text-xs lg:text-sm">Please select a date first</div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 lg:gap-3">
                {availableTimesForSelectedDate.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    className={`
                      w-full p-3 lg:p-3 text-center rounded-lg lg:rounded-xl border transition-colors duration-200 ease-out text-base font-medium touch-manipulation
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
                        ? 'ring-blue-700 ring-2 border-white hover:bg-blue-25 active:bg-blue-100' 
                        : 'border-gray-400 hover:bg-gray-50 active:bg-gray-100'
                      }
                    `}
                    style={{ minHeight: '44px' }}
                  >
                    {time}
                  </button>
                ))}
              </div>
              <div className="mt-3 text-xs lg:text-sm text-gray-700">
                Showing in Eastern Time
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 