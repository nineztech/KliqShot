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

export default function DesktopHowSellerWorks() {
  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description: "Sign up and create your professional photographer profile with your expertise and services",
      icon: <UserCircleIcon className="w-8 h-8 text-white" />,
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-200"
    },
    {
      number: "02", 
      title: "Showcase Your Work",
      description: "Upload your best photography portfolio and let your work speak for itself",
      icon: <PhotoIcon className="w-8 h-8 text-white" />,
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50",
      borderColor: "border-purple-200"
    },
    {
      number: "03",
      title: "Get Bookings",
      description: "Receive booking requests from clients looking for your photography style and expertise",
      icon: <CalendarDaysIcon className="w-8 h-8 text-white" />,
      gradient: "from-orange-500 to-red-600",
      bgGradient: "from-orange-50 to-red-50",
      borderColor: "border-orange-200"
    },
    {
      number: "04",
      title: "Earn Money",
      description: "Complete shoots, deliver stunning photos, and grow your photography business",
      icon: <CurrencyDollarIcon className="w-8 h-8 text-white" />,
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-200"
    }
  ];

  return (
    <div className="bg-pink-50 py-8">
      <div className="px-4 py-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-3xl p-12 mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-orange-400/10 to-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-3 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-xl border border-purple-100 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <StarIcon className="w-6 h-6 text-purple-600 animate-pulse" />
              <span className="text-purple-600 font-bold text-lg">For Photographers</span>
              <SparklesIcon className="w-6 h-6 text-pink-600 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
          <h2 className="section-title section-title-desktop mb-6 bg-gradient-to-r from-purple-900 via-pink-900 to-orange-900 bg-clip-text text-transparent">
            How KliqChamp Works
          </h2>
          <p className="section-description section-description-desktop max-w-3xl mx-auto text-gray-700 leading-relaxed mb-4">
            Join our community of professional photographers and turn your passion into a thriving business
          </p>
          <div className="flex items-center justify-center space-x-8 mt-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600 font-medium">Simple Setup</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <span className="text-gray-600 font-medium">More Clients</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              <span className="text-gray-600 font-medium">Grow Your Business</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative">
        <div className="hidden lg:block absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 via-orange-200 to-green-200 mx-16" style={{ top: '6rem' }}></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className={`relative bg-gradient-to-br ${step.bgGradient} rounded-2xl p-6 shadow-xl border-2 ${step.borderColor} hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:-translate-y-2`}>
                <div className="absolute -top-3 left-6">
                  <div className={`w-10 h-10 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center shadow-xl group-hover:scale-125 transition-transform duration-300`}>
                    <span className="text-white text-base font-bold">{step.number}</span>
                  </div>
                </div>
                <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl mx-auto mb-4 mt-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl`}>
                  {step.icon}
                </div>
                <div className="text-center">
                  <h3 className="feature-title feature-title-desktop mb-3 text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-purple-900 group-hover:bg-clip-text transition-all duration-300">{step.title}</h3>
                  <p className="feature-description feature-description-desktop text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                <div className={`absolute -bottom-1 -right-1 w-12 h-12 bg-gradient-to-br ${step.gradient} opacity-10 rounded-full blur-xl group-hover:opacity-30 transition-opacity duration-300`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-10 text-center">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <button className="relative inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 font-bold text-base group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <RocketLaunchIcon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            <span className="relative z-10">Become a KliqChamp</span>
            <SparklesIcon className="w-5 h-5 group-hover:scale-125 transition-transform duration-300" />
          </button>
        </div>
        <p className="mt-6 text-gray-600 font-medium">Join 1000+ professional photographers growing their business with us</p>
      </div>
      
      </div>
    </div>
  );
}

