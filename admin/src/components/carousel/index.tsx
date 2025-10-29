'use client';

import { useState, useEffect } from 'react';
import DesktopCarouselManagement from './DesktopCarouselManagement';
import MobileCarouselManagement from './MobileCarouselManagement';
import { useSidebar } from '@/components/sidebar/SidebarContext';

export interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  badge?: string;
  stats?: {
    label: string;
    value: string;
  }[];
  isActive: boolean;
  displayOrder: number;
}

export interface CategoryFilter {
  id: string;
  label: string;
  icon: string;
  isActive: boolean;
  displayOrder: number;
}

export interface BannerPhoto {
  id: string;
  name: string;
  image: string;
  position: string;
  isActive: boolean;
  displayOrder: number;
}

interface CarouselManagementProps {
  carouselSlides: CarouselSlide[];
  setCarouselSlides: (slides: CarouselSlide[]) => void;
  categoryFilters: CategoryFilter[];
  setCategoryFilters: (filters: CategoryFilter[]) => void;
  bannerPhotos: BannerPhoto[];
  setBannerPhotos: (photos: BannerPhoto[]) => void;
  onRefresh?: () => void;
}

export default function CarouselManagement({ 
  carouselSlides, 
  setCarouselSlides, 
  categoryFilters, 
  setCategoryFilters,
  bannerPhotos,
  setBannerPhotos,
  onRefresh 
}: CarouselManagementProps) {
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
        <MobileCarouselManagement 
          carouselSlides={carouselSlides} 
          setCarouselSlides={setCarouselSlides}
          categoryFilters={categoryFilters}
          setCategoryFilters={setCategoryFilters}
          bannerPhotos={bannerPhotos}
          setBannerPhotos={setBannerPhotos}
          onRefresh={onRefresh}
        />
      ) : (
        <DesktopCarouselManagement 
          carouselSlides={carouselSlides} 
          setCarouselSlides={setCarouselSlides}
          categoryFilters={categoryFilters}
          setCategoryFilters={setCategoryFilters}
          bannerPhotos={bannerPhotos}
          setBannerPhotos={setBannerPhotos}
          onRefresh={onRefresh}
        />
      )}
    </div>
  );
}

