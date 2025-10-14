'use client';

import { useState, useEffect } from 'react';
import MobileUserProfile from './MobileUserProfile';
import UserProfile from './DesktopUserProfile';  // ✅ FIXED — default import

export default function UserProfileSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return <>{isMobile ? <MobileUserProfile /> : <UserProfile />}</>;
}