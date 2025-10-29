'use client';

import { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';
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
        title: "Wedding Photography",
        subtitle: "Capture Your Day",
        description: "Professional wedding photographers.",
        image: "/banner2.jpeg",
        ctaText: "Book Wedding",
        ctaLink: "/categories/wedding-photography",
        badge: "Trending",
      },
  {
    id: 2,
    title: "Find Photographer",
    subtitle: "Photography Services",
    description: "Discover top-rated photographers.",
    image: "/Images/Travel4.jpg",
    ctaText: "Explore",
    ctaLink: "/photographers",
    badge: "Popular",
  },

  {
    id: 3,
    title: "Portrait Sessions",
    subtitle: "Professional Portraits",
    description: "Transform your look.",
    image: "/Images/Travel5.jpg",
    ctaText: "Book Session",
    ctaLink: "/categories/portrait-photography",
    badge: "Featured",
  },
  {
    id: 4,
    title: "Event Photography",
    subtitle: "Important Moments",
    description: "Capture every detail.",
    image: "/Images/Pre-Wedding6.jpeg",
    ctaText: "Book Event",
    ctaLink: "/categories/event-photography",
    badge: "New",
  }
];

export default function MobileHeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showText, setShowText] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Preload all images for smooth transitions
  useEffect(() => {
    heroSlides.forEach((slide) => {
      const img = new window.Image();
      img.src = slide.image;
    });
  }, []);

  // Animation effect for text
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate slides every 10 seconds
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 10000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying]);

  // Show text animation on mount
  useEffect(() => {
    setShowText(true);
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const query = searchQuery.trim();
    const loc = location.trim();
    const dateValue = selectedDate.trim();
    let searchUrl = '/search';
    const params = new URLSearchParams();
    
    if (query) {
      params.append('q', query);
    }
    if (loc) {
      params.append('location', loc);
    }
    if (dateValue) {
      params.append('date', dateValue);
    }
    
    if (params.toString()) {
      searchUrl += `?${params.toString()}`;
    }
    
    router.push(searchUrl);
  };

  return (
    <div className="relative w-full h-[20rem] sm:h-[24rem] overflow-hidden shadow-2xl" data-hero-section>
      {/* Professional Background with Enhanced Blur Effect */}
      <div className="absolute inset-0 w-full h-full">
        {/* Background Image Layer */}
        <div 
          key={currentSlide}
          className="absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${heroSlides[currentSlide].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div>

      {/* Black Shadow Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-end justify-center pb-6 sm:pb-8 px-3">
        <div className="text-center w-full max-w-md mx-auto">
          {/* Animated Heading */}
          <div className={`transform transition-all duration-1000 ease-out ${
            showText ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
          }`}>
            <h1 className="font-bold mb-0 leading-tight text-base sm:text-lg">
              <span className="block text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                Capture Your Perfect Moment
              </span>
            </h1>
            <p className="text-white mb-2 text-[10px] sm:text-xs font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              Find photographers for every occasion
            </p>
          </div>

          {/* Search Box */}
          <div className={`transform transition-all duration-1000 delay-200 ease-out ${
            showText ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="bg-white/95 backdrop-blur-xl rounded-lg shadow-xl p-1 sm:p-1.5 border border-white/80">
              <div className="flex flex-col gap-1">
                {/* Search Input */}
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search photographers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-7 sm:pl-8 pr-2 sm:pr-3 py-1 sm:py-1.5 text-[11px] sm:text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                  />
                </div>

                {/* Location Input */}
                <div className="relative">
                  <MapPinIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter location..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-7 sm:pl-8 pr-2 sm:pr-3 py-1 sm:py-1.5 text-[11px] sm:text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                  />
                </div>

                {/* Date Input */}
                <div className="relative">
                  <CalendarIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-7 sm:pl-8 pr-2 sm:pr-3 py-1 sm:py-1.5 text-[11px] sm:text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                  />
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  className="w-full px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] sm:text-xs font-semibold rounded-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Search Now
                </button>
              </div>
            </div>
          </div>

          {/* Popular Categories/Tags */}
          <div className={`transform transition-all duration-1000 delay-300 ease-out ${
            showText ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="mt-2 flex flex-wrap justify-center gap-1">
              <span className="text-[9px] sm:text-[10px] text-white font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">Popular:</span>
              {['Wedding', 'Portrait', 'Event'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag);
                    router.push(`/search?q=${tag}`);
                  }}
                  className="px-1.5 sm:px-2 py-0.5 bg-white/95 text-gray-800 text-[9px] sm:text-[10px] rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 border border-white"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

