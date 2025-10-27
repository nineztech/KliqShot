'use client';

import { 
  SparklesIcon,
  ArrowRightIcon,
  DocumentCheckIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function MobileProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Discover",
      description: "Client enters event details, date, and desired style/vision. Our AI suggests a curated list or a single 'Top Match Photographer.'",
      icon: <SparklesIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200"
    },
    {
      number: "02", 
      title: "Decide",
      description: "Client explores validated portfolios, relevant experience, transparent packages, and reviews backed by visual proof from past events.",
      icon: <DocumentCheckIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-200"
    },
    {
      number: "03",
      title: "Deal (Book with Confidence)",
      description: "Client books seamlessly with a secure, hybrid payment model that protects both parties.",
      icon: <ShieldCheckIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
      gradient: "from-pink-500 to-rose-600",
      bgGradient: "from-pink-50 to-rose-50",
      borderColor: "border-pink-200"
    }
  ];

  return (
    <div className="px-2 sm:px-4">
      {/* Hero Section with Beautiful Gradient Background */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center mb-2 sm:mb-3">
            <div className="flex items-center space-x-1.5 sm:space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 sm:py-1.5 shadow-lg">
              <SparklesIcon className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
              <span className="text-purple-600 font-semibold text-xs sm:text-sm">Simple Process</span>
              <SparklesIcon className="w-3 h-3 sm:w-4 sm:h-4 text-pink-600" />
            </div>
          </div>
          <h2 className="text-lg sm:text-2xl font-bold mb-1.5 sm:mb-2 bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            Simple steps to find your perfect photographer
          </p>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-2 right-2 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-full blur-xl"></div>
      </div>
      
      {/* Process Steps */}
      <div className="space-y-3 sm:space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="relative group">
            {/* Step Card */}
            <div className={`relative bg-gradient-to-br ${step.bgGradient} rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg border ${step.borderColor} hover:shadow-xl transition-all duration-300`}>
              <div className="flex items-start">
                {/* Icon Container */}
                <div className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${step.gradient} rounded-lg sm:rounded-xl mr-3 sm:mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0`}>
                  {step.icon}
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xs sm:text-sm font-semibold mb-0.5 sm:mb-1 text-gray-800">{step.title}</h3>
                  <p className="text-[11px] sm:text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Call to Action */}
      <div className="mt-6 sm:mt-8 text-center">
        <div className="inline-flex items-center space-x-1.5 sm:space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
          <span className="font-semibold text-xs sm:text-sm">Get Started Today</span>
          <ArrowRightIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
      </div>
    </div>
  );
}
