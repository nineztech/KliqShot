'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';
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
  const [showText, setShowText] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Animation effect for text
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

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

  // Show text animation on mount
  useEffect(() => {
    setShowText(true);
  }, []);

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
    <div className="relative w-full h-[16rem] md:h-[20rem] lg:h-[26rem] overflow-hidden rounded-xl shadow-2xl" data-hero-section>
      {/* Professional Background with Enhanced Blur Effect */}
      <div className="absolute inset-0 w-full h-full">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center scale-110 transition-transform duration-700 hover:scale-105"
          style={{
            backgroundImage: 'url(/Banner.jpeg)',
            filter: 'blur(2px) brightness(1.1)',
          }}
        />
        
        {/* Multi-layer Professional Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-indigo-500/30 to-purple-600/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent"></div>
        
        {/* Glassmorphism Effect */}
        <div className="absolute inset-0 backdrop-blur-[0.5px]"></div>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center max-w-4xl px-4 sm:px-6 lg:px-8 w-full">
          {/* Animated Heading */}
          <div className={`transform transition-all duration-1000 ease-out ${
            showText ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
          }`}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 leading-tight drop-shadow-lg">
              <span className="block bg-gradient-to-r from-white via-blue-50 to-white bg-clip-text text-transparent filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
                Capture Your Perfect Moment
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white mb-4 md:mb-6 font-medium drop-shadow-md">
              Find and book professional photographers for every occasion
            </p>
          </div>

          {/* Search Box */}
          <div className={`transform transition-all duration-1000 delay-200 ease-out ${
            showText ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-1.5 md:p-2 border border-white/80 ring-1 ring-white/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-2">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search photographers, events, or categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-4 py-1.5 md:py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400 transition-all duration-200"
                  />
                </div>

                {/* Location Input */}
                <div className="flex-1 relative">
                  <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter location..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-4 py-1.5 md:py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400 transition-all duration-200"
                  />
                </div>

                {/* Date Input */}
                <div className="flex-1 relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    placeholder="Select date..."
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-4 py-1.5 md:py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400 transition-all duration-200"
                  />
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  className="px-5 py-1.5 md:py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_10px_30px_rgba(59,130,246,0.5)] shadow-lg whitespace-nowrap"
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
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="text-xs md:text-sm text-white/90 font-medium drop-shadow-md">Popular:</span>
              {['Wedding', 'Portrait', 'Event', 'Pre-Wedding', 'Baby', 'Commercial'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag);
                    router.push(`/search?q=${tag}`);
                  }}
                  className="px-2.5 py-0.5 md:px-3 md:py-1 bg-white/90 backdrop-blur-md text-gray-700 text-xs md:text-sm rounded-full hover:bg-white hover:text-blue-600 hover:shadow-lg transition-all duration-300 border border-white/50 transform hover:scale-105"
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
