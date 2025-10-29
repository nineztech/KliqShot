'use client';

import Sidebar from '@/components/sidebar';
import LogManagement from '@/components/log';
import { useState } from 'react';

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

export default function LogsPage() {
  const [logs, setLogs] = useState<Log[]>([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab="logs" onTabChange={(tab) => window.location.href = `/${tab}`} />
      <div className="pt-16 transition-all duration-300 p-4 md:p-8">
        <LogManagement logs={logs} setLogs={setLogs} />
      </div>
    </div>
  );
}

