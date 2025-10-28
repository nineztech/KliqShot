'use client';

import { useState, useEffect } from 'react';
import DesktopLogManagement from './DesktopLogManagement';
import MobileLogManagement from './MobileLogManagement';
import { useSidebar } from '@/components/sidebar/SidebarContext';

interface Log {
  id: string;
  logId: string;
  clientName: string;
  clientEmail: string;
  action: string;
  targetType: 'photographer' | 'package' | 'category' | 'booking' | 'other';
  targetName: string;
  timestamp: string;
  duration?: string;
  ipAddress?: string;
  device?: string;
}

interface LogManagementProps {
  logs: Log[];
  setLogs: (logs: Log[]) => void;
}

export default function LogManagement({ logs, setLogs }: LogManagementProps) {
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
        <MobileLogManagement logs={logs} setLogs={setLogs} />
      ) : (
        <DesktopLogManagement logs={logs} setLogs={setLogs} />
      )}
    </div>
  );
}

export type { Log };

