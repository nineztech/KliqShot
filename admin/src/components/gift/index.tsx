'use client';

import { useState, useEffect } from 'react';
import DesktopGiftManagement from './DesktopGiftManagement';
import MobileGiftManagement from './MobileGiftManagement';

interface Gift {
  id: string;
  name: string;
  description: string;
  image?: string;
  category: string;
  pointsRequired: number;
  stock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface GiftManagementProps {
  gifts: Gift[];
  setGifts: (gifts: Gift[]) => void;
  onRefresh?: () => void;
}

export default function GiftManagement({ gifts, setGifts, onRefresh }: GiftManagementProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (isMobile) {
    return (
      <MobileGiftManagement 
        gifts={gifts} 
        setGifts={setGifts}
        onRefresh={onRefresh}
      />
    );
  }

  return (
    <DesktopGiftManagement 
      gifts={gifts} 
      setGifts={setGifts}
      onRefresh={onRefresh}
    />
  );
}

export type { Gift };
