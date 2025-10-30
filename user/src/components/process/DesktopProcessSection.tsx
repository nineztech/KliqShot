'use client';

import { 
  MagnifyingGlassIcon, 
  ChatBubbleLeftRightIcon, 
  CameraIcon, 
  HeartIcon,
  SparklesIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  DocumentCheckIcon
} from '@heroicons/react/24/outline';

export default function DesktopProcessSection() {
  const steps = [
    {
      number: "01",
      title: "DISCOVER",
      description: "Tell Us Your Vision: Enter event details, date, and desired style. Get personalized recommendations or explore top matches.'",
      icon: <SparklesIcon className="w-8 h-8 text-white" />,
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200"
    },
    {
      number: "02", 
      title: "DECIDE",
      description: "Explore & Compare: View validated portfolios, transparent packages, and authentic customer reviews. Choose with confidence.",
      icon: <DocumentCheckIcon className="w-8 h-8 text-white" />,
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-200"
    },
    {
      number: "03",
      title: "DEAL (BOOK WITH CONFIDENCE)",
      description: "Seamless Booking & Secure Payments: Book photographers instantly with our secure, hybrid payment system protecting both parties.",
      icon: <ShieldCheckIcon className="w-8 h-8 text-white" />,
      gradient: "from-pink-500 to-rose-600",
      bgGradient: "from-pink-50 to-rose-50",
      borderColor: "border-pink-200"
    }
  ];

  return (
    <div className="px-4">
      {/* Hero Section with Beautiful Gradient Background */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-8 mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
              <SparklesIcon className="w-5 h-5 text-purple-600" />
              <span className="text-purple-600 font-semibold">Simple Process</span>
              <SparklesIcon className="w-5 h-5 text-pink-600" />
            </div>
          </div>
          <h2 className="section-title section-title-desktop mb-4 bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="section-description section-description-desktop max-w-2xl mx-auto text-gray-700 leading-relaxed">
            Simple steps to find your perfect photographer and capture your special moments
          </p>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-full blur-xl"></div>
      </div>
      
      {/* Process Steps */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative group h-full">
              {/* Step Card */}
              <div className={`relative bg-gradient-to-br ${step.bgGradient} rounded-2xl p-6 shadow-lg border ${step.borderColor} hover:shadow-xl transition-all duration-300 hover:scale-105 h-full flex flex-col`}>
                {/* Step Number Badge */}
                <div className="absolute -top-3 left-6">
                  <div className={`w-8 h-8 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                    <span className="text-white text-sm font-bold">{step.number}</span>
                  </div>
                </div>
                
                {/* Icon Container */}
                <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0`}>
                  {step.icon}
                </div>
                
                {/* Content */}
                <div className="text-center flex flex-col flex-grow">
                  <h3 className="feature-title feature-title-desktop mb-3 text-gray-800">{step.title}</h3>
                  <p className="feature-description feature-description-desktop text-gray-600 leading-relaxed flex-grow">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
          <span className="font-semibold">Get Started Today</span>
          <ArrowRightIcon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
