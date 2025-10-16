'use client';

import React from 'react';

const DesktopSEOLinks: React.FC = () => {
  const seoSections = [
    {
      title: "MOST SEARCHED FOR ON KLIQSHOT",
      links: [
        "Wedding Photographer Near Me", "Portrait Photography", "Family Photo Shoot", "Corporate Event Photography",
        "Engagement Photography", "Maternity Photography", "Newborn Photography", "Graduation Photography",
        "Pre Wedding Photography", "Post Wedding Photography", "Candid Photography", "Traditional Photography",
        "Outdoor Photography", "Studio Photography", "Event Photography", "Product Photography"
      ]
    },
    {
      title: "POPULAR PHOTOGRAPHY CATEGORIES",
      links: [
        "Wedding Photography", "Pre-Wedding Photography", "Candid Photography", "Traditional Photography",
        "Maternity Photography", "Baby Photography", "Birthday Photography", "Corporate Photography",
        "Event Photography", "Fashion Photography", "Product Photography", "Food Photography",
        "Real Estate Photography", "Portfolio Photography", "Family Photography", "Outdoor Photography"
      ]
    },
    {
      title: "TOP CITIES FOR PHOTOGRAPHERS",
      links: [
        "Photographers in Delhi", "Photographers in Mumbai", "Photographers in Bangalore", "Photographers in Chennai",
        "Photographers in Kolkata", "Photographers in Hyderabad", "Photographers in Pune", "Photographers in Ahmedabad",
        "Photographers in Jaipur", "Photographers in Lucknow", "Photographers in Chandigarh", "Photographers in Kochi",
        "Photographers in Indore", "Photographers in Nagpur", "Photographers in Surat", "Photographers in Bhopal"
      ]
    },
    {
      title: "PHOTOGRAPHY SERVICES",
      links: [
        "Wedding Videography", "Drone Photography", "Photo Editing Services", "Album Design",
        "Candid Wedding Photography", "Traditional Wedding Photography", "Engagement Photography", "Reception Photography",
        "Destination Wedding Photography", "Pre-Wedding Shoots", "Couple Photography", "Professional Photography",
        "Studio Photography", "Commercial Photography", "Documentary Photography", "Lifestyle Photography"
      ]
    },
    {
      title: "WEDDING PHOTOGRAPHY PACKAGES",
      links: [
        "Affordable Wedding Photography", "Luxury Wedding Photography", "Budget Wedding Photographers", "Premium Photography Packages",
        "Wedding Photography Deals", "Discounted Photography Services", "Best Wedding Photographers", "Top Rated Photographers",
        "Professional Wedding Photography", "Candid Wedding Packages", "Traditional Wedding Packages", "Complete Wedding Coverage",
        "Half Day Photography", "Full Day Photography", "Destination Wedding Packages", "Pre-Wedding Packages"
      ]
    },
    {
      title: "PHOTOGRAPHY BY OCCASION",
      links: [
        "Birthday Party Photography", "Anniversary Photography", "Baby Shower Photography", "Corporate Event Photography",
        "Conference Photography", "Seminar Photography", "Product Launch Photography", "Fashion Show Photography",
        "Concert Photography", "Sports Photography", "Graduation Photography", "Engagement Ceremony Photography",
        "Haldi Ceremony Photography", "Mehendi Ceremony Photography", "Sangeet Photography", "Reception Photography"
      ]
    },
    {
      title: "SPECIALIZED PHOTOGRAPHY",
      links: [
        "Maternity Shoot Packages", "Newborn Photography", "Kids Photography", "Family Portrait Photography",
        "Professional Headshots", "Portfolio Shoots", "Model Photography", "Fashion Portfolio",
        "Product Photography Services", "E-commerce Photography", "Food Photography Services", "Restaurant Photography",
        "Real Estate Photography Services", "Architecture Photography", "Interior Photography", "Commercial Property Photography"
      ]
    }
  ];

  return (
    <div className="bg-white -mt-8 py-8 px-6 rounded-lg shadow-sm">
      
      
       <div className="space-y-4">
        {seoSections.map((section, index) => (
          <div key={index}>
            <h3 className="text-xs font-semibold text-gray-600 mb-2 uppercase">
              {section.title}
            </h3>
             <div className="flex flex-wrap gap-x-1 gap-y-1">
              {section.links.map((link, linkIndex) => (
                <React.Fragment key={linkIndex}>
                  <a 
                    href="#" 
                    className="text-[10px] text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    {link}
                  </a>
                  {linkIndex < section.links.length - 1 && (
                    <span className="text-[10px] text-gray-400">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Information */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-xs font-semibold text-gray-600 mb-3">ABOUT KLIQSHOT</h3>
        <p className="text-[10px] text-gray-500 leading-relaxed">
          KliqShot is India's leading photography and videography booking platform. We connect customers with professional photographers 
          for weddings, events, portraits, and commercial shoots. With thousands of verified photographers across major cities, we offer 
          competitive pricing, quality assurance, and hassle-free booking. Whether you're looking for candid wedding photography, 
          traditional photography, pre-wedding shoots, or professional event coverage, KliqShot makes it easy to find and book the 
          perfect photographer for your special moments. Our platform features detailed photographer profiles, customer reviews, portfolio 
          galleries, and transparent pricing. Book your photographer today and capture your memories beautifully.
        </p>
      </div>

      {/* Keywords for SEO */}
      <div className="mt-6">
        <p className="text-[9px] text-gray-400 leading-relaxed">
          Photography services, wedding photographers, event photography, professional photographers, candid photography, pre-wedding shoots, 
          videography services, photo editing, album design, destination wedding photography, corporate photography, product photography, 
          fashion photography, maternity photography, baby photography, birthday photography, engagement photography, traditional photography, 
          photographer booking, photography packages, affordable photographers, best photographers, top rated photographers, professional photography, 
          photography deals, photography offers, book photographer online, hire photographer, photography near me
        </p>
      </div>
    </div>
  );
};

export default DesktopSEOLinks;

