'use client';

import { 
  MagnifyingGlassIcon, 
  ChatBubbleLeftRightIcon, 
  CameraIcon, 
  HeartIcon 
} from '@heroicons/react/24/outline';

export default function MobileProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Search & Browse",
      description: "Find photographers in your area",
      icon: <MagnifyingGlassIcon className="w-6 h-6 text-blue-600" />
    },
    {
      number: "02", 
      title: "Connect & Chat",
      description: "Message photographers directly",
      icon: <ChatBubbleLeftRightIcon className="w-6 h-6 text-green-600" />
    },
    {
      number: "03",
      title: "Book & Shoot",
      description: "Schedule your photography session",
      icon: <CameraIcon className="w-6 h-6 text-purple-600" />
    },
    {
      number: "04",
      title: "Get Photos",
      description: "Receive your beautiful photos",
      icon: <HeartIcon className="w-6 h-6 text-pink-600" />
    }
  ];

  return (
    <div className="px-4">
      <div className="text-center">
        <h2 className="section-title section-title-mobile mb-1">How It Works</h2>
        <p className="section-description section-description-mobile">Simple steps to find your perfect photographer</p>
      </div>
      
      <div className="space-y-2 mt-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center bg-white rounded-lg p-3 shadow-sm">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mr-4">
              {step.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <span className="text-sm font-medium text-gray-500 mr-2">{step.number}</span>
                <h3 className="feature-title feature-title-mobile">{step.title}</h3>
              </div>
              <p className="feature-description feature-description-mobile">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
