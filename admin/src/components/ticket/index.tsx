'use client';

import { useState, useEffect } from 'react';
import DesktopTicketManagement from './DesktopTicketManagement';
import MobileTicketManagement from './MobileTicketManagement';
import { useSidebar } from '@/components/sidebar/SidebarContext';

interface Ticket {
  id: string;
  ticketId: string;
  raisedBy: string;
  userType: 'client' | 'photographer' | 'admin';
  userEmail: string;
  userPhone: string;
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  assignedTo?: string;
  category: 'technical' | 'booking' | 'payment' | 'account' | 'other';
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  resolution?: string;
}

interface TicketManagementProps {
  tickets: Ticket[];
  setTickets: (tickets: Ticket[]) => void;
}

export default function TicketManagement({ tickets, setTickets }: TicketManagementProps) {
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
        <MobileTicketManagement tickets={tickets} setTickets={setTickets} />
      ) : (
        <DesktopTicketManagement tickets={tickets} setTickets={setTickets} />
      )}
    </div>
  );
}

export type { Ticket };

