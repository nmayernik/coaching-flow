"use client"

import * as React from "react";
import { Input } from "@/components/ui/input";

interface PhoneNumberSelectorProps {
  phone: string;
  onPhoneChange: (phone: string) => void;
  /** When true, shows Teams-style backup phone UI (video call fallback) with "Learn more" link */
  teamsCallsMode?: boolean;
  /** Called when user clicks "Learn more" (only used when teamsCallsMode is true) */
  onLearnMore?: () => void;
}

const PHONE_OPTIONS_DEFAULT = [
  { id: 'work', label: 'Work', number: '(555) 123-4567' },
  { id: 'mobile', label: 'Mobile', number: '(555) 987-6543' },
  { id: 'other', label: 'Other', number: '(555) 456-7890' }
];

const PHONE_OPTIONS_TEAMS = [
  { id: 'home', label: 'Home', number: '(000) 000-0000' },
  { id: 'mobile', label: 'Mobile', number: '(000) 000-0000' },
  { id: 'work', label: 'Work', number: '(000) 000-0000' }
];

export function PhoneNumberSelector({ phone, onPhoneChange, teamsCallsMode = false, onLearnMore }: PhoneNumberSelectorProps) {
  const existingPhoneNumbers = teamsCallsMode ? PHONE_OPTIONS_TEAMS : PHONE_OPTIONS_DEFAULT;

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
    <div className="space-y-3 lg:space-y-4">
      {teamsCallsMode && (
        <p className="text-sm text-gray-700 mb-2">
          Your appointment will take place over video call, but we&apos;ll reach out by phone if we run into issues.{" "}
          <button
            type="button"
            onClick={onLearnMore}
            className="text-blue-700 hover:text-blue-800 underline font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          >
            Learn more
          </button>
        </p>
      )}
      <div className={`grid gap-3 lg:gap-3 ${teamsCallsMode ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
        {/* Existing phone numbers */}
        {existingPhoneNumbers.map((phoneOption) => (
          <label 
            key={phoneOption.id} 
            className={`block p-4 lg:p-4 rounded-lg lg:rounded-xl border cursor-pointer transition-colors duration-200 ease-out touch-manipulation ${
              selectedOption === phoneOption.id 
                ? 'ring-blue-700 ring-2 border-white hover:bg-blue-25 active:bg-blue-100' 
                : 'border-gray-400 hover:bg-gray-50 active:bg-gray-100'
            }`}
            style={{ minHeight: '60px' }}
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
                <div className="font-medium text-sm lg:text-base text-gray-800">{phoneOption.label}</div>
                <div className="text-sm lg:text-md text-gray-700">{phoneOption.number}</div>
              </div>
            </div>
          </label>
        ))}
        
        {/* Add one-time phone number option - single grid cell (same as other options) */}
        <label
          className={`block p-4 lg:p-4 rounded-lg lg:rounded-xl border cursor-pointer transition-colors duration-200 ease-out touch-manipulation ${
            selectedOption === 'custom'
              ? 'ring-blue-700 ring-2 border-white hover:bg-blue-25 active:bg-blue-100'
              : 'border-gray-400 hover:bg-gray-50 active:bg-gray-100'
          }`}
          style={{ minHeight: '60px' }}
        >
          <input
            type="radio"
            name="phone"
            value="custom"
            checked={selectedOption === 'custom'}
            onChange={() => handleOptionChange('custom')}
            className="sr-only"
          />
          <div className="flex justify-center items-center">
            <div className="text-center flex items-center py-2">
              <div className="font-medium text-sm lg:text-base text-gray-800">
                Add a one-time phone number
              </div>
              <div className="text-sm lg:text-md text-gray-700 invisible select-none" aria-hidden>.</div>
            </div>
          </div>
        </label>
      </div>
      
      {/* Custom phone input - appears outside the grid when selected */}
      {selectedOption === 'custom' && (
        <div>
          <label className="block text-xs lg:text-sm font-medium text-gray-900 mb-2">
            One-time phone number
          </label>
          <Input 
            type="tel" 
            value={customPhone} 
            onChange={e => handleCustomPhoneChange(e.target.value)} 
            placeholder="(000) 000-0000" 
            className="rounded-lg lg:rounded-xl border-gray-400 text-sm" 
          />
        </div>
      )}
    </div>
  );
} 