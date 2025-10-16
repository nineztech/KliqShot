'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

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

  useEffect(() => {
    // Only add scroll listener on home page
    if (!isHomePage) {
      setShowSearchBar(true);
      return;
    }

    // Hide search bar initially on home page
    setShowSearchBar(false);

    const handleScroll = () => {
      const heroSection = document.querySelector('[data-hero-section]');
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        // Show search bar when hero section scrolls out of view
        setShowSearchBar(heroBottom < 0);
      }
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    // Check initial position
    handleScroll();

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  return (
    <>
      {isMobile ? <MobileNavbar showSearchBar={showSearchBar} /> : <DesktopNavbar showSearchBar={showSearchBar} />}
    </>
  );
}
