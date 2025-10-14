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
  const [bookingData, setBookingData] = useState<BookingSummaryData | null>(null);

  useEffect(() => {
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
      setBookingData({
        photographerId,
        photographerName,
        photographerImage: photographerImage || '',
        price,
        category: category || '',
        subcategory: subcategory || '',
        selectedDate: selectedDate || '',
        selectedTimeSlots,
        selectedAddons: parsedAddons,
      });
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
    if (!bookingData) return 0;
    const priceStr = bookingData.price.replace(/[₹,]/g, '');
    const basePrice = parseFloat(priceStr);
    const hours = bookingData.selectedTimeSlots.length;
    return basePrice * hours;
  };

  const calculateAddonsTotal = () => {
    if (!bookingData) return 0;
    return bookingData.selectedAddons.reduce((total, addon) => {
      return total + (addon.price * addon.quantity);
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

  if (!bookingData) {
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            <span className="font-medium">Back to Booking</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Booking Summary</h1>
          <p className="text-gray-600 mt-1">Review your booking details and complete payment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photographer Details Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <CameraIcon className="w-6 h-6 mr-2 text-blue-600" />
                Photographer Details
              </h2>
              <div className="flex items-start space-x-4">
                {bookingData.photographerImage && (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={bookingData.photographerImage}
                      alt={bookingData.photographerName}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{bookingData.photographerName}</h3>
                  <p className="text-blue-600 font-medium">{bookingData.category}</p>
                  {bookingData.subcategory && (
                    <p className="text-gray-600 text-sm">{bookingData.subcategory}</p>
                  )}
                  <div className="flex items-center space-x-4 mt-3 text-sm">
                    <div className="flex items-center text-yellow-500">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 font-medium">4.9</span>
                    </div>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-600">250+ bookings</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Schedule Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <CalendarDaysIcon className="w-6 h-6 mr-2 text-blue-600" />
                Booking Schedule
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CalendarDaysIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-semibold text-gray-900">{bookingData.selectedDate || 'Not selected'}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <ClockIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Time Slots</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {bookingData.selectedTimeSlots.map((slot, index) => (
                        <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {slot}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Duration: {bookingData.selectedTimeSlots.length} hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Add-ons Card */}
            {bookingData.selectedAddons.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <SparklesIcon className="w-6 h-6 mr-2 text-blue-600" />
                  Selected Add-ons
                </h2>
                <div className="space-y-3">
                  {bookingData.selectedAddons.map((addon) => (
                    <div key={addon.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{addon.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {addon.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-900">₹{addon.price * addon.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Services Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm border border-blue-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <SparklesIcon className="w-6 h-6 mr-2 text-blue-600" />
                Additional Services
              </h2>
              <div className="space-y-4">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rushDelivery}
                    onChange={(e) => setRushDelivery(e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">Rush Delivery (+₹500)</p>
                    <p className="text-sm text-gray-600">Get your edited photos within 24-48 hours instead of standard 5-7 days</p>
                  </div>
                </label>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Enter any special requirements or preferences for your photoshoot (e.g., specific poses, locations, styles, themes, etc.)"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    maxLength={500}
                  />
                  <p className="text-xs text-gray-500 mt-1">{specialRequests.length}/500 characters</p>
                </div>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <CreditCardIcon className="w-6 h-6 mr-2 text-blue-600" />
                Payment Method
              </h2>
              <div className="space-y-3">
                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
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
                    <CreditCardIcon className="w-5 h-5 text-gray-600 mr-2" />
                    <span className="font-medium text-gray-900">Credit/Debit Card</span>
                  </div>
                </label>
                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
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
                    <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="font-medium text-gray-900">UPI</span>
                  </div>
                </label>
                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
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
                    <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span className="font-medium text-gray-900">Wallet</span>
                  </div>
                </label>
                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
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
                    <TruckIcon className="w-5 h-5 text-gray-600 mr-2" />
                    <span className="font-medium text-gray-900">Cash on Service</span>
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
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <TagIcon className="w-5 h-5 mr-2 text-orange-500" />
                    Apply Coupon
                  </h3>
                  <button
                    onClick={() => setShowCouponList(!showCouponList)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View All
                  </button>
                </div>
                
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <TicketIcon className="w-5 h-5 text-green-600 mr-2" />
                      <div>
                        <p className="font-semibold text-green-900 text-sm">{appliedCoupon}</p>
                        <p className="text-xs text-green-700">Saved ₹{discount}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-red-500 hover:text-red-700"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Enter coupon code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    <button
                      onClick={() => handleApplyCoupon()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                    >
                      Apply
                    </button>
                  </div>
                )}

                {showCouponList && (
                  <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
                    {availableCoupons.map((coupon) => (
                      <div
                        key={coupon.code}
                        className="p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors cursor-pointer"
                        onClick={() => handleApplyCoupon(coupon.code)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-bold text-blue-600 text-sm">{coupon.code}</p>
                            <p className="text-xs text-gray-600 mt-1">{coupon.description}</p>
                            {coupon.minOrder > 0 && (
                              <p className="text-xs text-gray-500 mt-1">Min order: ₹{coupon.minOrder}</p>
                            )}
                          </div>
                          <button className="text-blue-600 text-xs font-medium whitespace-nowrap ml-2">
                            APPLY
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="p-6 space-y-3">
                <h3 className="font-semibold text-gray-900 mb-4">Price Details</h3>
                
                <div className="flex items-center justify-between text-gray-700">
                  <span>Base Price ({bookingData.selectedTimeSlots.length}hr)</span>
                  <span>₹{calculateBasePrice()}</span>
                </div>

                {bookingData.selectedAddons.length > 0 && (
                  <div className="flex items-center justify-between text-gray-700">
                    <span>Add-ons</span>
                    <span>₹{calculateAddonsTotal()}</span>
                  </div>
                )}

                {rushDelivery && (
                  <div className="flex items-center justify-between text-gray-700">
                    <span>Rush Delivery (24-48hrs)</span>
                    <span>₹500</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-gray-700">
                  <span>Tax (GST 18%)</span>
                  <span>₹{calculateTax()}</span>
                </div>

                {discount > 0 && (
                  <div className="flex items-center justify-between text-green-600 font-medium">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex items-center justify-between text-lg font-bold text-gray-900">
                    <span>Total Amount</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                </div>

                {discount > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <p className="text-sm text-green-800">
                      You saved <span className="font-bold">₹{discount}</span> on this booking!
                    </p>
                  </div>
                )}
              </div>

              {/* Terms and Proceed Button */}
              <div className="p-6 border-t border-gray-200">
                <label className="flex items-start cursor-pointer mb-4">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-xs text-gray-600">
                    I agree to the <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a> and <a href="#" className="text-blue-600 hover:underline">Cancellation Policy</a>
                  </span>
                </label>

                <button
                  onClick={handleProceedToPayment}
                  disabled={!agreeToTerms}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                    agreeToTerms
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Image
                    src="/Logo_Icon.png"
                    alt="KliqShot"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  <span>Proceed to Payment</span>
                </button>

                <p className="text-xs text-center text-gray-500 mt-3">
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

