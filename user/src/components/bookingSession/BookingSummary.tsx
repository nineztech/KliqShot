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
  selectedAddons: { [key: number]: number };
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
    
    const selectedAddonDetails = availableAddons
      .filter(addon => selectedAddons[addon.id] > 0)
      .map(addon => ({
        ...addon,
        quantity: selectedAddons[addon.id]
      }));
    
    const addonsTotal = selectedAddonDetails.reduce((sum, addon) => sum + (addon.price * addon.quantity), 0);
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
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Booking Summary</h2>
      
      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Left Column - Session Details */}
        <div className="lg:col-span-1">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Session Details</h3>
          <div className="space-y-2">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1">Photographer</div>
              <div className="font-semibold text-gray-900 text-sm">{bookingData.photographerName}</div>
            </div>
            
            {bookingData.category && (
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">Service</div>
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-gray-900 capitalize text-sm">
                    {bookingData.category}
                    {bookingData.subcategory && ` - ${bookingData.subcategory}`}
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-blue-600">₹{basePrice.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Base Price</div>
                  </div>
                </div>
              </div>
            )}
            
            {selectedDate && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3">
                <div className="text-xs text-blue-600 mb-1">Date</div>
                <div className="font-semibold text-gray-900 text-sm">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric'
                  })}
                </div>
              </div>
            )}
            
            {selectedTimeSlots.length > 0 && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3">
                <div className="text-xs text-green-600 mb-1">Duration</div>
                <div className="font-semibold text-gray-900 text-sm">
                  {selectedTimeSlots.length} hour{selectedTimeSlots.length > 1 ? 's' : ''}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Billing Details */}
        <div className="lg:col-span-2">
          <h3 className="text-xs font-semibold text-gray-900 mb-2">Billing Details</h3>
          
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-2">
            <div className="space-y-1.5">
              {/* Base Session */}
              <div className="flex justify-between items-center py-1 border-b border-gray-200">
                <div>
                  <span className="text-xs text-gray-700 font-medium">
                    Photography Session
                  </span>
                  <div className="text-[10px] text-gray-500">
                    {sessionHours} hour{sessionHours > 1 ? 's' : ''} @ ₹{hourlyRate.toLocaleString()}/hour
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-900">₹{basePrice.toLocaleString()}</span>
              </div>

              {/* Selected Add-ons */}
              {selectedAddonDetails.map((addon) => (
                <div key={addon.id} className="flex justify-between items-center py-1 border-b border-gray-200">
                  <div>
                    <span className="text-xs text-gray-700 font-medium">
                      {addon.name}
                      {addon.quantity > 1 && (
                        <span className="ml-1 text-blue-600 font-semibold">× {addon.quantity}</span>
                      )}
                    </span>
                    <div className="text-[10px] text-gray-500">
                      ₹{addon.price.toLocaleString()} each
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-900">₹{(addon.price * addon.quantity).toLocaleString()}</span>
                </div>
              ))}

              {/* Subtotal */}
              <div className="flex justify-between items-center py-1 border-b-2 border-gray-300">
                <span className="text-xs font-semibold text-gray-800">Subtotal</span>
                <span className="text-xs font-bold text-gray-900">₹{(basePrice + addonsTotal).toLocaleString()}</span>
              </div>

              {/* GST */}
              <div className="flex justify-between items-center py-0.5">
                <span className="text-xs text-gray-600">GST (18%)</span>
                <span className="text-xs font-medium text-gray-700">₹{gst.toLocaleString()}</span>
              </div>

              {/* Platform Fee */}
              <div className="flex justify-between items-center py-0.5">
                <span className="text-xs text-gray-600">Platform Fee</span>
                <span className="text-xs font-medium text-gray-700">₹{platformFee.toLocaleString()}</span>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg px-2 mt-2">
                <span className="text-sm font-bold text-gray-900">Total Amount</span>
                <span className="text-lg font-bold text-blue-600">₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Time Slots Display - Compact */}
      {selectedTimeSlots.length > 0 && (
        <div className="mb-4 bg-blue-50 rounded-lg p-3">
          <div className="text-xs text-blue-700 font-medium mb-2">Selected Time Slots:</div>
          <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
            {selectedTimeSlots.map((slot, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                {slot}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Booking Status */}
      {!isBookingReady && (
        <div className="mb-3 bg-yellow-50 border border-yellow-200 rounded-md p-2">
          <p className="text-xs text-yellow-800">
            Please select a date and time slots to proceed with booking.
          </p>
        </div>
      )}

      {/* Confirm Booking Button */}
      <div className="mb-2">
        <button
          onClick={handleConfirmBooking}
          disabled={!isBookingReady}
          className={`
            w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200
            ${isBookingReady
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
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
