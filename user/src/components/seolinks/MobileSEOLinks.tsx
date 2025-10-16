'use client';

import React from 'react';

const MobileSEOLinks: React.FC = () => {
  const seoSections = [
    {
      title: "MOST SEARCHED FOR ON KLIQSHOT",
      links: [
        "Wedding Photographer Near Me", "Portrait Photography", "Family Photo Shoot", "Corporate Event Photography",
        "Engagement Photography", "Maternity Photography", "Newborn Photography", "Graduation Photography",
        "Pre Wedding Photography", "Post Wedding Photography", "Candid Photography", "Traditional Photography"
      ]
    },
    {
      title: "POPULAR PHOTOGRAPHY CATEGORIES",
      links: [
        "Wedding Photography", "Pre-Wedding Photography", "Candid Photography", "Traditional Photography",
        "Maternity Photography", "Baby Photography", "Birthday Photography", "Corporate Photography",
        "Event Photography", "Fashion Photography", "Product Photography", "Food Photography"
      ]
    },
    {
      title: "TOP CITIES FOR PHOTOGRAPHERS",
      links: [
        "Photographers in Delhi", "Photographers in Mumbai", "Photographers in Bangalore", "Photographers in Chennai",
        "Photographers in Kolkata", "Photographers in Hyderabad", "Photographers in Pune", "Photographers in Ahmedabad"
      ]
    },
    {
      title: "PHOTOGRAPHY SERVICES",
      links: [
        "Wedding Videography", "Drone Photography", "Photo Editing Services", "Album Design",
        "Candid Wedding Photography", "Traditional Wedding Photography", "Engagement Photography", "Reception Photography"
      ]
    },
    {
      title: "WEDDING PHOTOGRAPHY PACKAGES",
      links: [
        "Affordable Wedding Photography", "Luxury Wedding Photography", "Budget Wedding Photographers", "Premium Photography Packages",
        "Wedding Photography Deals", "Discounted Photography Services", "Best Wedding Photographers", "Top Rated Photographers"
      ]
    }
  ];

  return (
    <div className="bg-white py-6 px-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
        POPULAR PHOTOGRAPHY CATEGORIES
      </h2>
      
      <div className="space-y-3">
        {seoSections.map((section, index) => (
          <div key={index}>
            <h3 className="text-[10px] font-semibold text-gray-600 mb-2 uppercase">
              {section.title}
            </h3>
            <div className="flex flex-wrap gap-x-1 gap-y-1">
              {section.links.map((link, linkIndex) => (
                <React.Fragment key={linkIndex}>
                  <a 
                    href="#" 
                    className="text-[9px] text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    {link}
                  </a>
                  {linkIndex < section.links.length - 1 && (
                    <span className="text-[9px] text-gray-400">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Information */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="text-[10px] font-semibold text-gray-600 mb-2">ABOUT KLIQSHOT</h3>
        <p className="text-[9px] text-gray-500 leading-relaxed">
          KliqShot is India's leading photography and videography booking platform. We connect customers with professional photographers 
          for weddings, events, portraits, and commercial shoots. Book your photographer today and capture your memories beautifully.
        </p>
      </div>

      {/* Keywords for SEO */}
      <div className="mt-4">
        <p className="text-[8px] text-gray-400 leading-relaxed">
          Photography services, wedding photographers, event photography, professional photographers, candid photography, pre-wedding shoots, 
          videography services, photographer booking, photography packages, affordable photographers, best photographers
        </p>
      </div>
    </div>
  );
};

export default MobileSEOLinks;

