import Navbar from '@/components/navbar';
import VideoSection from '@/components/video/VideoSection';
import AdvertisementSection from '@/components/advertisement';
import Footer from '@/components/footer';
import About from '@/components/About';
 
 
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
        
        <div className="py-4">
          <About />
        </div>
        
        {/* Advertisement Section */}
        <div className="py-4">
          <AdvertisementSection />
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
