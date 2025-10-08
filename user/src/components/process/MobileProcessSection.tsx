'use client';

import { 
  MagnifyingGlassIcon, 
  ChatBubbleLeftRightIcon, 
  CameraIcon, 
  HeartIcon,
  SparklesIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function MobileProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Search & Browse",
      description: "Find photographers in your area",
      icon: <MagnifyingGlassIcon className="w-6 h-6 text-white" />,
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200"
    },
    {
      number: "02", 
      title: "Connect & Chat",
      description: "Message photographers directly",
      icon: <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />,
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-200"
    },
    {
      number: "03",
      title: "Book & Shoot",
      description: "Schedule your photography session",
      icon: <CameraIcon className="w-6 h-6 text-white" />,
      gradient: "from-purple-500 to-violet-600",
      bgGradient: "from-purple-50 to-violet-50",
      borderColor: "border-purple-200"
    },
    {
      number: "04",
      title: "Get Photos",
      description: "Receive your beautiful photos",
      icon: <HeartIcon className="w-6 h-6 text-white" />,
      gradient: "from-pink-500 to-rose-600",
      bgGradient: "from-pink-50 to-rose-50",
      borderColor: "border-pink-200"
    }
  ];

  return (
    <div className="px-4">
      {/* Hero Section with Beautiful Gradient Background */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
              <SparklesIcon className="w-4 h-4 text-purple-600" />
              <span className="text-purple-600 font-semibold text-sm">Simple Process</span>
              <SparklesIcon className="w-4 h-4 text-pink-600" />
            </div>
          </div>
          <h2 className="section-title section-title-mobile mb-2 bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="section-description section-description-mobile text-gray-700 leading-relaxed">
            Simple steps to find your perfect photographer
          </p>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-2 right-2 w-10 h-10 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-2 left-2 w-8 h-8 bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-full blur-xl"></div>
      </div>
      
      {/* Process Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="relative group">
            {/* Step Card */}
            <div className={`relative bg-gradient-to-br ${step.bgGradient} rounded-2xl p-4 shadow-lg border ${step.borderColor} hover:shadow-xl transition-all duration-300`}>
              {/* Step Number Badge */}
              <div className="absolute -top-2 left-4">
                <div className={`w-6 h-6 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                  <span className="text-white text-xs font-bold">{step.number}</span>
                </div>
              </div>
              
              <div className="flex items-center">
                {/* Icon Container */}
                <div className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${step.gradient} rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {step.icon}
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="feature-title feature-title-mobile mb-1 text-gray-800">{step.title}</h3>
                  <p className="feature-description feature-description-mobile text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Call to Action */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
          <span className="font-semibold text-sm">Get Started Today</span>
          <ArrowRightIcon className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
