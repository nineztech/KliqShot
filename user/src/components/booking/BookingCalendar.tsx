'use client';

import { useState, useMemo } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface BookingCalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  selectedTimeSlots: string[];
  onTimeSlotSelect: (timeSlot: string) => void;
}

const timeSlots = [
  { start: '09:00 AM', end: '10:00 AM' },
  { start: '10:00 AM', end: '11:00 AM' },
  { start: '11:00 AM', end: '12:00 PM' },
  { start: '12:00 PM', end: '01:00 PM' },
  { start: '01:00 PM', end: '02:00 PM' },
  { start: '02:00 PM', end: '03:00 PM' },
  { start: '03:00 PM', end: '04:00 PM' },
  { start: '04:00 PM', end: '05:00 PM' },
  { start: '05:00 PM', end: '06:00 PM' },
  { start: '06:00 PM', end: '07:00 PM' },
  { start: '07:00 PM', end: '08:00 PM' },
  { start: '08:00 PM', end: '09:00 PM' }
];

// Mock unavailable dates - in real app, this would come from API
const unavailableDates = [
  new Date(2024, 11, 15), // December 15, 2024
  new Date(2024, 11, 22), // December 22, 2024
  new Date(2024, 11, 25), // December 25, 2024
  new Date(2024, 11, 31), // December 31, 2024
  new Date(2025, 9, 11),  // October 11, 2025
  new Date(2025, 9, 20),  // October 20, 2025
  new Date(2025, 9, 21),  // October 21, 2025
];

export default function BookingCalendar({ 
  selectedDate, 
  onDateSelect, 
  selectedTimeSlots, 
  onTimeSlotSelect 
}: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthYear = useMemo(() => {
    return currentMonth.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  }, [currentMonth]);

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Start from the first day of the week that contains the first day of the month
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    // Generate 42 days (6 weeks)
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  }, [currentMonth]);

  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some(unavailableDate => 
      date.toDateString() === unavailableDate.toDateString()
    );
  };

  const isDateAvailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return date >= today && !isDateUnavailable(date);
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  const isSelectedDate = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const handleDateClick = (date: Date) => {
    if (isDateAvailable(date)) {
      onDateSelect(date);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Date & Time</h2>
      
      {/* Calendar */}
      <div className="mb-8">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
          </button>
          
          <h3 className="text-xl font-semibold text-gray-900">{monthYear}</h3>
          
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ChevronRightIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((date, index) => {
            const available = isDateAvailable(date);
            const unavailable = isDateUnavailable(date);
            const currentMonthDate = isCurrentMonth(date);
            const selected = isSelectedDate(date);

            return (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                disabled={!available}
                className={`
                  p-3 text-sm rounded-lg transition-all duration-200 relative
                  ${!currentMonthDate ? 'text-gray-300' : ''}
                  ${selected 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : available 
                      ? 'hover:bg-blue-50 text-gray-900 cursor-pointer' 
                      : 'cursor-not-allowed'
                  }
                  ${unavailable ? 'bg-red-50 text-red-400' : ''}
                `}
              >
                {date.getDate()}
                
                {/* Availability Indicators */}
                {unavailable && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
            <span className="text-gray-600">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-600">Unavailable</span>
          </div>
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Select Time Slots (Multiple selection allowed)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mr-4">
            {timeSlots.map((timeSlot, index) => {
              const timeSlotString = `${timeSlot.start} - ${timeSlot.end}`;
              const isSelected = selectedTimeSlots.includes(timeSlotString);
              
              return (
                <button
                  key={index}
                  onClick={() => onTimeSlotSelect(timeSlotString)}
                  className={`
                    py-3  text-xs font-medium rounded-md border transition-all duration-200 text-center whitespace-nowrap
                    ${isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }
                  `}
                >
                  {timeSlot.start} - {timeSlot.end}
                </button>
              );
            })}
          </div>
          {/* {selectedTimeSlots.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
              <p className="text-sm text-blue-800">
                <span className="font-medium">Selected:</span> {selectedTimeSlots.length} hour{selectedTimeSlots.length > 1 ? 's' : ''} 
                ({selectedTimeSlots.join(', ')})
              </p>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
}
