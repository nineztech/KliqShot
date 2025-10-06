import PhotographerDetail from '@/components/photographer/detail';

interface PhotographerDetailPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    category?: string;
    subcategory?: string;
  }>;
}

export default async function PhotographerDetailPage({ params, searchParams }: PhotographerDetailPageProps) {
  const { id } = await params;
  const { category, subcategory } = await searchParams;
  return <PhotographerDetail photographerId={id} category={category} subcategory={subcategory} />;
}
