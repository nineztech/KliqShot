'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const DesktopDownloadApp: React.FC = () => {
  const [mobileNumber, setMobileNumber] = useState('');

  const handleGetAppLink = () => {
    if (mobileNumber.length === 10) {
      // Handle sending app link
      alert('App link will be sent to your mobile number');
    } else {
      alert('Please enter a valid 10-digit mobile number');
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg shadow-md p-8">
      <div className="flex items-center justify-between gap-8">
        {/* Left Section */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-500 rounded-full p-3 relative">
              <svg 
                className="w-6 h-6 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" 
                />
              </svg>
              <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div className="absolute -bottom-1 -left-1 bg-yellow-400 rounded-full p-1">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 2C5.9 2 5 2.9 5 4v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H7zm0 2h10v14H7V4zm2 2v10h6V6H9z"/>
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              Download App Now !
            </h2>
          </div>

          <p className="text-gray-700 mb-6 text-sm">
            Use code <span className="font-bold text-gray-900">WELCOMEMMT</span> and get{' '}
            <span className="font-bold text-gray-900">FLAT 12% OFF*</span> on your first domestic flight booking
          </p>

          {/* Mobile Input Section */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center bg-white rounded-md shadow-sm border border-gray-300 overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-2 border-r border-gray-300">
                <div className="w-5 h-3 bg-orange-500 border border-gray-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-white to-green-600"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                    <div className="absolute -top-1 -left-1 w-0 h-0 border-l-[0.3rem] border-r-[0.3rem] border-b-[0.5rem] border-l-transparent border-r-transparent border-b-blue-600"></div>
                    <div className="absolute -top-0.5 -left-0.5 w-0 h-0 border-l-[0.15rem] border-r-[0.15rem] border-b-[0.25rem] border-l-transparent border-r-transparent border-b-blue-600"></div>
                  </div>
                </div>
                <span className="font-medium text-gray-700">+91</span>
              </div>
              <input
                type="tel"
                placeholder="Enter Mobile number"
                maxLength={10}
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                className="px-4 py-2 w-64 outline-none text-gray-700"
              />
            </div>
            <button
              onClick={handleGetAppLink}
              className="bg-purple-700 hover:bg-purple-800 text-white font-semibold px-6 py-2 rounded-md transition-colors duration-200 shadow-sm"
            >
              GET APP LINK
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Barcode */}
          <Image
            src="/image.png"
            alt="Barcode"
            width={200}
            height={300}
            className="w-40 h-60 object-contain"
          />
          
          {/* App Store Buttons */}
          <div className="flex flex-col gap-3">
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="bg-black hover:bg-gray-900 rounded-lg px-6 py-2 transition-colors duration-200 shadow-md">
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-xs text-gray-300 leading-none">GET IT ON</p>
                    <p className="text-sm font-semibold text-white leading-tight">Google Play</p>
                  </div>
                </div>
              </div>
            </a>
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="bg-black hover:bg-gray-900 rounded-lg px-6 py-2 transition-colors duration-200 shadow-md">
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-xs text-gray-300 leading-none">Download on the</p>
                    <p className="text-sm font-semibold text-white leading-tight">App Store</p>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* mobile view */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex items-center justify-center">
              <Image
                src="/mobileview2.jpg"
                alt="MobileView"
                width={200}
                height={500}
                className="w-32 h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopDownloadApp;

