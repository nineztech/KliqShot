'use client';

import Sidebar from '@/components/sidebar';
import PhotographerManagement from '@/components/photographer';
import { useState } from 'react';

export default function PhotographersPage() {
  const [photographers, setPhotographers] = useState([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 234 567 8900',
      location: 'New York, NY',
      specialty: 'Wedding Photography',
      rating: 4.9,
      reviews: 156,
      price: '₹15,000',
      experience: '5+ years',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      status: 'active' as 'active' | 'inactive' | 'pending',
      joinDate: '2023-01-15',
      categories: ['wedding', 'portrait']
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 987 654 3210',
      location: 'Mumbai, India',
      specialty: 'Haldi Photography',
      rating: 4.8,
      reviews: 203,
      price: '₹12,000',
      experience: '7+ years',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      status: 'active' as 'active' | 'inactive' | 'pending',
      joinDate: '2023-02-20',
      categories: ['wedding', 'events']
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab="photographers" onTabChange={(tab) => window.location.href = `/${tab}`} />
      <div className="ml-20 transition-all duration-300 p-4 md:p-8">
        <PhotographerManagement photographers={photographers} setPhotographers={setPhotographers} />
      </div>
    </div>
  );
}

