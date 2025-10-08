'use client';

import { useState, useEffect } from 'react';
 import MobileMainNavbar from './MobileMainNavbar';
 import  DesktopMainNavbar from './DesktopMainNavbar';

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
     {isMobile ? <MobileMainNavbar /> : <DesktopMainNavbar />}
    </>
  );
}