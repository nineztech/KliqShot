'use client';

import { useState, useEffect, useRef } from 'react';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

export default function MobileAdvertisementSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const photographers = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "Mumbai, India",
      rating: 4.9,
      reviews: 156,
      price: "₹15,000",
      specialty: "Wedding Photography",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      experience: "5+ years"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Delhi, India",
      rating: 4.8,
      reviews: 203,
      price: "₹12,000",
      specialty: "Portrait Photography",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      experience: "7+ years"
    },
    {
      id: 3,
      name: "Priya Sharma",
      location: "Bangalore, India",
      rating: 4.9,
      reviews: 189,
      price: "₹18,000",
      specialty: "Family Photography",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      experience: "6+ years"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photographers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photographers.length) % photographers.length);
  };

  // Touch event handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentPhotographer = photographers[currentIndex];

  return (
    <div className="px-4">
      <div className="text-center">
        <h2 className="section-title section-title-mobile mb-1">Featured Photographers</h2>
        <p className="section-description section-description-mobile">Top-rated professionals in your area</p>
      </div>

      <div 
        ref={containerRef}
        className="relative bg-white rounded-lg shadow-md overflow-hidden mt-4"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Photographer Card */}
        <div className="p-3">
          <div className="flex items-center space-x-3">
            <img
              src={currentPhotographer.image}
              alt={currentPhotographer.name}
              className="w-10 h-10 rounded-full object-cover"
            />
                <div className="flex-1">
                  <h3 className="card-title card-title-mobile">{currentPhotographer.name}</h3>
                  <p className="card-description card-description-mobile">{currentPhotographer.specialty}</p>
              <div className="flex items-center mt-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarSolidIcon
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(currentPhotographer.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600 ml-1">
                  {currentPhotographer.rating} ({currentPhotographer.reviews})
                </span>
              </div>
            </div>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-gray-500">Location:</span>
              <p className="font-medium text-gray-900">{currentPhotographer.location}</p>
            </div>
            <div>
              <span className="text-gray-500">Experience:</span>
              <p className="font-medium text-gray-900">{currentPhotographer.experience}</p>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <div>
              <span className="text-base font-bold text-blue-600">{currentPhotographer.price}</span>
              <span className="text-gray-500 text-xs ml-1">per session</span>
            </div>
            <button className="bg-blue-600 text-white px-2.5 py-1 rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors duration-200">
              Book Now
            </button>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex items-center justify-center px-3 pb-2">
          <div className="flex space-x-1">
            {photographers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1 h-1 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
