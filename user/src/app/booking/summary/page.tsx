'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
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

interface PackageDetails {
  name: string;
  startingPrice: number;
  valueProposition: string;
}

const packageDetailsMap: { [key: string]: PackageDetails } = {
  wedding: {
    name: 'Wedding',
    startingPrice: 150000,
    valueProposition: 'Includes full-day coverage, 2 Photographers, 1 Drone Men, Premium album, Marriage Video'
  },
  'pre-wedding': {
    name: 'Pre-Wedding',
    startingPrice: 75000,
    valueProposition: 'Includes full-day coverage, 2 Photographers, 1 Drone Men, Premium album, Cinematic Video'
  },
  maternity: {
    name: 'Maternity',
    startingPrice: 45000,
    valueProposition: 'Includes maternity shoot, 1 Photographer, Professional editing, Premium prints, Digital gallery'
  },
  newborn: {
    name: 'New Born',
    startingPrice: 35000,
    valueProposition: 'Includes newborn shoot, 1 Photographer, Safe props, Professional editing, Premium album'
  },
  'productshoot': {
    name: 'Product Shoot',
    startingPrice: 25000,
    valueProposition: 'Includes product photography, 1 Photographer, Studio setup, Professional editing, High-res images'
  },
  'real-estate': {
    name: 'Real-Estate',
    startingPrice: 40000,
    valueProposition: 'Includes property photography, 1 Photographer, 1 Drone Men, Professional editing, Virtual tour'
  },
  headshots: {
    name: 'Headshots',
    startingPrice: 10000,
    valueProposition: 'From Experienced Photographer to Unmatched skill for high-end Photography'
  },
  'housewarming': {
    name: 'House Warming',
    startingPrice: 8000,
    valueProposition: 'From Experienced Photographer to Unmatched skill for high-end Photography'
  },
  'babynaamkaran': {
    name: 'Baby Naam Karan',
    startingPrice: 12000,
    valueProposition: 'From Experienced Photographer to Unmatched skill for high-end Photography'
  },
  'pre-weddingshoot': {
    name: 'Pre-Wedding Shoot',
    startingPrice: 25000,
    valueProposition: 'From Experienced Photographer to Unmatched skill for high-end Photography'
  },
  mehendi: {
    name: 'Mehendi',
    startingPrice: 10000,
    valueProposition: 'From Experienced Photographer to Unmatched skill for high-end Photography'
  },
  'corporateevents': {
    name: 'Corporate Events',
    startingPrice: 18000,
    valueProposition: 'From Experienced Photographer to Unmatched skill for high-end Photography'
  },
  'familyportraits': {
    name: 'Family Portraits',
    startingPrice: 12000,
    valueProposition: 'From Experienced Photographer to Unmatched skill for high-end Photography'
  }
};

interface BookingSummaryData {
  photographerId: string;
  photographerName: string;
  photographerImage: string;
  price: string;
  category: string;
  subcategory: string;
  package?: string;
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
  package?: string;
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
  const [selectedBankOffer, setSelectedBankOffer] = useState<string | null>(null);
  const [bankDiscount, setBankDiscount] = useState(0);
  const [giftCode, setGiftCode] = useState('');
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [giftDiscount, setGiftDiscount] = useState(0);
  const [giftCodeError, setGiftCodeError] = useState('');
  const [venue, setVenue] = useState('');
  const [isEditingVenue, setIsEditingVenue] = useState(false);
  const [showAddonsModal, setShowAddonsModal] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  // Parse booking data from URL
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalBill, setTotalBill] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  // Load venue from local storage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedVenue = localStorage.getItem('userLocation');
      if (savedVenue) {
        try {
          const location = JSON.parse(savedVenue);
          const displayVenue = location.detailedAddress || location.fullAddress || `${location.locality || ''}, ${location.city || ''}, ${location.state || ''}`.trim();
          setVenue(displayVenue);
        } catch (e) {
          console.error('Error parsing location:', e);
        }
      }
    }
  }, []);

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
        const packageParam = searchParams.get(`item${i}_package`);
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
            package: packageParam || undefined,
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
      const packageParam = searchParams.get('package');
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
          package: packageParam || undefined,
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

  // Bank offers
  const bankOffers = [
    {
      id: 'hdfc-emi',
      bank: 'HDFC Bank',
      logo: 'https://logos-world.net/wp-content/uploads/2020/11/HDFC-Bank-Logo.png',
      offer: 'No Cost EMI',
      description: 'Convert to 3,6,9 months EMI at 0% interest',
      discount: 150,
      minOrder: 1000,
      bgColor: 'from-red-50 to-red-100',
      borderColor: 'border-red-200'
    },
    {
      id: 'icici-discount',
      bank: 'ICICI Bank',
      logo: 'https://logos-world.net/wp-content/uploads/2020/11/ICICI-Bank-Symbol.png',
      offer: '10% Instant Discount',
      description: 'Up to ₹300 off on ICICI credit cards',
      discount: 300,
      minOrder: 1500,
      bgColor: 'from-orange-50 to-orange-100',
      borderColor: 'border-orange-200'
    },
    {
      id: 'sbi-cashback',
      bank: 'SBI Bank',
      logo: 'https://logos-world.net/wp-content/uploads/2020/11/State-Bank-of-India-SBI-Logo.png',
      offer: '5% Cashback',
      description: 'Get 5% cashback up to ₹200 on SBI cards',
      discount: 200,
      minOrder: 800,
      bgColor: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-200'
    },
    {
      id: 'axis-rewards',
      bank: 'Axis Bank',
      logo: 'https://logos-world.net/wp-content/uploads/2020/11/Axis-Bank-Logo.png',
      offer: 'Reward Points 2X',
      description: 'Earn double reward points + ₹100 off',
      discount: 100,
      minOrder: 500,
      bgColor: 'from-purple-50 to-purple-100',
      borderColor: 'border-purple-200'
    },
    {
      id: 'kotak-offer',
      bank: 'Kotak Bank',
      logo: 'https://logos-world.net/wp-content/uploads/2020/11/Kotak-Mahindra-Bank-Logo.png',
      offer: 'Weekend Special',
      description: '₹250 off on weekend bookings',
      discount: 250,
      minOrder: 1200,
      bgColor: 'from-green-50 to-green-100',
      borderColor: 'border-green-200'
    }
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
    return subtotal + tax + rushDeliveryFee - discount - bankDiscount - giftDiscount;
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

  const handleBankOfferSelect = (offerId: string) => {
    const offer = bankOffers.find(o => o.id === offerId);
    if (offer) {
      const subtotal = calculateSubtotal();
      if (subtotal >= offer.minOrder) {
        if (selectedBankOffer === offerId) {
          // Deselect if already selected
          setSelectedBankOffer(null);
          setBankDiscount(0);
        } else {
          setSelectedBankOffer(offerId);
          setBankDiscount(offer.discount);
        }
      } else {
        alert(`Minimum order value should be ₹${offer.minOrder} for this offer`);
      }
    }
  };

  const handleProceedToPayment = () => {
    if (!agreeToTerms) {
      alert('Please agree to terms and conditions');
      return;
    }
    // Process payment
    alert('Processing payment...');
  };

  const handleApplyGiftCode = () => {
    const validGiftCodes = [
      { code: 'GIFT100', amount: 100, description: 'Gift voucher worth ₹100' },
      { code: 'CELEBRATE500', amount: 500, description: 'Celebration gift ₹500 off' },
      { code: 'WELCOME200', amount: 200, description: 'Welcome gift ₹200 off' },
      { code: 'SPECIAL300', amount: 300, description: 'Special occasion ₹300 off' },
      { code: 'LOVE1000', amount: 1000, description: 'Premium gift ₹1000 off' },
    ];

    const foundGift = validGiftCodes.find(g => g.code === giftCode.toUpperCase());
    
    if (foundGift) {
      setGiftDiscount(foundGift.amount);
      setGiftCodeError('');
      setShowGiftModal(false);
      setGiftCode('');
    } else {
      setGiftCodeError('Invalid gift code. Please try again.');
    }
  };

  const handleRemoveGiftCode = () => {
    setGiftDiscount(0);
    setGiftCode('');
    setGiftCodeError('');
  };

  // Available addons list
  const availableAddons = [
    { id: 1, name: 'Photo Album', price: 1500, description: 'Premium printed photo album with 50 pages' },
    { id: 2, name: 'Extra Hours', price: 500, description: 'Additional hour of photography service' },
    { id: 3, name: 'Drone Photography', price: 2000, description: 'Aerial shots with professional drone' },
    { id: 4, name: 'Video Coverage', price: 3000, description: 'Professional video coverage of event' },
    { id: 5, name: 'Same Day Delivery', price: 800, description: 'Get your photos delivered on the same day' },
    { id: 6, name: 'Makeup Artist', price: 2500, description: 'Professional makeup artist for the session' },
  ];

  const handleOpenAddonsModal = (index: number) => {
    setCurrentItemIndex(index);
    setShowAddonsModal(true);
  };

  const handleCloseAddonsModal = () => {
    setShowAddonsModal(false);
  };

  const handleAddonToggle = (itemIndex: number, addonId: number, quantity: number) => {
    const updatedItems = [...cartItems];
    const item = updatedItems[itemIndex];
    
    // Check if addon already exists
    const existingIndex = item.selectedAddons.findIndex(a => a.id === addonId);
    
    if (quantity > 0) {
      if (existingIndex >= 0) {
        // Update quantity
        item.selectedAddons[existingIndex].quantity = quantity;
      } else {
        // Add addon
        const addon = availableAddons.find(a => a.id === addonId);
        if (addon) {
          item.selectedAddons.push({
            id: addon.id,
            name: addon.name,
            price: addon.price,
            quantity: quantity,
          });
        }
      }
    } else {
      // Remove addon
      if (existingIndex >= 0) {
        item.selectedAddons.splice(existingIndex, 1);
      }
    }
    
    setCartItems(updatedItems);
  };

  const handleQuantityChange = (addonId: number, quantity: number) => {
    const newQuantity = Math.max(0, Math.min(10, quantity));
    handleAddonToggle(currentItemIndex, addonId, newQuantity);
  };

  const handleSaveVenue = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bookingVenue', venue);
    }
    setIsEditingVenue(false);
  };

  const handleCancelVenueEdit = () => {
    // Restore previous venue from local storage
    if (typeof window !== 'undefined') {
      const savedVenue = localStorage.getItem('bookingVenue') || localStorage.getItem('currentLocation');
      if (savedVenue) {
        try {
          const location = JSON.parse(savedVenue);
          const displayVenue = location.detailedAddress || location.fullAddress || `${location.locality || ''}, ${location.city || ''}, ${location.state || ''}`.trim();
          setVenue(displayVenue);
        } catch (e) {
          setVenue(savedVenue);
        }
      }
    }
    setIsEditingVenue(false);
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
                      {item.package ? (
                        <span className="bg-purple-600 text-white px-2 py-0.5 rounded-md font-medium text-sm">
                          {item.package}
                        </span>
                      ) : (
                        <>
                          <span className="text-blue-600 font-medium text-sm">{item.category}</span>
                          {item.subcategory && (
                            <span className="text-gray-600 text-sm">{item.subcategory}</span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">₹{item.totalPrice.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Total Price</div>
                  </div>
                </div>

                {/* Package Details */}
                {item.package && (() => {
                  const packageKey = item.package.toLowerCase().replace(/\s+/g, '');
                  const packageInfo = packageDetailsMap[packageKey];
                  return packageInfo ? (
                    <div className="mb-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                          <TicketIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-bold text-gray-900 text-base">{packageInfo.name} Package</h4>
                            <span className="inline-flex items-center text-xs font-bold text-purple-700 bg-white border border-purple-300 px-2 py-1 rounded-md">
                              ALL-INCLUSIVE
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed mb-3">{packageInfo.valueProposition}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-600">Package Price:</span>
                            <span className="text-lg font-bold text-purple-700">₹{packageInfo.startingPrice.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null;
                })()}

                {/* Venue Section */}
                <div className="border-t border-gray-100 pt-3 mb-4">
                  <div className="flex items-center justify-between">
                    {isEditingVenue ? (
                      <div className="flex items-center space-x-2 w-full">
                        <input
                          type="text"
                          value={venue}
                          onChange={(e) => setVenue(e.target.value)}
                          className="flex-1 px-3 py-2 text-sm border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter venue"
                          autoFocus
                        />
                        <button
                          onClick={handleSaveVenue}
                          className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelVenueEdit}
                          className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm text-gray-600">Venue:</span>
                          <span className="font-medium text-gray-900 text-sm">{venue || 'Not specified'}</span>
                        </div>
                        <button
                          onClick={() => setIsEditingVenue(true)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          <span>Edit</span>
                        </button>
                      </>
                    )}
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
                <div className="border-t border-gray-100 pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-gray-900">Add-ons:</h4>
                    <button
                      onClick={() => handleOpenAddonsModal(index)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Add Addons</span>
                    </button>
                  </div>
                  {item.selectedAddons.length > 0 && (
                    <div className="space-y-1">
                      {item.selectedAddons.map((addon, addonIndex) => (
                        <div key={addonIndex} className="flex justify-between text-sm">
                          <span className="text-gray-600">{addon.name} (×{addon.quantity})</span>
                          <span className="font-medium">₹{(addon.price * addon.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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

            {/* Bank Offers Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 0h10a2 2 0 002-2v-3a2 2 0 00-2-2H9a2 2 0 00-2 2v3a2 2 0 002 2z" />
                </svg>
                Bank Offers & Discounts
              </h2>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {bankOffers.map((offer) => (
                  <div
                    key={offer.id}
                    onClick={() => handleBankOfferSelect(offer.id)}
                    className={`flex-shrink-0 w-64 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedBankOffer === offer.id
                        ? `${offer.borderColor} bg-gradient-to-r ${offer.bgColor} shadow-md`
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <img
                          src={offer.logo}
                          alt={offer.bank}
                          className="w-6 h-6 object-contain rounded"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <span className="text-xs font-semibold text-gray-900">{offer.bank}</span>
                      </div>
                      <div className="text-xs font-bold text-green-600">₹{offer.discount} OFF</div>
                    </div>
                    <div className="mb-1">
                      <p className="text-sm font-semibold text-gray-900">{offer.offer}</p>
                      <p className="text-xs text-gray-600">{offer.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Min: ₹{offer.minOrder}</span>
                      <div className={`w-4 h-4 rounded-full border-2 transition-all ${
                        selectedBankOffer === offer.id
                          ? 'border-green-500 bg-green-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedBankOffer === offer.id && (
                          <svg className="w-2 h-2 text-white m-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {selectedBankOffer && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-sm text-green-800 font-medium">
                      {bankOffers.find(o => o.id === selectedBankOffer)?.offer} applied! 
                      Saving ₹{bankDiscount}
                    </span>
                  </div>
                </div>
              )}
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
                      <span>Coupon Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}

                  {bankDiscount > 0 && (
                    <div className="flex items-center justify-between text-xs text-green-600 font-medium">
                      <span>Bank Offer</span>
                      <span>-₹{bankDiscount}</span>
                    </div>
                  )}

                  {giftDiscount > 0 && (
                    <div className="flex items-center justify-between text-xs text-green-600 font-medium">
                      <span>Gift Code</span>
                      <span>-₹{giftDiscount}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex items-center justify-between text-base font-bold text-gray-900">
                    <span>Total Amount</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                </div>

                {(discount > 0 || bankDiscount > 0 || giftDiscount > 0) && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-2 flex items-center mt-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600 mr-1 flex-shrink-0" />
                    <p className="text-xs text-green-800">
                      You saved <span className="font-bold">₹{discount + bankDiscount + giftDiscount}</span>!
                    </p>
                  </div>
                )}
              </div>

              {/* Add Gift Button */}
              <div className="p-4 border-t border-gray-200">
                {giftDiscount > 0 ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                      </svg>
                      <div>
                        <p className="text-sm font-semibold text-green-800">Gift Applied!</p>
                        <p className="text-xs text-green-600">You saved ₹{giftDiscount}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleRemoveGiftCode}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowGiftModal(true)}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                    <span className="font-semibold text-sm">Add Gift Code</span>
                  </button>
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

      {/* Gift Code Modal */}
      {showGiftModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Redeem Gift Code</h3>
                  <p className="text-sm text-gray-500">Enter your gift code below</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowGiftModal(false);
                  setGiftCodeError('');
                  setGiftCode('');
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gift Code
                </label>
                <input
                  type="text"
                  value={giftCode}
                  onChange={(e) => setGiftCode(e.target.value.toUpperCase())}
                  placeholder="Enter gift code"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg font-semibold text-center tracking-widest"
                />
                {giftCodeError && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {giftCodeError}
                  </p>
                )}
              </div>

              {/* Sample Gift Codes */}
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4 border border-purple-100">
                <p className="text-xs font-semibold text-gray-700 mb-2">Sample Gift Codes:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-white px-2 py-1 rounded border border-gray-200">GIFT100</span>
                  <span className="text-xs bg-white px-2 py-1 rounded border border-gray-200">LOVE1000</span>
                  <span className="text-xs bg-white px-2 py-1 rounded border border-gray-200">SPECIAL300</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 flex space-x-3">
              <button
                onClick={() => {
                  setShowGiftModal(false);
                  setGiftCodeError('');
                  setGiftCode('');
                }}
                className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyGiftCode}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all font-semibold shadow-md hover:shadow-lg"
              >
                Apply Gift Code
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Addons Modal */}
      {showAddonsModal && cartItems[currentItemIndex] && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Select Add-ons</h3>
                  <p className="text-sm text-gray-500">Choose additional services for your booking</p>
                </div>
              </div>
              <button
                onClick={handleCloseAddonsModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-3">
                {availableAddons.map((addon) => {
                  const selectedAddon = cartItems[currentItemIndex]?.selectedAddons.find(a => a.id === addon.id);
                  const quantity = selectedAddon?.quantity || 0;
                  const isSelected = quantity > 0;
                  
                  return (
                    <div
                      key={addon.id}
                      className={`border-2 rounded-lg p-4 transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleQuantityChange(addon.id, e.target.checked ? 1 : 0)}
                          className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer transition-all mt-1"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-semibold text-gray-900 text-sm">{addon.name}</h4>
                            <span className={`text-sm font-bold whitespace-nowrap ${isSelected ? 'text-blue-700' : 'text-blue-600'}`}>
                              ₹{addon.price.toLocaleString()}
                              {isSelected && quantity > 1 && (
                                <span className="text-xs ml-1 text-gray-600 font-normal">each</span>
                              )}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{addon.description}</p>
                          
                          {/* Quantity Controls */}
                          {isSelected && (
                            <div className="mt-3 flex items-center space-x-3">
                              <span className="text-xs font-medium text-gray-700">Quantity:</span>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleQuantityChange(addon.id, quantity - 1)}
                                  disabled={quantity <= 1}
                                  className={`
                                    w-7 h-7 rounded-md flex items-center justify-center font-semibold text-sm transition-all duration-200
                                    ${quantity <= 1
                                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                      : 'bg-white border border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 active:scale-95'
                                    }
                                  `}
                                >
                                  −
                                </button>
                                
                                <div className="w-12 h-7 bg-white border-2 border-blue-500 rounded-md flex items-center justify-center">
                                  <span className="text-sm font-bold text-blue-700">{quantity}</span>
                                </div>
                                
                                <button
                                  onClick={() => handleQuantityChange(addon.id, quantity + 1)}
                                  disabled={quantity >= 10}
                                  className={`
                                    w-7 h-7 rounded-md flex items-center justify-center font-semibold text-sm transition-all duration-200
                                    ${quantity >= 10
                                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                      : 'bg-white border border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 active:scale-95'
                                    }
                                  `}
                                >
                                  +
                                </button>
                              </div>
                              
                              {quantity > 1 && (
                                <div className="flex-1 text-right">
                                  <span className="text-xs font-semibold text-blue-700">
                                    ₹{(addon.price * quantity).toLocaleString()}
                                  </span>
                                  <span className="text-xs text-gray-500 ml-1">total</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={handleCloseAddonsModal}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-md hover:shadow-lg"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <Footer />
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

