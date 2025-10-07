'use client';

import { useState, useEffect } from 'react';
import DesktopPhotographerManagement from './DesktopPhotographerManagement';
import MobilePhotographerManagement from './MobilePhotographerManagement';

interface Photographer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  specialty: string;
  rating: number;
  reviews: number;
  price: string;
  experience: string;
  image: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  categories: string[];
}

interface PhotographerManagementProps {
  photographers: Photographer[];
  setPhotographers: (photographers: Photographer[]) => void;
}

export default function PhotographerManagement({ photographers, setPhotographers }: PhotographerManagementProps) {
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
        <MobilePhotographerManagement photographers={photographers} setPhotographers={setPhotographers} />
      ) : (
        <DesktopPhotographerManagement photographers={photographers} setPhotographers={setPhotographers} />
      )}
    </>
  );
}
