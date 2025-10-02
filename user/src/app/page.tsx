import Navbar from '@/components/navbar';
import VideoSection from '@/components/video/VideoSection';
import CategorySection from '@/components/category';
import AdvertisementSection from '@/components/advertisement';
import ProcessSection from '@/components/process';
import SEOSection from '@/components/seo';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto">
        {/* Video Section */}
        <div>
          <VideoSection />
        </div>
        
        {/* Category Section */}
        <div className="py-4">
          <CategorySection />
        </div>
        
        {/* Advertisement Section */}
        <div className="py-4">
          <AdvertisementSection />
        </div>
        
        {/* Process Section */}
        <div className="py-4">
          <ProcessSection />
        </div>
        
        {/* SEO Section */}
        <div className="py-4">
          <SEOSection />
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
