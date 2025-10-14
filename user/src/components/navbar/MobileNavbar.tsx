'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  ChevronDownIcon,
  LanguageIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline';
import ProfileDropdown from './ProfileDropdown';
import { useCart } from '../cart/CartContext';

interface MobileNavbarProps {
  showSearchBar?: boolean;
}

export default function MobileNavbar({ showSearchBar = true }: MobileNavbarProps) {
  const router = useRouter();
  const { itemCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState('Mumbai, India');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const locationDropdownRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };


  const handleLocationClick = () => {
    setShowLocationDropdown(!showLocationDropdown);
    console.log('Location clicked');
  };

  const handleOpenMap = () => {
    setShowMapModal(true);
    setShowLocationDropdown(false);
  };

  const handleCloseMap = () => {
    setShowMapModal(false);
  };

  const handleLocationSelect = (location: string) => {
    setUserLocation(location);
    setShowLocationDropdown(false);
  };

  const handleLanguageClick = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
    console.log('Language clicked');
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setShowLanguageDropdown(false);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation('Current Location');
          setShowLocationDropdown(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setShowLocationDropdown(false);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
      setShowLocationDropdown(false);
    }
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
    <nav className="relative bg-gradient-to-r from-slate-800 via-purple-800 to-indigo-900 shadow-lg border-b border-white/10 sticky top-0 z-50 overflow-hidden">
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
      
      {/* Main Mobile Header */}
      <div className="relative px-2 py-1">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => router.push('/')}
              className="relative w-8 h-8 hover:opacity-80 transition-opacity duration-200"
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

          {/* Search Bar - Conditionally Visible */}
          <div 
            className={`flex-1 mx-3 transition-all duration-300 ${
              showSearchBar ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}
          >
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-3 w-3 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-6 pr-2 py-1 border border-white/30 rounded-full leading-3 bg-white/90 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-white/50 focus:border-white text-xs"
                />
              </div>
            </form>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-1">
            {/* Location Icon */}
            <div className="relative" ref={locationDropdownRef}>
              <button
                onClick={handleLocationClick}
                className="flex items-center gap-1 px-1 py-1 text-xs text-white hover:text-white/80 hover:bg-white/10 rounded-full transition-colors duration-200"
              >
                <MapPinIcon className="h-3 w-3" />
              </button>
              
              {/* Mobile Location Dropdown */}
              {showLocationDropdown && (
                <div className="absolute top-full right-0 mt-1 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Select Location</h3>
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                      {['Mumbai, India', 'Delhi, India', 'Bangalore, India', 'Chennai, India', 'Kolkata, India'].map((location) => (
                        <button
                          key={location}
                          onClick={() => handleLocationSelect(location)}
                          className={`w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-50 transition-colors duration-200 ${
                            userLocation === location ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                          }`}
                        >
                          {location}
                        </button>
                      ))}
                    </div>
                    <div className="border-t border-gray-200 mt-2 pt-2 space-y-1">
                      <button 
                        onClick={handleOpenMap}
                        className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200 flex items-center gap-2"
                      >
                        <MapPinIcon className="h-4 w-4" />
                        Choose on map
                      </button>
                      <button 
                        onClick={handleCurrentLocation}
                        className="w-full text-left px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-md transition-colors duration-200 flex items-center gap-2"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Use current location
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Language Icon */}
            <div className="relative" ref={languageDropdownRef}>
              <button
                onClick={handleLanguageClick}
                className="flex items-center gap-1 px-2 py-1 text-xs text-white hover:text-white/80 hover:bg-white/10 rounded-md transition-colors duration-200 border border-white/30 hover:border-white/50"
              >
                <LanguageIcon className="h-3 w-3" />
                <span className="text-xs font-medium">{selectedLanguage}</span>
              </button>

              {/* Mobile Language Dropdown */}
              {showLanguageDropdown && (
                <div className="absolute top-full right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <LanguageIcon className="h-4 w-4 text-blue-600" />
                      Select Language
                    </h3>
                    <div className="space-y-1 max-h-56 overflow-y-auto">
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
                          onClick={() => handleLanguageSelect(language.code)}
                          className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-all duration-200 flex items-center gap-3 group ${
                            selectedLanguage === language.code 
                              ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <span className="text-base">{language.flag}</span>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{language.name}</div>
                            <div className="text-xs text-gray-500">{language.code}</div>
                          </div>
                          {selectedLanguage === language.code && (
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Become Seller Button */}
            <button
              onClick={() => window.open('http://localhost:3002', '_blank')}
              className="bg-white text-purple-600 px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-white/90 transition-all duration-200 shadow-sm"
            >
              Sell
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => router.push('/cart')}
              className="relative p-1 text-white hover:text-white hover:bg-white/10 rounded-full transition-colors duration-200"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>

            {/* Profile Dropdown */}
            <ProfileDropdown isMobile={true} />
          </div>
        </div>
      </div>


      {/* Google Maps Modal - Mobile */}
      {showMapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full h-[90vh] flex flex-col">
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
              <div className="text-sm text-gray-600 hidden sm:block">
                Click on the map to select your location
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={handleCloseMap}
                  className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setUserLocation('Selected Location');
                    setShowMapModal(false);
                  }}
                  className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200"
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
