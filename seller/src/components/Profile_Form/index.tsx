'use client';

import { useState, useEffect } from 'react';
 import MobileVendorRegistrationForm from './MobileProfile';
 import  DesktopVendorRegistrationForm from './DesktopProfile';

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
     {isMobile ? <MobileVendorRegistrationForm /> : <DesktopVendorRegistrationForm />}
    </>
  );
}