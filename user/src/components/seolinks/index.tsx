'use client';

import React from 'react';
import DesktopSEOLinks from './DesktopSEOLinks';
import MobileSEOLinks from './MobileSEOLinks';

const SEOLinks: React.FC = () => {
  return (
    <>
      {/* Desktop Version */}
      <div className="hidden md:block">
        <DesktopSEOLinks />
      </div>

      {/* Mobile Version */}
      <div className="block md:hidden">
        <MobileSEOLinks />
      </div>
    </>
  );
};

export default SEOLinks;

