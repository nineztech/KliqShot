'use client';

import { useState, useEffect } from 'react';
 import MobilePhotographerPortfolio from './MobilePortfolio';
 import  PhotographerPortfolio from './DesktopPortfolio';
 

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
     {isMobile ? <MobilePhotographerPortfolio /> : <PhotographerPortfolio />}
    </>
  );
}