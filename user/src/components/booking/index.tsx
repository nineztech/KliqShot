'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import BookingCalendar from './BookingCalendar';
import AddonsSelection from './AddonsSelection';
import BookingSummary from './BookingSummary';

// Force TypeScript recompilation

interface BookingData {
  photographerId: string;
  photographerName: string;
  price: string;
  category: string;
  subcategory: string;
}

interface BookingPageProps {
  bookingData: BookingData;
}

export default function BookingPage({ bookingData }: BookingPageProps) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<number[]>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTimeSlots([]); // Reset time slots when date changes
  };

  const handleAddonToggle = (addonId: number) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlots(prev => 
      prev.includes(timeSlot) 
        ? prev.filter(slot => slot !== timeSlot)
        : [...prev, timeSlot]
    );
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBackClick}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Photography Session</h1>
            <div className="flex items-center space-x-4 text-gray-600">
              <span className="font-medium">Photographer:</span>
              <span>{bookingData.photographerName}</span>
              {bookingData.category && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="font-medium">Service:</span>
                  <span className="capitalize">{bookingData.category}</span>
                  {bookingData.subcategory && (
                    <>
                      <span className="text-gray-400">-</span>
                      <span className="capitalize">{bookingData.subcategory}</span>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Calendar */}
          <div>
            <BookingCalendar
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              selectedTimeSlots={selectedTimeSlots}
              onTimeSlotSelect={handleTimeSlotSelect}
            />
          </div>

          {/* Right Column - Add-ons */}
          <div>
            <AddonsSelection
              selectedAddons={selectedAddons}
              onAddonToggle={handleAddonToggle}
            />
          </div>
        </div>

        {/* Full Width Booking Summary */}
        <div className="mt-8">
          <BookingSummary
            bookingData={bookingData}
            selectedDate={selectedDate}
            selectedTimeSlots={selectedTimeSlots}
            selectedAddons={selectedAddons}
          />
        </div>
      </div>
    </div>
  );
}
