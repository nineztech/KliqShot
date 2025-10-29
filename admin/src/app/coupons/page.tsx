'use client';

import Sidebar from '@/components/sidebar';
import CouponManagement from '@/components/coupon';
import { useState, useEffect } from 'react';
import { useSidebar } from '@/components/sidebar/SidebarContext';

interface Coupon {
  id: string;
  code: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  applicableCategories?: string[];
  applicablePackages?: string[];
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { isMinimized } = useSidebar();

  // Fetch coupons on component mount
  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      // Simulate API call with sample data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const sampleCoupons: Coupon[] = [
        {
          id: '1',
          code: 'WELCOME10',
          name: 'Welcome Discount',
          description: 'Get 10% off on your first booking',
          type: 'percentage',
          value: 10,
          minOrderAmount: 1000,
          usageLimit: 100,
          usedCount: 25,
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          isActive: true,
          applicableCategories: ['Wedding', 'Portrait'],
          applicablePackages: []
        },
        {
          id: '2',
          code: 'SAVE500',
          name: 'Fixed Amount Off',
          description: 'Save ₹500 on bookings above ₹5000',
          type: 'fixed',
          value: 500,
          minOrderAmount: 5000,
          usageLimit: 50,
          usedCount: 12,
          startDate: '2024-01-15',
          endDate: '2024-06-30',
          isActive: true,
          applicableCategories: ['Corporate', 'Event'],
          applicablePackages: []
        },
        {
          id: '3',
          code: 'SUMMER20',
          name: 'Summer Special',
          description: '20% off on all summer bookings',
          type: 'percentage',
          value: 20,
          minOrderAmount: 2000,
          usageLimit: 200,
          usedCount: 45,
          startDate: '2024-05-01',
          endDate: '2024-08-31',
          isActive: false,
          applicableCategories: [],
          applicablePackages: []
        }
      ];
      
      setCoupons(sampleCoupons);
    } catch (err: any) {
      console.error('Error fetching coupons:', err);
      setError(err.message || 'Failed to load coupons');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab="coupons" onTabChange={(tab) => window.location.href = `/${tab}`} />
      <div 
        className="pt-16 transition-all duration-300 p-4 md:p-8"
        style={{ marginLeft: isMinimized ? '5rem' : '16rem' }}
      >
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading coupons...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={fetchCoupons}
              className="mt-2 text-sm text-red-700 hover:text-red-800 underline"
            >
              Try again
            </button>
          </div>
        ) : (
          <CouponManagement 
            coupons={coupons} 
            setCoupons={setCoupons}
            onRefresh={fetchCoupons}
          />
        )}
      </div>
    </div>
  );
}
