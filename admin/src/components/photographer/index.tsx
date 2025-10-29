'use client';

import { useState, useEffect } from 'react';
import DesktopPhotographerManagement from './DesktopPhotographerManagement';
import MobilePhotographerManagement from './MobilePhotographerManagement';
import { useSidebar } from '@/components/sidebar/SidebarContext';

interface FieldVerification {
  aadharCard?: boolean;
  panCard?: boolean;
  mobileNumber?: boolean;
  email?: boolean;
  name?: boolean;
  temporaryAddress?: boolean;
  permanentAddress?: boolean;
}

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
  isVerified?: boolean;
  verifiedAt?: string;
  fieldVerification?: FieldVerification;
  // Additional fields for verification
  aadharCard?: string;
  panCard?: string;
  temporaryAddress?: string;
  permanentAddress?: string;
}

interface PhotographerManagementProps {
  photographers: Photographer[];
  setPhotographers: (photographers: Photographer[]) => void;
}

export default function PhotographerManagement({ photographers, setPhotographers }: PhotographerManagementProps) {
  const [isMobile, setIsMobile] = useState(false);
  const { isMinimized } = useSidebar();

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
    <div 
      className="transition-all duration-300"
      style={{ marginLeft: isMobile ? '0' : (isMinimized ? '5rem' : '16rem') }}
    >
      {isMobile ? (
        <MobilePhotographerManagement photographers={photographers} setPhotographers={setPhotographers} />
      ) : (
        <DesktopPhotographerManagement photographers={photographers} setPhotographers={setPhotographers} />
      )}
    </div>
  );
}
