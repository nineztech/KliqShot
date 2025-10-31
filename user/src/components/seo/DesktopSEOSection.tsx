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

export default function DesktopSEOSection() {
  const features = [
     {
      icon: <UsersIcon className="w-8 h-8 text-white" />,
      title: "10,000+ Happy Customers",
      description: "Join thousands of satisfied customers who trust our platform",
      gradient: "from-blue-400 to-indigo-600"
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8 text-white" />,
      title: "Verified Photographers",
      description: "All photographers are background checked and verified for your safety",
      gradient: "from-green-400 to-emerald-600"
    },
    {
      icon: <ClockIcon className="w-8 h-8 text-white" />,
      title: "24/7 Support",
      description: "Get help whenever you need it with our round-the-clock support",
      gradient: "from-purple-400 to-pink-600"
    },
    {
      icon: <StarIcon className="w-8 h-8 text-white" />,
      title: "5-Star Reviews",
      description: "Read genuine reviews from thousands of satisfied customers",
      gradient: "from-yellow-400 to-orange-500"
    }
  ];

  return (
    <div className="px-4">
      {/* Hero Section with Beautiful Gradient Background */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
              {/* <CameraIcon className="w-6 h-6 text-blue-600" /> */}
              <Image
                src="/LOGO.png"
                alt="KliqShot Logo"
                width={80}
                height={24}
                className="h-6 w-auto object-contain"
              />
              {/* <SparklesIcon className="w-5 h-5 text-yellow-500" /> */}
            </div>
          </div>
          <h2 className="section-title section-title-desktop mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
            The One-Stop Photography Booking Destination
          </h2>
          <p className="section-description section-description-desktop max-w-3xl mx-auto text-gray-700 leading-relaxed">
            Your ultimate platform to find and book professional photographers for weddings, portraits, events, and corporate photography. 
            From traditional wedding photography to modern candid shots, studio portraits to outdoor sessions, 
            KliqShot connects you with verified photographers across India.
          </p>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-full blur-xl"></div>
      </div>

      


      {/* Best Selling Services */}
      <div className="mt-8 relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-full blur-xl"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-6">
            <SparklesIcon className="w-6 h-6 text-yellow-500 mr-3" />
            <h3 className="feature-title feature-title-desktop text-gray-800">BEST SELLING ON KLIQSHOT</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 hover:shadow-xl transition-all duration-300 hover:scale-105 group-hover:from-blue-100 group-hover:to-blue-200">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <HeartIcon className="w-6 h-6 text-white" />
                </div>
                <h5 className="font-semibold text-gray-900 text-sm mb-1">Wedding Photography</h5>
                <p className="text-xs text-gray-600">Complete wedding coverage</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 hover:shadow-xl transition-all duration-300 hover:scale-105 group-hover:from-green-100 group-hover:to-green-200">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <UsersIcon className="w-6 h-6 text-white" />
                </div>
                <h5 className="font-semibold text-gray-900 text-sm mb-1">Family Portraits</h5>
                <p className="text-xs text-gray-600">Memorable family moments</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 hover:shadow-xl transition-all duration-300 hover:scale-105 group-hover:from-purple-100 group-hover:to-purple-200">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <CameraIcon className="w-6 h-6 text-white" />
                </div>
                <h5 className="font-semibold text-gray-900 text-sm mb-1">Corporate Events</h5>
                <p className="text-xs text-gray-600">Professional event coverage</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200 hover:shadow-xl transition-all duration-300 hover:scale-105 group-hover:from-yellow-100 group-hover:to-yellow-200">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <StarIcon className="w-6 h-6 text-white" />
                </div>
                <h5 className="font-semibold text-gray-900 text-sm mb-1">Engagement Shoot</h5>
                <p className="text-xs text-gray-600">Romantic couple sessions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KliqShot Services */}
      <div className="mt-8 relative bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-6">
            <CameraIcon className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="feature-title feature-title-desktop text-gray-800">KliqShot Services</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-3"></div>
                <h4 className="font-semibold text-gray-900">Professional Photography Booking Platform</h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Book verified photographers instantly for weddings, portraits, events, and corporate photography. 
                From traditional ceremonies to modern celebrations, our platform connects you with skilled professionals 
                who capture your special moments with creativity and expertise.
              </p>
            </div>
            <div className="bg-gradient-to-br from-white to-purple-50 p-6 rounded-xl border border-purple-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></div>
                <h4 className="font-semibold text-gray-900">KliqShot Plus</h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Premium membership with exclusive access to top-rated photographers, priority booking during peak seasons, 
                special discounts on photography packages, and early access to new photographer listings. 
                Plus members get 24/7 customer support and personalized recommendations.
              </p>
            </div>
            <div className="bg-gradient-to-br from-white to-green-50 p-6 rounded-xl border border-green-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-3"></div>
                <h4 className="font-semibold text-gray-900">Secure Payments & No Cost EMI</h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Safe and secure payment processing with multiple payment options including credit cards, debit cards, 
                UPI, net banking, and No Cost EMI plans. Make high-end photography services accessible with 
                flexible payment options without burning a hole in your pocket.
              </p>
            </div>
            <div className="bg-gradient-to-br from-white to-yellow-50 p-6 rounded-xl border border-yellow-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mr-3"></div>
                <h4 className="font-semibold text-gray-900">Quality Assurance & Customer Support</h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                All photographers are verified, background checked, and rated by customers. Our quality assurance team 
                ensures every photographer meets our standards. Get help whenever you need it with our 24/7 customer support, 
                live chat, and comprehensive FAQ section.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {features.map((feature, index) => (
            <div key={index} className="group text-center bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className={`flex items-center justify-center w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="feature-title feature-title-desktop mb-3 text-gray-800">{feature.title}</h3>
              <p className="feature-description feature-description-desktop text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
      </div>

    </div>
  );
}