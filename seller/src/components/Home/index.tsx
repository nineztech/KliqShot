'use client';

import { useState, useEffect } from 'react';
 import MobileHomeSection from './MobileHomeSection';
 import  DesktopHomeSection from './DesktopHomeSection';

export default function HomeSection() {
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
     {isMobile ? <MobileHomeSection /> : <DesktopHomeSection />}
    </>
  );
}