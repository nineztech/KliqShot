import { Suspense } from 'react';
import PhotographerDetail from '@/components/photographer/detail';
import { photographersData } from '@/data/photographers';

interface PhotographerDetailPageProps {
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
function PhotographerLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading photographer details...</p>
      </div>
    </div>
  );
}

export default async function PhotographerDetailPage({ params }: PhotographerDetailPageProps) {
  const { id } = await params;
  return (
    <Suspense fallback={<PhotographerLoading />}>
      <PhotographerDetail photographerId={id} />
    </Suspense>
  );
}
