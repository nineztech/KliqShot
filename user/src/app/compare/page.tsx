'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useCompare } from '@/components/compare/CompareContext';
import { CheckCircleIcon, XCircleIcon, StarIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function ComparePage() {
  const { selected } = useCompare();
  const router = useRouter();
  const [showRatingHover, setShowRatingHover] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  const columns = useMemo(() => selected.slice(0, 3), [selected]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (columns.length < 2) {
      router.push('/');
    }
  }, [columns.length, router]);

  if (columns.length < 2) {
    return null;
  }

  // Generate project counts based on photographer ID
  const getProjectsDone = (id: number) => {
    const baseProjects = [
      { category: 'Wedding', count: 25 },
      { category: 'Pre-Wedding', count: 38 },
      { category: 'Events', count: 30 },
      { category: 'Maternity', count: 45 },
      { category: 'Portrait', count: 52 },
      { category: 'Family', count: 18 }
    ];
    
    // Vary counts based on photographer ID for uniqueness
    const variation = id % 10;
    return baseProjects.map((p, index) => ({
      ...p,
      count: p.count + (variation * (index + 1)) - (variation * 2)
    })).filter(p => p.count > 0);
  };

  // Generate awards based on photographer ID
  const getAwards = (id: number) => {
    const allAwards = [
      'Best Wedding Photographer 2023',
      'Excellence in Portrait Photography',
      'National Photography Award',
      'Top 10 Event Photographers',
      'Creative Photography Excellence',
      'Client Choice Award 2022',
      'International Photography Recognition',
      'Outstanding Maternity Photography'
    ];
    
    const variation = id % 8;
    const count = 3 + (variation % 4);
    const startIndex = variation % (allAwards.length - count + 1);
    return allAwards.slice(startIndex, startIndex + count);
  };

  // Generate certificates based on photographer ID
  const getCertificates = (id: number) => {
    const allCertificates = [
      'Professional Photography Certification',
      'Advanced Lighting Techniques',
      'Portrait Photography Mastery',
      'Wedding Photography Specialist',
      'Adobe Certified Expert',
      'Canon Professional Services',
      'Event Photography Certification',
      'Post-Processing Excellence'
    ];
    
    const variation = id % 7;
    const count = 2 + (variation % 3);
    const startIndex = variation % (allCertificates.length - count + 1);
    return allCertificates.slice(startIndex, startIndex + count);
  };

  // Generate team size based on photographer ID
  const getTeamSize = (id: number) => {
    const baseSize = 5;
    const variation = id % 10;
    return baseSize + (variation % 8);
  };

  // Generate realistic rating breakdown based on overall rating
  const generateRatingBreakdown = (rating: number, reviews: number) => {
    const totalReviews = reviews;
    const breakdown = [0, 0, 0, 0, 0]; // 1-star to 5-star counts
    
    // Distribute reviews based on rating
    if (rating >= 4.5) {
      breakdown[4] = Math.floor(totalReviews * 0.6); // 60% 5-star
      breakdown[3] = Math.floor(totalReviews * 0.25); // 25% 4-star
      breakdown[2] = Math.floor(totalReviews * 0.1);  // 10% 3-star
      breakdown[1] = Math.floor(totalReviews * 0.03); // 3% 2-star
      breakdown[0] = totalReviews - breakdown[4] - breakdown[3] - breakdown[2] - breakdown[1]; // Remaining 1-star
    } else if (rating >= 4.0) {
      breakdown[4] = Math.floor(totalReviews * 0.45); // 45% 5-star
      breakdown[3] = Math.floor(totalReviews * 0.35); // 35% 4-star
      breakdown[2] = Math.floor(totalReviews * 0.15); // 15% 3-star
      breakdown[1] = Math.floor(totalReviews * 0.03); // 3% 2-star
      breakdown[0] = totalReviews - breakdown[4] - breakdown[3] - breakdown[2] - breakdown[1]; // Remaining 1-star
    } else if (rating >= 3.5) {
      breakdown[4] = Math.floor(totalReviews * 0.3);  // 30% 5-star
      breakdown[3] = Math.floor(totalReviews * 0.35); // 35% 4-star
      breakdown[2] = Math.floor(totalReviews * 0.25); // 25% 3-star
      breakdown[1] = Math.floor(totalReviews * 0.07); // 7% 2-star
      breakdown[0] = totalReviews - breakdown[4] - breakdown[3] - breakdown[2] - breakdown[1]; // Remaining 1-star
    } else {
      breakdown[4] = Math.floor(totalReviews * 0.2);  // 20% 5-star
      breakdown[3] = Math.floor(totalReviews * 0.25); // 25% 4-star
      breakdown[2] = Math.floor(totalReviews * 0.3);  // 30% 3-star
      breakdown[1] = Math.floor(totalReviews * 0.15); // 15% 2-star
      breakdown[0] = totalReviews - breakdown[4] - breakdown[3] - breakdown[2] - breakdown[1]; // Remaining 1-star
    }
    
    return breakdown;
  };

  const rows: { key: string; label: string; render: (i: number) => React.ReactNode }[] = [
    { key: 'specialty', label: 'Specialty', render: (i) => columns[i]?.specialty },
    // { key: 'price', label: 'Price', render: (i) => columns[i]?.price },
    { key: 'rating', label: 'Rating', render: (i) => {
      const photographer = columns[i];
      if (!photographer) return null;
      const ratingBreakdown = generateRatingBreakdown(photographer.rating, photographer.reviews);
      
      return (
        <div 
          className="relative flex items-center gap-1 cursor-pointer"
          onMouseEnter={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setHoverPosition({
              x: rect.left,
              y: rect.top - 10
            });
            setShowRatingHover(i);
          }}
          onMouseLeave={() => setShowRatingHover(null)}
        >
          <span className="font-medium">{photographer.rating}</span>
          <StarIcon className="w-4 h-4 text-yellow-400" />
          <span className="text-gray-500 text-sm">({photographer.reviews})</span>
          
          {/* Rating Hover Component - Portal */}
          {showRatingHover === i && isMounted && createPortal(
            <div 
              className="fixed bg-white border border-gray-200 rounded-lg shadow-xl p-3 w-64 z-[999999] backdrop-blur-sm"
              style={{ 
                left: `${hoverPosition.x}px`,
                top: `${hoverPosition.y}px`,
                transform: 'translateY(-100%)'
              }}
              onMouseEnter={() => setShowRatingHover(i)}
              onMouseLeave={() => setShowRatingHover(null)}
            >
              {/* Overall Rating */}
              <div className="flex items-center mb-2.5">
                <span className="text-base font-semibold text-gray-900 mr-1">{photographer.rating}</span>
                <StarIcon className="w-4 h-4 text-yellow-400" />
                <span className="text-xs text-gray-600 ml-2">{photographer.reviews} Ratings & Reviews</span>
              </div>
              
              {/* Star Breakdown */}
              <div className="space-y-1.5">
                {[5, 4, 3, 2, 1].map((star, index) => {
                  const count = ratingBreakdown[4 - index];
                  const percentage = photographer.reviews > 0 ? (count / photographer.reviews) * 100 : 0;
                  const barColor = star >= 4 ? 'bg-green-500' : star >= 3 ? 'bg-yellow-500' : 'bg-red-500';
                  
                  return (
                    <div key={star} className="flex items-center space-x-2">
                      <span className="text-xs text-gray-700 font-medium w-4">{star}★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${barColor} transition-all duration-300`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600 w-8 text-right font-medium">{count}</span>
                    </div>
                  );
                })}
              </div>
              
              {/* Arrow pointing down */}
              <div className="absolute top-full left-4 border-4 border-transparent border-t-white"></div>
            </div>,
            document.body
          )}
        </div>
      );
    } },
    { key: 'location', label: 'Location', render: (i) => columns[i]?.location },
    { key: 'experience', label: 'Experience', render: (i) => columns[i]?.experience },
    { key: 'category', label: 'Primary Category', render: (i) => columns[i]?.category },
    { key: 'categories', label: 'Tags', render: (i) => (
      <div className="flex flex-wrap gap-1">
        {(columns[i]?.categories || []).map((c) => (
          <span key={c} className="px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200 text-xs text-gray-700">{c}</span>
        ))}
      </div>
    ) },
    { key: 'awards', label: 'Awards', render: (i) => {
      const photographer = columns[i];
      if (!photographer) return null;
      const awards = getAwards(photographer.id);
      
      return (
        <div className="space-y-1">
          {awards.map((award) => (
            <div key={award} className="flex items-center gap-1.5 text-sm">
              <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">{award}</span>
            </div>
          ))}
        </div>
      );
    } },
    { key: 'certificates', label: 'Certificates', render: (i) => {
      const photographer = columns[i];
      if (!photographer) return null;
      const certificates = getCertificates(photographer.id);
      
      return (
        <div className="space-y-1">
          {certificates.map((certificate) => (
            <div key={certificate} className="flex items-center gap-1.5 text-sm">
              <CheckCircleIcon className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span className="text-gray-700">{certificate}</span>
            </div>
          ))}
        </div>
      );
    } },
    { key: 'teamSize', label: 'Team Size', render: (i) => {
      const photographer = columns[i];
      if (!photographer) return null;
      const teamSize = getTeamSize(photographer.id);
      
      return (
        <div className="flex items-center gap-1.5 text-sm">
          <span className="font-medium text-gray-900">{teamSize}</span>
          <span className="text-gray-600">members</span>
        </div>
      );
    } },
    { key: 'projects', label: 'Projects Done', render: (i) => {
      const photographer = columns[i];
      if (!photographer) return null;
      const projects = getProjectsDone(photographer.id);
      
      return (
        <div className="space-y-0.5">
          {projects.map((project) => (
            <div key={project.category} className="flex items-center justify-between text-sm">
              <span className="text-gray-700">{project.category}</span>
              <span className="font-medium text-gray-900">{project.count}</span>
            </div>
          ))}
        </div>
      );
    } },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Go back"
            >
              <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Compare Photographers</h1>
          </div>
          <p className="text-gray-600 mt-2">Choose the best by comparing up to 4 photographers side by side.</p>
        </div>

        {/* Comparison grid */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="grid" style={{ gridTemplateColumns: `260px repeat(${columns.length}, minmax(0, 1fr))` }}>
            {/* Image row aligned with detail columns */}
            <div className="bg-white p-3 border-b border-gray-200" />
            {columns.map((p, i) => (
              <div key={`img-${p.id}`} className={`bg-white p-3 border-b border-gray-200 ${i > 0 ? 'border-l border-gray-200' : ''}`}>
                <div className="aspect-[4/3] w-full overflow-hidden rounded-md">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
              </div>
            ))}

            <div className="bg-gray-50 p-3 font-semibold text-gray-900 border-b border-gray-200">RFQ Overview</div>
            {columns.map((_, i) => (
              <div key={i} className={`bg-gray-50 p-3 font-semibold text-gray-900 border-b border-gray-200 ${i > 0 ? 'border-l border-gray-200' : ''}`}>&nbsp;</div>
            ))}

            {rows.map((row) => (
              <React.Fragment key={`row-${row.key}`}>
                <div className="p-3 border-t border-gray-200 bg-gray-50 text-sm font-medium text-gray-700">
                  {row.label}
                </div>
                {columns.map((_, i) => (
                  <div key={`${row.key}-${i}`} className={`p-3 border-t border-gray-200 text-sm text-gray-800 ${i > 0 ? 'border-l border-gray-200' : ''}`}>
                    {row.render(i)}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}


