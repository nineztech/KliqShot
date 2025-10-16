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

interface DesktopBookingManagementProps {
  bookings: Booking[];
  setBookings: (bookings: Booking[]) => void;
}

export default function DesktopBookingManagement({ bookings, setBookings }: DesktopBookingManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
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
    <div className="space-y-2">
      {/* Header and Filters */}
      <div className="admin-card">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <h2 className="text-xl font-bold text-gray-900">Booking Management</h2>
            <p className="text-gray-600 text-sm">Manage all bookings on the platform</p>
          </div>
          
          <div className="flex-1 relative max-w-md">
            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="admin-input min-w-[140px]"
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
            className="admin-input min-w-[140px]"
          >
            <option value="all">All Payments</option>
            <option value="paid">Paid</option>
            <option value="partial">Partial</option>
            <option value="pending">Pending</option>
          </select>
          
          <button className="admin-button-secondary text-sm px-3 py-2 flex items-center">
            <MdFilterList className="w-3 h-3 mr-1" />
            Filters
          </button>
          
          <button className="admin-button-primary text-sm px-3 py-2 flex items-center">
            <MdFileDownload className="w-3 h-3 mr-1" />
            Export
          </button>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="admin-card overflow-hidden" style={{ maxHeight: 'calc(100vh - 220px)' }}>
        <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 220px)' }}>
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photographer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-blue-600">{booking.bookingId}</span>
                      <span className="text-xs text-gray-500">{booking.createdAt}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-semibold">
                          {booking.customerName.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                        <div className="text-xs text-gray-500">{booking.customerPhone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-xs font-semibold">
                          {booking.photographerName.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="ml-2">
                        <div className="text-sm text-gray-900">{booking.photographerName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">{booking.category}</span>
                      <span className="text-xs text-gray-500">{booking.subcategory}</span>
                      <span className="text-xs text-blue-600 mt-1">{booking.packageType} • {booking.packageName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-900">{booking.eventDate}</span>
                      <span className="text-xs text-gray-500">{booking.eventTime}</span>
                      <span className="text-xs text-gray-500">{booking.duration}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm font-semibold text-gray-900">₹{booking.totalAmount.toLocaleString()}</span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(booking.paymentStatus)}`}>
                        {booking.paymentStatus}
                      </span>
                      {booking.paymentStatus === 'partial' && (
                        <span className="text-xs text-orange-600">Paid: ₹{booking.advanceAmount.toLocaleString()}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.bookingStatus)}`}>
                      {getStatusIcon(booking.bookingStatus)}
                      {booking.bookingStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewDetails(booking)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="View Details"
                      >
                        <MdVisibility className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredBookings.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No bookings found
            </div>
          )}
        </div>
      </div>

      {/* Booking Details Modal */}
      {showDetailModal && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Booking Details</h3>
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

