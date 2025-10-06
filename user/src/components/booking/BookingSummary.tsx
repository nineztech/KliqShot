'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

// Updated interface for multiple time slots

interface BookingData {
  photographerId: string;
  photographerName: string;
  price: string;
  category: string;
  subcategory: string;
}

interface Addon {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface BookingSummaryProps {
  bookingData: BookingData;
  selectedDate: Date | null;
  selectedTimeSlots: string[];
  selectedAddons: number[];
}

const availableAddons: Addon[] = [
  {
    id: 1,
    name: "Extra Hours",
    price: 500,
    description: "Extend your photography session with additional hours"
  },
  {
    id: 2,
    name: "Drone Photography",
    price: 2000,
    description: "Aerial shots and cinematic drone footage"
  },
  {
    id: 3,
    name: "Photo Album",
    price: 1500,
    description: "Premium printed photo album with 50 pages"
  },
  {
    id: 4,
    name: "Video Coverage",
    price: 3000,
    description: "Professional video recording and editing"
  },
  {
    id: 5,
    name: "Same Day Delivery",
    price: 800,
    description: "Get your photos delivered on the same day"
  },
  {
    id: 6,
    name: "Makeup Artist",
    price: 2500,
    description: "Professional makeup artist for the session"
  }
];

export default function BookingSummary({ 
  bookingData, 
  selectedDate, 
  selectedTimeSlots, 
  selectedAddons 
}: BookingSummaryProps) {
  const router = useRouter();

  const { hourlyRate, sessionHours, basePrice, addonsTotal, gst, platformFee, totalPrice, selectedAddonDetails } = useMemo(() => {
    const hourlyRate = parseInt(bookingData.price.replace(/[₹,]/g, '')) || 299; // Default to 299 if price is not available
    const sessionHours = selectedTimeSlots.length;
    const basePrice = hourlyRate * sessionHours;
    
    const selectedAddonDetails = availableAddons.filter(addon => 
      selectedAddons.includes(addon.id)
    );
    
    const addonsTotal = selectedAddonDetails.reduce((sum, addon) => sum + addon.price, 0);
    const subtotal = basePrice + addonsTotal;
    const gst = Math.round(subtotal * 0.18); // 18% GST
    const platformFee = 50; // Fixed platform fee of ₹50
    const totalPrice = subtotal + gst + platformFee;

    return {
      hourlyRate,
      sessionHours,
      basePrice,
      addonsTotal,
      gst,
      platformFee,
      totalPrice,
      selectedAddonDetails
    };
  }, [bookingData.price, selectedTimeSlots.length, selectedAddons]);

  const isBookingReady = selectedDate && selectedTimeSlots.length > 0;

  const handleConfirmBooking = () => {
    if (!isBookingReady) return;

    // In a real app, this would make an API call to create the booking
    const bookingDetails = {
      photographerId: bookingData.photographerId,
      photographerName: bookingData.photographerName,
      category: bookingData.category,
      subcategory: bookingData.subcategory,
      date: selectedDate?.toISOString(),
      timeSlots: selectedTimeSlots,
      addons: selectedAddonDetails,
      totalPrice
    };

    console.log('Booking Details:', bookingDetails);
    
    // Navigate to confirmation page or show success message
    alert('Booking confirmed! You will receive a confirmation email shortly.');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Summary</h2>
      
      {/* Session Details Grid */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Photographer</div>
            <div className="font-semibold text-gray-900">{bookingData.photographerName}</div>
          </div>
          
          {bookingData.category && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Service</div>
              <div className="font-semibold text-gray-900 capitalize">
                {bookingData.category}
                {bookingData.subcategory && ` - ${bookingData.subcategory}`}
              </div>
            </div>
          )}
          
          {selectedDate && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Date</div>
              <div className="font-semibold text-gray-900">
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric'
                })}
              </div>
            </div>
          )}
          
          {selectedTimeSlots.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Duration</div>
              <div className="font-semibold text-gray-900">
                {selectedTimeSlots.length} hour{selectedTimeSlots.length > 1 ? 's' : ''}
              </div>
            </div>
          )}
        </div>
        
        {/* Time Slots Display */}
        {selectedTimeSlots.length > 0 && (
          <div className="mt-4 bg-blue-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-2">Selected Time Slots:</div>
            <div className="flex flex-wrap gap-2">
              {selectedTimeSlots.map((slot, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {slot}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Billing Details */}
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900 mb-3">Billing Details</h3>
        
        <div className="bg-gray-50 rounded-md p-3">
          <div className="text-xs">
            {/* Base Session */}
            <div className="flex justify-between items-center py-1 border-b border-gray-200">
              <span className="text-gray-600">
                Photography Session ({sessionHours} hour{sessionHours > 1 ? 's' : ''} @ ₹{hourlyRate.toLocaleString()}/hour)
              </span>
              <span className="font-medium">₹{basePrice.toLocaleString()}</span>
            </div>

            {/* Selected Add-ons */}
            {selectedAddonDetails.map((addon) => (
              <div key={addon.id} className="flex justify-between items-center py-1 border-b border-gray-200">
                <span className="text-gray-600">{addon.name}</span>
                <span className="font-medium">₹{addon.price.toLocaleString()}</span>
              </div>
            ))}

            {/* Subtotal */}
            <div className="flex justify-between items-center py-1 border-b border-gray-300">
              <span className="text-gray-600 font-medium">Subtotal</span>
              <span className="font-medium">₹{(basePrice + addonsTotal).toLocaleString()}</span>
            </div>

            {/* GST */}
            <div className="flex justify-between items-center py-1 border-b border-gray-200">
              <span className="text-gray-600">GST (18%)</span>
              <span className="font-medium">₹{gst.toLocaleString()}</span>
            </div>

            {/* Platform Fee */}
            <div className="flex justify-between items-center py-1 border-b border-gray-200">
              <span className="text-gray-600">Platform Fee</span>
              <span className="font-medium">₹{platformFee.toLocaleString()}</span>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center py-1">
              <span className="font-bold text-gray-900">Total Amount</span>
              <span className="font-bold text-blue-600">₹{totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Status */}
      {!isBookingReady && (
        <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-md p-3">
          <p className="text-xs text-yellow-800">
            Please select a date and time slots to proceed with booking.
          </p>
        </div>
      )}

      {/* Confirm Booking Button */}
      <div className="mb-3">
        <button
          onClick={handleConfirmBooking}
          disabled={!isBookingReady}
          className={`
            w-full py-3 px-4 rounded-md font-semibold text-sm transition-all duration-200
            ${isBookingReady
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          {isBookingReady ? 'Confirm Booking' : 'Select Date & Time'}
        </button>
      </div>

      {/* Additional Info */}
      <div className="text-center">
        <p className="text-xs text-gray-500">
          🔒 Secure booking with instant confirmation • All prices include taxes
        </p>
      </div>
    </div>
  );
}
