import PhotographerDetail from '@/components/photographer/detail';

interface PhotographerDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PhotographerDetailPage({ params }: PhotographerDetailPageProps) {
  const { id } = await params;
  return <PhotographerDetail photographerId={id} />;
}
