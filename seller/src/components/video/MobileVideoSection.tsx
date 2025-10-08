'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function MobileVideoSection() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Trigger text animation after component mounts
    const timer = setTimeout(() => {
      setShowText(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-gray-900 overflow-hidden flex items-center justify-center px-6 py-12">
      {/* Content Container */}
      <div className="w-full max-w-sm">
        {/* Image Section - Top */}
        <div className={`transform transition-all duration-1000 ease-out mb-8 ${
          showText ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-8 opacity-0 scale-95'
        }`}>
          <div className="relative w-full max-w-xs mx-auto">
            <div className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-t-full aspect-square flex items-center justify-center overflow-hidden">
              <div className="w-full h-full p-6 flex items-center justify-center text-gray-700">
                <Image
                  src="/image-photo.png"
                  alt="KliqShot Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Text Content - Bottom */}
        <div className="text-center">
          {/* Main Heading */}
          <div className={`transform transition-all duration-1000 ease-out delay-200 ${
            showText ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-1 leading-tight text-white">
              Photographer
            </h1>
            <h2 className="text-3xl sm:text-4xl font-serif font-light mb-6 leading-tight text-white italic">
              & Film Maker
            </h2>
          </div>

          {/* Location Info */}
          <div className={`transform transition-all duration-1000 ease-out delay-300 ${
            showText ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <p className="text-sm font-light mb-1 text-gray-200">
              Mount Tabor
            </p>
            <p className="text-sm font-light mb-8 text-gray-300">
              Westbury, NY 11590
            </p>
          </div>

          {/* CTA Button */}
          <div className={`transform transition-all duration-1000 ease-out delay-400 ${
            showText ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <Link 
              href="/signup" 
              className="inline-block px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-full transition-all duration-300 hover:bg-white hover:text-gray-900 active:scale-95"
            >
              Registered Here →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}