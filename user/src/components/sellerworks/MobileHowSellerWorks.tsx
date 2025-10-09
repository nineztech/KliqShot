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

export default function MobileHowSellerWorks() {
  const steps = [
    {
      number: "01",
      title: "Create Profile",
      description: "Sign up and create your professional portfolio",
      icon: <UserPlusIcon className="w-6 h-6 text-white" />,
      gradient: "from-cyan-500 to-blue-600",
      bgGradient: "from-cyan-50 to-blue-50",
      borderColor: "border-cyan-200",
      accentColor: "text-cyan-600"
    },
    {
      number: "02", 
      title: "Showcase Work",
      description: "Upload photos and set your pricing",
      icon: <PencilSquareIcon className="w-6 h-6 text-white" />,
      gradient: "from-violet-500 to-purple-600",
      bgGradient: "from-violet-50 to-purple-50",
      borderColor: "border-violet-200",
      accentColor: "text-violet-600"
    },
    {
      number: "03",
      title: "Get Bookings",
      description: "Receive bookings from nearby clients",
      icon: <CalendarDaysIcon className="w-6 h-6 text-white" />,
      gradient: "from-amber-500 to-orange-600",
      bgGradient: "from-amber-50 to-orange-50",
      borderColor: "border-amber-200",
      accentColor: "text-amber-600"
    },
    {
      number: "04",
      title: "Earn & Grow",
      description: "Build reputation and grow your business",
      icon: <BanknotesIcon className="w-6 h-6 text-white" />,
      gradient: "from-emerald-500 to-green-600",
      bgGradient: "from-emerald-50 to-green-50",
      borderColor: "border-emerald-200",
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
    <div className="px-4 py-12 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 mb-12 shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00ek0xOCAxNmMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6TTQ4IDE2YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 shadow-xl border border-white/30">
              <RocketLaunchIcon className="w-5 h-5 text-white animate-bounce" />
              <span className="text-white font-bold text-sm">Join Now</span>
              <StarIcon className="w-5 h-5 text-yellow-300 animate-pulse" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-white text-center mb-4 leading-tight">
            Become a <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">KliqChamp</span>
          </h2>
          
          <p className="text-base text-white/90 text-center leading-relaxed mb-6">
            Turn your photography passion into a thriving business
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20"
              >
                <CheckBadgeIcon className="w-4 h-4 text-green-300 flex-shrink-0" />
                <span className="text-white font-medium text-xs">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <button className="group relative bg-white text-purple-600 px-8 py-3.5 rounded-full font-bold text-base shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-2">
                <span className="group-hover:text-white transition-colors duration-300">Start Earning</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 group-hover:text-white" />
              </div>
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-pink-400/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-400/30 rounded-full blur-3xl"></div>
      </div>
      
      {/* How It Works Section */}
      <div className="mb-10">
        <div className="flex items-center justify-center mb-3">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full px-4 py-1.5 shadow-md">
            <StarIcon className="w-4 h-4 text-purple-600" />
            <span className="text-purple-600 font-semibold text-sm">Simple & Fast</span>
          </div>
        </div>
        
        <h3 className="section-title section-title-mobile text-center mb-2 text-gray-800">
          How It Works
        </h3>
        
        <p className="section-description section-description-mobile text-center text-gray-600 mb-8 px-4">
          Four simple steps to start your journey
        </p>

        {/* Process Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Step Card */}
              <div className={`relative bg-gradient-to-br ${step.bgGradient} rounded-2xl p-5 shadow-lg border-2 ${step.borderColor} hover:shadow-xl transition-all duration-300 hover:scale-102`}>
                {/* Step Number Badge */}
                <div className="absolute -top-3 left-4">
                  <div className={`w-8 h-8 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center shadow-lg ring-2 ring-white`}>
                    <span className="text-white text-xs font-bold">{step.number}</span>
                  </div>
                </div>
                
                <div className="flex items-center pt-2">
                  {/* Icon Container */}
                  <div className={`flex items-center justify-center w-14 h-14 bg-gradient-to-br ${step.gradient} rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0`}>
                    {step.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className={`feature-title feature-title-mobile mb-1.5 ${step.accentColor} font-bold`}>
                      {step.title}
                    </h3>
                    <p className="feature-description feature-description-mobile text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
              </div>

              {/* Connector Dot (between steps) */}
              {index < steps.length - 1 && (
                <div className="flex justify-center py-2">
                  <div className="w-1.5 h-8 bg-gradient-to-b from-purple-300 to-blue-300 rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="mt-12 bg-gradient-to-r from-purple-100 via-blue-100 to-pink-100 rounded-3xl p-6 text-center shadow-xl border-2 border-purple-200">
        <div className="flex items-center justify-center mb-3">
          <RocketLaunchIcon className="w-8 h-8 text-purple-600 animate-bounce" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Ready to Start?
        </h3>
        <p className="text-sm text-gray-700 mb-6 leading-relaxed px-2">
          Join thousands of photographers already earning on KliqShot!
        </p>
        <button className="group bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white px-8 py-3.5 rounded-full font-bold text-base shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 relative overflow-hidden w-full max-w-xs mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center justify-center space-x-2">
            <span>Become a KliqChamp</span>
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </button>
      </div>
    </div>
  );
}

