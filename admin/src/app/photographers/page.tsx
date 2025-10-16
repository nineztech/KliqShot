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
      categories: ['wedding', 'portrait'],
      isVerified: true,
      verifiedAt: '2023-01-20'
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
      categories: ['wedding', 'events'],
      isVerified: false
    },
    {
      id: '3',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 876 543 2109',
      location: 'Delhi, India',
      specialty: 'Portrait Photography',
      rating: 4.7,
      reviews: 89,
      price: '₹10,000',
      experience: '4+ years',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      status: 'active' as 'active' | 'inactive' | 'pending',
      joinDate: '2024-01-10',
      categories: ['portrait', 'fashion'],
      isVerified: false
    },
    {
      id: '4',
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 555 123 4567',
      location: 'Los Angeles, CA',
      specialty: 'Event Photography',
      rating: 4.9,
      reviews: 234,
      price: '₹18,000',
      experience: '8+ years',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
      status: 'active' as 'active' | 'inactive' | 'pending',
      joinDate: '2022-11-05',
      categories: ['events', 'corporate'],
      isVerified: true,
      verifiedAt: '2022-11-10'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab="photographers" onTabChange={(tab) => window.location.href = `/${tab}`} />
      <div className="pt-16 transition-all duration-300 p-4 md:p-8">
        <PhotographerManagement photographers={photographers} setPhotographers={setPhotographers} />
      </div>
    </div>
  );
}

