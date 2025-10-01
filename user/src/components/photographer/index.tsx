'use client';

import { useState, useEffect } from 'react';
import MobilePhotographerGrid from './MobilePhotographerGrid';
import DesktopPhotographerGrid from './DesktopPhotographerGrid';

interface Photographer {
  id: number;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  experience: string;
  image: string;
  description: string;
}

interface PhotographerGridProps {
  photographers: Photographer[];
  categoryName: string;
  onPhotographerClick: (photographer: Photographer) => void;
}

export default function PhotographerGrid({ 
  photographers, 
  categoryName, 
  onPhotographerClick 
}: PhotographerGridProps) {
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
      {isMobile ? (
        <MobilePhotographerGrid 
          photographers={photographers}
          categoryName={categoryName}
          onPhotographerClick={onPhotographerClick}
        />
      ) : (
        <DesktopPhotographerGrid 
          photographers={photographers}
          categoryName={categoryName}
          onPhotographerClick={onPhotographerClick}
        />
      )}
    </>
  );
}
