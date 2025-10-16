import Navbar from '@/components/navbar';
import HeroSection from '@/components/common/HeroSection';
import CategorySection from '@/components/category';
import AdvertisementSection from '@/components/advertisement';
import ProcessSection from '@/components/process';
import TopRatedPhotographers from '@/components/common/TopRatedPhotographers';
import SEOSection from '@/components/seo';
import Footer from '@/components/footer';
import HowSellerWorks from '@/components/sellerworks/index';
import DownloadApp from '@/components/downloadapp';
import SEOLinks from '@/components/seolinks';


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
   
      
      {/* Navbar */}
      <Navbar />
      
      {/* <HeroSection /> */}

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto">
        <div >
          <HeroSection/>
        </div>

        {/* Category Section */}
        <div className="py-4">
          <CategorySection />
        </div>

        {/* Top Rated Photographer */}
        <div className='py-4'>
          <TopRatedPhotographers/>
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

        {/* How KliqChamp Works Section */}
        <div>
          <HowSellerWorks/>
        </div>

        {/* Download App Section */}
        <div className="py-4">
          <DownloadApp />
        </div>

        {/* SEO Links Section */}
        <div className="py-4">
          <SEOLinks />
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
