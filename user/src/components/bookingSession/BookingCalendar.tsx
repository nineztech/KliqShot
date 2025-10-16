'use client';

import { useState, useMemo } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface BookingCalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  selectedTimeSlots: string[];
  onTimeSlotSelect: (timeSlot: string) => void;
  compact?: boolean;
  }

const timeSlots = [
  { start: '06:00 AM', end: '07:00 AM' },
  { start: '07:00 AM', end: '08:00 AM' },
  { start: '08:00 AM', end: '09:00 AM' },
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
  { start: '08:00 PM', end: '09:00 PM' },
  { start: '09:00 PM', end: '10:00 PM' },
  { start: '10:00 PM', end: '11:00 PM' },
  { start: '11:00 PM', end: '12:00 AM' }
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
  onTimeSlotSelect,
  compact = false
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
    <div className={compact ? "" : "bg-white rounded-lg shadow-sm p-3 h-full"}>
      {!compact && <h2 className="text-lg font-bold text-gray-900 mb-3">Select Date & Time</h2>}
      
      {/* Calendar */}
      <div className={compact ? "mb-3" : "mb-4"}>
        {/* Calendar Header */}
        <div className={`flex items-center justify-between ${compact ? 'mb-2' : 'mb-3'}`}>
          <button
            onClick={handlePrevMonth}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ChevronLeftIcon className={compact ? "w-3.5 h-3.5 text-gray-600" : "w-4 h-4 text-gray-600"} />
          </button>
          
          <h3 className={compact ? "text-sm font-semibold text-gray-900" : "text-base font-semibold text-gray-900"}>{monthYear}</h3>
          
          <button
            onClick={handleNextMonth}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ChevronRightIcon className={compact ? "w-3.5 h-3.5 text-gray-600" : "w-4 h-4 text-gray-600"} />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-0.5 mb-0.5">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className={`text-center font-medium text-gray-500 ${compact ? 'p-0.5 text-[10px]' : 'p-1 text-xs'}`}>
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-0.5">
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
                  ${compact ? 'p-1 text-[10px]' : 'p-1.5 text-xs'} rounded-md transition-all duration-200 relative
                  ${!currentMonthDate ? 'text-gray-300' : ''}
                  ${selected 
                    ? 'bg-blue-600 text-white shadow-md' 
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
                  <div className={`absolute bottom-0.5 left-1/2 transform -translate-x-1/2 bg-red-500 rounded-full ${compact ? 'w-0.5 h-0.5' : 'w-1 h-1'}`}></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className={`flex items-center justify-center space-x-4 mt-2 ${compact ? 'text-[10px]' : 'text-xs'}`}>
          <div className="flex items-center space-x-1.5">
            <div className={`bg-gray-200 rounded-full ${compact ? 'w-1.5 h-1.5' : 'w-2 h-2'}`}></div>
            <span className="text-gray-600">Available</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className={`bg-red-500 rounded-full ${compact ? 'w-1.5 h-1.5' : 'w-2 h-2'}`}></div>
            <span className="text-gray-600">Unavailable</span>
          </div>
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div className={compact ? "mt-3" : "mt-4"}>
          <h3 className={`font-semibold text-gray-900 ${compact ? 'text-xs mb-2' : 'text-sm mb-3'}`}>
            Select Time Slots (Multiple selection allowed)
          </h3>
          <div className={`grid gap-1.5 ${compact ? 'grid-cols-3 md:grid-cols-4 lg:grid-cols-6 max-h-32 overflow-y-auto' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
            {timeSlots.map((timeSlot, index) => {
              const timeSlotString = `${timeSlot.start} - ${timeSlot.end}`;
              const isSelected = selectedTimeSlots.includes(timeSlotString);
              
              return (
                <button
                  key={index}
                  onClick={() => onTimeSlotSelect(timeSlotString)}
                  className={`
                    ${compact ? 'py-1 px-0.5 text-[9px]' : 'py-2 px-2 text-[10px]'} font-medium rounded-md border transition-all duration-200 text-center whitespace-nowrap
                    ${isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }
                  `}
                >
                  {compact ? `${timeSlot.start.split(' ')[0]}-${timeSlot.end.split(' ')[0]}` : `${timeSlot.start} - ${timeSlot.end}`}
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