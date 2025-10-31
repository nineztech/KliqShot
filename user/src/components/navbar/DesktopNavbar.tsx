'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MagnifyingGlassIcon, MapPinIcon, ChevronDownIcon, EllipsisVerticalIcon, BellIcon, PhoneIcon, ChartBarIcon, ArrowDownTrayIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import ProfileDropdown from './ProfileDropdown';
import { useCart } from '../cart/CartContext';

interface DesktopNavbarProps {
  showSearchBar?: boolean;
}

export default function DesktopNavbar({ showSearchBar = true }: DesktopNavbarProps) {
  const router = useRouter();
  const { itemCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState('Mumbai, India');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState('');
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showThreeDotMenu, setShowThreeDotMenu] = useState(false);
  const locationDropdownRef = useRef<HTMLDivElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);
  const threeDotMenuRef = useRef<HTMLDivElement>(null);

  const categories = [
    'haldi',
    'mehendi',
    'wedding',
    'portrait',
    'family',
    'events',
    'maternity',
    'product',
    'interior',
    'fashion',
    'sports',
    'cinematography'
  ];

  // Sample search suggestions based on categories
  const allSuggestions = [
    'haldi photography',
    'mehendi ceremony',
    'wedding photographer',
    'portrait session',
    'family photoshoot',
    'corporate events',
    'maternity shoot',
    'product photography',
    'interior design',
    'fashion photography',
    'sports photography',
    'cinematography',
    'pre-wedding shoot',
    'reception photography',
    'newborn photos',
    'headshot photographer',
    'linkedin profile',
    'professional branding',
    'birthday party',
    'house warming',
    'festival photography',
    'fitness photography',
    'swimming photography',
    'documentary video',
    'social media content'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Add to recent searches
      addToRecentSearches(searchQuery.trim());
      setShowSearchDropdown(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const addToRecentSearches = (query: string) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item !== query);
      const newRecent = [query, ...filtered].slice(0, 5); // Keep only 5 recent searches
      localStorage.setItem('recentSearches', JSON.stringify(newRecent));
      return newRecent;
    });
  };

  const removeFromRecentSearches = (query: string) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item !== query);
      localStorage.setItem('recentSearches', JSON.stringify(filtered));
      return filtered;
    });
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    addToRecentSearches(suggestion);
    setShowSearchDropdown(false);
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.trim()) {
      // Filter suggestions based on input
      const filtered = allSuggestions.filter(suggestion => 
        suggestion.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 8);
      setSearchSuggestions(filtered);
    }
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    setShowSearchDropdown(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
    // Delay hiding dropdown to allow clicks on suggestions
    setTimeout(() => {
      setShowSearchDropdown(false);
    }, 200);
  };

  // Animated placeholder effect
  useEffect(() => {
    const currentCategory = categories[currentCategoryIndex];
    const baseText = 'Search for ';
    const fullText = baseText + currentCategory + '...';

    if (isTyping) {
      // Typing effect
      if (animatedPlaceholder.length < fullText.length) {
        const timeout = setTimeout(() => {
          setAnimatedPlaceholder(fullText.substring(0, animatedPlaceholder.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        // Wait before starting to delete
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      // Deleting effect
      if (animatedPlaceholder.length > baseText.length) {
        const timeout = setTimeout(() => {
          setAnimatedPlaceholder(animatedPlaceholder.substring(0, animatedPlaceholder.length - 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        // Move to next category
        setCurrentCategoryIndex((prev) => (prev + 1) % categories.length);
        setIsTyping(true);
      }
    }
  }, [animatedPlaceholder, isTyping, currentCategoryIndex, categories]);


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
    
    // Store the manually selected location in localStorage
    const manualLocationData = {
      city: location.split(',')[0]?.trim() || location,
      country: location.split(',')[1]?.trim() || 'India',
      state: '',
      postcode: '',
      locality: '',
      principalSubdivisionCode: '',
      countryCode: '',
      localityInfo: {},
      continent: '',
      continentCode: '',
      addressLine1: '',
      addressLine2: '',
      fullAddress: location,
      detailedAddress: location,
      coordinates: {
        latitude: 0,
        longitude: 0
      },
      timestamp: new Date().toISOString(),
      source: 'manual_selection',
      rawData: {}
    };
    
    localStorage.setItem('userLocation', JSON.stringify(manualLocationData));
    setShowLocationDropdown(false);
  };


  const handleThreeDotMenuHover = () => {
    setShowThreeDotMenu(true);
  };

  const handleThreeDotMenuLeave = () => {
    setShowThreeDotMenu(false);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // Use reverse geocoding to get location name
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
           try {
             // Use reverse geocoding to get city and country
             const response = await fetch(
               `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
             );
             
             if (response.ok) {
               const data = await response.json();
               const city = data.city || data.locality || 'Unknown City';
               const country = data.countryName || 'Unknown Country';
               const fullAddress = `${city}, ${country}`;
               
               // Store complete address data in localStorage
               const addressData = {
                 // Basic location info
                 city: data.city || data.locality || 'Unknown City',
                 country: data.countryName || 'Unknown Country',
                 state: data.principalSubdivision || '',
                 postcode: data.postcode || '',
                 
                 // Additional address details
                 locality: data.locality || '',
                 principalSubdivisionCode: data.principalSubdivisionCode || '',
                 countryCode: data.countryCode || '',
                 localityInfo: data.localityInfo || {},
                 
                 // Geographic information
                 continent: data.continent || '',
                 continentCode: data.continentCode || '',
                 
                 // Complete address components
                 addressLine1: data.plusCode || '',
                 addressLine2: data.locality || '',
                 
                 // Formatted addresses
                 fullAddress: fullAddress,
                 detailedAddress: `${data.locality || ''}, ${data.principalSubdivision || ''}, ${data.postcode || ''}, ${data.countryName || ''}`.replace(/,\s*,/g, ',').replace(/^,\s*|,\s*$/g, ''),
                 
                 // Coordinates
                 coordinates: {
                   latitude: lat,
                   longitude: lng
                 },
                 
                 // Metadata
                 timestamp: new Date().toISOString(),
                 source: 'geolocation_api',
                 
                 // Raw API response for future use
                 rawData: data
               };
               
               localStorage.setItem('userLocation', JSON.stringify(addressData));
               setUserLocation(fullAddress);
             } else {
               // Fallback to a generic location if API fails
               setUserLocation('Current Location');
             }
           } catch (error) {
             console.error('Error fetching location details:', error);
             // Fallback to a generic location if API fails
          setUserLocation('Current Location');
           }
          
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

  // Load recent searches and saved location from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }

    // Load saved location from localStorage
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      try {
        const locationData = JSON.parse(savedLocation);
        setUserLocation(locationData.fullAddress || 'Mumbai, India');
      } catch (error) {
        console.error('Error parsing saved location:', error);
        setUserLocation('Mumbai, India');
      }
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false);
      }
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
      if (threeDotMenuRef.current && !threeDotMenuRef.current.contains(event.target as Node)) {
        setShowThreeDotMenu(false);
      }
    };

    if (showLocationDropdown || showSearchDropdown || showThreeDotMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLocationDropdown, showSearchDropdown, showThreeDotMenu]);

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
      
      
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12 sm:h-14 md:h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <button
                onClick={() => router.push('/')}
                className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 hover:opacity-80 transition-opacity duration-200"
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

          {/* Search Bar */}
          <div className="flex-1 max-w-4xl mx-2 sm:mx-4 md:mx-8">
            <div 
              className={`relative transition-all duration-300 ${
                showSearchBar ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
              }`} 
              ref={searchDropdownRef}
            >
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={isSearchFocused ? "Search for Products, Brands and More" : animatedPlaceholder}
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                    className="block w-full pl-4 pr-10 py-2 border border-white/30 rounded-full leading-5 bg-white/90 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:border-white text-sm"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </form>

              {/* Search Dropdown */}
              {showSearchDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && !searchQuery && (
                    <div className="p-3 border-b border-gray-100">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Recent</h3>
                      <div className="space-y-1">
                        {recentSearches.map((search, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-gray-600 hover:bg-gray-50 p-2 rounded group"
                          >
                            <div
                              onClick={() => handleSuggestionClick(search)}
                              className="flex items-center gap-2 flex-1 cursor-pointer"
                            >
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-sm">{search}</span>
                              <span className="text-xs text-blue-600 ml-auto">in Photography</span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFromRecentSearches(search);
                              }}
                              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity duration-200 p-1"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Search Suggestions */}
                  <div className="p-3">
                    {searchQuery ? (
                      <>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Suggestions</h3>
                        <div className="space-y-1">
                          {searchSuggestions.map((suggestion, index) => (
                            <div
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                            >
                              <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-700">{suggestion}</span>
                            </div>
                          ))}
                          {searchSuggestions.length === 0 && (
                            <div className="text-sm text-gray-500 p-2">No suggestions found</div>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Trending</h3>
                        <div className="space-y-1">
                          {allSuggestions.slice(0, 8).map((suggestion, index) => (
                            <div
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                            >
                              <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-700">{suggestion}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Location, Profile Icon & Become Seller Button */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
            {/* Location Selector */}
            <div className="relative" ref={locationDropdownRef}>
              <button
                onClick={handleLocationClick}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-xs sm:text-sm text-white hover:text-white/80 hover:bg-white/10 rounded-md transition-colors duration-200 min-w-0"
              >
                <MapPinIcon className="h-3 w-3 sm:h-4 sm:w-4 text-white flex-shrink-0" />
                <span className="truncate max-w-16 sm:max-w-24 md:max-w-32 hidden sm:inline">{userLocation}</span>
                <span className="truncate max-w-16 sm:hidden">Loc</span>
                <ChevronDownIcon className="h-3 w-3 sm:h-4 sm:w-4 text-white flex-shrink-0" />
              </button>
              
              {/* Location Dropdown */}
              {showLocationDropdown && (
                <div className="absolute top-full right-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Select Location</h3>
                    <div className="space-y-1">
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
            
            {/* Profile Dropdown */}
            <ProfileDropdown isMobile={false} />
            
            {/* Cart Icon */}
            <button
              onClick={() => router.push('/cart')}
              className="flex items-center gap-1 sm:gap-2 px-1.5 sm:px-3 py-2 text-sm text-white hover:text-white/80 hover:bg-white/10 rounded-md transition-colors duration-200 relative"
            >
              <div className="relative">
                <ShoppingCartIcon className="h-5 w-5 text-white flex-shrink-0" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-medium text-[10px] sm:text-xs">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </div>
              <span className="text-sm font-medium hidden sm:inline">Cart</span>
            </button>
            
            {/* Become KliqChamp Button */}
            <button
              onClick={() => window.open('http://localhost:3002', '_blank')}
              className="bg-gradient-to-r from-orange-300 to-red-400 text-white px-2 sm:px-3 md:px-4 py-2 rounded-full text-xs sm:text-sm font-bold hover:from-orange-400 hover:to-red-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5 border border-white/20 hover:border-white/30 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 hidden sm:inline">Become KliqChamp</span>
              <span className="relative z-10 sm:hidden">Become</span>
            </button>
            
            {/* Three Dot Menu */}
            <div className="relative hidden sm:block" ref={threeDotMenuRef}>
              <button
                onMouseEnter={handleThreeDotMenuHover}
                onMouseLeave={handleThreeDotMenuLeave}
                className="flex items-center justify-center w-8 h-8 text-white hover:text-white/80 hover:bg-white/10 rounded-md transition-colors duration-200"
              >
                <EllipsisVerticalIcon className="h-5 w-5" />
              </button>
              
              {/* Three Dot Menu Dropdown */}
              {showThreeDotMenu && (
                <div 
                  className="absolute top-full right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                  onMouseEnter={handleThreeDotMenuHover}
                  onMouseLeave={handleThreeDotMenuLeave}
                >
                  <div className="p-2">
                    <div className="space-y-1">
                      <button 
                        onClick={() => router.push('/coupons')}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-3"
                      >
                        <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <span>Coupons</span>
                      </button>
                      <button 
                        onClick={() => router.push('/giftcards')}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-3"
                      >
                        <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                        </svg>
                        <span>Gift Cards</span>
                      </button>
                      <div className="border-t border-gray-200 my-1"></div>
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-3">
                        <BellIcon className="h-4 w-4 text-gray-500" />
                        <span>Notification Preferences</span>
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-3">
                        <PhoneIcon className="h-4 w-4 text-gray-500" />
                        <span>24x7 Customer Care</span>
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-3">
                        <ChartBarIcon className="h-4 w-4 text-gray-500" />
                        <span>Advertise</span>
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-3">
                        <ArrowDownTrayIcon className="h-4 w-4 text-gray-500" />
                        <span>Download App</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
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
                     const mapSelectedLocation = 'Selected Location';
                     setUserLocation(mapSelectedLocation);
                     
                     // Store the map selected location in localStorage
                     const mapLocationData = {
                       city: mapSelectedLocation.split(',')[0]?.trim() || mapSelectedLocation,
                       country: mapSelectedLocation.split(',')[1]?.trim() || 'India',
                       state: '',
                       postcode: '',
                       locality: '',
                       principalSubdivisionCode: '',
                       countryCode: '',
                       localityInfo: {},
                       continent: '',
                       continentCode: '',
                       addressLine1: '',
                       addressLine2: '',
                       fullAddress: mapSelectedLocation,
                       detailedAddress: mapSelectedLocation,
                       coordinates: {
                         latitude: 0,
                         longitude: 0
                       },
                       timestamp: new Date().toISOString(),
                       source: 'map_selection',
                       rawData: {}
                     };
                     
                     localStorage.setItem('userLocation', JSON.stringify(mapLocationData));
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
