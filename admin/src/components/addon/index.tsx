'use client';

import { useEffect, useState } from 'react';
import { useSidebar } from '@/components/sidebar/SidebarContext';
import DesktopAddOnManagement from './DesktopAddOnManagement';
import MobileAddOnManagement from './MobileAddOnManagement';

interface AddOnItem {
  id: string;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
}

interface AddOnManagementProps {
  addons: AddOnItem[];
  setAddons: (addons: AddOnItem[]) => void;
}

export default function AddOnManagement({ addons, setAddons }: AddOnManagementProps) {
  const [isMobile, setIsMobile] = useState(false);
  const { isMinimized } = useSidebar();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div
      className="transition-all duration-300"
      style={{ marginLeft: isMobile ? '0' : (isMinimized ? '5rem' : '16rem') }}
    >
      {isMobile ? (
        <MobileAddOnManagement addons={addons} setAddons={setAddons} />
      ) : (
        <DesktopAddOnManagement addons={addons} setAddons={setAddons} />
      )}
    </div>
  );
}


