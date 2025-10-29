'use client';

import { useState, useEffect } from 'react';
import DesktopCouponsPage from './DesktopCouponsPage';
import MobileCouponsPage from './MobileCouponsPage';

export default function CouponsPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isMobile ? <MobileCouponsPage /> : <DesktopCouponsPage />;
}
