'use client';

import { useState } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/outline';

export default function MobileVideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full h-40 bg-gray-900 overflow-hidden rounded-lg">
      {/* Video Placeholder */}
      <div className="relative w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
        {/* Video overlay content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="mb-2">
              <h2 className="text-lg font-bold mb-1">
                Capture Your Special Moments
              </h2>
              <p className="text-xs opacity-90 max-w-xs mx-auto">
                Professional photography services
              </p>
            </div>
            
            {/* Play/Pause Button */}
            <button
              onClick={handleVideoClick}
              className="inline-flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              {isPlaying ? (
                <PauseIcon className="w-6 h-6 text-white" />
              ) : (
                <PlayIcon className="w-6 h-6 text-white ml-0.5" />
              )}
            </button>
          </div>
        </div>

        {/* Video Controls Overlay */}
        <div className="absolute bottom-2 left-2 right-2">
          <div className="flex items-center justify-between text-white text-xs">
            <span className="bg-black bg-opacity-50 px-1.5 py-0.5 rounded text-xs">
              {isPlaying ? 'Playing' : 'Paused'}
            </span>
            <span className="bg-black bg-opacity-50 px-1.5 py-0.5 rounded text-xs">
              2:45 / 5:30
            </span>
          </div>
        </div>
      </div>

      {/* Actual video element */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        controls={false}
        muted
        loop
        autoPlay
        playsInline
      >
        <source src="/Hero Video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
