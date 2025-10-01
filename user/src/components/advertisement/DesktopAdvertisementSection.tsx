'use client';

import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

export default function DesktopAdvertisementSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const photographers = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "Mumbai, India",
      rating: 4.9,
      reviews: 156,
      price: "₹15,000",
      specialty: "Wedding Photography",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
      experience: "5+ years",
      description: "Specialized in capturing beautiful wedding moments with a creative and artistic approach."
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Delhi, India",
      rating: 4.8,
      reviews: 203,
      price: "₹12,000",
      specialty: "Portrait Photography",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      experience: "7+ years",
      description: "Expert in professional portraits and headshots with stunning lighting techniques."
    },
    {
      id: 3,
      name: "Priya Sharma",
      location: "Bangalore, India",
      rating: 4.9,
      reviews: 189,
      price: "₹18,000",
      specialty: "Family Photography",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
      experience: "6+ years",
      description: "Passionate about capturing precious family moments with warmth and authenticity."
    },
    {
      id: 4,
      name: "Amit Patel",
      location: "Chennai, India",
      rating: 4.7,
      reviews: 134,
      price: "₹10,000",
      specialty: "Corporate Events",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      experience: "4+ years",
      description: "Professional corporate photographer with experience in business events and conferences."
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photographers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photographers.length) % photographers.length);
  };

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  const currentPhotographer = photographers[currentIndex];

  return (
    <div className="px-4">
      <div className="text-center">
        <h2 className="section-title section-title-desktop mb-1">Featured Photographers</h2>
        <p className="section-description section-description-desktop max-w-lg mx-auto">
          Discover top-rated professional photographers in your area
        </p>
      </div>

      <div className="relative bg-white rounded-xl shadow-lg overflow-hidden mt-6">
          {/* Main Photographer Display */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
            {/* Photographer Image */}
            <div className="flex items-center justify-center">
              <img
                src={currentPhotographer.image}
                alt={currentPhotographer.name}
                className="w-32 h-32 rounded-full object-cover shadow-md"
              />
            </div>

            {/* Photographer Details */}
            <div className="flex flex-col justify-center space-y-3">
                  <div>
                    <h3 className="card-title card-title-desktop mb-1">{currentPhotographer.name}</h3>
                    <p className="text-base text-blue-600 font-semibold">{currentPhotographer.specialty}</p>
                  </div>

              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarSolidIcon
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(currentPhotographer.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {currentPhotographer.rating} ({currentPhotographer.reviews} reviews)
                </span>
              </div>

                  <p className="card-description card-description-desktop leading-relaxed">
                    {currentPhotographer.description}
                  </p>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 p-2 rounded-lg">
                  <span className="text-gray-500 text-xs">Location</span>
                  <p className="font-semibold text-gray-900 text-xs">{currentPhotographer.location}</p>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                  <span className="text-gray-500 text-xs">Experience</span>
                  <p className="font-semibold text-gray-900 text-xs">{currentPhotographer.experience}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-2xl font-bold text-blue-600">{currentPhotographer.price}</span>
                  <span className="text-gray-500 text-sm ml-2">per session</span>
                </div>
                <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors duration-200">
                  Book Now
                </button>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="bg-gray-50 px-4 py-3">
            <div className="flex items-center justify-between">
              <button
                onClick={prevSlide}
                className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-white hover:bg-gray-100 transition-colors duration-200 shadow-sm"
              >
                <ChevronLeftIcon className="w-3 h-3 text-gray-600" />
                <span className="text-gray-600 text-xs">Previous</span>
              </button>

              <div className="flex space-x-1.5">
                {photographers.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                      index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-white hover:bg-gray-100 transition-colors duration-200 shadow-sm"
              >
                <span className="text-gray-600 text-xs">Next</span>
                <ChevronRightIcon className="w-3 h-3 text-gray-600" />
              </button>
            </div>
          </div>
      </div>
    </div>
  );
}
