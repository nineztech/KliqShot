'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Trigger text animation after component mounts
    const timer = setTimeout(() => {
      setShowText(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    if (location) params.append('location', location);
    router.push(`/search?${params.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full h-[16rem] md:h-[20rem] lg:h-[26rem] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden rounded-xl shadow-lg" data-hero-section>
      {/* Light Unsplash Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center blur-[1px] scale-105"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1920&h=1080&fit=crop&auto=format&q=80)',
        }}
      >
        {/* Light Pleasant Overlay for Professional Look */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-indigo-50/15 to-purple-50/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-50/15 via-transparent to-transparent"></div>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center max-w-4xl px-4 sm:px-6 lg:px-8 w-full">
          {/* Animated Heading */}
          <div className={`transform transition-all duration-1000 ease-out ${
            showText ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
          }`}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 leading-tight">
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Capture Your Perfect Moment
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 md:mb-6 font-medium">
              Find and book professional photographers for every occasion
            </p>
          </div>

          {/* Search Box */}
          <div className={`transform transition-all duration-1000 delay-200 ease-out ${
            showText ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="bg-white/98 backdrop-blur-lg rounded-xl shadow-2xl p-2 md:p-3 border border-white/60 ring-1 ring-blue-100/50">
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
                    className="w-full pl-10 pr-4 py-2 md:py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
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
                    className="w-full pl-10 pr-4 py-2 md:py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                  />
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  className="px-5 py-2 md:py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg whitespace-nowrap"
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
              <span className="text-xs md:text-sm text-gray-600 font-medium">Popular:</span>
              {['Wedding', 'Portrait', 'Event', 'Pre-Wedding', 'Baby', 'Commercial'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag);
                    router.push(`/search?q=${tag}`);
                  }}
                  className="px-2.5 py-0.5 md:px-3 md:py-1 bg-white/80 backdrop-blur-sm text-gray-700 text-xs md:text-sm rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 border border-gray-200"
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
