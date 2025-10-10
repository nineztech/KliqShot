'use client';

import { 
  UserCircleIcon, 
  PhotoIcon, 
  CalendarDaysIcon, 
  CurrencyDollarIcon,
  SparklesIcon,
  RocketLaunchIcon,
  StarIcon
} from '@heroicons/react/24/outline';

export default function MobileHowSellerWorks() {
  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description: "Sign up and create your professional photographer profile",
      icon: <UserCircleIcon className="w-6 h-6 text-white" />,
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-200"
    },
    {
      number: "02", 
      title: "Showcase Your Work",
      description: "Upload your best photography portfolio",
      icon: <PhotoIcon className="w-6 h-6 text-white" />,
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50",
      borderColor: "border-purple-200"
    },
    {
      number: "03",
      title: "Get Bookings",
      description: "Receive booking requests from clients",
      icon: <CalendarDaysIcon className="w-6 h-6 text-white" />,
      gradient: "from-orange-500 to-red-600",
      bgGradient: "from-orange-50 to-red-50",
      borderColor: "border-orange-200"
    },
    {
      number: "04",
      title: "Earn Money",
      description: "Complete shoots and grow your business",
      icon: <CurrencyDollarIcon className="w-6 h-6 text-white" />,
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-200"
    }
  ];

  return (
    <div className="bg-pink-50 py-6">
      <div className="px-4 py-4">
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-2xl p-6 mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-28 h-28 bg-gradient-to-br from-orange-400/10 to-red-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-purple-100">
              <StarIcon className="w-4 h-4 text-purple-600 animate-pulse" />
              <span className="text-purple-600 font-bold text-sm">For Photographers</span>
              <SparklesIcon className="w-4 h-4 text-pink-600 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
          <h2 className="section-title section-title-mobile mb-3 bg-gradient-to-r from-purple-900 via-pink-900 to-orange-900 bg-clip-text text-transparent">
            How KliqChamp Works
          </h2>
          <p className="section-description section-description-mobile text-gray-700 leading-relaxed mb-3">
            Turn your passion into a thriving business
          </p>
          <div className="flex items-center justify-center space-x-4 mt-4 flex-wrap gap-2">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600 text-xs font-medium">Simple Setup</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <span className="text-gray-600 text-xs font-medium">More Clients</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              <span className="text-gray-600 text-xs font-medium">Grow Business</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="relative group">
            <div className={`relative bg-gradient-to-br ${step.bgGradient} rounded-xl p-4 shadow-lg border-2 ${step.borderColor} hover:shadow-xl transition-all duration-300 hover:scale-[1.02]`}>
              <div className="absolute -top-2 left-3">
                <div className={`w-7 h-7 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-white text-xs font-bold">{step.number}</span>
                </div>
              </div>
              <div className="flex items-center pt-2">
                <div className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${step.gradient} rounded-xl mr-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg flex-shrink-0`}>
                  {step.icon}
                </div>
                <div className="flex-1">
                  <h3 className="feature-title feature-title-mobile mb-1 text-gray-900">{step.title}</h3>
                  <p className="feature-description feature-description-mobile text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
              <div className={`absolute -bottom-1 -right-1 w-10 h-10 bg-gradient-to-br ${step.gradient} opacity-10 rounded-full blur-lg`}></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center px-2">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-40 animate-pulse"></div>
          <button className="relative inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-bold text-sm group overflow-hidden w-full max-w-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <RocketLaunchIcon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            <span className="relative z-10">Become a KliqChamp</span>
            <SparklesIcon className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
          </button>
        </div>
        <p className="mt-5 text-gray-600 text-sm font-medium px-4">Join 1000+ photographers growing their business</p>
      </div>
      
      </div>
    </div>
  );
}

