'use client';

import { useState, useEffect } from 'react';
 import MobileSidebar from './MobileSIdebar';
 import Sidebar from './DesktopSIdebar';

export default function SidebarSection() {
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
     {isMobile ? <MobileSidebar /> : <Sidebar />}
    </>
  );
}