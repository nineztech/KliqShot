'use client';

import { useState } from 'react';
import { 
  MdClose,
  MdFilterList,
  MdSearch,
  MdAssignment,
  MdPerson,
  MdPhone,
  MdEmail,
  MdCalendarToday,
  MdInfo,
  MdCheckCircle,
  MdCancel,
  MdPlayArrow,
  MdEdit,
  MdDelete,
  MdPeople,
  MdCameraAlt,
  MdLockOpen,
  MdPending,
  MdLock
} from 'react-icons/md';

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

interface DesktopTicketManagementProps {
  tickets: Ticket[];
  setTickets: (tickets: Ticket[]) => void;
}

type ParentTabType = 'client' | 'photographer';
type SubTabType = 'open' | 'pending' | 'closed';

export default function DesktopTicketManagement({ tickets, setTickets }: DesktopTicketManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeParentTab, setActiveParentTab] = useState<ParentTabType>('client');
  const [activeSubTab, setActiveSubTab] = useState<SubTabType>('open');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [assignmentCandidate, setAssignmentCandidate] = useState('');
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Sample team members
  const teamMembers = [
    'John Smith', 
    'Sarah Johnson', 
    'Mike Wilson', 
    'Emily Davis',
    'David Brown'
  ];

  // Sample ticket data
  const sampleTickets: Ticket[] = [
    // Client Tickets - Open
    {
      id: '1',
      ticketId: 'TCK-001',
      raisedBy: 'Rajesh Kumar',
      userType: 'client',
      userEmail: 'rajesh.kumar@example.com',
      userPhone: '+91 98765 43210',
      subject: 'Unable to upload photos',
      description: 'I am unable to upload photos for my event. The upload button is not working.',
      priority: 'high',
      status: 'open',
      category: 'technical',
      createdAt: '2024-02-20 10:30 AM',
      updatedAt: '2024-02-20 10:30 AM'
    },
    {
      id: '2',
      ticketId: 'TCK-002',
      raisedBy: 'Priya Sharma',
      userType: 'client',
      userEmail: 'priya.sharma@example.com',
      userPhone: '+91 98765 43212',
      subject: 'Booking cancellation request',
      description: 'I need to cancel my booking due to personal reasons. Please process refund.',
      priority: 'medium',
      status: 'open',
      category: 'booking',
      createdAt: '2024-02-20 08:00 AM',
      updatedAt: '2024-02-20 08:00 AM'
    },
    // Client Tickets - Pending (in_progress)
    {
      id: '3',
      ticketId: 'TCK-003',
      raisedBy: 'Amit Verma',
      userType: 'client',
      userEmail: 'amit.verma@example.com',
      userPhone: '+91 98765 43214',
      subject: 'Refund processing delay',
      description: 'My refund is pending for 2 weeks. Please expedite.',
      priority: 'high',
      status: 'in_progress',
      assignedTo: 'Sarah Johnson',
      category: 'payment',
      createdAt: '2024-02-15 11:00 AM',
      updatedAt: '2024-02-18 09:00 AM'
    },
    // Client Tickets - Closed
    {
      id: '4',
      ticketId: 'TCK-004',
      raisedBy: 'Sneha Reddy',
      userType: 'client',
      userEmail: 'sneha.reddy@example.com',
      userPhone: '+91 98765 43215',
      subject: 'Photo delivery issue',
      description: 'Photos were not delivered on time. Issue resolved now.',
      priority: 'medium',
      status: 'resolved',
      assignedTo: 'John Smith',
      category: 'booking',
      createdAt: '2024-02-10 09:00 AM',
      updatedAt: '2024-02-11 03:00 PM',
      resolvedAt: '2024-02-11 03:00 PM'
    },
    {
      id: '5',
      ticketId: 'TCK-005',
      raisedBy: 'Rohit Malhotra',
      userType: 'client',
      userEmail: 'rohit.malhotra@example.com',
      userPhone: '+91 98765 43216',
      subject: 'Account login issue',
      description: 'Unable to access my account. Password reset not working.',
      priority: 'urgent',
      status: 'closed',
      assignedTo: 'Mike Wilson',
      category: 'account',
      createdAt: '2024-02-05 10:00 AM',
      updatedAt: '2024-02-06 02:00 PM',
      resolvedAt: '2024-02-06 02:00 PM'
    },
    // Photographer Tickets - Open
    {
      id: '6',
      ticketId: 'TCK-006',
      raisedBy: 'Arjun Singh',
      userType: 'photographer',
      userEmail: 'arjun.singh@example.com',
      userPhone: '+91 98765 43211',
      subject: 'Payment not received',
      description: 'I have not received payment for my last booking. Please check.',
      priority: 'urgent',
      status: 'open',
      category: 'payment',
      createdAt: '2024-02-20 02:15 PM',
      updatedAt: '2024-02-20 02:15 PM'
    },
    {
      id: '7',
      ticketId: 'TCK-007',
      raisedBy: 'Vikram Patel',
      userType: 'photographer',
      userEmail: 'vikram.patel@example.com',
      userPhone: '+91 98765 43213',
      subject: 'Equipment rental inquiry',
      description: 'Need to know about equipment rental options for upcoming event.',
      priority: 'low',
      status: 'open',
      category: 'other',
      createdAt: '2024-02-20 11:00 AM',
      updatedAt: '2024-02-20 11:00 AM'
    },
    // Photographer Tickets - Pending (in_progress)
    {
      id: '8',
      ticketId: 'TCK-008',
      raisedBy: 'Rahul Mehta',
      userType: 'photographer',
      userEmail: 'rahul.mehta@example.com',
      userPhone: '+91 98765 43217',
      subject: 'Profile update request',
      description: 'Need to update my portfolio photos and pricing.',
      priority: 'medium',
      status: 'in_progress',
      assignedTo: 'Emily Davis',
      category: 'account',
      createdAt: '2024-02-18 10:00 AM',
      updatedAt: '2024-02-19 09:00 AM'
    },
    {
      id: '9',
      ticketId: 'TCK-009',
      raisedBy: 'Karan Chopra',
      userType: 'photographer',
      userEmail: 'karan.chopra@example.com',
      userPhone: '+91 98765 43218',
      subject: 'Booking inquiry',
      description: 'Client wants to book me but payment gateway is not working.',
      priority: 'high',
      status: 'in_progress',
      assignedTo: 'David Brown',
      category: 'technical',
      createdAt: '2024-02-16 03:00 PM',
      updatedAt: '2024-02-17 10:00 AM'
    },
    // Photographer Tickets - Closed
    {
      id: '10',
      ticketId: 'TCK-010',
      raisedBy: 'Aditya Kumar',
      userType: 'photographer',
      userEmail: 'aditya.kumar@example.com',
      userPhone: '+91 98765 43219',
      subject: 'Account verification issue',
      description: 'My account verification was pending. Now completed.',
      priority: 'high',
      status: 'resolved',
      assignedTo: 'Sarah Johnson',
      category: 'account',
      createdAt: '2024-02-10 11:20 AM',
      updatedAt: '2024-02-12 10:00 AM',
      resolvedAt: '2024-02-12 10:00 AM'
    },
    {
      id: '11',
      ticketId: 'TCK-011',
      raisedBy: 'Nikhil Desai',
      userType: 'photographer',
      userEmail: 'nikhil.desai@example.com',
      userPhone: '+91 98765 43220',
      subject: 'Payment reconciliation',
      description: 'Payment amounts not matching with bookings. Issue resolved.',
      priority: 'medium',
      status: 'closed',
      assignedTo: 'John Smith',
      category: 'payment',
      createdAt: '2024-02-05 09:00 AM',
      updatedAt: '2024-02-06 04:00 PM',
      resolvedAt: '2024-02-06 04:00 PM'
    }
  ];

  const [allTickets, setAllTickets] = useState<Ticket[]>(sampleTickets);

  // Filter tickets based on parent tab (userType) and sub tab (status)
  const filteredTickets = allTickets.filter(ticket => {
    // Match parent tab (userType)
    const matchesParentTab = 
      (activeParentTab === 'client' && ticket.userType === 'client') ||
      (activeParentTab === 'photographer' && ticket.userType === 'photographer');

    // Match sub tab (status)
    let matchesSubTab = false;
    if (activeSubTab === 'open') {
      matchesSubTab = ticket.status === 'open';
    } else if (activeSubTab === 'pending') {
      matchesSubTab = ticket.status === 'in_progress';
    } else if (activeSubTab === 'closed') {
      matchesSubTab = ticket.status === 'resolved' || ticket.status === 'closed';
    }

    // Match search query
    const matchesSearch = searchQuery === '' || 
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.ticketId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.raisedBy.toLowerCase().includes(searchQuery.toLowerCase());

    // Match priority and category filters
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    const matchesCategory = filterCategory === 'all' || ticket.category === filterCategory;

    return matchesParentTab && matchesSubTab && matchesSearch && matchesPriority && matchesCategory;
  });

  // Get counts for each sub tab
  const subTabCounts = {
    open: allTickets.filter(t => 
      t.userType === activeParentTab && t.status === 'open'
    ).length,
    pending: allTickets.filter(t => 
      t.userType === activeParentTab && t.status === 'in_progress'
    ).length,
    closed: allTickets.filter(t => 
      t.userType === activeParentTab && (t.status === 'resolved' || t.status === 'closed')
    ).length,
  };

  const handleAssignTicket = (ticket: Ticket, teamMember: string) => {
    setAllTickets(tickets => 
      tickets.map(t => 
        t.id === ticket.id 
          ? { ...t, assignedTo: teamMember, status: 'in_progress' as const }
          : t
      )
    );
    setShowAssignModal(false);
  };

  const handleStatusChange = (ticketId: string, newStatus: 'open' | 'in_progress' | 'resolved' | 'closed') => {
    setAllTickets(tickets => 
      tickets.map(t => 
        t.id === ticketId 
          ? { 
              ...t, 
              status: newStatus,
              updatedAt: new Date().toLocaleString(),
              ...(newStatus === 'resolved' || newStatus === 'closed' ? { resolvedAt: new Date().toLocaleString() } : {})
            }
          : t
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUserTypeColor = (userType: string) => {
    switch (userType) {
      case 'client': return 'bg-purple-100 text-purple-800';
      case 'photographer': return 'bg-blue-100 text-blue-800';
      case 'admin': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* Section 1: Header + Search */}
      <div className="admin-card">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Ticket Management</h2>
            <p className="text-gray-600 text-sm mt-1">Track and manage all support tickets from clients and photographers</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative w-80">
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Parent Tabs + Sub Tabs + Content */}
      <div className="admin-card">
        {/* Parent Tabs */}
        <div className="border-b border-gray-200 mb-4">
          <div className="flex space-x-8">
            <button
              onClick={() => {
                setActiveParentTab('client');
                setActiveSubTab('open'); // Reset to open when switching parent tabs
              }}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeParentTab === 'client'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <MdPeople className="w-4 h-4" />
                Client Tickets
              </div>
            </button>

            <button
              onClick={() => {
                setActiveParentTab('photographer');
                setActiveSubTab('open'); // Reset to open when switching parent tabs
              }}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeParentTab === 'photographer'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <MdCameraAlt className="w-4 h-4" />
                Photographer Tickets
              </div>
            </button>
          </div>
        </div>

        {/* Sub Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveSubTab('open')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeSubTab === 'open'
                  ? activeParentTab === 'client' ? 'border-blue-500 text-blue-600' : 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <MdLockOpen className="w-4 h-4" />
                Open
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  activeSubTab === 'open'
                    ? activeParentTab === 'client' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {subTabCounts.open}
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveSubTab('pending')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeSubTab === 'pending'
                  ? activeParentTab === 'client' ? 'border-orange-500 text-orange-600' : 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <MdPending className="w-4 h-4" />
                Pending
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  activeSubTab === 'pending'
                    ? activeParentTab === 'client' ? 'bg-orange-100 text-orange-700' : 'bg-pink-100 text-pink-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {subTabCounts.pending}
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveSubTab('closed')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeSubTab === 'closed'
                  ? activeParentTab === 'client' ? 'border-green-500 text-green-600' : 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <MdLock className="w-4 h-4" />
                Closed
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  activeSubTab === 'closed'
                    ? activeParentTab === 'client' ? 'bg-green-100 text-green-700' : 'bg-teal-100 text-teal-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {subTabCounts.closed}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="admin-input"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="admin-input"
          >
            <option value="all">All Categories</option>
            <option value="technical">Technical</option>
            <option value="booking">Booking</option>
            <option value="payment">Payment</option>
            <option value="account">Account</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Content - Table */}
        {filteredTickets.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-sm mb-2">No tickets found</div>
            <p className="text-gray-500 text-sm">
              No {activeSubTab} tickets found for {activeParentTab === 'client' ? 'clients' : 'photographers'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto overflow-y-auto" style={{ maxHeight: '580px' }}>
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-1.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Subject</th>
                  <th className="px-4 py-1.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Priority</th>
                  <th className="px-4 py-1.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-1.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Assigned To</th>
                  <th className="px-4 py-1.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Created</th>
                  <th className="px-4 py-1.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-4 py-1.5">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900">{ticket.subject}</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-gray-500">{ticket.ticketId}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{ticket.raisedBy}</span>
                          <span className={`inline-flex items-center px-1.5 py-0.5 text-xs font-semibold rounded-full ${getUserTypeColor(ticket.userType)}`}>
                            {ticket.userType.charAt(0).toUpperCase() + ticket.userType.slice(1)}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-1.5 whitespace-nowrap">
                      <span className={`inline-flex items-center px-1.5 py-0.5 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-1.5 whitespace-nowrap">
                      <select
                        value={ticket.status}
                        onChange={(e) => handleStatusChange(ticket.id, e.target.value as any)}
                        className={`text-xs font-semibold rounded-full px-2 py-1 border ${getStatusColor(ticket.status)}`}
                      >
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-4 py-1.5 whitespace-nowrap">
                      {ticket.assignedTo ? (
                        <span className="text-sm font-medium text-gray-900">{ticket.assignedTo}</span>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setShowAssignModal(true);
                          }}
                          className="text-sm text-purple-600 hover:text-purple-800 flex items-center gap-1"
                        >
                          <MdAssignment className="w-3 h-3" />
                          Assign
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-1.5 whitespace-nowrap">
                      <span className="text-xs text-gray-500">{ticket.createdAt}</span>
                    </td>
                    <td className="px-4 py-1.5 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedTicket(ticket);
                          setShowTicketModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors"
                        title="View Details"
                      >
                        <MdInfo className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Ticket Details Modal */}
      {showTicketModal && selectedTicket && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <h2 className="text-base font-semibold text-gray-900">{selectedTicket.ticketId}</h2>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedTicket.status)}`}>
                  {selectedTicket.status.charAt(0).toUpperCase() + selectedTicket.status.slice(1)}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(selectedTicket.priority)}`}>
                  {selectedTicket.priority.charAt(0).toUpperCase() + selectedTicket.priority.slice(1)}
                </span>
              </div>
              <button
                onClick={() => setShowTicketModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* User Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MdPerson className="w-5 h-5 text-purple-600" />
                  User Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Name</label>
                    <p className="text-sm text-gray-900">{selectedTicket.raisedBy}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <MdEmail className="w-4 h-4" />
                      Email
                    </label>
                    <p className="text-sm text-gray-900">{selectedTicket.userEmail}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <MdPhone className="w-4 h-4" />
                      Phone
                    </label>
                    <p className="text-sm text-gray-900">{selectedTicket.userPhone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">User Type</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getUserTypeColor(selectedTicket.userType)}`}>
                      {selectedTicket.userType.charAt(0).toUpperCase() + selectedTicket.userType.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Ticket Details */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MdInfo className="w-5 h-5 text-purple-600" />
                  Ticket Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Subject</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedTicket.subject}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Category</label>
                    <p className="text-sm text-gray-900 mt-1 capitalize">{selectedTicket.category}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Description</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedTicket.description}</p>
                  </div>
                </div>
              </div>

              {/* Assignment Info */}
              {selectedTicket.assignedTo && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <MdAssignment className="w-4 h-4 text-blue-600" />
                    Assigned To
                  </h3>
                  <p className="text-sm text-blue-900">{selectedTicket.assignedTo}</p>
                </div>
              )}

              {/* Timeline */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MdCalendarToday className="w-5 h-5 text-purple-600" />
                  Timeline
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Created:</span>
                    <span className="text-gray-900">{selectedTicket.createdAt}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Last Updated:</span>
                    <span className="text-gray-900">{selectedTicket.updatedAt}</span>
                  </div>
                  {selectedTicket.resolvedAt && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Resolved:</span>
                      <span className="text-gray-900">{selectedTicket.resolvedAt}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => setShowTicketModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Ticket Modal */}
      {showAssignModal && selectedTicket && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-base font-semibold text-gray-900">Assign Ticket</h2>
              <button
                onClick={() => setShowAssignModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                Assign ticket <span className="font-medium">{selectedTicket.ticketId}</span> to a team member:
              </p>

              <div className="space-y-2">
                {teamMembers.map((member) => (
                  <button
                    key={member}
                    onClick={() => handleAssignTicket(selectedTicket, member)}
                    className="w-full text-left px-4 py-3 rounded-lg border border-gray-300 hover:bg-purple-50 hover:border-purple-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{member}</span>
                      <MdAssignment className="w-5 h-5 text-gray-400" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

