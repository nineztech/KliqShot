'use client';

import { useState, useEffect } from 'react';
import DesktopVideoSection from './DesktopVideoSection';
import MobileVideoSection from './MobileVideoSection';

export default function VideoSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isMobile ? <MobileVideoSection /> : <DesktopVideoSection />;
}
