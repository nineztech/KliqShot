'use client';

import Sidebar from '@/components/sidebar';
import TicketManagement from '@/components/ticket';
import { useState } from 'react';

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

export default function TicketsPage() {
  const [tickets] = useState<Ticket[]>([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab="tickets" onTabChange={(tab) => window.location.href = `/${tab}`} />
      <div className="pt-16 transition-all duration-300 p-4 md:p-8">
        <TicketManagement tickets={tickets} setTickets={(tickets) => {}} />
      </div>
    </div>
  );
}

