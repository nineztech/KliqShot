'use client';

import { useState, useEffect } from 'react';
import MobileAdvertisementSection from './MobileAdvertisementSection';
import DesktopAdvertisementSection from './DesktopAdvertisementSection';

export default function AdvertisementSection() {
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
    666  {isMobile ? <MobileAdvertisementSection /> : <DesktopAdvertisementSection />}
    </>
  );
}