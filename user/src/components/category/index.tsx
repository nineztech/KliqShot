'use client';

import { useState, useEffect } from 'react';
import DesktopCategorySection from './DesktopCategorySection';
import MobileCategorySection from './MobileCategorySection';

export default function CategorySection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
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
      {isMobile ? <MobileCategorySection /> : <DesktopCategorySection />}
    </>
  );
}
