'use client';

import { useState, useEffect } from 'react';
import DesktopTopRatedPhotographers from './DesktopTopRatedPhotographers';
import MobileTopRatedPhotographers from './MobileTopRatedPhotographers';

interface TopRatedPhotographersProps {
  className?: string;
}

export default function TopRatedPhotographers({ className = '' }: TopRatedPhotographersProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    // Check on mount
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <>
      {isMobile ? <MobileTopRatedPhotographers className={className} /> : <DesktopTopRatedPhotographers className={className} />}
    </>
  );
}

