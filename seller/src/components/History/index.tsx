'use client';

import { useState, useEffect } from 'react';
 import MobileOrderHistory from './MobileHistory';
 import  OrderHistory from './DesktopHistory';

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
     {isMobile ? <MobileOrderHistory /> : <OrderHistory />}
    </>
  );
}