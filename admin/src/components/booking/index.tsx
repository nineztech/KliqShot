'use client';

import { useState, useEffect } from 'react';
import DesktopBookingManagement from './DesktopBookingManagement';
import MobileBookingManagement from './MobileBookingManagement';
import { useSidebar } from '@/components/sidebar/SidebarContext';

interface Booking {
  id: string;
  bookingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  photographerName: string;
  category: string;
  subcategory: string;
  packageType: string;
  packageName: string;
  bookingDate: string;
  eventDate: string;
  eventTime: string;
  location: string;
  duration: string;
  totalAmount: number;
  advanceAmount: number;
  remainingAmount: number;
  paymentStatus: 'paid' | 'pending' | 'partial';
  bookingStatus: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  serviceStatus: 'today' | 'upcoming' | 'completed' | 'cancelled';
  deliveryStatus: 'pending' | 'delivered' | 'not_applicable';
  createdAt: string;
}

interface BookingManagementProps {
  bookings: Booking[];
  setBookings: (bookings: Booking[]) => void;
}

export default function BookingManagement({ bookings, setBookings }: BookingManagementProps) {
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
        <MobileBookingManagement bookings={bookings} setBookings={setBookings} />
      ) : (
        <DesktopBookingManagement bookings={bookings} setBookings={setBookings} />
      )}
    </div>
  );
}

