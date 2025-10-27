'use client';

import Sidebar from '@/components/sidebar';
import GiftManagement from '@/components/gift';
import { useState, useEffect } from 'react';
import { useSidebar } from '@/components/sidebar/SidebarContext';

interface Gift {
  id: string;
  name: string;
  giftCode: string;
  image?: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function GiftsPage() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { isMinimized } = useSidebar();

  // Fetch gifts on component mount
  useEffect(() => {
    fetchGifts();
  }, []);

  const fetchGifts = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      // Simulate API call with sample data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get current date and future dates for samples
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      
      const formatDateForInput = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const sampleGifts: Gift[] = [
        {
          id: '1',
          name: 'Gift Card ₹500',
          giftCode: 'GC500XYZ',
          image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
          startDate: formatDateForInput(today),
          endDate: formatDateForInput(new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000)), // 90 days from now
          isActive: true,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-15T00:00:00Z'
        },
        {
          id: '2',
          name: 'Gift Card ₹1000',
          giftCode: 'GC1KABC',
          image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
          startDate: formatDateForInput(today),
          endDate: formatDateForInput(new Date(today.getTime() + 120 * 24 * 60 * 60 * 1000)), // 120 days from now
          isActive: true,
          createdAt: '2024-01-05T00:00:00Z',
          updatedAt: '2024-01-20T00:00:00Z'
        },
        {
          id: '3',
          name: 'Gift Card ₹2500',
          giftCode: 'GC2K5DEF',
          image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
          startDate: formatDateForInput(today),
          endDate: formatDateForInput(new Date(today.getTime() + 180 * 24 * 60 * 60 * 1000)), // 180 days from now
          isActive: true,
          createdAt: '2024-01-10T00:00:00Z',
          updatedAt: '2024-01-25T00:00:00Z'
        },
        {
          id: '4',
          name: 'Gift Card ₹5000',
          giftCode: 'GC5KGHI',
          image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
          startDate: formatDateForInput(today),
          endDate: formatDateForInput(new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000)),
          isActive: true,
          createdAt: '2024-01-12T00:00:00Z',
          updatedAt: '2024-01-18T00:00:00Z'
        },
        {
          id: '5',
          name: 'Premium Gift Card ₹10000',
          giftCode: 'GC10KJKL',
          image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
          startDate: formatDateForInput(today),
          endDate: formatDateForInput(new Date(today.getTime() + 365 * 24 * 60 * 60 * 1000)), // 1 year from now
          isActive: true,
          createdAt: '2024-01-15T00:00:00Z',
          updatedAt: '2024-01-22T00:00:00Z'
        }
      ];
      
      setGifts(sampleGifts);
    } catch (err: any) {
      console.error('Error fetching gifts:', err);
      setError(err.message || 'Failed to load gifts');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab="gifts" onTabChange={(tab) => window.location.href = `/${tab}`} />
      <div 
        className="pt-16 transition-all duration-300 p-4 md:p-8"
        style={{ marginLeft: isMinimized ? '5rem' : '16rem' }}
      >
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading gifts...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={fetchGifts}
              className="mt-2 text-sm text-red-700 hover:text-red-800 underline"
            >
              Try again
            </button>
          </div>
        ) : (
          <GiftManagement 
            gifts={gifts} 
            setGifts={setGifts}
            onRefresh={fetchGifts}
          />
        )}
      </div>
    </div>
  );
}
