"use client"

import * as React from "react";
import { Input } from "@/components/ui/input";

interface PhoneNumberSelectorProps {
  phone: string;
  onPhoneChange: (phone: string) => void;
}

export function PhoneNumberSelector({ phone, onPhoneChange }: PhoneNumberSelectorProps) {
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
    <div className="space-y-3 lg:space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-3">
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
        
        {/* Add one-time phone number option */}
        <label className={`flex items-center justify-center p-4 lg:p-4 rounded-lg lg:rounded-xl border cursor-pointer transition-colors duration-200 ease-out touch-manipulation ${
          selectedOption === 'custom' 
            ? 'ring-blue-700 ring-2 border-white hover:bg-blue-25 active:bg-blue-100' 
            : 'border-gray-400 hover:bg-gray-50 active:bg-gray-100'
        }`}
        style={{ minHeight: '60px' }}>
          <input
            type="radio"
            name="phone"
            value="custom"
            checked={selectedOption === 'custom'}
            onChange={() => handleOptionChange('custom')}
            className="sr-only"
          />
          <div className="font-medium text-sm lg:text-base text-gray-800 text-center">Add a one time phone number</div>
        </label>
      </div>
      
      {/* Custom phone input - appears outside the grid when selected */}
      {selectedOption === 'custom' && (
        <div>
          <label className="block text-xs lg:text-sm font-medium text-gray-900 mb-2">
            One time phone number
          </label>
          <Input 
            type="tel" 
            value={customPhone} 
            onChange={e => handleCustomPhoneChange(e.target.value)} 
            placeholder="(000) 000-0000" 
            className="rounded-lg lg:rounded-xl border-gray-200 text-sm" 
          />
        </div>
      )}
    </div>
  );
} 