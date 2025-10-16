'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/navbar';
import { 
  ArrowLeftIcon, 
  TagIcon, 
  ShieldCheckIcon, 
  TruckIcon,
  CreditCardIcon,
  CheckCircleIcon,
  XMarkIcon,
  TicketIcon,
  SparklesIcon,
  ClockIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';

interface Addon {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface BookingSummaryData {
  photographerId: string;
  photographerName: string;
  photographerImage: string;
  price: string;
  category: string;
  subcategory: string;
  selectedDate: string;
  selectedTimeSlots: string[];
  selectedAddons: Addon[];
}

interface CartItem {
  photographerId: string;
  photographerName: string;
  photographerImage: string;
  price: string;
  category: string;
  subcategory: string;
  selectedDate: string;
  selectedTimeSlots: string[];
  selectedAddons: Addon[];
  totalPrice: number;
}

function BookingSummaryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [showCouponList, setShowCouponList] = useState(false);
  const [rushDelivery, setRushDelivery] = useState(false);
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'wallet' | 'cod'>('card');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Parse booking data from URL
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalBill, setTotalBill] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    // Check if we have multiple cart items or single booking
    const itemCountParam = searchParams.get('itemCount');
    const totalBillParam = searchParams.get('totalBill');
    
    if (itemCountParam && totalBillParam) {
      // Multiple cart items
      const count = parseInt(itemCountParam);
      const bill = parseFloat(totalBillParam);
      setItemCount(count);
      setTotalBill(bill);
      
      const items: CartItem[] = [];
      for (let i = 0; i < count; i++) {
        const photographerId = searchParams.get(`item${i}_photographerId`);
        const photographerName = searchParams.get(`item${i}_photographerName`);
        const photographerImage = searchParams.get(`item${i}_photographerImage`) || '';
        const price = searchParams.get(`item${i}_price`);
        const category = searchParams.get(`item${i}_category`);
        const subcategory = searchParams.get(`item${i}_subcategory`);
        const selectedDate = searchParams.get(`item${i}_selectedDate`);
        const selectedTimeSlots = searchParams.get(`item${i}_selectedTimeSlots`)?.split(',') || [];
        const addonsData = searchParams.get(`item${i}_addons`);
        const totalPrice = parseFloat(searchParams.get(`item${i}_totalPrice`) || '0');

        let parsedAddons: Addon[] = [];
        if (addonsData) {
          try {
            parsedAddons = JSON.parse(decodeURIComponent(addonsData));
          } catch (e) {
            console.error('Error parsing addons:', e);
          }
        }

        if (photographerId && photographerName && price) {
          items.push({
            photographerId,
            photographerName,
            photographerImage,
            price,
            category: category || '',
            subcategory: subcategory || '',
            selectedDate: selectedDate || '',
            selectedTimeSlots,
            selectedAddons: parsedAddons,
            totalPrice,
          });
        }
      }
      setCartItems(items);
    } else {
      // Single booking (legacy support)
      const photographerId = searchParams.get('photographerId');
      const photographerName = searchParams.get('photographerName');
      const photographerImage = searchParams.get('photographerImage');
      const price = searchParams.get('price');
      const category = searchParams.get('category');
      const subcategory = searchParams.get('subcategory');
      const selectedDate = searchParams.get('selectedDate');
      const selectedTimeSlots = searchParams.get('selectedTimeSlots')?.split(',') || [];
      const addonsData = searchParams.get('addons');

      let parsedAddons: Addon[] = [];
      if (addonsData) {
        try {
          parsedAddons = JSON.parse(decodeURIComponent(addonsData));
        } catch (e) {
          console.error('Error parsing addons:', e);
        }
      }

      if (photographerId && photographerName && price) {
        const item: CartItem = {
          photographerId,
          photographerName,
          photographerImage: photographerImage || '',
          price,
          category: category || '',
          subcategory: subcategory || '',
          selectedDate: selectedDate || '',
          selectedTimeSlots,
          selectedAddons: parsedAddons,
          totalPrice: 0, // Will be calculated
        };
        setCartItems([item]);
        setItemCount(1);
      }
    }
  }, [searchParams]);

  // Available coupons
  const availableCoupons = [
    { code: 'FIRST50', discount: 50, description: 'Flat ₹50 off on first booking', minOrder: 500 },
    { code: 'PHOTO100', discount: 100, description: 'Get ₹100 off on bookings above ₹1000', minOrder: 1000 },
    { code: 'SAVE200', discount: 200, description: 'Save ₹200 on bookings above ₹2000', minOrder: 2000 },
    { code: 'WEEKEND15', discount: 15, description: '15% off on weekend bookings', minOrder: 0, isPercentage: true },
  ];

  const calculateBasePrice = () => {
    if (cartItems.length === 0) return 0;
    
    return cartItems.reduce((total, item) => {
      const priceStr = item.price.replace(/[₹,]/g, '');
      const basePrice = parseFloat(priceStr);
      const hours = item.selectedTimeSlots.length;
      return total + (basePrice * hours);
    }, 0);
  };

  const calculateAddonsTotal = () => {
    if (cartItems.length === 0) return 0;
    
    return cartItems.reduce((total, item) => {
      return total + item.selectedAddons.reduce((addonTotal, addon) => {
        return addonTotal + (addon.price * addon.quantity);
      }, 0);
    }, 0);
  };

  const calculateSubtotal = () => {
    return calculateBasePrice() + calculateAddonsTotal();
  };

  const calculateTax = () => {
    return Math.round(calculateSubtotal() * 0.18); // 18% GST
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    const rushDeliveryFee = rushDelivery ? 500 : 0;
    return subtotal + tax + rushDeliveryFee - discount;
  };

  const handleApplyCoupon = (code?: string) => {
    const couponToApply = code || couponCode;
    const coupon = availableCoupons.find(c => c.code === couponToApply);
    
    if (coupon) {
      const subtotal = calculateSubtotal();
      if (subtotal >= coupon.minOrder) {
        let discountAmount = coupon.discount;
        if (coupon.isPercentage) {
          discountAmount = Math.round(subtotal * (coupon.discount / 100));
        }
        setDiscount(discountAmount);
        setAppliedCoupon(coupon.code);
        setCouponCode('');
        setShowCouponList(false);
      } else {
        alert(`Minimum order value should be ₹${coupon.minOrder}`);
      }
    } else {
      alert('Invalid coupon code');
    }
  };

  const handleRemoveCoupon = () => {
    setDiscount(0);
    setAppliedCoupon(null);
  };

  const handleProceedToPayment = () => {
    if (!agreeToTerms) {
      alert('Please agree to terms and conditions');
      return;
    }
    // Process payment
    alert('Processing payment...');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <button
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 mr-3"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Booking Summary</h1>
          </div>
          <p className="text-gray-600 text-sm">Review your booking details and complete payment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Booking Details */}
          <div className="lg:col-span-2 space-y-4">
            {/* Cart Items */}
            {cartItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <CameraIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold text-gray-900">{item.photographerName}</h3>
                      <span className="text-blue-600 font-medium text-sm">{item.category}</span>
                      {item.subcategory && (
                        <span className="text-gray-600 text-sm">{item.subcategory}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">₹{item.totalPrice.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Total Price</div>
                  </div>
                </div>
                
                {/* Service Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    {item.selectedDate && (
                      <div className="flex items-center space-x-2">
                        <CalendarDaysIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Date:</span>
                        <span className="font-medium text-gray-900 text-sm">{item.selectedDate}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Duration:</span>
                      <span className="font-medium text-gray-900 text-sm">{item.selectedTimeSlots.length} hours</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {item.selectedTimeSlots.length > 0 && (
                      <div>
                        <span className="text-sm text-gray-600">Time Slots:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.selectedTimeSlots.map((slot, slotIndex) => (
                            <span key={slotIndex} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                              {slot}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Add-ons for this item */}
                {item.selectedAddons.length > 0 && (
                  <div className="border-t border-gray-100 pt-3">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Add-ons:</h4>
                    <div className="space-y-1">
                      {item.selectedAddons.map((addon, addonIndex) => (
                        <div key={addonIndex} className="flex justify-between text-sm">
                          <span className="text-gray-600">{addon.name} (×{addon.quantity})</span>
                          <span className="font-medium">₹{(addon.price * addon.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Additional Services Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm border border-blue-200 p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <SparklesIcon className="w-5 h-5 mr-2 text-blue-600" />
                Additional Services
              </h2>
              <div>
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rushDelivery}
                    onChange={(e) => setRushDelivery(e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900 text-sm">Rush Delivery (+₹500)</p>
                    <p className="text-xs text-gray-600">Get your edited photos within 24-48 hours instead of standard 5-7 days</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Special Requests Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Special Requests
              </h2>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tell us about your vision (Optional)
                </label>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Share any special requirements, preferences, or creative ideas for your photoshoot (e.g., specific poses, locations, styles, themes, props, etc.)"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm"
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-500">{specialRequests.length}/500 characters</p>
                  <div className="flex items-center text-xs text-purple-600">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Helps us personalize your experience
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <CreditCardIcon className="w-5 h-5 mr-2 text-blue-600" />
                Payment Method
              </h2>
              <div className="space-y-2">
                <label className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div className="ml-3 flex items-center">
                    <CreditCardIcon className="w-4 h-4 text-gray-600 mr-2" />
                    <span className="font-medium text-gray-900 text-sm">Credit/Debit Card</span>
                  </div>
                </label>
                <label className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentMethod === 'upi' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div className="ml-3 flex items-center">
                    <svg className="w-4 h-4 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="font-medium text-gray-900 text-sm">UPI</span>
                  </div>
                </label>
                <label className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentMethod === 'wallet' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="wallet"
                    checked={paymentMethod === 'wallet'}
                    onChange={() => setPaymentMethod('wallet')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div className="ml-3 flex items-center">
                    <svg className="w-4 h-4 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span className="font-medium text-gray-900 text-sm">Wallet</span>
                  </div>
                </label>
                <label className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentMethod === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div className="ml-3 flex items-center">
                    <TruckIcon className="w-4 h-4 text-gray-600 mr-2" />
                    <span className="font-medium text-gray-900 text-sm">Cash on Service</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                <ShieldCheckIcon className="w-8 h-8 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Secure Payment</p>
                  <p className="text-xs text-gray-600">100% Safe & Secure</p>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center space-x-3">
                <CheckCircleIcon className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Verified Photographers</p>
                  <p className="text-xs text-gray-600">Background Checked</p>
                </div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-center space-x-3">
                <TruckIcon className="w-8 h-8 text-purple-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Free Cancellation</p>
                  <p className="text-xs text-gray-600">Up to 24hrs before</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 sticky top-20">
              {/* Coupon Section */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 text-sm flex items-center">
                    <TagIcon className="w-4 h-4 mr-1 text-orange-500" />
                    Apply Coupon
                  </h3>
                  <button
                    onClick={() => setShowCouponList(!showCouponList)}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View All
                  </button>
                </div>
                
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <TicketIcon className="w-4 h-4 text-green-600 mr-1" />
                      <div>
                        <p className="font-medium text-green-900 text-xs">{appliedCoupon}</p>
                        <p className="text-xs text-green-700">Saved ₹{discount}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-red-500 hover:text-red-700"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-1">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Enter coupon code"
                      className="flex-1 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                    />
                    <button
                      onClick={() => handleApplyCoupon()}
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-xs"
                    >
                      Apply
                    </button>
                  </div>
                )}

                {showCouponList && (
                  <div className="mt-3 space-y-1 max-h-48 overflow-y-auto">
                    {availableCoupons.map((coupon) => (
                      <div
                        key={coupon.code}
                        className="p-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors cursor-pointer"
                        onClick={() => handleApplyCoupon(coupon.code)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-bold text-blue-600 text-xs">{coupon.code}</p>
                            <p className="text-xs text-gray-600 mt-1">{coupon.description}</p>
                            {coupon.minOrder > 0 && (
                              <p className="text-xs text-gray-500 mt-1">Min order: ₹{coupon.minOrder}</p>
                            )}
                          </div>
                          <button className="text-blue-600 text-xs font-medium whitespace-nowrap ml-1">
                            APPLY
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="p-4 space-y-2">
                <h3 className="font-medium text-gray-900 text-sm mb-3">Price Details</h3>
                
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center justify-between text-xs text-gray-700">
                    <span>Base Price ({cartItems.reduce((total, item) => total + item.selectedTimeSlots.length, 0)}hr total)</span>
                    <span className="font-medium">₹{calculateBasePrice().toLocaleString()}</span>
                  </div>

                  {calculateAddonsTotal() > 0 && (
                    <div className="flex items-center justify-between text-xs text-gray-700">
                      <span>Add-ons</span>
                      <span className="font-medium">₹{calculateAddonsTotal().toLocaleString()}</span>
                    </div>
                  )}

                  {rushDelivery && (
                    <div className="flex items-center justify-between text-xs text-gray-700">
                      <span>Rush Delivery</span>
                      <span className="font-medium">₹500</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-700">
                    <span>Tax (GST 18%)</span>
                    <span className="font-medium">₹{calculateTax().toLocaleString()}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex items-center justify-between text-xs text-green-600 font-medium">
                      <span>Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex items-center justify-between text-base font-bold text-gray-900">
                    <span>Total Amount</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                </div>

                {discount > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-2 flex items-center mt-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600 mr-1 flex-shrink-0" />
                    <p className="text-xs text-green-800">
                      You saved <span className="font-bold">₹{discount}</span>!
                    </p>
                  </div>
                )}
              </div>

              {/* Terms and Proceed Button */}
              <div className="p-4 border-t border-gray-200">
                <label className="flex items-start cursor-pointer mb-3">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="mt-1 w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-xs text-gray-600">
                    I agree to the <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a> and <a href="#" className="text-blue-600 hover:underline">Cancellation Policy</a>
                  </span>
                </label>

                <button
                  onClick={handleProceedToPayment}
                  disabled={!agreeToTerms}
                  className={`w-full py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-1 text-sm ${
                    agreeToTerms
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Image
                    src="/Logo_Icon.png"
                    alt="KliqShot"
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                  <span>Proceed to Payment</span>
                </button>

                <p className="text-xs text-center text-gray-500 mt-2">
                  🔒 Your payment information is secure and encrypted
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Camera Icon Component
function CameraIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

// Loading component
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading booking details...</p>
      </div>
    </div>
  );
}

// Main export function with Suspense
export default function BookingSummaryPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <BookingSummaryContent />
    </Suspense>
  );
}

