'use client';

import { 
  MagnifyingGlassIcon, 
  ChatBubbleLeftRightIcon, 
  CameraIcon, 
  HeartIcon 
} from '@heroicons/react/24/outline';

export default function DesktopProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Search & Browse",
      description: "Find photographers in your area based on location, style, and budget",
      icon: <MagnifyingGlassIcon className="w-8 h-8 text-blue-600" />
    },
    {
      number: "02", 
      title: "Connect & Chat",
      description: "Message photographers directly to discuss your requirements",
      icon: <ChatBubbleLeftRightIcon className="w-8 h-8 text-green-600" />
    },
    {
      number: "03",
      title: "Book & Shoot",
      description: "Schedule your photography session and capture amazing moments",
      icon: <CameraIcon className="w-8 h-8 text-purple-600" />
    },
    {
      number: "04",
      title: "Get Photos",
      description: "Receive your beautifully edited photos delivered to your inbox",
      icon: <HeartIcon className="w-8 h-8 text-pink-600" />
    }
  ];

  return (
    <div className="px-4">
      <div className="text-center">
        <h2 className="section-title section-title-desktop mb-2">How It Works</h2>
        <p className="section-description section-description-desktop max-w-2xl mx-auto">
          Simple steps to find your perfect photographer and capture your special moments
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mx-auto mb-2">
                {step.icon}
              </div>
              <div className="mb-1">
                <span className="text-xs font-medium text-blue-600 mr-2">{step.number}</span>
                <h3 className="feature-title feature-title-desktop inline">{step.title}</h3>
              </div>
              <p className="feature-description feature-description-desktop">{step.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
