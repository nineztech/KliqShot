'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function DesktopVideoSection() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Trigger text animation after component mounts
    const timer = setTimeout(() => {
      setShowText(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-[20rem] lg:h-[24rem] xl:h-[28rem] bg-gray-900 overflow-hidden">
       
      {/* Enhanced Blur Overlay with Gradient */}
            {/* Animated Text Overlay - Clean Portfolio Style */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-left text-gray-900 max-w-6xl px-8 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div>
              {/* Main Heading with Elegant Serif Style */}
              <div className={`transform transition-all duration-1000 ease-out ${
                showText ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              }`}>
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-serif font-bold mb-2 leading-tight text-white">
                  Photographer
                </h1>
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-serif font-light mb-6 leading-tight text-white italic">
                  & Film Maker
                </h2>
              </div>

              {/* Subtitle with Clean Typography */}
              <div className={`transform transition-all duration-1200 ease-out delay-200 ${
                showText ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              }`}>
                <p className="text-sm lg:text-base font-light mb-1 text-gray-200">
                  Mount Tabor
                </p>
                <p className="text-sm lg:text-base font-light mb-8 text-gray-300">
                  Westbury, NY 11590
                </p>
              </div>

              {/* CTA Button - Minimal Style */}
              <div className={`transform transition-all duration-1000 ease-out delay-400 ${
                showText ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              }`}>
                <Link href="/signup" className="px-6 py-2.5 bg-transparent border-2 border-white text-white font-medium rounded-full transition-all duration-300 hover:bg-white hover:text-gray-900 hover:scale-105">
                  Registered Here→
                </Link>
              </div>
            </div>

            {/* Right Side - Image Placeholder */}
            <div className={`transform transition-all duration-1200 ease-out delay-300 ${
              showText ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-8 opacity-0 scale-95'
            }`}>
              <div className="relative w-full pt-4 pl-4 pr-4 -mb-5 max-w-md mx-auto lg:ml-auto">
                <div className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-t-full aspect-square flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full p-4 flex items-center justify-center text-gray-700">
                     <Image
                                      src="/image-photo.png"
                                      alt="KliqShot Logo"
                                      fill
                                      className="object-contain ml-4"
                                      priority
                                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
