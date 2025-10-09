'use client';

import { 
  UserPlusIcon,
  PencilSquareIcon,
  CalendarDaysIcon,
  BanknotesIcon,
  RocketLaunchIcon,
  StarIcon,
  ArrowRightIcon,
  CheckBadgeIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';

export default function MobileHowSellerWorks() {
  const steps = [
    {
      number: "01",
      title: "Create Profile",
      description: "Sign up and create your professional portfolio",
      icon: <UserPlusIcon className="w-6 h-6 text-white" />,
      gradient: "from-cyan-500 to-blue-600",
      accentColor: "text-cyan-600"
    },
    {
      number: "02", 
      title: "Showcase Work",
      description: "Upload photos and set your pricing",
      icon: <PencilSquareIcon className="w-6 h-6 text-white" />,
      gradient: "from-violet-500 to-purple-600",
      accentColor: "text-violet-600"
    },
    {
      number: "03",
      title: "Get Bookings",
      description: "Receive bookings from nearby clients",
      icon: <CalendarDaysIcon className="w-6 h-6 text-white" />,
      gradient: "from-amber-500 to-orange-600",
      accentColor: "text-amber-600"
    },
    {
      number: "04",
      title: "Earn & Grow",
      description: "Build reputation and grow your business",
      icon: <BanknotesIcon className="w-6 h-6 text-white" />,
      gradient: "from-emerald-500 to-green-600",
      accentColor: "text-emerald-600"
    }
  ];

  const benefits = [
    "Zero fees",
    "Direct clients",
    "Flexible hours",
    "Your brand",
    "Secure pay",
    "24/7 support"
  ];

  return (
    <div className="px-4 py-6">
      {/* Hero Section - Compact */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-6 mb-6 shadow-xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00ek0xOCAxNmMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6TTQ4IDE2YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-center mb-3">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-full px-3 py-1.5 shadow-lg border border-white/30">
              <RocketLaunchIcon className="w-4 h-4 text-white animate-bounce" />
              <span className="text-white font-semibold text-xs">Join Now</span>
              <StarIcon className="w-4 h-4 text-yellow-300 animate-pulse" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-white text-center mb-2 leading-tight">
            Become a <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">KliqChamp</span>
          </h2>
          
          <p className="text-sm text-white/90 text-center leading-relaxed mb-4">
            Turn your photography passion into a thriving business
          </p>

          {/* Benefits Grid - Compact */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-1.5 bg-white/10 backdrop-blur-sm rounded-lg px-2.5 py-1.5 border border-white/20"
              >
                <CheckBadgeIcon className="w-3.5 h-3.5 text-green-300 flex-shrink-0" />
                <span className="text-white font-medium text-xs">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Button - Compact */}
          <div className="flex justify-center">
            <button className="group relative bg-white text-purple-600 px-6 py-2.5 rounded-full font-bold text-sm shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-2">
                <span className="group-hover:text-white transition-colors duration-300">Become a KliqChamp</span>
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 group-hover:text-white" />
              </div>
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-pink-400/30 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-400/30 rounded-full blur-2xl"></div>
      </div>
      
      {/* How It Works - Vertical Timeline */}
      <div>
        <div className="text-center mb-5">
          <div className="flex items-center justify-center mb-2">
            <div className="flex items-center space-x-1.5 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full px-3 py-1 shadow-sm">
              <StarIcon className="w-3.5 h-3.5 text-purple-600" />
              <span className="text-purple-600 font-semibold text-xs">Simple & Fast</span>
            </div>
          </div>
          
          <h3 className="section-title section-title-mobile mb-1 text-gray-800">
            How It Works
          </h3>
          
          <p className="section-description section-description-mobile text-gray-600">
            Four simple steps
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-300 via-violet-300 via-amber-300 to-emerald-300"></div>
          
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="relative flex items-start group">
                {/* Icon Circle */}
                <div className={`relative z-10 flex-shrink-0 w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center shadow-lg ring-4 ring-white transition-transform duration-300 group-hover:scale-110`}>
                  {step.icon}
                  {/* Step Number */}
                  <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                    <span className={`text-xs font-bold ${step.accentColor}`}>{step.number}</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="ml-4 flex-1 pt-1">
                  <h3 className={`font-bold text-base mb-1 ${step.accentColor}`}>
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow Down Connector */}
                {index < steps.length - 1 && (
                  <div className="absolute left-7 top-16">
                    <ArrowDownIcon className="w-4 h-4 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

