'use client';

import { useState } from 'react';
import { FiSearch, FiTag, FiPercent, FiClock, FiCopy, FiCheck, FiFilter, FiChevronDown } from 'react-icons/fi';
import { BiCategory } from 'react-icons/bi';
import { HiOutlineSparkles } from 'react-icons/hi';
import { MdOutlineLocalOffer } from 'react-icons/md';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

// Dummy coupon data (same as desktop)
const couponsData = [
  {
    id: 1,
    title: 'Photography Session 50% OFF',
    description: 'Get 50% off on all professional photography sessions',
    code: 'PHOTO50',
    discount: 50,
    discountType: 'percentage' as const,
    category: 'Photography',
    expiryDate: '2024-12-31',
    minOrder: 1000,
    maxDiscount: 2500,
    isActive: true,
    featured: true,
    usedCount: 245,
    totalCount: 500,
    brand: 'KliqShot'
  },
  {
    id: 2,
    title: 'Wedding Package Special',
    description: 'Exclusive discount on wedding photography packages',
    code: 'WEDDING30',
    discount: 30,
    discountType: 'percentage' as const,
    category: 'Wedding',
    expiryDate: '2024-11-30',
    minOrder: 5000,
    maxDiscount: 5000,
    isActive: true,
    featured: true,
    usedCount: 89,
    totalCount: 200,
    brand: 'Premium Studios'
  },
  {
    id: 3,
    title: 'Portrait Session Deal',
    description: 'Special offer on portrait photography sessions',
    code: 'PORTRAIT25',
    discount: 25,
    discountType: 'percentage' as const,
    category: 'Portrait',
    expiryDate: '2024-12-15',
    minOrder: 1500,
    maxDiscount: 1000,
    isActive: true,
    featured: false,
    usedCount: 156,
    totalCount: 300,
    brand: 'Focus Photography'
  },
  {
    id: 4,
    title: 'Flat ₹500 OFF',
    description: 'Flat discount on all photography services',
    code: 'FLAT500',
    discount: 500,
    discountType: 'flat' as const,
    category: 'All',
    expiryDate: '2024-12-20',
    minOrder: 2000,
    maxDiscount: 500,
    isActive: true,
    featured: false,
    usedCount: 78,
    totalCount: 150,
    brand: 'KliqShot'
  },
  {
    id: 5,
    title: 'Event Photography 40% OFF',
    description: 'Big savings on event photography bookings',
    code: 'EVENT40',
    discount: 40,
    discountType: 'percentage' as const,
    category: 'Events',
    expiryDate: '2024-11-25',
    minOrder: 3000,
    maxDiscount: 3000,
    isActive: true,
    featured: true,
    usedCount: 134,
    totalCount: 250,
    brand: 'Elite Events'
  },
  {
    id: 6,
    title: 'First Time User Special',
    description: 'Exclusive discount for new customers',
    code: 'FIRST20',
    discount: 20,
    discountType: 'percentage' as const,
    category: 'All',
    expiryDate: '2024-12-31',
    minOrder: 800,
    maxDiscount: 1500,
    isActive: true,
    featured: false,
    usedCount: 312,
    totalCount: 500,
    brand: 'KliqShot'
  }
];

const categories = ['All', 'Photography', 'Wedding', 'Portrait', 'Events', 'Maternity', 'Corporate'];

interface CouponCardProps {
  coupon: typeof couponsData[0];
  onCopy: (code: string) => void;
  copiedCode: string | null;
}

const CouponCard = ({ coupon, onCopy, copiedCode }: CouponCardProps) => {
  const isExpired = new Date(coupon.expiryDate) < new Date();
  const isCopied = copiedCode === coupon.code;
  const usagePercentage = (coupon.usedCount / coupon.totalCount) * 100;

  return (
    <div className={`bg-white rounded-lg border transition-all duration-300 ${
      coupon.featured ? 'border-blue-200 shadow-md' : 'border-gray-200'
    }`}>
      {coupon.featured && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-t-lg flex items-center gap-1">
          <HiOutlineSparkles className="w-3 h-3" />
          FEATURED
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                {coupon.brand}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{coupon.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{coupon.description}</p>
          </div>
          
          <div className="text-right ml-2">
            {coupon.discountType === 'percentage' ? (
              <div className="text-xl font-bold text-green-600">
                {coupon.discount}%
              </div>
            ) : (
              <div className="text-xl font-bold text-green-600">
                ₹{coupon.discount}
              </div>
            )}
            <div className="text-xs text-gray-500">OFF</div>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>{coupon.usedCount} used</span>
            <span>{coupon.totalCount - coupon.usedCount} left</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-gradient-to-r from-orange-400 to-red-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${usagePercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="border-t border-dashed border-gray-200 pt-3">
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <FiClock className="w-3 h-3" />
              <span>Exp: {new Date(coupon.expiryDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <MdOutlineLocalOffer className="w-3 h-3" />
              <span>Min ₹{coupon.minOrder}</span>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg px-3 py-2 border-2 border-dashed border-gray-300">
            <div className="flex items-center justify-between">
              <span className="font-mono font-semibold text-gray-900 text-sm">{coupon.code}</span>
              <button
                onClick={() => onCopy(coupon.code)}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                {isCopied ? (
                  <>
                    <FiCheck className="w-4 h-4" />
                    <span className="text-xs font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <FiCopy className="w-4 h-4" />
                    <span className="text-xs font-medium">Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MobileCouponsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Filter and sort coupons
  const filteredCoupons = couponsData
    .filter(coupon => {
      const matchesSearch = coupon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           coupon.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           coupon.code.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || coupon.category === selectedCategory;
      return matchesSearch && matchesCategory && coupon.isActive;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          return b.featured ? 1 : -1;
        case 'discount':
          return b.discount - a.discount;
        case 'expiry':
          return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
        default:
          return 0;
      }
    });

  const featuredCoupons = couponsData.filter(coupon => coupon.featured && coupon.isActive);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="px-4 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <FiTag className="w-6 h-6" />
              <h1 className="text-3xl font-bold">Exclusive Coupons</h1>
            </div>
            <p className="text-lg text-blue-100 mb-6">
              Save big on photography services
            </p>
            
            <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <FiPercent className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
                <h3 className="font-semibold mb-1">Up to 50% OFF</h3>
                <p className="text-sm text-blue-100">Maximum savings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="px-4 py-4">
          {/* Search Bar */}
          <div className="relative mb-4">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search coupons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4"
          >
            <FiFilter className="w-4 h-4" />
            Filters
            <FiChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          {/* Filters */}
          {showFilters && (
            <div className="space-y-4">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="featured">Featured First</option>
                <option value="discount">Highest Discount</option>
                <option value="expiry">Expiring Soon</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Featured Coupons Section */}
      {featuredCoupons.length > 0 && selectedCategory === 'All' && !searchQuery && (
        <div className="px-4 py-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <HiOutlineSparkles className="w-5 h-5 text-yellow-500" />
            Featured Offers
          </h2>
          <div className="space-y-4">
            {featuredCoupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
                onCopy={handleCopyCode}
                copiedCode={copiedCode}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Coupons Section */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {selectedCategory === 'All' ? 'All Coupons' : `${selectedCategory} Coupons`}
          </h2>
          <span className="text-gray-500 text-sm">
            {filteredCoupons.length} found
          </span>
        </div>

        {filteredCoupons.length > 0 ? (
          <div className="space-y-4">
            {filteredCoupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
                onCopy={handleCopyCode}
                copiedCode={copiedCode}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FiTag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No coupons found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* How to Use Section */}
      <div className="bg-white border-t px-4 py-8">
        <h2 className="text-xl font-bold text-gray-900 text-center mb-6">How to Use Coupons</h2>
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-600 font-bold">1</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Choose & Copy</h3>
            <p className="text-gray-600 text-sm">Browse and copy your favorite coupon code</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-600 font-bold">2</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Add to Cart</h3>
            <p className="text-gray-600 text-sm">Add photography services to your cart</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-600 font-bold">3</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Apply & Save</h3>
            <p className="text-gray-600 text-sm">Paste the code at checkout and enjoy savings</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
