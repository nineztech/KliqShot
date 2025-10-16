'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import BookingPage from '@/components/bookingSession';

function BookingContent() {
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

export default function Booking() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}
