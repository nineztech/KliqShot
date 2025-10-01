'use client';

import { useState, useEffect } from 'react';
import MobileProcessSection from './MobileProcessSection';
import DesktopProcessSection from './DesktopProcessSection';

export default function ProcessSection() {
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
      {isMobile ? <MobileProcessSection /> : <DesktopProcessSection />}
    </>
  );
}