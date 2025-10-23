'use client';

import { useState, useEffect } from 'react';
import DesktopCouponManagement from './DesktopCouponManagement';
import MobileCouponManagement from './MobileCouponManagement';

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

interface CouponManagementProps {
  coupons: Coupon[];
  setCoupons: (coupons: Coupon[]) => void;
  onRefresh?: () => void;
}

export default function CouponManagement({ coupons, setCoupons, onRefresh }: CouponManagementProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (isMobile) {
    return (
      <MobileCouponManagement 
        coupons={coupons} 
        setCoupons={setCoupons}
        onRefresh={onRefresh}
      />
    );
  }

  return (
    <DesktopCouponManagement 
      coupons={coupons} 
      setCoupons={setCoupons}
      onRefresh={onRefresh}
    />
  );
}

export type { Coupon };
