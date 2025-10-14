import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PortfolioHero() {
  const [showText, setShowText] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of background images
  const backgroundImages = [
    "https://mymodernmet.com/wp/wp-content/uploads/2020/02/online-photography-classes-thumbnail.jpg",
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1920&h=1080&fit=crop",
    "https://tse2.mm.bing.net/th/id/OIP.LdJQu-LoeYN24I9em3HnjgHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? backgroundImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-[24rem] lg:h-[28rem] xl:h-[32rem] overflow-hidden">
      {/* Background Images with transition */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={image}
              alt={`Background ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 grid md:grid-cols-2 h-full">
        {/* Left Side - Text Content */}
         
  <div className="flex items-center justify-center px-8 md:px-16 py-12">
  <div className="max-w-xl">
    <div
      className={`transform transition-all duration-1000 ease-out ${
        showText ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <p className="text-indigo-400 text-sm font-medium tracking-wider mb-4 uppercase">
        Welcome Back, Photographer!
      </p>
      <h1 className="text-white text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 leading-tight">
        Manage Your Bookings & Showcase Your Work
      </h1>
      <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed">
        Stay organized and grow your photography business — track bookings, upload your best shots,
        and connect with clients all in one place.
      </p>
      <div className="flex flex-wrap gap-4">
        <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all duration-300 hover:scale-105 text-sm md:text-base">
          Singup
        </button>
        <button className="px-6 py-2.5 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 text-sm md:text-base">
          Upload Portfolio
        </button>
      </div>
    </div>
  </div>
</div>




        {/* Right Side - Empty space for layout */}
        {/* <div className="relative"></div> */}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 right-8 flex space-x-4 z-20">
        <button 
          onClick={goToPrevious}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button 
          onClick={goToNext}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}