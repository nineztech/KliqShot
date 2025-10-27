'use client';

import Image from 'next/image';
import { 
  ShieldCheckIcon, 
  StarIcon, 
  UsersIcon, 
  ClockIcon,
  SparklesIcon,
  CameraIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

export default function MobileSEOSection() {
  const features = [
    {
      icon: <ShieldCheckIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />,
      title: "Verified Photographers",
      description: "All photographers are background checked and verified for your safety",
      gradient: "from-green-400 to-emerald-600"
    },
    {
      icon: <StarIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />,
      title: "5-Star Reviews",
      description: "Read genuine reviews from thousands of satisfied customers",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: <UsersIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />,
      title: "10,000+ Happy Customers",
      description: "Join thousands of satisfied customers who trust our platform",
      gradient: "from-blue-400 to-indigo-600"
    },
    {
      icon: <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />,
      title: "24/7 Support",
      description: "Get help whenever you need it with our round-the-clock support",
      gradient: "from-purple-400 to-pink-600"
    }
  ];

  return (
    <div className="px-2 sm:px-4">
      {/* Hero Section with Beautiful Gradient Background */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 mb-3 sm:mb-4 md:mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center mb-1.5 sm:mb-2 md:mb-3">
            <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 md:py-1.5 shadow-lg">
              <Image
                src="/LOGO.png"
                alt="KliqShot Logo"
                width={60}
                height={18}
                className="h-3 w-auto object-contain sm:h-4 md:h-6"
              />
            </div>
          </div>
          <h2 className="text-sm sm:text-base md:text-lg font-bold mb-1 sm:mb-1.5 md:mb-2 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
            The One-Stop Photography Booking Destination
          </h2>
          <p className="text-[10px] sm:text-[11px] md:text-xs text-gray-700 leading-relaxed">
            Your ultimate platform to find and book professional photographers for weddings, portraits, events, and corporate photography.
          </p>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-2 right-2 w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-2 left-2 w-5 h-5 sm:w-6 sm:h-6 md:w-10 md:h-10 bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-full blur-xl"></div>
      </div>

      {/* Best Selling Services */}
      <div className="mt-3 sm:mt-4 md:mt-6 relative bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg border border-gray-100">
        <div className="flex items-center mb-2.5 sm:mb-3 md:mb-4">
          <SparklesIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-500 mr-1.5 sm:mr-2" />
          <h3 className="text-[11px] sm:text-sm md:text-base font-bold text-gray-800">BEST SELLING ON KLIQSHOT</h3>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
          <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300">
            <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-1.5 sm:mb-2">
              <HeartIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
            </div>
            <h5 className="font-semibold text-gray-900 text-[9px] sm:text-[10px] md:text-xs mb-0.5 sm:mb-1 line-clamp-1">Wedding Photography</h5>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-600">Complete wedding coverage</p>
          </div>
          <div className="text-center bg-gradient-to-br from-green-50 to-green-100 p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300">
            <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-1.5 sm:mb-2">
              <UsersIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
            </div>
            <h5 className="font-semibold text-gray-900 text-[9px] sm:text-[10px] md:text-xs mb-0.5 sm:mb-1 line-clamp-1">Family Portraits</h5>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-600">Memorable family moments</p>
          </div>
          <div className="text-center bg-gradient-to-br from-purple-50 to-purple-100 p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300">
            <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-1.5 sm:mb-2">
              <CameraIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
            </div>
            <h5 className="font-semibold text-gray-900 text-[9px] sm:text-[10px] md:text-xs mb-0.5 sm:mb-1 line-clamp-1">Corporate Events</h5>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-600">Professional event coverage</p>
          </div>
          <div className="text-center bg-gradient-to-br from-yellow-50 to-yellow-100 p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border border-yellow-200 hover:shadow-lg transition-all duration-300">
            <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-1.5 sm:mb-2">
              <StarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
            </div>
            <h5 className="font-semibold text-gray-900 text-[9px] sm:text-[10px] md:text-xs mb-0.5 sm:mb-1 line-clamp-1">Engagement Shoot</h5>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-600">Romantic couple sessions</p>
          </div>
        </div>
      </div>

      {/* KliqShot Services */}
      <div className="mt-3 sm:mt-4 md:mt-6 relative bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg border border-gray-100">
        <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-2.5 sm:mb-3 md:mb-4">
            <CameraIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-600 mr-1.5 sm:mr-2" />
            <h3 className="text-[11px] sm:text-sm md:text-base font-bold text-gray-800">KliqShot Services</h3>
          </div>
          <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
            <div className="bg-gradient-to-br from-white to-blue-50 p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border border-blue-100">
              <div className="flex items-center mb-1 sm:mb-1.5 md:mb-2">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-1 sm:mr-1.5 md:mr-2"></div>
                <p className="text-gray-600 text-[10px] sm:text-xs font-semibold">Professional Photography Booking Platform</p>
              </div>
              <p className="text-gray-600 text-[9px] sm:text-xs leading-relaxed">Book verified photographers instantly for weddings, portraits, events, and corporate photography.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-purple-50 p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border border-purple-100">
              <div className="flex items-center mb-1 sm:mb-1.5 md:mb-2">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-1 sm:mr-1.5 md:mr-2"></div>
                <p className="text-gray-600 text-[10px] sm:text-xs font-semibold">KliqShot Plus</p>
              </div>
              <p className="text-gray-600 text-[9px] sm:text-xs leading-relaxed">Premium membership with exclusive access to top-rated photographers, priority booking during peak seasons, special discounts on photography packages.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-green-50 p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border border-green-100">
              <div className="flex items-center mb-1 sm:mb-1.5 md:mb-2">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-1 sm:mr-1.5 md:mr-2"></div>
                <p className="text-gray-600 text-[10px] sm:text-xs font-semibold">Secure Payments & No Cost EMI</p>
              </div>
              <p className="text-gray-600 text-[9px] sm:text-xs leading-relaxed">Safe and secure payment processing with multiple payment options including credit cards, debit cards, UPI, net banking, and No Cost EMI plans.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-yellow-50 p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border border-yellow-100">
              <div className="flex items-center mb-1 sm:mb-1.5 md:mb-2">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mr-1 sm:mr-1.5 md:mr-2"></div>
                <p className="text-gray-600 text-[10px] sm:text-xs font-semibold">Quality Assurance & Customer Support</p>
              </div>
              <p className="text-gray-600 text-[9px] sm:text-xs leading-relaxed">All photographers are verified, background checked, and rated by customers. Get help whenever you need it with our 24/7 customer support.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Grid */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mt-3 sm:mt-4 md:mt-6">
          {features.map((feature, index) => (
            <div key={index} className="text-center bg-gradient-to-br from-white to-gray-50 rounded-lg sm:rounded-xl md:rounded-2xl p-2.5 sm:p-3 md:p-4 shadow-lg border border-gray-100 transition-all duration-300">
              <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 bg-gradient-to-br ${feature.gradient} rounded-md sm:rounded-lg md:rounded-xl mx-auto mb-1.5 sm:mb-2 md:mb-3 transition-transform duration-300 shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="text-[10px] sm:text-xs md:text-sm font-semibold mb-1 text-gray-800 line-clamp-1">{feature.title}</h3>
              <p className="text-[8px] sm:text-[9px] md:text-xs text-gray-600 leading-relaxed line-clamp-3">{feature.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
}