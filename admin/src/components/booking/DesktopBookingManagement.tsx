'use client';

import { useState, useMemo } from 'react';
import { 
  MdSearch,
  MdFilterList,
  MdVisibility,
  MdFileDownload,
  MdCheckCircle,
  MdCancel,
  MdPending,
  MdClose,
  MdCalendarToday,
  MdEvent,
  MdLocalShipping,
  MdHistory
} from 'react-icons/md';

interface Booking {
  id: string;
  bookingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  photographerName: string;
  category: string;
  subcategory: string;
  packageType: string;
  packageName: string;
  bookingDate: string;
  eventDate: string;
  eventTime: string;
  location: string;
  duration: string;
  totalAmount: number;
  advanceAmount: number;
  remainingAmount: number;
  paymentStatus: 'paid' | 'pending' | 'partial';
  bookingStatus: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  serviceStatus: 'today' | 'upcoming' | 'completed' | 'cancelled';
  deliveryStatus: 'pending' | 'delivered' | 'not_applicable';
  createdAt: string;
}

interface DesktopBookingManagementProps {
  bookings: Booking[];
  setBookings: (bookings: Booking[]) => void;
}

type TabType = 'today' | 'followup' | 'delivery' | 'advance';

export default function DesktopBookingManagement({ bookings, setBookings }: DesktopBookingManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('today');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowDetailModal(true);
  };

  const handleStatusChange = (bookingId: string, newStatus: 'confirmed' | 'pending' | 'cancelled' | 'completed') => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, bookingStatus: newStatus }
        : booking
    ));
  };

  // Helper function to check if event is today
  const isToday = (dateString: string) => {
    const today = new Date();
    const eventDate = new Date(dateString);
    return eventDate.toDateString() === today.toDateString();
  };

  // Helper function to check if event is tomorrow
  const isTomorrow = (dateString: string) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const eventDate = new Date(dateString);
    return eventDate.toDateString() === tomorrow.toDateString();
  };

  // Helper function to check if event is 2+ days ahead
  const isAdvanceBooking = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(dateString);
    eventDate.setHours(0, 0, 0, 0);
    const daysDifference = Math.floor((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysDifference >= 2;
  };

  // Filter bookings based on active tab
  const filteredBookings = useMemo(() => {
    let tabFilteredBookings = [...bookings];

    switch (activeTab) {
      case 'today':
        // Show today's orders (most recent first)
        tabFilteredBookings = bookings.filter(booking => 
          isToday(booking.eventDate) && booking.bookingStatus !== 'cancelled'
        ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'followup':
        // Show tomorrow's services
        tabFilteredBookings = bookings.filter(booking => 
          isTomorrow(booking.eventDate) && booking.bookingStatus !== 'cancelled'
        );
        break;
      case 'delivery':
        // Show orders where photo delivery is pending
        tabFilteredBookings = bookings.filter(booking => 
          booking.deliveryStatus === 'pending' && booking.bookingStatus === 'completed'
        );
        break;
      case 'advance':
        // Show bookings 2+ days ahead
        tabFilteredBookings = bookings.filter(booking => 
          isAdvanceBooking(booking.eventDate) && booking.bookingStatus !== 'cancelled'
        ).sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
        break;
    }

    // Apply search filter
    tabFilteredBookings = tabFilteredBookings.filter(booking => {
      const matchesSearch = 
        booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.photographerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPayment = paymentFilter === 'all' || booking.paymentStatus === paymentFilter;
      
      return matchesSearch && matchesPayment;
    });

    return tabFilteredBookings;
  }, [bookings, activeTab, searchTerm, paymentFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-red-100 text-red-800';
      case 'partial': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <MdCheckCircle className="w-4 h-4" />;
      case 'pending': return <MdPending className="w-4 h-4" />;
      case 'cancelled': return <MdCancel className="w-4 h-4" />;
      case 'completed': return <MdCheckCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  // Get counts for each tab
  const tabCounts = useMemo(() => {
    return {
      today: bookings.filter(b => isToday(b.eventDate) && b.bookingStatus !== 'cancelled').length,
      followup: bookings.filter(b => isTomorrow(b.eventDate) && b.bookingStatus !== 'cancelled').length,
      delivery: bookings.filter(b => b.deliveryStatus === 'pending' && b.bookingStatus === 'completed').length,
      advance: bookings.filter(b => isAdvanceBooking(b.eventDate) && b.bookingStatus !== 'cancelled').length,
    };
  }, [bookings]);

  return (
    <div className="space-y-4">
      {/* Section 1: Header + Search */}
      <div className="admin-card">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Booking Management</h2>
            <p className="text-gray-600 text-sm mt-1">Track and manage all bookings efficiently</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative w-80">
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by booking ID, customer, photographer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
              />
            </div>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="admin-input min-w-[140px]"
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="partial">Partial</option>
              <option value="pending">Pending</option>
            </select>
            <button className="admin-button-primary text-sm px-4 py-2 flex items-center shadow-sm hover:shadow-md transition-shadow whitespace-nowrap">
              <MdFileDownload className="w-4 h-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Section 2: Tabs + Content */}
      <div className="admin-card">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('today')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'today'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <MdCalendarToday className="w-4 h-4" />
                Today
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  activeTab === 'today' 
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tabCounts.today}
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('followup')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'followup'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <MdEvent className="w-4 h-4" />
                Follow-up
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  activeTab === 'followup' 
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tabCounts.followup}
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('delivery')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'delivery'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <MdLocalShipping className="w-4 h-4" />
                Delivery Pending
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  activeTab === 'delivery' 
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tabCounts.delivery}
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('advance')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'advance'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <MdHistory className="w-4 h-4" />
                Advance Booking
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  activeTab === 'advance' 
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tabCounts.advance}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Content - Table */}
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No bookings found</div>
            <p className="text-gray-500 text-sm">
              {activeTab === 'today' && "No bookings scheduled for today"}
              {activeTab === 'followup' && "No follow-ups scheduled for tomorrow"}
              {activeTab === 'delivery' && "No pending deliveries"}
              {activeTab === 'advance' && "No advance bookings found"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto overflow-y-auto" style={{ maxHeight: '580px' }}>
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-1.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Booking</th>
                  <th className="px-4 py-1.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-1.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Photographer</th>
                  <th className="px-4 py-1.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Service Details</th>
                  <th className="px-4 py-1.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Event Details</th>
                  <th className="px-4 py-1.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Payment</th>
                  <th className="px-4 py-1.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-4 py-1.5 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-blue-600">{booking.bookingId}</span>
                        <span className="text-xs text-gray-500">{booking.createdAt}</span>
                        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-semibold rounded-full mt-0.5 w-fit ${getStatusColor(booking.bookingStatus)}`}>
                          {getStatusIcon(booking.bookingStatus)}
                          {booking.bookingStatus}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-1.5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 relative">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-sm font-semibold shadow-md ring-1 ring-gray-200">
                            {booking.customerName.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="ml-2">
                          <div className="text-sm font-semibold text-gray-900">{booking.customerName}</div>
                          <div className="text-xs text-gray-500">{booking.customerEmail}</div>
                          <div className="text-xs text-gray-500">{booking.customerPhone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-1.5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-7 w-7">
                          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-xs font-semibold shadow-md ring-1 ring-gray-200">
                            {booking.photographerName.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="ml-2">
                          <div className="text-sm font-medium text-gray-900">{booking.photographerName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-1.5 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900">{booking.category}</span>
                        <span className="text-xs text-gray-600">{booking.subcategory}</span>
                        <span className="text-xs text-blue-600">{booking.packageType} • {booking.packageName}</span>
                        <span className="text-xs text-gray-500">{booking.duration}</span>
                      </div>
                    </td>
                    <td className="px-4 py-1.5 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900">{booking.eventDate}</span>
                        <span className="text-xs text-gray-600">{booking.eventTime}</span>
                        <span className="text-xs text-gray-500">{booking.location}</span>
                      </div>
                    </td>
                    <td className="px-4 py-1.5 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">₹{booking.totalAmount.toLocaleString()}</span>
                        <span className={`inline-flex px-1.5 py-0.5 text-xs font-semibold rounded-full w-fit ${getPaymentStatusColor(booking.paymentStatus)}`}>
                          {booking.paymentStatus}
                        </span>
                        {booking.paymentStatus === 'partial' && (
                          <>
                            <span className="text-xs text-green-600">Paid: ₹{booking.advanceAmount.toLocaleString()}</span>
                            <span className="text-xs text-red-600">Due: ₹{booking.remainingAmount.toLocaleString()}</span>
                          </>
                        )}
                        {activeTab === 'delivery' && (
                          <span className="inline-flex items-center px-1.5 py-0.5 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                            Delivery Pending
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-1.5 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(booking)}
                        className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors"
                        title="View Details"
                      >
                        <MdVisibility className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {showDetailModal && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-base font-semibold text-gray-900">Booking Details</h3>
                <p className="text-sm text-gray-600 mt-1">{selectedBooking.bookingId}</p>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Customer Information */}
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-3">Customer Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Name</label>
                    <p className="text-sm font-medium text-gray-900">{selectedBooking.customerName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <p className="text-sm font-medium text-gray-900">{selectedBooking.customerEmail}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Phone</label>
                    <p className="text-sm font-medium text-gray-900">{selectedBooking.customerPhone}</p>
                  </div>
                </div>
              </div>

              {/* Photographer Information */}
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-3">Photographer Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Name</label>
                    <p className="text-sm font-medium text-gray-900">{selectedBooking.photographerName}</p>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-3">Booking Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Category</label>
                    <p className="text-sm font-medium text-gray-900">{selectedBooking.category}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Subcategory</label>
                    <p className="text-sm font-medium text-gray-900">{selectedBooking.subcategory}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Package Type</label>
                    <p className="text-sm font-medium text-gray-900">{selectedBooking.packageType}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Package Name</label>
                    <p className="text-sm font-medium text-gray-900">{selectedBooking.packageName}</p>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-3">Event Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Event Date</label>
                    <p className="text-sm font-medium text-gray-900">{selectedBooking.eventDate}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Event Time</label>
                    <p className="text-sm font-medium text-gray-900">{selectedBooking.eventTime}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Duration</label>
                    <p className="text-sm font-medium text-gray-900">{selectedBooking.duration}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Location</label>
                    <p className="text-sm font-medium text-gray-900">{selectedBooking.location}</p>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-3">Payment Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Total Amount</label>
                    <p className="text-lg font-bold text-gray-900">₹{selectedBooking.totalAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Payment Status</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(selectedBooking.paymentStatus)}`}>
                      {selectedBooking.paymentStatus}
                    </span>
                  </div>
                  {selectedBooking.paymentStatus === 'partial' && (
                    <>
                      <div>
                        <label className="text-sm text-gray-600">Advance Paid</label>
                        <p className="text-sm font-medium text-green-600">₹{selectedBooking.advanceAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Remaining Amount</label>
                        <p className="text-sm font-medium text-red-600">₹{selectedBooking.remainingAmount.toLocaleString()}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Status Management */}
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-3">Booking Status</h4>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleStatusChange(selectedBooking.id, 'confirmed')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedBooking.bookingStatus === 'confirmed'
                        ? 'bg-green-600 text-white'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    Confirmed
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedBooking.id, 'pending')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedBooking.bookingStatus === 'pending'
                        ? 'bg-yellow-600 text-white'
                        : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedBooking.id, 'completed')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedBooking.bookingStatus === 'completed'
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    Completed
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedBooking.id, 'cancelled')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedBooking.bookingStatus === 'cancelled'
                        ? 'bg-red-600 text-white'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    Cancelled
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowDetailModal(false)}
                className="admin-button-secondary"
              >
                Close
              </button>
              <button className="admin-button-primary">
                Download Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

