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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        {/* Header */}
        <div className="mb-3">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 w-full">
            <div className="flex items-center mb-2">
              <button
                onClick={handleBackClick}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-all duration-200 mr-3 group"
              >
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Book Photography Session</h1>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span className="font-semibold text-gray-700">Photographer:</span>
                <span className="font-medium text-gray-900">{bookingData.photographerName}</span>
              </div>
              {bookingData.category && (
                <>
                  <div className="w-0.5 h-0.5 bg-gray-400 rounded-full"></div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-700">Service:</span>
                    <span className="capitalize font-medium text-gray-900">{bookingData.category}</span>
                    {bookingData.subcategory && (
                      <>
                        <span className="text-gray-400">-</span>
                        <span className="capitalize font-medium text-gray-900">{bookingData.subcategory}</span>
                      </>
                    )}
                  </div>
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
