'use client';

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
      icon: <ShieldCheckIcon className="w-5 h-5 text-white" />,
      title: "Verified Photographers",
      description: "All photographers are background checked and verified",
      gradient: "from-green-400 to-emerald-600"
    },
    {
      icon: <StarIcon className="w-5 h-5 text-white" />,
      title: "5-Star Reviews",
      description: "Read genuine reviews from satisfied customers",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: <UsersIcon className="w-5 h-5 text-white" />,
      title: "10,000+ Happy Customers",
      description: "Join thousands of satisfied customers",
      gradient: "from-blue-400 to-indigo-600"
    },
    {
      icon: <ClockIcon className="w-5 h-5 text-white" />,
      title: "24/7 Support",
      description: "Get help whenever you need it",
      gradient: "from-purple-400 to-pink-600"
    }
  ];

  return (
    <div className="px-4">
      {/* Hero Section with Beautiful Gradient Background */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
              <CameraIcon className="w-5 h-5 text-blue-600" />
              <span className="text-blue-600 font-semibold text-sm">KliqShot</span>
              <SparklesIcon className="w-4 h-4 text-yellow-500" />
            </div>
          </div>
          <h2 className="section-title section-title-mobile mb-2 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
            Your Photography Search Destination
          </h2>
          <p className="section-description section-description-mobile text-gray-700 leading-relaxed">
            Find professional photographers for all your special moments
          </p>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-2 right-2 w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-2 left-2 w-10 h-10 bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-full blur-xl"></div>
      </div>
      
      {/* Popular Search Terms */}
      <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-2xl"></div>
        <div className="flex items-center mb-4">
          <div className="flex items-center space-x-2 mr-3">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            <h3 className="feature-title feature-title-mobile text-gray-800">Most Searched Photography Services</h3>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            "Wedding Photographer Near Me", "Portrait Photography", "Family Photo Shoot", "Corporate Event Photography", 
            "Engagement Photography", "Maternity Photography", "Newborn Photography", "Graduation Photography",
            "Pre Wedding Photography", "Post Wedding Photography", "Candid Photography", "Traditional Photography",
            "Outdoor Photography", "Studio Photography", "Event Photography", "Product Photography"
          ].map((term, index) => (
            <span 
              key={index} 
              className="text-xs bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-700 px-3 py-1.5 rounded-full border border-blue-100 hover:from-blue-100 hover:to-indigo-100 hover:border-blue-200 hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm"
            >
              {term}
            </span>
          ))}
        </div>
      </div>

      {/* Photography Categories */}
      <div className="mt-6 relative bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <HeartIcon className="w-5 h-5 text-red-500 mr-2" />
            <h3 className="feature-title feature-title-mobile text-gray-800">Photography Categories</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-4 rounded-xl border border-pink-100">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mr-2"></div>
                <h4 className="font-semibold text-gray-900 text-xs">WEDDING:</h4>
              </div>
              <p className="text-gray-600 text-xs leading-relaxed">Wedding Photography, Engagement Shoot, Pre Wedding, Post Wedding, Candid Wedding, Traditional Wedding, Destination Wedding</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-2"></div>
                <h4 className="font-semibold text-gray-900 text-xs">PORTRAIT:</h4>
              </div>
              <p className="text-gray-600 text-xs leading-relaxed">Family Portraits, Individual Portraits, Corporate Headshots, Senior Portraits, Professional Headshots, Studio Portraits</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-2"></div>
                <h4 className="font-semibold text-gray-900 text-xs">EVENTS:</h4>
              </div>
              <p className="text-gray-600 text-xs leading-relaxed">Corporate Events, Birthday Parties, Anniversary, Graduation, Conference Photography, Seminar Photography</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-100">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full mr-2"></div>
                <h4 className="font-semibold text-gray-900 text-xs">CREATIVE:</h4>
              </div>
              <p className="text-gray-600 text-xs leading-relaxed">Fashion Photography, Art Photography, Abstract Photography, Fine Art Photography, Conceptual Photography</p>
            </div>
          </div>
        </div>
      </div>

      {/* KliqShot Services */}
      <div className="mt-6 relative bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <CameraIcon className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="feature-title feature-title-mobile text-gray-800">KliqShot Services</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-gradient-to-br from-white to-blue-50 p-4 rounded-xl border border-blue-100">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-2"></div>
                <p className="text-gray-600 text-xs font-semibold">Professional Photography Booking</p>
              </div>
              <p className="text-gray-600 text-xs leading-relaxed">Book verified photographers instantly for weddings, portraits, events, and corporate photography.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-purple-50 p-4 rounded-xl border border-purple-100">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2"></div>
                <p className="text-gray-600 text-xs font-semibold">KliqShot Plus</p>
              </div>
              <p className="text-gray-600 text-xs leading-relaxed">Premium membership with exclusive access to top photographers, priority booking, and special discounts.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-green-50 p-4 rounded-xl border border-green-100">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-2"></div>
                <p className="text-gray-600 text-xs font-semibold">Secure Payments</p>
              </div>
              <p className="text-gray-600 text-xs leading-relaxed">Safe and secure payment processing with multiple payment options including EMI plans.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-yellow-50 p-4 rounded-xl border border-yellow-100">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mr-2"></div>
                <p className="text-gray-600 text-xs font-semibold">Quality Assurance</p>
              </div>
              <p className="text-gray-600 text-xs leading-relaxed">All photographers are verified, background checked, and rated by customers.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4 mt-6">
        {features.map((feature, index) => (
          <div key={index} className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start">
              <div className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {feature.icon}
              </div>
              <div className="flex-1">
                <h3 className="feature-title feature-title-mobile mb-2 text-gray-800">{feature.title}</h3>
                <p className="feature-description feature-description-mobile text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}