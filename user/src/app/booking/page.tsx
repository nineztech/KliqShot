'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import BookingPage from '@/components/booking';

export default function Booking() {
  const searchParams = useSearchParams();
  const [bookingData, setBookingData] = useState({
    photographerId: '',
    photographerName: '',
    price: '',
    category: '',
    subcategory: ''
  });

  useEffect(() => {
    const photographerId = searchParams.get('photographerId') || '';
    const photographerName = searchParams.get('photographerName') || '';
    const price = searchParams.get('price') || '';
    const category = searchParams.get('category') || '';
    const subcategory = searchParams.get('subcategory') || '';

    setBookingData({
      photographerId,
      photographerName,
      price,
      category,
      subcategory
    });
  }, [searchParams]);

  return <BookingPage bookingData={bookingData} />;
}
