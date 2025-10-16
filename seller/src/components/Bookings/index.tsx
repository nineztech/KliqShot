'use client';

import { useState, useEffect } from 'react';
 import MobileBookingManagement from './MobileBooling';
 import  BookingManagement from './DesktopBooking';

export default function BookingSection() {
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
     {isMobile ? <MobileBookingManagement /> : <BookingManagement />}
    </>
  );
}