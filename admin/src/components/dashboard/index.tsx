'use client';

import { useState, useEffect } from 'react';
import DesktopDashboard from './DesktopDashboard';
import MobileDashboard from './MobileDashboard';

interface DashboardProps {}

export default function Dashboard({}: DashboardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <>
      {isMobile ? (
        <MobileDashboard />
      ) : (
        <DesktopDashboard />
      )}
    </>
  );
}
