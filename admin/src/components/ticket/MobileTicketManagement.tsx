'use client';

import { useState } from 'react';
import { 
  MdClose,
  MdSearch,
  MdAssignment,
  MdPerson,
  MdPhone,
  MdEmail,
  MdCalendarToday,
  MdInfo,
  MdExpandMore,
  MdChevronRight
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

interface MobileTicketManagementProps {
  tickets: Ticket[];
  setTickets: (tickets: Ticket[]) => void;
}

export default function MobileTicketManagement({ tickets, setTickets }: MobileTicketManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [expandedTickets, setExpandedTickets] = useState<string[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignmentCandidate, setAssignmentCandidate] = useState('');

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
      raisedBy: 'Arjun Singh',
      userType: 'photographer',
      userEmail: 'arjun.singh@example.com',
      userPhone: '+91 98765 43211',
      subject: 'Payment not received',
      description: 'I have not received payment for my last booking. Please check.',
      priority: 'urgent',
      status: 'in_progress',
      assignedTo: 'John Smith',
      category: 'payment',
      createdAt: '2024-02-19 02:15 PM',
      updatedAt: '2024-02-19 03:00 PM'
    },
    {
      id: '3',
      ticketId: 'TCK-003',
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
    {
      id: '4',
      ticketId: 'TCK-004',
      raisedBy: 'Vikram Patel',
      userType: 'photographer',
      userEmail: 'vikram.patel@example.com',
      userPhone: '+91 98765 43213',
      subject: 'Account verification issue',
      description: 'My account verification is pending for last 3 days. Please help.',
      priority: 'high',
      status: 'resolved',
      assignedTo: 'Sarah Johnson',
      category: 'account',
      createdAt: '2024-02-18 11:20 AM',
      updatedAt: '2024-02-19 10:00 AM',
      resolvedAt: '2024-02-19 10:00 AM'
    }
  ];

  const [allTickets, setAllTickets] = useState<Ticket[]>(sampleTickets);

  const filteredTickets = allTickets.filter(ticket => {
    const matchesSearch = searchQuery === '' || 
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.ticketId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.raisedBy.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const toggleTicketExpansion = (ticketId: string) => {
    setExpandedTickets(prev => 
      prev.includes(ticketId) 
        ? prev.filter(id => id !== ticketId)
        : [...prev, ticketId]
    );
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
    <div className="max-w-full">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Tickets</h1>
        <p className="text-sm text-gray-600">Manage support tickets</p>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-3 mb-4">
        <div className="grid grid-cols-2 gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-sm px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="text-sm px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-3">
        {filteredTickets.map((ticket) => (
          <div key={ticket.id} className="bg-white rounded-lg shadow-sm p-4">
            <button
              onClick={() => toggleTicketExpansion(ticket.id)}
              className="w-full flex items-center justify-between mb-3"
            >
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-900">{ticket.ticketId}</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                    {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                  </span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-900 font-medium">{ticket.subject}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {ticket.raisedBy} • {ticket.userType}
                </p>
              </div>
              {expandedTickets.includes(ticket.id) ? (
                <MdExpandMore className="w-5 h-5 text-gray-400" />
              ) : (
                <MdChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {/* Expanded Details */}
            {expandedTickets.includes(ticket.id) && (
              <div className="pt-3 space-y-3 border-t border-gray-200">
                <div>
                  <label className="text-xs font-medium text-gray-500">Description</label>
                  <p className="text-sm text-gray-900 mt-1">{ticket.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-500">Category</label>
                    <p className="text-sm text-gray-900 capitalize">{ticket.category}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">Created</label>
                    <p className="text-sm text-gray-900">{ticket.createdAt}</p>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500">Assigned To</label>
                  <div className="mt-1">
                    {ticket.assignedTo ? (
                      <p className="text-sm text-gray-900">{ticket.assignedTo}</p>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedTicket(ticket);
                          setShowAssignModal(true);
                        }}
                        className="text-sm text-purple-600 hover:text-purple-800 flex items-center gap-1"
                      >
                        <MdAssignment className="w-4 h-4" />
                        Assign to team
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500">Status</label>
                  <select
                    value={ticket.status}
                    onChange={(e) => handleStatusChange(ticket.id, e.target.value as any)}
                    className="w-full mt-1 text-sm px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setSelectedTicket(ticket);
                    setShowTicketModal(true);
                  }}
                  className="w-full text-center text-sm text-blue-600 hover:text-blue-800 py-2"
                >
                  View Full Details
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredTickets.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">No tickets found</p>
        </div>
      )}

      {/* Ticket Details Modal */}
      {showTicketModal && selectedTicket && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-900">{selectedTicket.ticketId}</h2>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedTicket.status)}`}>
                    {selectedTicket.status.charAt(0).toUpperCase() + selectedTicket.status.slice(1)}
                  </span>
                </div>
                <button
                  onClick={() => setShowTicketModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <MdClose className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 space-y-4">
                {/* User Information */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <MdPerson className="w-4 h-4 text-purple-600" />
                    User Information
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs font-medium text-gray-500">Name</label>
                      <p className="text-sm text-gray-900">{selectedTicket.raisedBy}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 flex items-center gap-1">
                        <MdEmail className="w-3 h-3" />
                        Email
                      </label>
                      <p className="text-sm text-gray-900">{selectedTicket.userEmail}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 flex items-center gap-1">
                        <MdPhone className="w-3 h-3" />
                        Phone
                      </label>
                      <p className="text-sm text-gray-900">{selectedTicket.userPhone}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">User Type</label>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getUserTypeColor(selectedTicket.userType)}`}>
                        {selectedTicket.userType.charAt(0).toUpperCase() + selectedTicket.userType.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ticket Details */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <MdInfo className="w-4 h-4 text-purple-600" />
                    Ticket Details
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs font-medium text-gray-500">Subject</label>
                      <p className="text-sm text-gray-900 mt-1">{selectedTicket.subject}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">Category</label>
                      <p className="text-sm text-gray-900 mt-1 capitalize">{selectedTicket.category}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">Description</label>
                      <p className="text-sm text-gray-900 mt-1">{selectedTicket.description}</p>
                    </div>
                  </div>
                </div>

                {/* Assignment Info */}
                {selectedTicket.assignedTo && (
                  <div className="bg-blue-50 rounded-lg p-3">
                    <h3 className="text-xs font-semibold text-gray-900 mb-1 flex items-center gap-2">
                      <MdAssignment className="w-3 h-3 text-blue-600" />
                      Assigned To
                    </h3>
                    <p className="text-sm text-blue-900">{selectedTicket.assignedTo}</p>
                  </div>
                )}

                {/* Timeline */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <MdCalendarToday className="w-4 h-4 text-purple-600" />
                    Timeline
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">Created:</span>
                      <span className="text-gray-900">{selectedTicket.createdAt}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">Updated:</span>
                      <span className="text-gray-900">{selectedTicket.updatedAt}</span>
                    </div>
                    {selectedTicket.resolvedAt && (
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">Resolved:</span>
                        <span className="text-gray-900">{selectedTicket.resolvedAt}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-4 py-3">
                <button
                  onClick={() => setShowTicketModal(false)}
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Ticket Modal */}
      {showAssignModal && selectedTicket && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Assign Ticket</h2>
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <MdClose className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4">
                <p className="text-sm text-gray-600 mb-4">
                  Assign ticket <span className="font-medium">{selectedTicket.ticketId}</span> to:
                </p>

                <div className="space-y-2">
                  {teamMembers.map((member) => (
                    <button
                      key={member}
                      onClick={() => handleAssignTicket(selectedTicket, member)}
                      className="w-full text-left px-3 py-2 rounded-lg border border-gray-300 hover:bg-purple-50 hover:border-purple-300 transition-colors text-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{member}</span>
                        <MdAssignment className="w-4 h-4 text-gray-400" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

