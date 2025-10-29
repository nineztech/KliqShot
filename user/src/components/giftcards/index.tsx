'use client';

import { useState, useEffect } from 'react';
import DesktopGiftCardsPage from './DesktopGiftCardsPage';
import MobileGiftCardsPage from './MobileGiftCardsPage';

export default function GiftCardsPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isMobile ? <MobileGiftCardsPage /> : <DesktopGiftCardsPage />;
}
