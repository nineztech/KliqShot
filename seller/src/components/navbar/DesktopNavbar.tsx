'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronDownIcon, LanguageIcon } from '@heroicons/react/24/outline';
import ProfileDropdown from './ProfileDropdown';

export default function DesktopNavbar() {
  const router = useRouter();
  
  const [userLocation, setUserLocation] = useState('Mumbai, India');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const locationDropdownRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
 

 
  const handleCloseMap = () => {
    setShowMapModal(false);
  };
 

  const handleLanguageClick = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
    console.log('Language clicked');
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setShowLanguageDropdown(false);
  };

 

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false);
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setShowLanguageDropdown(false);
      }
    };

    if (showLocationDropdown || showLanguageDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLocationDropdown, showLanguageDropdown]);

  return (
    <nav className="relative bg-gradient-to-r from-slate-800 via-purple-800 to-indigo-900 shadow-lg border-b border-white/10 sticky top-0 z-50">
      {/* Professional animated background layers */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/15 to-indigo-600/10 animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" style={{animationDelay: '1s', animationDuration: '3s'}}></div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-400/8 to-transparent animate-pulse" style={{animationDelay: '2s', animationDuration: '4s'}}></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-indigo-500/5 via-transparent to-blue-500/5 animate-pulse" style={{animationDelay: '3s', animationDuration: '5s'}}></div>
      
      {/* Moving gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent animate-pulse" style={{animationDelay: '0.5s', animationDuration: '2s'}}></div>
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-purple-300/5 to-transparent animate-pulse" style={{animationDelay: '1.5s', animationDuration: '2.5s'}}></div>
      
      {/* Subtle moving particles effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-ping" style={{animationDelay: '0.5s', animationDuration: '3s'}}></div>
        <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-purple-300/30 rounded-full animate-ping" style={{animationDelay: '1.5s', animationDuration: '4s'}}></div>
        <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-blue-300/40 rounded-full animate-ping" style={{animationDelay: '2.5s', animationDuration: '5s'}}></div>
      </div>
      
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <button
                onClick={() => router.push('/')}
                className="relative w-20 h-20 hover:opacity-80 transition-opacity duration-200"
              >
                <Image
                  src="/main Logo.png"
                  alt="KliqShot Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </button>
            </div>
          </div>

          {/* Search Bar & Location */}
          <div className="flex-1 max-w-4xl mx-8 flex items-right gap-4">
             
             
          </div>
            {/* Language Selector */}
            <div className="relative items-right mr-4" ref={languageDropdownRef}>
              <button
                onClick={handleLanguageClick}
                className="flex items-center gap-2 px-3 py-2 text-sm text-white hover:text-white/80 hover:bg-white/10 rounded-md transition-colors duration-200 border border-white/30 hover:border-white/50"
              >
                <LanguageIcon className="h-4 w-4 text-white flex-shrink-0" />
                <span className="truncate max-w-24 font-medium">{selectedLanguage}</span>
                <ChevronDownIcon className={`h-4 w-4 text-white flex-shrink-0 transition-transform duration-200 ${showLanguageDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Language Dropdown */}
              {showLanguageDropdown && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <LanguageIcon className="h-4 w-4 text-blue-600" />
                      Select Language
                    </h3>
                    <div className="space-y-1 max-h-64 overflow-y-auto">
                      {[
                        { code: 'EN', name: 'English', flag: '🇺🇸' },
                        { code: 'HI', name: 'हिन्दी', flag: '🇮🇳' },
                        { code: 'TA', name: 'தமிழ்', flag: '🇮🇳' },
                        { code: 'TE', name: 'తెలుగు', flag: '🇮🇳' },
                        { code: 'BN', name: 'বাংলা', flag: '🇮🇳' },
                        { code: 'MR', name: 'मराठी', flag: '🇮🇳' },
                        { code: 'GU', name: 'ગુજરાતી', flag: '🇮🇳' },
                        { code: 'KN', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
                        { code: 'ML', name: 'മലയാളം', flag: '🇮🇳' },
                        { code: 'PA', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' }
                      ].map((language) => (
                        <button
                          key={language.code}
                          onClick={() => handleLanguageSelect(language.name)}
                          className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-all duration-200 flex items-center gap-3 group ${
                            selectedLanguage === language.name 
                              ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <span className="text-lg">{language.flag}</span>
                          <div className="flex-1">
                            <div className="font-medium">{language.name}</div>
                            <div className="text-xs text-gray-500">{language.code}</div>
                          </div>
                          {selectedLanguage === language.name && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          {/* Become Seller Button & Profile Icon */}
          <div className="flex items-center gap-3">
            {/* Become Seller Button */}
            {/* <button
              onClick={() => window.open('http://localhost:3002', '_blank')}
              className="bg-white text-purple-600 px-4 py-2 rounded-md text-sm font-semibold hover:bg-white/90 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Become Seller
            </button> */}
            
            {/* Profile Dropdown */}
            <ProfileDropdown isMobile={false} />
          </div>
        </div>
      </div>

      {/* Google Maps Modal */}
      {showMapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Choose Your Location</h3>
              <button
                onClick={handleCloseMap}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Google Maps Embed */}
            <div className="flex-1 p-4">
              <div className="w-full h-full border border-gray-300 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.6628!2d72.8777!3d19.0760!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9c676018b43%3A0x42e5e2e5b7b8b8b8!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Selector"
                ></iframe>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-600">
                Click on the map to select your location
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCloseMap}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // TODO: Implement location selection from map
                    setUserLocation('Selected Location');
                    setShowMapModal(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Select Location
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
