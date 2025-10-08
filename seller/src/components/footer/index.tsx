'use client';

import { useState, useEffect } from 'react';
import MobileFooter from './MobileFooter';
import DesktopFooter from './DesktopFooter';

export default function Footer() {
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
      {isMobile ? <MobileFooter /> : <DesktopFooter />}
    </>
  );
}
