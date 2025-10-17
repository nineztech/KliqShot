'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { TrashIcon, PlusIcon, MinusIcon, ArrowLeftIcon, CalendarIcon, ClockIcon, UserIcon, TagIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { useCart } from './CartContext';

export default function DesktopCartPage() {
  const router = useRouter();
  const { items, itemCount, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    // Create URL parameters with all cart items
    const params = new URLSearchParams();
    
    // Add each cart item as a separate parameter
    items.forEach((item, index) => {
      const itemId = item.timestamp ? `booking_${item.timestamp}` : item.id;
      const hourlyRate = parseInt(item.price.toString().replace(/[^\d]/g, '')) || 0;
      const timeSlotsCount = item.selectedTimeSlots ? item.selectedTimeSlots.length : 1;
      const basePrice = hourlyRate * timeSlotsCount;
      const addonTotal = item.addons ? item.addons.reduce((sum, addon) => sum + (addon.price * addon.quantity), 0) : 0;
      const totalPrice = (basePrice + addonTotal) * (item.quantity || 1);

      params.append(`item${index}_photographerId`, item.photographerId || '');
      params.append(`item${index}_photographerName`, item.photographerName || item.name);
      params.append(`item${index}_price`, item.price.toString());
      params.append(`item${index}_category`, item.category || '');
      params.append(`item${index}_subcategory`, item.subcategory || '');
      params.append(`item${index}_selectedDate`, item.selectedDate || '');
      params.append(`item${index}_selectedTimeSlots`, item.selectedTimeSlots ? item.selectedTimeSlots.join(',') : '');
      params.append(`item${index}_addons`, item.addons ? JSON.stringify(item.addons) : '');
      params.append(`item${index}_totalPrice`, totalPrice.toString());
    });

    // Add total bill
    params.append('totalBill', getTotalPrice().toString());
    params.append('itemCount', items.length.toString());

    // Navigate to booking summary page
    router.push(`/booking/summary?${params.toString()}`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          </div>

          {/* Empty Cart */}
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some photography packages to get started!</p>
            <button
              onClick={() => router.push('/')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart ({itemCount} items)</h1>
          </div>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const itemId = item.timestamp ? `booking_${item.timestamp}` : item.id;
              const hourlyRate = parseInt(item.price.toString().replace(/[^\d]/g, '')) || 0;
              const timeSlotsCount = item.selectedTimeSlots ? item.selectedTimeSlots.length : 1;
              const basePrice = hourlyRate * timeSlotsCount;
              const addonTotal = item.addons ? item.addons.reduce((sum, addon) => sum + (addon.price * addon.quantity), 0) : 0;
              const totalPrice = (basePrice + addonTotal) * (item.quantity || 1);
              
              return (
                <div key={itemId} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <UserIcon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{item.photographerName || item.name}</h3>
                          <p className="text-sm text-gray-600">Photography Session</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">₹{totalPrice.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Total Price</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Service Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {/* Left Column */}
                      <div className="space-y-3">
                        {/* Category & Subcategory */}
                        {(item.category || item.subcategory) && (
                          <div className="flex items-center space-x-2">
                            <TagIcon className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">Service:</span>
                            <span className="font-medium text-gray-900 capitalize">
                              {item.category}
                              {item.subcategory && ` - ${item.subcategory}`}
                            </span>
                          </div>
                        )}

                        {/* Date */}
                        {item.selectedDate && (
                          <div className="flex items-center space-x-2">
                            <CalendarIcon className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">Date:</span>
                            <span className="font-medium text-gray-900">{item.selectedDate}</span>
                          </div>
                        )}

                        {/* Time Slots */}
                        {item.selectedTimeSlots && item.selectedTimeSlots.length > 0 && (
                          <div className="flex items-start space-x-2">
                            <ClockIcon className="w-4 h-4 text-gray-400 mt-0.5" />
                            <div>
                              <span className="text-sm text-gray-600">Time Slots:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {item.selectedTimeSlots.map((slot, index) => (
                                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                    {slot}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                    )}
                  </div>

                      {/* Right Column - Pricing Breakdown */}
                      <div className="bg-gray-50 rounded-lg p-3">
                        <h4 className="font-semibold text-gray-900 mb-2">Pricing Breakdown</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <div className="flex flex-col">
                              <span className="text-gray-600">Base Price:</span>
                              <span className="text-xs text-blue-600">1 hr base price</span>
                            </div>
                            <span className="font-medium">₹{basePrice.toLocaleString()}</span>
                          </div>
                          {item.addons && item.addons.length > 0 && (
                            <>
                              <div className="border-t border-gray-200 pt-2">
                                <span className="text-gray-600">Add-ons:</span>
                              </div>
                              {item.addons.map((addon, index) => (
                                <div key={index} className="flex justify-between ml-4">
                                  <div className="flex flex-col">
                                    <span className="text-gray-600 text-xs">{addon.name}:</span>
                                    <span className="text-xs text-blue-600">₹{addon.price.toLocaleString()} × {addon.quantity}</span>
                                  </div>
                                  <span className="font-medium text-xs">₹{(addon.price * addon.quantity).toLocaleString()}</span>
                                </div>
                              ))}
                            </>
                          )}
                          <div className="border-t border-gray-200 pt-2">
                            <div className="flex justify-between font-semibold">
                              <span>Subtotal:</span>
                              <span>₹{(basePrice + addonTotal).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>Quantity: {item.quantity || 1}</span>
                              <span>Total: ₹{totalPrice.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>


                    {/* Actions */}
                    <div className="flex items-center justify-end pt-4 border-t border-gray-200">
                  <button
                        onClick={() => removeFromCart(itemId)}
                        className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <TrashIcon className="h-4 w-4" />
                        <span className="font-medium">Remove</span>
                  </button>
                </div>
              </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
               <div className="space-y-3 mb-4">
                 <div className="flex justify-between text-gray-600">
                   <span>Subtotal ({itemCount} items)</span>
                   <span>₹{getTotalPrice().toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-gray-600">
                   <span>Service Fee</span>
                   <span className="text-green-600">Included</span>
                 </div>
                 <div className="flex justify-between text-gray-600">
                   <span>Processing Fee</span>
                   <span className="text-green-600">Free</span>
                 </div>
                 <div className="border-t border-gray-200 pt-3">
                   <div className="flex justify-between text-lg font-semibold text-gray-900">
                     <span>Total</span>
                     <span>₹{getTotalPrice().toLocaleString()}</span>
                   </div>
                 </div>
               </div>

               <button
                 onClick={handleCheckout}
                 className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium"
               >
                 Proceed to Booking
               </button>

              <div className="mt-4 text-center">
                <button
                  onClick={() => router.push('/')}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
