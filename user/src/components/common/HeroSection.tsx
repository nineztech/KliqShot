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
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-2 md:p-3 border border-white/80 ring-1 ring-white/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-300">
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
                    className="w-full pl-10 pr-4 py-2 md:py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400 transition-all duration-200"
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
                    className="w-full pl-10 pr-4 py-2 md:py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400 transition-all duration-200"
                  />
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  className="px-5 py-2 md:py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_10px_30px_rgba(59,130,246,0.5)] shadow-lg whitespace-nowrap"
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
