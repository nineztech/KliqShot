'use client';

import { useState, useEffect } from 'react';
import MobileHowSellerWorks from './MobileHowSellerWorks';
import DesktopHowSellerWorks from './DesktopHowSellerWorks';

export default function HowSellerWorks() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isMobile ? <MobileHowSellerWorks /> : <DesktopHowSellerWorks />;
}

