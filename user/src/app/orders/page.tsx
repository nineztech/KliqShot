'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { 
  ArrowLeftIcon, 
  ClockIcon,
  CameraIcon,
  CheckCircleIcon,
  XCircleIcon,
  TruckIcon,
  CalendarDaysIcon,
  CurrencyRupeeIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

interface Order {
  id: string;
  photographerName: string;
  photographerImage: string;
  category: string;
  subcategory: string;
  date: string;
  timeSlots: string[];
  venue: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
  photographerId: string;
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    // Load orders from localStorage
    if (typeof window !== 'undefined') {
      const savedOrders = localStorage.getItem('userOrders');
      if (savedOrders) {
        try {
          const parsedOrders = JSON.parse(savedOrders);
          setOrders(parsedOrders);
        } catch (error) {
          console.error('Error parsing orders:', error);
        }
      } else {
        // Add dummy orders if no orders exist
        const dummyOrders: Order[] = [
          {
            id: 'ORD-001-2024',
            photographerName: 'Priya Sharma',
            photographerImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face&auto=format',
            category: 'Wedding',
            subcategory: 'Haldi',
            date: 'Monday, October 28, 2024',
            timeSlots: ['06:00 AM - 07:00 AM', '08:00 PM - 09:00 PM'],
            venue: 'Grand Palace Hotel, Mumbai',
            status: 'confirmed',
            totalAmount: 15000,
            photographerId: 'photographer-001'
          },
          {
            id: 'ORD-002-2024',
            photographerName: 'Rajesh Kumar',
            photographerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format',
            category: 'Portrait',
            subcategory: 'Professional Headshots',
            date: 'Wednesday, October 25, 2024',
            timeSlots: ['10:00 AM - 11:00 AM'],
            venue: 'Studio A, Delhi',
            status: 'completed',
            totalAmount: 8500,
            photographerId: 'photographer-002'
          },
          {
            id: 'ORD-003-2024',
            photographerName: 'Anjali Patel',
            photographerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face&auto=format',
            category: 'Family',
            subcategory: 'Kids Photography',
            date: 'Sunday, October 22, 2024',
            timeSlots: ['02:00 PM - 04:00 PM'],
            venue: 'Juhu Beach, Mumbai',
            status: 'completed',
            totalAmount: 12000,
            photographerId: 'photographer-003'
          },
          {
            id: 'ORD-004-2024',
            photographerName: 'Vikram Singh',
            photographerImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face&auto=format',
            category: 'Events',
            subcategory: 'Birthday Party',
            date: 'Friday, October 20, 2024',
            timeSlots: ['06:00 PM - 10:00 PM'],
            venue: 'Community Hall, Bangalore',
            status: 'completed',
            totalAmount: 18000,
            photographerId: 'photographer-004'
          },
          {
            id: 'ORD-005-2024',
            photographerName: 'Meera Desai',
            photographerImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face&auto=format',
            category: 'Maternity',
            subcategory: 'Maternity Shoot',
            date: 'Tuesday, November 5, 2024',
            timeSlots: ['11:00 AM - 01:00 PM'],
            venue: 'Green Valley Park, Pune',
            status: 'confirmed',
            totalAmount: 20000,
            photographerId: 'photographer-005'
          },
          {
            id: 'ORD-006-2024',
            photographerName: 'Amit Joshi',
            photographerImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face&auto=format',
            category: 'Product',
            subcategory: 'E-commerce',
            date: 'Thursday, October 19, 2024',
            timeSlots: ['09:00 AM - 12:00 PM'],
            venue: 'Studio B, Gurgaon',
            status: 'cancelled',
            totalAmount: 15000,
            photographerId: 'photographer-006'
          }
        ];
        setOrders(dummyOrders);
        localStorage.setItem('userOrders', JSON.stringify(dummyOrders));
      }
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <ClockIcon className="h-5 w-5" />;
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5" />;
      case 'cancelled':
        return <XCircleIcon className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <button
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 mr-2"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">My Orders</h1>
          </div>
          <p className="text-sm text-gray-600">View and manage your bookings</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-1.5 mb-4 overflow-x-auto pb-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap ${
              filterStatus === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            All Orders ({orders.length})
          </button>
          <button
            onClick={() => setFilterStatus('confirmed')}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap ${
              filterStatus === 'confirmed'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Confirmed ({orders.filter(o => o.status === 'confirmed').length})
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap ${
              filterStatus === 'completed'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Completed ({orders.filter(o => o.status === 'completed').length})
          </button>
          <button
            onClick={() => setFilterStatus('cancelled')}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap ${
              filterStatus === 'cancelled'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Cancelled ({orders.filter(o => o.status === 'cancelled').length})
          </button>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TruckIcon className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Orders Yet</h3>
              <p className="text-gray-600 mb-6">
                {filterStatus === 'all' 
                  ? "You haven't placed any orders yet. Start booking photographers!"
                  : `You don't have any ${filterStatus} orders.`}
              </p>
              <button
                onClick={() => router.push('/')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Browse Photographers
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                {/* Order Header */}
                <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm border border-blue-200">
                        <CameraIcon className="w-7 h-7 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <h3 className="text-base font-bold text-gray-900">{order.photographerName}</h3>
                          <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-semibold ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-semibold text-[10px] border border-blue-200">
                            {order.category}
                          </span>
                          {order.subcategory && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-gray-50 text-gray-700 font-medium text-[10px]">
                              {order.subcategory}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-gray-500">Order #{order.id.slice(-8)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-gray-900">₹{order.totalAmount.toLocaleString('en-US')}</span>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="p-3 bg-white">
                  <div className="grid grid-cols-2 gap-3">
                    {/* Date */}
                    <div className="bg-gray-50 rounded-md p-2 border border-gray-100">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <div className="p-1.5 bg-blue-100 rounded-md">
                          <CalendarDaysIcon className="w-3 h-3 text-blue-600" />
                        </div>
                        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Date</p>
                      </div>
                      <p className="text-xs font-bold text-gray-900">{order.date}</p>
                    </div>

                    {/* Time */}
                    <div className="bg-gray-50 rounded-md p-2 border border-gray-100">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <div className="p-1.5 bg-purple-100 rounded-md">
                          <ClockIcon className="w-3 h-3 text-purple-600" />
                        </div>
                        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Time</p>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {order.timeSlots.slice(0, 1).map((slot, idx) => (
                          <span key={idx} className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-bold border border-blue-200">
                            {slot}
                          </span>
                        ))}
                        {order.timeSlots.length > 1 && (
                          <span className="text-[10px] text-gray-600 font-medium">+{order.timeSlots.length - 1}</span>
                        )}
                      </div>
                    </div>

                    {/* Venue */}
                    <div className="bg-gray-50 rounded-md p-2 border border-gray-100">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <div className="p-1.5 bg-green-100 rounded-md">
                          <MapPinIcon className="w-3 h-3 text-green-600" />
                        </div>
                        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Venue</p>
                      </div>
                      <p className="text-xs font-bold text-gray-900 line-clamp-2">{order.venue || 'Not specified'}</p>
                    </div>

                    {/* Status */}
                    <div className="bg-gray-50 rounded-md p-2 border border-gray-100">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <div className={`p-1.5 rounded-md ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                        </div>
                        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Status</p>
                      </div>
                      <p className={`text-xs font-bold ${order.status === 'confirmed' ? 'text-blue-700' : order.status === 'completed' ? 'text-green-700' : 'text-red-700'}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-3 border-t border-gray-200 bg-gray-50 flex justify-end gap-2">
                  <button
                    onClick={() => {
                      // Navigate to photographer profile
                      router.push(`/photographer/${order.photographerId}`);
                    }}
                    className="px-3 py-1.5 bg-white border-2 border-blue-600 text-blue-600 rounded-md font-semibold hover:bg-blue-50 transition-all duration-200 text-[10px] shadow-sm hover:shadow-md"
                  >
                    View Photographer
                  </button>
                  {order.status === 'confirmed' && (
                    <button
                      onClick={() => {
                        // Handle cancellation
                        const updatedOrders = orders.map(o => 
                          o.id === order.id ? { ...o, status: 'cancelled' as const } : o
                        );
                        setOrders(updatedOrders);
                        localStorage.setItem('userOrders', JSON.stringify(updatedOrders));
                      }}
                      className="px-3 py-1.5 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition-all duration-200 text-[10px] shadow-sm hover:shadow-md"
                    >
                      Cancel
                    </button>
                  )}
                  {order.status === 'completed' && (
                    <button
                      onClick={() => {
                        // Handle downloading photos (placeholder)
                        alert('Download functionality coming soon!');
                      }}
                      className="px-3 py-1.5 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition-all duration-200 text-[10px] shadow-sm hover:shadow-md"
                    >
                      Download
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
