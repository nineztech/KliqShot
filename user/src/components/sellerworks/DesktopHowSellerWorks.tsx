'use client';

import { 
  UserPlusIcon,
  PencilSquareIcon,
  CalendarDaysIcon,
  BanknotesIcon,
  RocketLaunchIcon,
  StarIcon,
  ArrowRightIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function DesktopHowSellerWorks() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description: "Sign up and create a stunning professional portfolio showcasing your photography work",
      icon: <UserPlusIcon className="w-8 h-8 text-white" />,
      gradient: "from-cyan-500 to-blue-600",
      accentColor: "text-cyan-600"
    },
    {
      number: "02", 
      title: "Showcase Your Work",
      description: "Upload your best photos, set your pricing, and highlight your unique photography style",
      icon: <PencilSquareIcon className="w-8 h-8 text-white" />,
      gradient: "from-violet-500 to-purple-600",
      accentColor: "text-violet-600"
    },
    {
      number: "03",
      title: "Receive Bookings",
      description: "Get discovered by clients looking for talented photographers in your area",
      icon: <CalendarDaysIcon className="w-8 h-8 text-white" />,
      gradient: "from-amber-500 to-orange-600",
      accentColor: "text-amber-600"
    },
    {
      number: "04",
      title: "Earn & Grow",
      description: "Build your reputation, earn money, and grow your photography business with every shoot",
      icon: <BanknotesIcon className="w-8 h-8 text-white" />,
      gradient: "from-emerald-500 to-green-600",
      accentColor: "text-emerald-600"
    }
  ];

  const benefits = [
    "Zero commission fees",
    "Direct client communication",
    "Flexible scheduling",
    "Build your brand",
    "Secure payments",
    "24/7 support"
  ];

  return (
    <div className="px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section - Compact */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 mb-8 shadow-xl">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00ek0xOCAxNmMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6TTQ4IDE2YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-3">
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-white/30">
                <RocketLaunchIcon className="w-5 h-5 text-white animate-bounce" />
                <span className="text-white font-semibold text-sm">Join the Community</span>
                <StarIcon className="w-5 h-5 text-yellow-300 animate-pulse" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-white text-center mb-3 leading-tight">
              Become a <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">KliqChamp</span>
            </h2>
            
            <p className="text-base text-white/90 text-center max-w-2xl mx-auto mb-5">
              Turn your photography passion into a thriving business. Connect with clients and earn on your own terms.
            </p>

            {/* Benefits Grid - Compact */}
            <div className="grid grid-cols-3 gap-2 max-w-2xl mx-auto mb-5">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-1.5 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <CheckBadgeIcon className="w-4 h-4 text-green-300 flex-shrink-0" />
                  <span className="text-white font-medium text-xs">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Button - Compact */}
            <div className="flex justify-center">
              <button className="group relative bg-white text-purple-600 px-8 py-3 rounded-full font-bold text-base shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-2">
                  <span className="group-hover:text-white transition-colors duration-300">Become a KliqChamp</span>
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 group-hover:text-white" />
                </div>
              </button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-pink-400/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-400/30 rounded-full blur-3xl"></div>
        </div>
        
        {/* How It Works - Timeline Style */}
        <div className="mb-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-2">
              <div className="flex items-center space-x-1.5 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full px-4 py-1.5 shadow-sm">
                <StarIcon className="w-4 h-4 text-purple-600" />
                <span className="text-purple-600 font-semibold text-sm">Simple & Fast</span>
              </div>
            </div>
            
            <h3 className="section-title section-title-desktop mb-2 text-gray-800">
              How It Works
            </h3>
            
            <p className="section-description section-description-desktop text-gray-600">
              Four simple steps to start your journey
            </p>
          </div>

          {/* Timeline Layout */}
          <div className="relative max-w-5xl mx-auto">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-300 via-violet-300 via-amber-300 to-emerald-300"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-10">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className="relative group"
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  {/* Timeline Item */}
                  <div className="flex flex-col items-center">
                    {/* Icon Circle */}
                    <div className={`relative w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center shadow-lg ring-4 ring-white transition-all duration-300 ${hoveredStep === index ? 'scale-125 rotate-12' : 'group-hover:scale-110'}`}>
                      {step.icon}
                      {/* Step Number */}
                      <div className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md">
                        <span className={`text-xs font-bold ${step.accentColor}`}>{step.number}</span>
                      </div>
                    </div>
                    
                    {/* Arrow Connector */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-7 left-full w-full">
                        <ArrowRightIcon className="w-6 h-6 text-gray-300 absolute left-1/2 -translate-x-1/2" />
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="text-center mt-4">
                      <h3 className={`font-bold text-base mb-2 ${step.accentColor} transition-all duration-300 ${hoveredStep === index ? 'scale-105' : ''}`}>
                        {step.title}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

