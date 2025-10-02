'use client';

import { useState, useEffect } from 'react';

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
    <div className="relative w-full h-[18rem] sm:h-[20rem] bg-gray-900 overflow-hidden rounded-lg">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        controls={false}
        muted
        loop
        autoPlay
        playsInline
        poster="/wedding_image.png"
      >
        <source src="/Hero Video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Enhanced Blur Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/15 to-black/40 backdrop-blur-[2px]"></div>

      {/* Animated Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white max-w-sm px-3">
          {/* Main Heading with Enhanced Animation */}
          <div className={`transform transition-all duration-1200 ease-out ${
            showText ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
          }`}>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight">
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse hover:animate-none transition-all duration-500 hover:scale-105 inline-block">
                Capture your perfect moment
              </span>
            </h1>
          </div>

          {/* Subtitle with Staggered Animation */}
          <div className={`transform transition-all duration-1400 ease-out delay-300 ${
            showText ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}>
            <p className="text-sm sm:text-base font-light mb-2 bg-gradient-to-r from-gray-200 via-blue-100 to-purple-100 bg-clip-text text-transparent leading-relaxed">
              Book Professional photographers instantly
            </p>
            <p className="text-xs sm:text-sm font-light mb-4 text-gray-300 leading-relaxed">
              Verified talent, seamless scheduling, unforgettable memories
            </p>
          </div>

          {/* Process Steps with Enhanced Sequential Animation */}
          <div className="space-y-3 mt-6">
            {[
              { step: '01', title: 'Browse & Select', desc: 'Find your perfect photographer', icon: '🔍' },
              { step: '02', title: 'Book & Connect', desc: 'Schedule your session', icon: '📅' },
              { step: '03', title: 'Capture & Deliver', desc: 'Get your memories', icon: '📸' }
            ].map((item, index) => (
              <div
                key={index}
                className={`transform transition-all duration-1000 ease-out delay-${500 + index * 200} ${
                  showText ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
                }`}
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-md p-1.5 border border-gray-200 hover:border-blue-400 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 group">
                  <div className="flex items-center space-x-2">
                    <div className="text-sm opacity-90 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent mb-0.5">
                        {item.step}
                      </div>
                      <h3 className="text-xs font-semibold text-gray-800 mb-0.5 group-hover:text-blue-600 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-600 leading-tight group-hover:text-gray-700 transition-colors duration-300">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className={`transform transition-all duration-1000 ease-out delay-1200 ${
            showText ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}>
            <button className="mt-4 px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 text-sm">
              Get Started Now
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
