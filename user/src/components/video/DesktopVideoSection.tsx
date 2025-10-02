'use client';

import { useState } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/outline';

export default function DesktopVideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full h-80 lg:h-96 xl:h-[28rem] bg-gray-900 overflow-hidden">
      {/* Video Placeholder - Replace with actual video */}
      <div className="relative w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
        {/* Video overlay content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="mb-4">
              <h2 className="text-4xl font-bold mb-2">
                Capture Your Special Moments
              </h2>
              <p className="text-lg opacity-90 max-w-md mx-auto">
                Professional photography services for all your important occasions
              </p>
            </div>
            
            {/* Play/Pause Button */}
            <button
              onClick={handleVideoClick}
              className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              {isPlaying ? (
                <PauseIcon className="w-10 h-10 text-white" />
              ) : (
                <PlayIcon className="w-10 h-10 text-white ml-1" />
              )}
            </button>
          </div>
        </div>

        {/* Video Controls Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between text-white text-sm">
            <span className="bg-black bg-opacity-50 px-2 py-1 rounded">
              {isPlaying ? 'Playing' : 'Paused'}
            </span>
            <span className="bg-black bg-opacity-50 px-2 py-1 rounded">
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
