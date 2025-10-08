'use client';

import { useState, useEffect } from 'react';
 import MobileAboutSection from './MobileAboutSection';
 import DesktopAboutSection from './DesktopAboutSection';

export default function AboutSection() {
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
     {isMobile ? <MobileAboutSection /> : <DesktopAboutSection />}
    </>
  );
}