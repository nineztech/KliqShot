'use client';

import { useState, useEffect } from 'react';
import DesktopCartPage from './DesktopCartPage';
import MobileCartPage from './MobileCartPage';

export default function CartPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isMobile ? <MobileCartPage /> : <DesktopCartPage />;
}
