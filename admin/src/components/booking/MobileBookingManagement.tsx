'use client';

import { useState } from 'react';
import { 
  MdSearch,
  MdFilterList,
  MdVisibility,
  MdFileDownload,
  MdCheckCircle,
  MdCancel,
  MdPending,
  MdClose
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
  createdAt: string;
}

interface MobileBookingManagementProps {
  bookings: Booking[];
  setBookings: (bookings: Booking[]) => void;
}

export default function MobileBookingManagement({ bookings, setBookings }: MobileBookingManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

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

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.photographerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.bookingStatus === statusFilter;
    const matchesPayment = paymentFilter === 'all' || booking.paymentStatus === paymentFilter;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

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

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="admin-card">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Booking Management</h2>
        <p className="text-gray-600 text-sm mb-4">Manage all bookings</p>

        {/* Search */}
        <div className="relative mb-3">
          <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Filter Button */}
        <div className="flex gap-2">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="admin-button-secondary text-sm px-3 py-2 flex items-center flex-1"
          >
            <MdFilterList className="w-4 h-4 mr-1" />
            Filters
          </button>
          <button className="admin-button-primary text-sm px-3 py-2 flex items-center flex-1">
            <MdFileDownload className="w-4 h-4 mr-1" />
            Export
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-3 space-y-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="admin-input w-full"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="admin-input w-full"
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="partial">Partial</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        )}
      </div>

      {/* Bookings List */}
      <div className="space-y-3">
        {filteredBookings.map((booking) => (
          <div key={booking.id} className="admin-card">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-semibold">
                  {booking.customerName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{booking.customerName}</p>
                  <p className="text-xs text-blue-600">{booking.bookingId}</p>
                  <p className="text-xs text-gray-500">{booking.createdAt}</p>
                </div>
              </div>
              <button
                onClick={() => handleViewDetails(booking)}
                className="text-blue-600 hover:text-blue-900 p-2"
              >
                <MdVisibility className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div>
                <p className="text-xs text-gray-600">Photographer</p>
                <p className="text-sm font-medium text-gray-900">{booking.photographerName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Category</p>
                <p className="text-sm font-medium text-gray-900">{booking.category}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Event Date</p>
                <p className="text-sm font-medium text-gray-900">{booking.eventDate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Amount</p>
                <p className="text-sm font-semibold text-gray-900">₹{booking.totalAmount.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <div className="flex gap-2">
                <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.bookingStatus)}`}>
                  {getStatusIcon(booking.bookingStatus)}
                  {booking.bookingStatus}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(booking.paymentStatus)}`}>
                  {booking.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        ))}

        {filteredBookings.length === 0 && (
          <div className="admin-card text-center py-12 text-gray-500">
            No bookings found
          </div>
        )}
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

