'use client';

import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import PhotographerGrid from '@/components/photographer';
import Footer from '@/components/footer';
import { getPhotographersByCategory, Photographer } from '@/data/photographers';

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  
  const categoryName = params.categoryName as string;
  const displayCategoryName = categoryName?.charAt(0).toUpperCase() + categoryName?.slice(1);
  
  // Get photographers directly without loading state for instant display
  const photographers = categoryName ? getPhotographersByCategory(displayCategoryName) : [];

  const handlePhotographerClick = (photographer: Photographer) => {
    router.push(`/photographer/${photographer.id}`);
  };

  const handleBackClick = () => {
    router.back();
  };


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="py-4 px-4">
          <button
            onClick={handleBackClick}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Categories
          </button>
        </div>

        {/* Category Content */}
        <div className="py-4">
          {photographers.length > 0 ? (
            <PhotographerGrid
              photographers={photographers}
              categoryName={displayCategoryName}
              onPhotographerClick={handlePhotographerClick}
            />
          ) : (
            <div className="px-4">
              <div className="text-center py-16">
                <div className="mb-6">
                  <svg className="w-24 h-24 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h2 className="section-title section-title-desktop mb-4">No Photographers Found</h2>
                <p className="section-description section-description-desktop mb-8">
                  Sorry, we couldn't find any photographers in the {displayCategoryName} category.
                </p>
                <button
                  onClick={handleBackClick}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                  Browse Other Categories
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
