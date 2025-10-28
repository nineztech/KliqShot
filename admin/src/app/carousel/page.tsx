'use client';

import Sidebar from '@/components/sidebar';
import CarouselManagement from '@/components/carousel';
import { CarouselSlide, CategoryFilter, BannerPhoto } from '@/components/carousel';
import { useState } from 'react';

// Static initial data
const initialCarouselSlides: CarouselSlide[] = [
  {
    id: '1',
    title: "Wedding Photography Excellence",
    subtitle: "Capture Your Special Day",
    description: "Professional wedding photographers with years of experience. From candid moments to traditional ceremonies, we preserve your memories beautifully.",
    image: "/banner2.jpeg",
    ctaText: "Book Wedding Photographer",
    ctaLink: "/categories/wedding-photography",
    badge: "Trending",
    isActive: true,
    displayOrder: 0
  },
  {
    id: '2',
    title: "Find Your Perfect Photographer",
    subtitle: "Professional Photography Services",
    description: "Discover top-rated photographers for weddings, portraits, events, and more. Book with confidence and capture your precious moments with style.",
    image: "/Images/Travel4.jpg",
    ctaText: "Explore Photographers",
    ctaLink: "/photographers",
    badge: "Most Popular",
    isActive: true,
    displayOrder: 1
  },
  {
    id: '3',
    title: "Portrait & Studio Sessions",
    subtitle: "Professional Portraits Made Easy",
    description: "Transform your look with professional portrait photography. From corporate headshots to creative portraits, our photographers deliver stunning results.",
    image: "/Images/Travel5.jpg",
    ctaText: "Book Portrait Session",
    ctaLink: "/categories/portrait-photography",
    badge: "Featured",
    isActive: true,
    displayOrder: 2
  }
];

const initialCategoryFilters: CategoryFilter[] = [
  { id: '1', label: 'Packages', icon: 'GiftIcon', isActive: true, displayOrder: 0 },
  { id: '2', label: 'Wedding', icon: 'HeartIcon', isActive: true, displayOrder: 1 },
  { id: '3', label: 'Portrait', icon: 'UserGroupIcon', isActive: true, displayOrder: 2 },
  { id: '4', label: 'Family', icon: 'UserGroupIcon', isActive: true, displayOrder: 3 },
  { id: '5', label: 'Events', icon: 'BriefcaseIcon', isActive: true, displayOrder: 4 },
  { id: '6', label: 'Maternity', icon: 'SparklesIcon', isActive: true, displayOrder: 5 },
  { id: '7', label: 'Product', icon: 'ShoppingBagIcon', isActive: true, displayOrder: 6 },
  { id: '8', label: 'Interior', icon: 'HomeIcon', isActive: true, displayOrder: 7 },
  { id: '9', label: 'Fashion', icon: 'SparklesIcon', isActive: true, displayOrder: 8 },
  { id: '10', label: 'Sports', icon: 'TrophyIcon', isActive: true, displayOrder: 9 }
];

const initialBannerPhotos: BannerPhoto[] = [
  {
    id: '1',
    name: 'Summer Sale Banner',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    position: 'homepage',
    isActive: true,
    displayOrder: 0
  },
  {
    id: '2',
    name: 'Category Promotion',
    image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800',
    position: 'category',
    isActive: true,
    displayOrder: 1
  }
];

export default function CarouselPage() {
  const [carouselSlides, setCarouselSlides] = useState<CarouselSlide[]>(initialCarouselSlides);
  const [categoryFilters, setCategoryFilters] = useState<CategoryFilter[]>(initialCategoryFilters);
  const [bannerPhotos, setBannerPhotos] = useState<BannerPhoto[]>(initialBannerPhotos);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab="carousel" onTabChange={(tab) => window.location.href = `/${tab}`} />
      <div className="pt-16 transition-all duration-300 p-4 md:p-8">
        <CarouselManagement 
          carouselSlides={carouselSlides}
          setCarouselSlides={setCarouselSlides}
          categoryFilters={categoryFilters}
          setCategoryFilters={setCategoryFilters}
          bannerPhotos={bannerPhotos}
          setBannerPhotos={setBannerPhotos}
        />
      </div>
    </div>
  );
}

