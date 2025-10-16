'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserCircleIcon, HeartIcon, GiftIcon, BellIcon, ArrowRightOnRectangleIcon, LanguageIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../AuthContext';
import { useCart } from '../cart/CartContext';
import { useWishlist } from '../wishlist/WishlistContext';

interface ProfileDropdownProps {
  isMobile?: boolean;
}

export default function ProfileDropdown({ isMobile = false }: ProfileDropdownProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const { addToCart } = useCart();
  const { items: wishlistItems } = useWishlist();

  const handleProfileClick = () => {
    // When not authenticated, clicking should navigate to login page
    if (!isAuthenticated) {
      router.push('/signin');
    } else {
      // When authenticated, clicking toggles the dropdown
      setShowDropdown(!showDropdown);
    }
  };

  const handleProfileHover = () => {
    setShowDropdown(true);
  };

  const handleProfileLeave = () => {
    setShowDropdown(false);
  };

  const handleSignupClick = () => {
    setShowDropdown(false);
    router.push('/signup');
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    router.push('/');
  };

  const handleAddDemoItem = () => {
    addToCart({
      id: `demo-${Date.now()}`,
      name: 'Demo Photography Package',
      price: 299,
      image: '/demo-image.jpg'
    });
    setShowDropdown(false);
  };

  const handleLanguageHover = () => {
    setShowLanguageDropdown(true);
  };

  const handleLanguageLeave = () => {
    setShowLanguageDropdown(false);
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setShowLanguageDropdown(false);
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside (only for authenticated users)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only close on click outside when user is authenticated
      if (isAuthenticated) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setShowDropdown(false);
        }
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setShowLanguageDropdown(false);
      }
    };

    if ((isAuthenticated && showDropdown) || showLanguageDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown, showLanguageDropdown, isAuthenticated]);

  if (isMobile) {
    return (
      <div 
        className="relative" 
        ref={dropdownRef}
        onMouseEnter={handleProfileHover}
        onMouseLeave={handleProfileLeave}
      >
        <button
          onClick={handleProfileClick}
          className="p-1 text-white hover:text-white hover:bg-white/10 rounded-full transition-colors duration-200"
        >
          <UserCircleIcon className="h-3 w-3" />
        </button>
        
        {/* Mobile Profile Dropdown */}
        {showDropdown && (
          <div 
            className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
            onMouseEnter={handleProfileHover}
            onMouseLeave={handleProfileLeave}
          >
            <div className="p-2">
              {!isAuthenticated ? (
                <div className="space-y-1">
                  <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-100">
                    New customer? <span className="text-blue-600 cursor-pointer hover:underline" onClick={handleSignupClick}>Sign Up</span>
                  </div>
                  {/* Language Selector - Mobile Non-Authenticated */}
                  <div 
                    className="relative" 
                    ref={languageDropdownRef}
                    onMouseEnter={handleLanguageHover}
                    onMouseLeave={handleLanguageLeave}
                  >
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-2">
                      <LanguageIcon className="h-4 w-4 text-gray-500" />
                      <span className="flex-1">Language ({selectedLanguage})</span>
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    {/* Language Nested Dropdown - Mobile */}
                    {showLanguageDropdown && (
                      <div className="absolute left-full top-0 ml-1 w-52 bg-white border border-gray-200 rounded-xl shadow-xl z-[9999]">
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
                                onClick={() => handleLanguageSelect(language.name)}
                                className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-all duration-200 flex items-center gap-3 group ${
                                  selectedLanguage === language.name 
                                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                              >
                                <span className="text-base">{language.flag}</span>
                                <div className="flex-1">
                                  <div className="font-medium text-sm">{language.name}</div>
                                  <div className="text-xs text-gray-500">{language.code}</div>
                                </div>
                                {selectedLanguage === language.name && (
                                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => { setShowDropdown(false); router.push('/signin'); }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-2"
                  >
                    <UserCircleIcon className="h-4 w-4 text-gray-500" />
                    My Profile
                  </button>
                  <button
                    onClick={() => { setShowDropdown(false); router.push('/signin'); }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-2"
                  >
                    <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    Orders
                  </button>
                  <button
                    onClick={() => { setShowDropdown(false); router.push('/wishlist'); }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-2"
                  >
                    <HeartIcon className="h-4 w-4 text-gray-500" />
                    Wishlist ({wishlistItems.length})
                  </button>
                  <button
                    onClick={() => { setShowDropdown(false); router.push('/signin'); }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-2"
                  >
                    <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    Rewards
                  </button>
                  <button
                    onClick={() => { setShowDropdown(false); router.push('/signin'); }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-2"
                  >
                    <GiftIcon className="h-4 w-4 text-gray-500" />
                    Gift Cards
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="px-3 py-2 text-sm font-medium text-gray-900 border-b border-gray-100">
                    {user?.name || 'User'}
                  </div>
                  {/* Language Selector - Mobile Authenticated */}
                  <div 
                    className="relative" 
                    ref={languageDropdownRef}
                    onMouseEnter={handleLanguageHover}
                    onMouseLeave={handleLanguageLeave}
                  >
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-2">
                      <LanguageIcon className="h-4 w-4 text-gray-500" />
                      <span className="flex-1">Language ({selectedLanguage})</span>
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    {/* Language Nested Dropdown - Mobile Authenticated */}
                    {showLanguageDropdown && (
                      <div className="absolute left-full top-0 ml-1 w-52 bg-white border border-gray-200 rounded-xl shadow-xl z-[9999]">
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
                                onClick={() => handleLanguageSelect(language.name)}
                                className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-all duration-200 flex items-center gap-3 group ${
                                  selectedLanguage === language.name 
                                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                              >
                                <span className="text-base">{language.flag}</span>
                                <div className="flex-1">
                                  <div className="font-medium text-sm">{language.name}</div>
                                  <div className="text-xs text-gray-500">{language.code}</div>
                                </div>
                                {selectedLanguage === language.name && (
                                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => { setShowDropdown(false); router.push('/profile'); }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-2"
                  >
                    <UserCircleIcon className="h-4 w-4 text-gray-500" />
                    My Profile
                  </button>
                  <button
                    onClick={() => { setShowDropdown(false); router.push('/orders'); }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-2"
                  >
                    <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    Orders
                  </button>
                  <button
                    onClick={() => { setShowDropdown(false); router.push('/wishlist'); }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-2"
                  >
                    <HeartIcon className="h-4 w-4 text-gray-500" />
                    Wishlist ({wishlistItems.length})
                  </button>
                  <button
                    onClick={() => { setShowDropdown(false); router.push('/coupons'); }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-2"
                  >
                    <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Coupons
                  </button>
                  <button
                    onClick={() => { setShowDropdown(false); router.push('/giftcards'); }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-2"
                  >
                    <GiftIcon className="h-4 w-4 text-gray-500" />
                    Gift Cards
                  </button>
                  <button
                    onClick={() => { setShowDropdown(false); router.push('/notifications'); }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-2"
                  >
                    <BellIcon className="h-4 w-4 text-gray-500" />
                    Notifications
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-2"
                  >
                    <ArrowRightOnRectangleIcon className="h-4 w-4 text-gray-500" />
                    Logout
                  </button>
                  <button
                    onClick={handleAddDemoItem}
                    className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200 flex items-center gap-2 border-t border-gray-100 mt-2 pt-2"
                  >
                    <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Demo Item to Cart
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className="relative" 
      ref={dropdownRef}
      onMouseEnter={handleProfileHover}
      onMouseLeave={handleProfileLeave}
    >
      <button
        onClick={handleProfileClick}
        className="flex items-center gap-2 px-3 py-2 text-sm text-white hover:text-white/80 hover:bg-white/10 rounded-md transition-colors duration-200"
      >
        <UserCircleIcon className="h-5 w-5 text-white flex-shrink-0" />
        <span className="text-sm font-medium">{isAuthenticated ? user?.name || 'User' : 'Login'}</span>
        <svg className="h-4 w-4 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {/* Desktop Profile Dropdown */}
      {showDropdown && (
        <div 
          className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50"
          onMouseEnter={handleProfileHover}
          onMouseLeave={handleProfileLeave}
        >
          <div className="p-4">
            {!isAuthenticated ? (
              <>
                <div className="text-xs text-gray-500 mb-3 flex items-center justify-between">
                  <span>New customer?</span>
                  <span className="text-blue-600 cursor-pointer hover:underline" onClick={handleSignupClick}>Sign Up</span>
                </div>
                <div className="border-t border-gray-100 pt-3">
                  <div className="space-y-1">
                    {/* Language Selector - Desktop Non-Authenticated */}
                    <div 
                      className="relative" 
                      ref={languageDropdownRef}
                      onMouseEnter={handleLanguageHover}
                      onMouseLeave={handleLanguageLeave}
                    >
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-3">
                        <LanguageIcon className="h-4 w-4 text-gray-500" />
                        <span className="flex-1">Language ({selectedLanguage})</span>
                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      {/* Language Nested Dropdown - Desktop */}
                      {showLanguageDropdown && (
                        <div className="absolute left-full top-0 ml-1 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-[9999]">
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
                    <button
                      onClick={() => { setShowDropdown(false); router.push('/signin'); }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-3"
                    >
                      <UserCircleIcon className="h-4 w-4 text-gray-500" />
                      My Profile
                    </button>
                    <button
                      onClick={() => { setShowDropdown(false); router.push('/signin'); }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-3"
                    >
                      <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      Orders
                    </button>
                    <button
                      onClick={() => { setShowDropdown(false); router.push('/wishlist'); }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-3"
                    >
                      <HeartIcon className="h-4 w-4 text-gray-500" />
                      Wishlist ({wishlistItems.length})
                    </button>
                    <button
                      onClick={() => { setShowDropdown(false); router.push('/signin'); }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-3"
                    >
                      <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      Rewards
                    </button>
                    <button
                      onClick={() => { setShowDropdown(false); router.push('/signin'); }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-3"
                    >
                      <GiftIcon className="h-4 w-4 text-gray-500" />
                      Gift Cards
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-1">
                {/* Language Selector - Desktop Authenticated */}
                <div 
                  className="relative" 
                  ref={languageDropdownRef}
                  onMouseEnter={handleLanguageHover}
                  onMouseLeave={handleLanguageLeave}
                >
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-3">
                    <LanguageIcon className="h-4 w-4 text-gray-500" />
                    <span className="flex-1">Language ({selectedLanguage})</span>
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  {/* Language Nested Dropdown - Desktop Authenticated */}
                  {showLanguageDropdown && (
                    <div className="absolute left-full top-0 ml-1 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-[9999]">
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
                <button
                  onClick={() => { setShowDropdown(false); router.push('/profile'); }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-3"
                >
                  <UserCircleIcon className="h-4 w-4 text-gray-500" />
                  My Profile
                </button>
                <button
                  onClick={() => { setShowDropdown(false); router.push('/orders'); }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-3"
                >
                  <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Orders
                </button>
                <button
                  onClick={() => { setShowDropdown(false); router.push('/wishlist'); }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-3"
                >
                  <HeartIcon className="h-4 w-4 text-gray-500" />
                  Wishlist ({wishlistItems.length})
                </button>
                <button
                  onClick={() => { setShowDropdown(false); router.push('/coupons'); }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-3"
                >
                  <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Coupons
                </button>
                <button
                  onClick={() => { setShowDropdown(false); router.push('/giftcards'); }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-3"
                >
                  <GiftIcon className="h-4 w-4 text-gray-500" />
                  Gift Cards
                </button>
                <button
                  onClick={() => { setShowDropdown(false); router.push('/notifications'); }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-3"
                >
                  <BellIcon className="h-4 w-4 text-gray-500" />
                  Notifications
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-3"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4 text-gray-500" />
                  Logout
                </button>
                <button
                  onClick={handleAddDemoItem}
                  className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200 flex items-center gap-3 border-t border-gray-100 mt-2 pt-2"
                >
                  <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Demo Item to Cart
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
