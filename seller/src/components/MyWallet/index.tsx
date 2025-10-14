'use client';

import { useState, useEffect } from 'react';
 import MobilePaymentsDashboard from './MobileWallet';
 import  PaymentsDashboard from './DesktopWAllet';

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
     {isMobile ? <MobilePaymentsDashboard /> : <PaymentsDashboard />}
    </>
  );
}