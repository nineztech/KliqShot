'use client';

import React from 'react';
import DesktopDownloadApp from './DesktopDownloadApp';
import MobileDownloadApp from './MobileDownloadApp';

const DownloadApp: React.FC = () => {
  return (
    <>
      {/* Desktop Version */}
      <div className="hidden md:block">
        <DesktopDownloadApp />
      </div>

      {/* Mobile Version */}
      <div className="block md:hidden">
        <MobileDownloadApp />
      </div>
    </>
  );
};

export default DownloadApp;

