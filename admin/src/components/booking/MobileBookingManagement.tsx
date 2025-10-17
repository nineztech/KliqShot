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

interface MobileBookingManagementProps {
  bookings: Booking[];
  setBookings: (bookings: Booking[]) => void;
}

type TabType = 'today' | 'followup' | 'delivery' | 'advance';

export default function MobileBookingManagement({ bookings, setBookings }: MobileBookingManagementProps) {
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
    <div className="space-y-4 p-4">
      {/* Section 1: Header */}
      <div className="admin-card p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Bookings</h2>
            <p className="text-gray-600 text-xs mt-1">Track and manage</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
          />
        </div>
      </div>

      {/* Section 2: Tabs + Content */}
      <div className="admin-card p-4">
        {/* Tabs */}
        <div className="flex space-x-2 mb-4 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('today')}
            className={`flex-shrink-0 py-2.5 px-3 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'today'
                ? 'bg-blue-500 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Today
            <span className={`ml-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${
              activeTab === 'today' 
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}>
              {tabCounts.today}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('followup')}
            className={`flex-shrink-0 py-2.5 px-3 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'followup'
                ? 'bg-purple-500 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Follow-up
            <span className={`ml-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${
              activeTab === 'followup' 
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}>
              {tabCounts.followup}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('delivery')}
            className={`flex-shrink-0 py-2.5 px-3 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'delivery'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Delivery
            <span className={`ml-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${
              activeTab === 'delivery' 
                ? 'bg-orange-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}>
              {tabCounts.delivery}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('advance')}
            className={`flex-shrink-0 py-2.5 px-3 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'advance'
                ? 'bg-green-500 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Advance
            <span className={`ml-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${
              activeTab === 'advance' 
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}>
              {tabCounts.advance}
            </span>
          </button>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-4">
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="admin-input flex-1 text-sm"
          >
            <option value="all">All Payments</option>
            <option value="paid">Paid</option>
            <option value="partial">Partial</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Content - Bookings List */}
        <div className="space-y-3">
          {filteredBookings.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-400 text-base mb-2">No bookings found</div>
              <p className="text-gray-500 text-xs">
                {activeTab === 'today' && "No bookings scheduled for today"}
                {activeTab === 'followup' && "No follow-ups scheduled for tomorrow"}
                {activeTab === 'delivery' && "No pending deliveries"}
                {activeTab === 'advance' && "No advance bookings found"}
              </p>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3 mb-3">
                  <div className="relative flex-shrink-0">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-semibold shadow-md ring-2 ring-gray-200">
                      {booking.customerName.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{booking.customerName}</h3>
                    <p className="text-xs text-blue-600 font-medium mb-0.5">{booking.bookingId}</p>
                    <p className="text-xs text-gray-500 mb-1">{booking.customerEmail}</p>
                    <p className="text-xs text-gray-500">{booking.customerPhone}</p>
                  </div>
                  <button
                    onClick={() => handleViewDetails(booking)}
                    className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors flex-shrink-0"
                  >
                    <MdVisibility className="w-5 h-5" />
                  </button>
                </div>

                {/* Service Info */}
                <div className="mb-3 pb-3 border-b border-gray-100 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-gray-600 mb-0.5">Category</p>
                      <p className="text-sm font-semibold text-gray-900">{booking.category}</p>
                      <p className="text-xs text-gray-500">{booking.subcategory}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600 mb-0.5">Photographer</p>
                      <p className="text-sm font-medium text-gray-900">{booking.photographerName}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600">{booking.packageType} • {booking.packageName}</p>
                    <p className="text-xs text-gray-500">{booking.duration}</p>
                  </div>
                </div>

                {/* Event Details */}
                <div className="mb-3 pb-3 border-b border-gray-100">
                  <p className="text-xs text-gray-600 mb-1">Event Details</p>
                  <p className="text-sm font-medium text-gray-900">{booking.eventDate} at {booking.eventTime}</p>
                  <p className="text-xs text-gray-500">{booking.location}</p>
                </div>

                {/* Payment & Status */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-gray-900">₹{booking.totalAmount.toLocaleString()}</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full w-fit ${getPaymentStatusColor(booking.paymentStatus)}`}>
                      {booking.paymentStatus}
                    </span>
                    {booking.paymentStatus === 'partial' && (
                      <div className="text-xs">
                        <span className="text-green-600">Paid: ₹{booking.advanceAmount.toLocaleString()}</span>
                        <span className="text-gray-400"> / </span>
                        <span className="text-red-600">Due: ₹{booking.remainingAmount.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.bookingStatus)}`}>
                      {getStatusIcon(booking.bookingStatus)}
                      {booking.bookingStatus}
                    </span>
                    {activeTab === 'delivery' && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                        <MdLocalShipping className="w-3 h-3 mr-1" />
                        Delivery Pending
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Booking Details Modal */}
      {showDetailModal && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Booking Details</h3>
                <p className="text-xs text-gray-600">{selectedBooking.bookingId}</p>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Customer Information */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Customer Information</h4>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-gray-600">Name</label>
                    <p className="text-sm font-medium text-gray-900">{selectedBooking.customerName}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Email</label>
                    <p className="text-sm font-medium text-gray-900">{selectedBooking.customerEmail}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Phone</label>
                    <p className="text-sm font-medium text-gray-900">{selectedBooking.customerPhone}</p>
                  </div>
                </div>
              </div>

              {/* Photographer Information */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Photographer</h4>
                <p className="text-sm font-medium text-gray-900">{selectedBooking.photographerName}</p>
              </div>

              {/* Booking Details */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Booking Details</h4>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-600">Category</label>
                      <p className="text-sm font-medium text-gray-900">{selectedBooking.category}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-600">Subcategory</label>
                      <p className="text-sm font-medium text-gray-900">{selectedBooking.subcategory}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Package</label>
                    <p className="text-sm font-medium text-gray-900">{selectedBooking.packageType} • {selectedBooking.packageName}</p>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Event Details</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-gray-600">Date</label>
                    <p className="text-sm font-medium text-gray-900">{selectedBooking.eventDate}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Time</label>
                    <p className="text-sm font-medium text-gray-900">{selectedBooking.eventTime}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Duration</label>
                    <p className="text-sm font-medium text-gray-900">{selectedBooking.duration}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Location</label>
                    <p className="text-sm font-medium text-gray-900">{selectedBooking.location}</p>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Payment Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Total Amount</span>
                    <span className="text-lg font-bold text-gray-900">₹{selectedBooking.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Payment Status</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(selectedBooking.paymentStatus)}`}>
                      {selectedBooking.paymentStatus}
                    </span>
                  </div>
                  {selectedBooking.paymentStatus === 'partial' && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Advance Paid</span>
                        <span className="text-sm font-medium text-green-600">₹{selectedBooking.advanceAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Remaining</span>
                        <span className="text-sm font-medium text-red-600">₹{selectedBooking.remainingAmount.toLocaleString()}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Status Management */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Update Status</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleStatusChange(selectedBooking.id, 'confirmed')}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      selectedBooking.bookingStatus === 'confirmed'
                        ? 'bg-green-600 text-white'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    Confirmed
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedBooking.id, 'pending')}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      selectedBooking.bookingStatus === 'pending'
                        ? 'bg-yellow-600 text-white'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedBooking.id, 'completed')}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      selectedBooking.bookingStatus === 'completed'
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    Completed
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedBooking.id, 'cancelled')}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      selectedBooking.bookingStatus === 'cancelled'
                        ? 'bg-red-600 text-white'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    Cancelled
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-4 border-t border-gray-200 sticky bottom-0 bg-white">
              <button
                onClick={() => setShowDetailModal(false)}
                className="admin-button-secondary flex-1"
              >
                Close
              </button>
              <button className="admin-button-primary flex-1">
                Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

