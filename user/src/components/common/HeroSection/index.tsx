'use client';

import { useState, useEffect } from 'react';
import DesktopHeroSection from './DesktopHeroSection';
import MobileHeroSection from './MobileHeroSection';

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    // Check on mount
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <>
      {isMobile ? <MobileHeroSection /> : <DesktopHeroSection />}
    </>
  );
}

