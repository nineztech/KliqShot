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
    <div className="bg-gradient-to-b from-pink-50 via-purple-50 to-orange-50 py-4 sm:py-6 md:py-8 lg:py-12">
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto py-2 sm:py-4">
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-3xl p-5 sm:p-6 md:p-8 mb-5 sm:mb-6 md:mb-8 shadow-xl border border-white/50">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5"></div>
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center mb-4 sm:mb-5">
            <div className="flex items-center space-x-2 bg-white/95 backdrop-blur-md rounded-full px-4 py-2 sm:px-5 sm:py-2.5 shadow-xl border border-purple-200/50">
              <StarIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-purple-600 animate-pulse" />
              <span className="text-purple-600 font-bold text-[9px] sm:text-[10px] md:text-xs">For Photographers</span>
              <SparklesIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-pink-600 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
          <h2 className="section-title section-title-mobile mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-purple-900 via-pink-900 to-orange-900 bg-clip-text text-transparent text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
            How KliqChamp Works
          </h2>
          <p className="section-description section-description-mobile text-gray-700 leading-relaxed mb-3 sm:mb-4 md:mb-5 text-[10px] sm:text-xs md:text-sm max-w-2xl mx-auto">
            Turn your passion into a thriving business
          </p>
          <div className="flex items-center justify-center mt-4 sm:mt-5 md:mt-6 flex-wrap gap-x-2 sm:gap-x-2.5 md:gap-x-3 lg:gap-x-4 gap-y-2">
            <div className="flex items-center space-x-1 flex-shrink-0">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600 text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-medium whitespace-nowrap">Simple Setup</span>
            </div>
            <div className="flex items-center space-x-1 flex-shrink-0">
              <div className="flex items-center space-x-0.5 sm:space-x-1">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-1.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                <span className="text-gray-600 text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-medium whitespace-nowrap">More Clients</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-1.5 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                <span className="text-gray-600 text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-medium whitespace-nowrap">Grow Business</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3 sm:space-y-3 md:space-y-4 lg:space-y-5 lg:grid lg:grid-cols-2 lg:gap-4 xl:gap-5">
        {steps.map((step, index) => (
          <div key={index} className="relative group">
            <div className={`relative bg-gradient-to-br ${step.bgGradient} rounded-xl sm:rounded-2xl p-3 sm:p-3.5 md:p-4 lg:p-5 shadow-xl border-2 ${step.borderColor} hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1`}>
              <div className="absolute -top-2 sm:-top-2.5 md:-top-3 left-2.5 sm:left-3 md:left-4">
                <div className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center shadow-xl group-hover:scale-125 transition-all duration-300 border-2 border-white/50`}>
                  <span className="text-white text-[8px] sm:text-[9px] md:text-[10px] font-bold">{step.number}</span>
                </div>
              </div>
              <div className="flex items-center pt-2 sm:pt-2.5 md:pt-3">
                <div className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 bg-gradient-to-br ${step.gradient} rounded-xl sm:rounded-2xl mr-2 sm:mr-2.5 md:mr-3 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300 shadow-xl flex-shrink-0 border border-white/30`}>
                  {step.icon}
                </div>
                <div className="flex-1">
                  <h3 className="feature-title feature-title-mobile mb-0.5 sm:mb-1 text-gray-900 text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-semibold">{step.title}</h3>
                  <p className="feature-description feature-description-mobile text-gray-600 leading-relaxed text-[8px] sm:text-[9px] md:text-[10px]">{step.description}</p>
                </div>
              </div>
              <div className={`absolute -bottom-1 -right-1 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br ${step.gradient} opacity-5 rounded-full blur-2xl`}></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-5 sm:mt-7 md:mt-9 text-center px-2 sm:px-4">
        <div className="relative inline-block w-full max-w-xs sm:max-w-sm md:max-w-md">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-40 animate-pulse"></div>
          <button className="relative inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white px-5 py-3 sm:px-6 sm:py-3.5 md:px-8 md:py-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110 font-bold text-[9px] sm:text-[10px] md:text-xs group overflow-hidden w-full border border-white/20">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <RocketLaunchIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 group-hover:rotate-12 transition-transform duration-300" />
            <span className="relative z-10">Become a KliqChamp</span>
            <SparklesIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 group-hover:scale-125 transition-transform duration-300" />
          </button>
        </div>
        <p className="mt-4 sm:mt-6 md:mt-7 text-gray-600 text-[9px] sm:text-[10px] md:text-xs font-medium px-2 sm:px-4">Join 1000+ photographers growing their business</p>
      </div>
      
      </div>
    </div>
  );
}

