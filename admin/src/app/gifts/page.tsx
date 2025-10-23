'use client';

import Sidebar from '@/components/sidebar';
import GiftManagement from '@/components/gift';
import { useState, useEffect } from 'react';
import { useSidebar } from '@/components/sidebar/SidebarContext';

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
      
      const sampleGifts: Gift[] = [
        {
          id: '1',
          name: 'Wireless Headphones',
          description: 'Premium quality wireless headphones with noise cancellation',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
          category: 'Electronics',
          pointsRequired: 2500,
          stock: 15,
          isActive: true,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-15T00:00:00Z'
        },
        {
          id: '2',
          name: 'Coffee Maker',
          description: 'Automatic coffee maker for your perfect morning brew',
          image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
          category: 'Home & Living',
          pointsRequired: 1800,
          stock: 8,
          isActive: true,
          createdAt: '2024-01-05T00:00:00Z',
          updatedAt: '2024-01-20T00:00:00Z'
        },
        {
          id: '3',
          name: 'Fitness Tracker',
          description: 'Smart fitness tracker with heart rate monitoring',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
          category: 'Sports & Fitness',
          pointsRequired: 3200,
          stock: 0,
          isActive: false,
          createdAt: '2024-01-10T00:00:00Z',
          updatedAt: '2024-01-25T00:00:00Z'
        },
        {
          id: '4',
          name: 'Gift Card ₹500',
          description: 'Redeemable gift card worth ₹500',
          image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
          category: 'Gift Cards',
          pointsRequired: 1000,
          stock: 50,
          isActive: true,
          createdAt: '2024-01-12T00:00:00Z',
          updatedAt: '2024-01-18T00:00:00Z'
        },
        {
          id: '5',
          name: 'Bluetooth Speaker',
          description: 'Portable Bluetooth speaker with excellent sound quality',
          image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
          category: 'Electronics',
          pointsRequired: 1500,
          stock: 3,
          isActive: true,
          createdAt: '2024-01-15T00:00:00Z',
          updatedAt: '2024-01-22T00:00:00Z'
        },
        {
          id: '6',
          name: 'Smart Watch',
          description: 'Advanced smartwatch with health monitoring features',
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
          category: 'Electronics',
          pointsRequired: 4000,
          stock: 12,
          isActive: true,
          createdAt: '2024-01-18T00:00:00Z',
          updatedAt: '2024-01-25T00:00:00Z'
        },
        {
          id: '7',
          name: 'Wireless Charger',
          description: 'Fast wireless charging pad for smartphones',
          image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
          category: 'Electronics',
          pointsRequired: 800,
          stock: 25,
          isActive: true,
          createdAt: '2024-01-20T00:00:00Z',
          updatedAt: '2024-01-28T00:00:00Z'
        },
        {
          id: '8',
          name: 'Travel Backpack',
          description: 'Durable travel backpack with multiple compartments',
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
          category: 'Fashion',
          pointsRequired: 1200,
          stock: 18,
          isActive: true,
          createdAt: '2024-01-22T00:00:00Z',
          updatedAt: '2024-01-30T00:00:00Z'
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
