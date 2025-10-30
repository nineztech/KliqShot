'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import BookingCalendar from './BookingCalendar';
import AddonsSelection from './AddonsSelection';

// Force TypeScript recompilation

interface BookingData {
  photographerId: string;
  photographerName: string;
  price: string;
  category: string;
  subcategory: string;
  package?: string;
}

interface BookingPageProps {
  bookingData: BookingData;
}

interface AddonSelection {
  quantity: number;
  hours: number;
}

export default function BookingPage({ bookingData }: BookingPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<{ [key: number]: AddonSelection }>({});
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [source, setSource] = useState<string>('buynow');

  useEffect(() => {
    // Get source parameter from URL
    const sourceParam = searchParams.get('source');
    if (sourceParam) {
      setSource(sourceParam);
    }
    
    // Get pre-selected date from URL if available
    const dateParam = searchParams.get('selectedDate');
    if (dateParam) {
      const date = new Date(dateParam);
      if (!isNaN(date.getTime())) {
        setSelectedDate(date);
      }
    }
    
    // Get pre-selected time slots from URL if available
    const timeSlotsParam = searchParams.get('selectedTimeSlots');
    if (timeSlotsParam) {
      const timeSlots = timeSlotsParam.split(',').filter(slot => slot.trim() !== '');
      setSelectedTimeSlots(timeSlots);
    }
  }, [searchParams]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTimeSlots([]); // Reset time slots when date changes
  };

  const handleAddonToggle = (addonId: number, quantity: number, hours: number) => {
    setSelectedAddons(prev => {
      if (quantity === 0) {
        const { [addonId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [addonId]: { quantity, hours } };
    });
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

  const handleAddToCart = () => {
    if (!selectedDate || selectedTimeSlots.length === 0) {
      alert('Please select a date and time slots');
      return;
    }

    // Prepare addons data
    const addonsArray = Object.entries(selectedAddons).map(([id, selection]) => ({
      id: parseInt(id),
      name: getAddonName(parseInt(id)),
      price: getAddonPrice(parseInt(id)),
      quantity: selection.quantity,
      hours: selection.hours
    }));

    // Create cart item
    const cartItem = {
      photographerId: bookingData.photographerId,
      photographerName: bookingData.photographerName,
      price: bookingData.price,
      category: bookingData.category,
      subcategory: bookingData.subcategory,
      selectedDate: selectedDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      selectedTimeSlots: selectedTimeSlots,
      addons: addonsArray,
      timestamp: new Date().getTime()
    };

    // Store in localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    existingCart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(existingCart));

    // Show success message and redirect
    alert('Added to cart successfully!');
    router.back();
  };

  const handleProceedToSummary = () => {
    if (!selectedDate || selectedTimeSlots.length === 0) {
      alert('Please select a date and time slots');
      return;
    }

    // Prepare addons data
    const addonsArray = Object.entries(selectedAddons).map(([id, selection]) => ({
      id: parseInt(id),
      name: getAddonName(parseInt(id)),
      price: getAddonPrice(parseInt(id)),
      quantity: selection.quantity,
      hours: selection.hours
    }));

    // Create URL parameters
    const params = new URLSearchParams();
    params.append('photographerId', bookingData.photographerId);
    params.append('photographerName', bookingData.photographerName);
    params.append('price', bookingData.price);
    
    if (bookingData.category) {
      params.append('category', bookingData.category);
    }
    if (bookingData.subcategory) {
      params.append('subcategory', bookingData.subcategory);
    }
    if (bookingData.package) {
      params.append('package', bookingData.package);
    }
    
    params.append('selectedDate', selectedDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
    params.append('selectedTimeSlots', selectedTimeSlots.join(','));
    
    if (addonsArray.length > 0) {
      params.append('addons', encodeURIComponent(JSON.stringify(addonsArray)));
    }

    // Navigate to summary page
    router.push(`/booking/summary?${params.toString()}`);
  };

  // Helper functions to get addon details
  const getAddonName = (id: number): string => {
    const addonNames: { [key: number]: string } = {
      1: 'Extra Hours',
      2: 'Drone Photography',
      3: 'Photo Album',
      4: 'Video Coverage',
      5: 'Same Day Delivery',
      6: 'Makeup Artist'
    };
    return addonNames[id] || 'Unknown';
  };

  const getAddonPrice = (id: number): number => {
    const addonPrices: { [key: number]: number } = {
      1: 500,
      2: 2000,
      3: 1500,
      4: 3000,
      5: 800,
      6: 2500
    };
    return addonPrices[id] || 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-4">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-5 w-full">
            <div className="flex items-center mb-3">
              <button
                onClick={handleBackClick}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-all duration-200 mr-4 group"
              >
                <svg className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Book Photography Session</h1>
            </div>
              <div className="flex items-center justify-between text-gray-600 bg-gray-50 rounded-lg px-4 py-3">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="font-semibold text-gray-700">Photographer:</span>
                  <span className="font-medium text-gray-900">{bookingData.photographerName}</span>
                </div>
                {bookingData.package ? (
                  <>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-700">Package:</span>
                      <span className="capitalize font-medium text-purple-600 bg-purple-100 px-2 py-0.5 rounded-md">{bookingData.package}</span>
                    </div>
                  </>
                ) : bookingData.category && (
                  <>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
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
              <div className="text-right">
                <div className="text-lg font-bold text-blue-600">{bookingData.price}</div>
                <div className="text-xs text-gray-500">Base Price</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Calendar */}
          <div className="h-[600px]">
            <BookingCalendar
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              selectedTimeSlots={selectedTimeSlots}
              onTimeSlotSelect={handleTimeSlotSelect}
            />
          </div>

          {/* Right Column - Add-ons */}
          <div className="h-[600px]">
            <AddonsSelection
              selectedAddons={selectedAddons}
              onAddonToggle={handleAddonToggle}
              selectedTimeSlots={selectedTimeSlots}
            />
          </div>
        </div>

        {/* Action Button - Add to Cart or Proceed to Summary based on source */}
        <div className="mt-6 ">
          {source === 'cart' ? (
            <button
              onClick={handleAddToCart}
              disabled={!selectedDate || selectedTimeSlots.length === 0}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 ${
                selectedDate && selectedTimeSlots.length > 0
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Add to Cart</span>
            </button>
          ) : (
            <button
              onClick={handleProceedToSummary}
              disabled={!selectedDate || selectedTimeSlots.length === 0}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 ${
                selectedDate && selectedTimeSlots.length > 0
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>Proceed to Summary</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
