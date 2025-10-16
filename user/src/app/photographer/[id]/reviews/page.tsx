import { Suspense } from 'react';
import { photographersData } from '@/data/photographers';
import ReviewsClient from './ReviewsClient';

interface ReviewsPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate static params for all photographer IDs
export async function generateStaticParams() {
  return photographersData.map((photographer) => ({
    id: photographer.id.toString(),
  }));
}

// Loading component for Suspense fallback
function ReviewsLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading reviews...</p>
      </div>
    </div>
  );
}

export default async function ReviewsPage({ params }: ReviewsPageProps) {
  const { id } = await params;
  return (
    <Suspense fallback={<ReviewsLoading />}>
      <ReviewsClient />
    </Suspense>
  );
}
