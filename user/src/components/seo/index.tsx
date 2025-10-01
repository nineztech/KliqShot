'use client';

import { useState, useEffect } from 'react';
import MobileSEOSection from './MobileSEOSection';
import DesktopSEOSection from './DesktopSEOSection';

export default function SEOSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <>
      {isMobile ? <MobileSEOSection /> : <DesktopSEOSection />}
    </>
  );
}