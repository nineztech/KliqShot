'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  badge?: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

const heroSlides: HeroSlide[] = [
    {
        id: 1,
        title: "Wedding Photography Excellence",
        subtitle: "Capture Your Special Day",
        description: "Professional wedding photographers with years of experience. From candid moments to traditional ceremonies, we preserve your memories beautifully.",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop&crop=center&auto=format&q=85",
        ctaText: "Book Wedding Photographer",
        ctaLink: "/categories/wedding-photography",
        badge: "Trending",
        stats: [
          { label: "Wedding Packages", value: "500+" },
          { label: "Weddings Shot", value: "15,000+" },
          { label: "Satisfaction Rate", value: "99%" }
        ]
      },
  {
    id: 2,
    title: "Find Your Perfect Photographer",
    subtitle: "Professional Photography Services",
    description: "Discover top-rated photographers for weddings, portraits, events, and more. Book with confidence and capture your precious moments with style.",
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=1920&h=1080&fit=crop&crop=center&auto=format&q=85",
    ctaText: "Explore Photographers",
    ctaLink: "/photographers",
    badge: "Most Popular",
    stats: [
      { label: "Photographers", value: "10,000+" },
      { label: "Happy Customers", value: "50,000+" },
      { label: "Cities Covered", value: "100+" }
    ]
  },

  {
    id: 3,
    title: "Portrait & Studio Sessions",
    subtitle: "Professional Portraits Made Easy",
    description: "Transform your look with professional portrait photography. From corporate headshots to creative portraits, our photographers deliver stunning results.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&h=1080&fit=crop&crop=center&auto=format&q=85",
    ctaText: "Book Portrait Session",
    ctaLink: "/categories/portrait-photography",
    badge: "Featured",
    stats: [
      { label: "Portrait Styles", value: "25+" },
      { label: "Sessions Completed", value: "20,000+" },
      { label: "Studio Locations", value: "50+" }
    ]
  },
  {
    id: 4,
    title: "Event Photography Services",
    subtitle: "Document Your Important Moments",
    description: "From corporate events to birthday parties, our photographers capture every detail with professional expertise and artistic flair.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&h=1080&fit=crop&crop=center&auto=format&q=85",
    ctaText: "Book Event Photographer",
    ctaLink: "/categories/event-photography",
    badge: "New",
    stats: [
      { label: "Event Types", value: "30+" },
      { label: "Events Covered", value: "8,000+" },
      { label: "Quick Delivery", value: "24hrs" }
    ]
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    const newIndex = currentSlide === 0 ? heroSlides.length - 1 : currentSlide - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentSlide === heroSlides.length - 1 ? 0 : currentSlide + 1;
    goToSlide(newIndex);
  };

  const handleCTAClick = () => {
    router.push(heroSlides[currentSlide].ctaLink);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Full Width Image Background */}
      <div className="relative w-full h-[55vh] min-h-[450px]">
        <Image
          src={heroSlides[currentSlide].image}
          alt={heroSlides[currentSlide].title}
          fill
          className="object-cover transition-all duration-700 ease-in-out"
          priority={currentSlide === 0}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Left Arrow */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 hover:scale-110 border border-white/30 z-20"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="w-6 h-6 text-white" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 hover:scale-110 border border-white/30 z-20"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="w-6 h-6 text-white" />
        </button>

        {/* Badge */}
        {heroSlides[currentSlide].badge && (
          <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-800 shadow-lg z-20">
            {heroSlides[currentSlide].badge}
          </div>
        )}

        {/* Blur Background - Right Side */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[55%] xl:w-[45%] backdrop-blur-md bg-black/20" />
        
        {/* Content Overlay - Right Side */}
        <div className="absolute inset-0 flex items-center justify-end">
          <div className="w-full lg:w-[55%] xl:w-[45%] pr-4 lg:pr-8">
            <div className="p-4 lg:p-6">
              {/* Main Content */}
              <div className="space-y-3">
                <div className="space-y-2">
                  <h1 className="text-xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight">
                    <span className="block">{heroSlides[currentSlide].title.split(' ').slice(0, -1).join(' ')}</span>
                    <span className="block text-white">
                      {heroSlides[currentSlide].title.split(' ').slice(-1)[0]}
                    </span>
                  </h1>
                  
                  <p className="text-base lg:text-lg text-white/90 font-medium">
                    {heroSlides[currentSlide].subtitle}
                  </p>
                  
                  <p className="text-sm text-white/80 leading-relaxed">
                    {heroSlides[currentSlide].description}
                  </p>
                </div>

                {/* Stats */}
                {heroSlides[currentSlide].stats && (
                  <div className="grid grid-cols-3 gap-2 py-2">
                    {heroSlides[currentSlide].stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-lg lg:text-xl font-bold text-white">
                          {stat.value}
                        </div>
                        <div className="text-xs text-white/70 mt-1">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA Button */}
                <div className="pt-1">
                  <button
                    onClick={handleCTAClick}
                    className="group relative inline-flex items-center px-4 py-2 bg-gradient-to-r from-slate-800 via-purple-800 to-indigo-900 text-white font-semibold rounded-lg hover:from-slate-700 hover:via-purple-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                  >
                    <span className="relative z-10">{heroSlides[currentSlide].ctaText}</span>
                    <ChevronRightIcon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-purple-800 to-indigo-900 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Controls */}
      <div className="lg:hidden bg-white/10 backdrop-blur-sm border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-center space-x-4">
          <button
            onClick={goToPrevious}
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 border border-white/30"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={goToNext}
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 border border-white/30"
            aria-label="Next slide"
          >
            <ChevronRightIcon className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
