'use client';

import { useState, useEffect } from 'react';
import DesktopSearchResults from './DesktopSearchResults';
import MobileSearchResults from './MobileSearchResults';

export default function SearchResults() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile ? <MobileSearchResults /> : <DesktopSearchResults />;
}

