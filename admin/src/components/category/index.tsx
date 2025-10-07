'use client';

import { useState, useEffect } from 'react';
import DesktopCategoryManagement from './DesktopCategoryManagement';
import MobileCategoryManagement from './MobileCategoryManagement';

interface SubCategory {
  id: string;
  name: string;
  photographerCount: number;
}

interface Category {
  id: string;
  name: string;
  description: string;
  photographerCount: number;
  subCategories: SubCategory[];
}

interface CategoryManagementProps {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

export default function CategoryManagement({ categories, setCategories }: CategoryManagementProps) {
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
        <MobileCategoryManagement categories={categories} setCategories={setCategories} />
      ) : (
        <DesktopCategoryManagement categories={categories} setCategories={setCategories} />
      )}
    </>
  );
}
