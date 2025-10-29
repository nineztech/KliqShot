'use client';

import { useState, useEffect } from 'react';
 import MobileTeamManagement from './MobileTeam';
 import TeamManagement from './DesktopTeam';

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
     {isMobile ? <MobileTeamManagement /> : <TeamManagement />}
    </>
  );
}