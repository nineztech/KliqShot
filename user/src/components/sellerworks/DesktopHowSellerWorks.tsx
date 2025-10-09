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
      bgGradient: "from-cyan-50 to-blue-50",
      borderColor: "border-cyan-200",
      accentColor: "text-cyan-600"
    },
    {
      number: "02", 
      title: "Showcase Your Work",
      description: "Upload your best photos, set your pricing, and highlight your unique photography style",
      icon: <PencilSquareIcon className="w-8 h-8 text-white" />,
      gradient: "from-violet-500 to-purple-600",
      bgGradient: "from-violet-50 to-purple-50",
      borderColor: "border-violet-200",
      accentColor: "text-violet-600"
    },
    {
      number: "03",
      title: "Receive Bookings",
      description: "Get discovered by clients looking for talented photographers in your area",
      icon: <CalendarDaysIcon className="w-8 h-8 text-white" />,
      gradient: "from-amber-500 to-orange-600",
      bgGradient: "from-amber-50 to-orange-50",
      borderColor: "border-amber-200",
      accentColor: "text-amber-600"
    },
    {
      number: "04",
      title: "Earn & Grow",
      description: "Build your reputation, earn money, and grow your photography business with every shoot",
      icon: <BanknotesIcon className="w-8 h-8 text-white" />,
      gradient: "from-emerald-500 to-green-600",
      bgGradient: "from-emerald-50 to-green-50",
      borderColor: "border-emerald-200",
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
    <div className="px-4 py-8 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 mb-10 shadow-2xl">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00ek0xOCAxNmMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6TTQ4IDE2YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-full px-5 py-2 shadow-xl border border-white/30">
                <RocketLaunchIcon className="w-5 h-5 text-white animate-bounce" />
                <span className="text-white font-bold text-base">Join the Community</span>
                <StarIcon className="w-5 h-5 text-yellow-300 animate-pulse" />
              </div>
            </div>
            
            <h2 className="text-4xl font-bold text-white text-center mb-4 leading-tight">
              Become a <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">KliqChamp</span>
            </h2>
            
            <p className="text-lg text-white/90 text-center max-w-2xl mx-auto leading-relaxed mb-6">
              Turn your photography passion into a thriving business. Connect with clients, showcase your talent, and earn on your own terms.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto mb-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <CheckBadgeIcon className="w-4 h-4 text-green-300 flex-shrink-0" />
                  <span className="text-white font-medium text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <button className="group relative bg-white text-purple-600 px-8 py-3.5 rounded-full font-bold text-base shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-2">
                  <span className="group-hover:text-white transition-colors duration-300">Start Earning Today</span>
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300 group-hover:text-white" />
                </div>
              </button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-pink-400/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-400/30 rounded-full blur-3xl"></div>
        </div>
        
        {/* How It Works Section */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-3">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full px-4 py-1.5 shadow-md">
              <StarIcon className="w-4 h-4 text-purple-600" />
              <span className="text-purple-600 font-semibold text-sm">Simple & Fast</span>
            </div>
          </div>
          
          <h3 className="section-title section-title-desktop text-center mb-3 text-gray-800">
            How It Works
          </h3>
          
          <p className="section-description section-description-desktop text-center max-w-2xl mx-auto text-gray-600 mb-8">
            Four simple steps to start your journey as a professional photographer on KliqShot
          </p>

          {/* Process Steps - Timeline Style */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className="relative group"
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  {/* Step Row */}
                  <div className={`relative flex items-center bg-white rounded-xl p-5 shadow-md border-l-4 ${step.borderColor} transition-all duration-300 ${hoveredStep === index ? 'shadow-xl scale-105' : 'hover:shadow-lg'}`}>
                    {/* Number Badge */}
                    <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center shadow-lg ring-2 ring-white transition-transform duration-300 ${hoveredStep === index ? 'scale-110 rotate-6' : ''}`}>
                      <span className="text-white text-lg font-bold">{step.number}</span>
                    </div>
                    
                    {/* Icon */}
                    <div className={`flex-shrink-0 mx-5 w-12 h-12 bg-gradient-to-br ${step.bgGradient} rounded-lg flex items-center justify-center transition-transform duration-300 ${hoveredStep === index ? 'scale-110' : ''}`}>
                      <div className="w-6 h-6">
                        {step.icon}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className={`font-bold text-lg mb-1 ${step.accentColor}`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Arrow Indicator */}
                    <div className={`flex-shrink-0 ml-4 transition-transform duration-300 ${hoveredStep === index ? 'translate-x-2' : ''}`}>
                      <ArrowRightIcon className={`w-6 h-6 ${step.accentColor}`} />
                    </div>

                    {/* Gradient Overlay on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${step.bgGradient} opacity-0 group-hover:opacity-30 rounded-xl transition-opacity duration-300 pointer-events-none`}></div>
                  </div>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="flex justify-start pl-7 py-2">
                      <div className={`w-0.5 h-6 bg-gradient-to-b ${step.gradient}`}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-10 bg-gradient-to-r from-purple-100 via-blue-100 to-pink-100 rounded-2xl p-6 text-center shadow-xl border-2 border-purple-200">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-3">
              <RocketLaunchIcon className="w-8 h-8 text-purple-600 animate-bounce" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Ready to Start Your Journey?
            </h3>
            <p className="text-base text-gray-700 mb-6 leading-relaxed">
              Join thousands of photographers already earning and growing their business on KliqShot. 
              Your success story starts here!
            </p>
            <button className="group bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white px-10 py-3.5 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-2">
                <span>Become a KliqChamp Now</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

