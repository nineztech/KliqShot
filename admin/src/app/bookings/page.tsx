'use client';

import { useState } from 'react';
import Sidebar from '@/components/sidebar';
import BookingManagement from '@/components/booking';

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
  createdAt: string;
}

// Sample initial bookings data
const initialBookings: Booking[] = [
  {
    id: '1',
    bookingId: 'BK001',
    customerName: 'Rajesh Kumar',
    customerEmail: 'rajesh.kumar@example.com',
    customerPhone: '+91 98765 43210',
    photographerName: 'Arjun Singh',
    category: 'Wedding',
    subcategory: 'Traditional Wedding',
    packageType: 'Individual',
    packageName: 'Premium Package',
    bookingDate: '2024-01-15',
    eventDate: '2024-02-20',
    eventTime: '10:00 AM',
    location: 'Mumbai, Maharashtra',
    duration: '8 Hours',
    totalAmount: 50000,
    advanceAmount: 15000,
    remainingAmount: 35000,
    paymentStatus: 'partial',
    bookingStatus: 'confirmed',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    bookingId: 'BK002',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.sharma@example.com',
    customerPhone: '+91 98765 43211',
    photographerName: 'Vikram Patel',
    category: 'Pre-Wedding',
    subcategory: 'Outdoor Shoot',
    packageType: 'Fixed',
    packageName: 'Gold Package',
    bookingDate: '2024-01-20',
    eventDate: '2024-02-10',
    eventTime: '6:00 AM',
    location: 'Goa',
    duration: '6 Hours',
    totalAmount: 35000,
    advanceAmount: 35000,
    remainingAmount: 0,
    paymentStatus: 'paid',
    bookingStatus: 'confirmed',
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    bookingId: 'BK003',
    customerName: 'Amit Verma',
    customerEmail: 'amit.verma@example.com',
    customerPhone: '+91 98765 43212',
    photographerName: 'Rahul Mehta',
    category: 'Corporate',
    subcategory: 'Event Photography',
    packageType: 'Individual',
    packageName: 'Basic Package',
    bookingDate: '2024-02-01',
    eventDate: '2024-02-15',
    eventTime: '2:00 PM',
    location: 'Bangalore, Karnataka',
    duration: '4 Hours',
    totalAmount: 20000,
    advanceAmount: 0,
    remainingAmount: 20000,
    paymentStatus: 'pending',
    bookingStatus: 'pending',
    createdAt: '2024-02-01'
  },
  {
    id: '4',
    bookingId: 'BK004',
    customerName: 'Sneha Reddy',
    customerEmail: 'sneha.reddy@example.com',
    customerPhone: '+91 98765 43213',
    photographerName: 'Karan Chopra',
    category: 'Haldi',
    subcategory: 'Traditional Ceremony',
    packageType: 'Fixed',
    packageName: 'Silver Package',
    bookingDate: '2024-01-25',
    eventDate: '2024-02-25',
    eventTime: '11:00 AM',
    location: 'Hyderabad, Telangana',
    duration: '5 Hours',
    totalAmount: 28000,
    advanceAmount: 10000,
    remainingAmount: 18000,
    paymentStatus: 'partial',
    bookingStatus: 'confirmed',
    createdAt: '2024-01-25'
  },
  {
    id: '5',
    bookingId: 'BK005',
    customerName: 'Rohit Malhotra',
    customerEmail: 'rohit.malhotra@example.com',
    customerPhone: '+91 98765 43214',
    photographerName: 'Aditya Kumar',
    category: 'Travel',
    subcategory: 'Adventure Photography',
    packageType: 'Individual',
    packageName: 'Custom Package',
    bookingDate: '2024-02-05',
    eventDate: '2024-03-01',
    eventTime: '5:00 AM',
    location: 'Ladakh',
    duration: '3 Days',
    totalAmount: 75000,
    advanceAmount: 25000,
    remainingAmount: 50000,
    paymentStatus: 'partial',
    bookingStatus: 'confirmed',
    createdAt: '2024-02-05'
  },
  {
    id: '6',
    bookingId: 'BK006',
    customerName: 'Meera Joshi',
    customerEmail: 'meera.joshi@example.com',
    customerPhone: '+91 98765 43215',
    photographerName: 'Nikhil Desai',
    category: 'Pet Photography',
    subcategory: 'Pet Portrait',
    packageType: 'Fixed',
    packageName: 'Basic Package',
    bookingDate: '2024-02-08',
    eventDate: '2024-02-18',
    eventTime: '3:00 PM',
    location: 'Pune, Maharashtra',
    duration: '2 Hours',
    totalAmount: 8000,
    advanceAmount: 8000,
    remainingAmount: 0,
    paymentStatus: 'paid',
    bookingStatus: 'completed',
    createdAt: '2024-02-08'
  },
  {
    id: '7',
    bookingId: 'BK007',
    customerName: 'Ananya Singh',
    customerEmail: 'ananya.singh@example.com',
    customerPhone: '+91 98765 43216',
    photographerName: 'Siddharth Rao',
    category: 'Wedding',
    subcategory: 'Destination Wedding',
    packageType: 'Individual',
    packageName: 'Platinum Package',
    bookingDate: '2024-01-30',
    eventDate: '2024-03-10',
    eventTime: '9:00 AM',
    location: 'Udaipur, Rajasthan',
    duration: '2 Days',
    totalAmount: 150000,
    advanceAmount: 0,
    remainingAmount: 150000,
    paymentStatus: 'pending',
    bookingStatus: 'cancelled',
    createdAt: '2024-01-30'
  },
  {
    id: '8',
    bookingId: 'BK008',
    customerName: 'Kabir Kapoor',
    customerEmail: 'kabir.kapoor@example.com',
    customerPhone: '+91 98765 43217',
    photographerName: 'Rohan Sharma',
    category: 'Corporate',
    subcategory: 'Product Photography',
    packageType: 'Fixed',
    packageName: 'Premium Package',
    bookingDate: '2024-02-10',
    eventDate: '2024-02-22',
    eventTime: '10:00 AM',
    location: 'Delhi NCR',
    duration: '3 Hours',
    totalAmount: 15000,
    advanceAmount: 7500,
    remainingAmount: 7500,
    paymentStatus: 'partial',
    bookingStatus: 'confirmed',
    createdAt: '2024-02-10'
  }
];

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab="bookings" onTabChange={(tab) => window.location.href = `/${tab}`} />
      <div className="pt-16 transition-all duration-300 p-4 md:p-8">
        <BookingManagement bookings={bookings} setBookings={setBookings} />
      </div>
    </div>
  );
}

