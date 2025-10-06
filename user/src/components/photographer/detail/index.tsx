'use client';

import { useState, useEffect } from 'react';
import DesktopPhotographerDetail from './DesktopPhotographerDetail';
import MobilePhotographerDetail from './MobilePhotographerDetail';

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
  portfolio: string[];
  availability: string;
  languages: string[];
  equipment: string[];
  awards: string[];
}

interface PhotographerDetailProps {
  photographerId: string;
  category?: string;
  subcategory?: string;
}

export default function PhotographerDetail({ photographerId, category, subcategory }: PhotographerDetailProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [photographer, setPhotographer] = useState<Photographer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockPhotographer: Photographer = {
      id: parseInt(photographerId),
      name: "Sarah Johnson",
      specialty: "Wedding Photography",
      location: "New York, NY",
      rating: 4.8,
      reviews: 127,
      price: "₹299",
      experience: "8 years",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      description: "Passionate wedding photographer with 8 years of experience capturing life's most precious moments. Specializing in candid and artistic wedding photography that tells your unique love story.",
      portfolio: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=600&fit=crop"
      ],
      availability: "Available weekends and weekdays",
      languages: ["English", "Spanish"],
      equipment: ["Canon EOS R5", "Sony A7R IV", "Professional Lighting", "Drone"],
      awards: ["Wedding Photographer of the Year 2022", "Best Wedding Photography Award 2021"]
    };

    // Simulate API call
    setTimeout(() => {
      setPhotographer(mockPhotographer);
      setLoading(false);
    }, 1000);
  }, [photographerId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading photographer details...</p>
        </div>
      </div>
    );
  }

  if (!photographer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Photographer Not Found</h1>
          <p className="text-gray-600">The photographer you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return isMobile ? (
    <MobilePhotographerDetail photographer={photographer} category={category} subcategory={subcategory} />
  ) : (
    <DesktopPhotographerDetail photographer={photographer} category={category} subcategory={subcategory} />
  );
}
