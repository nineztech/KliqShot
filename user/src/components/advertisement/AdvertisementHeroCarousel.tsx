'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const AdvertisementHeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const slides = [
    {
      id: 1,
      image: '/AdvertiseBanner1.jpeg',
      alt: 'Advertisement Banner 1'
    },
    {
      id: 2,
      image: '/AdvertiseBanner2.jpeg',
      alt: 'Advertisement Banner 2'
    },
    {
      id: 3,
      image: '/AdvertiseBanner3.jpeg',
      alt: 'Advertisement Banner 3'
    },
    {
      id: 4,
      image: '/AdvertiseBanner4.jpeg',
      alt: 'Advertisement Banner 4'
    },
    {
      id: 5,
      image: '/AdvertiseBanner5.jpeg',
      alt: 'Advertisement Banner 5'
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [nextSlide, isAutoPlay]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlay(false);
  const handleMouseLeave = () => setIsAutoPlay(true);

  return (
    <div className="w-full mt-4 mb-4">
      <div 
        className="relative w-full h-36 md:h-44 lg:h-52 overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Main Carousel Container */}
        <div 
          className="flex w-full h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="min-w-full h-full relative">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/95 rounded-full p-2 md:p-3 shadow-lg transition-all duration-200 hover:scale-105 z-10"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/95 rounded-full p-2 md:p-3 shadow-lg transition-all duration-200 hover:scale-105 z-10"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
        </button>
      </div>

      {/* Dot Indicators - Below the image */}
      <div className="flex justify-center items-center space-x-2 pt-3 -pb-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-200 ${
              currentSlide === index
                ? 'bg-gray-700 shadow-lg scale-110'
                : 'bg-gray-400 hover:bg-gray-600'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AdvertisementHeroCarousel;
