'use client';

import { useState } from 'react';
import {
  MdCalendarToday,
  MdPerson,
  MdCheckCircle,
  MdCancel,
  MdSearch,
  MdFilterList,
  MdMoreVert,
  MdCamera,
  MdLocationOn,
  MdAccessTime,
  MdAssignment,
  MdAttachMoney,
  MdDownload,
  MdVisibility,
  MdInfo,
  MdHistory,
} from 'react-icons/md';
import { History } from 'lucide-react';
import { useSidebar } from '../Sidebar/SidebarContext';


export default function OrderHistory() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
const { isMinimized } = useSidebar();
  // Sample order history data
  const orderHistory = [
    {
      id: 'BK-2024-095',
      client: 'Daniel Brown',
      email: 'daniel.brown@email.com',
      phone: '+91 98765 43210',
      type: 'Wedding Photography',
      date: '2025-10-12',
      time: '10:00 AM - 8:00 PM',
      location: 'Palace Grounds, Ahmedabad',
      assignedTo: 'Sarah Joshi',
      status: 'Completed',
      amount: 890,
      paymentStatus: 'Paid',
      deliveryDate: '2025-10-25',
      rating: 5,
      photos: 450,
      feedback: 'Excellent service! The photos turned out amazing.',
    },
    {
      id: 'BK-2024-094',
      client: 'Olivia Garcia',
      email: 'olivia.garcia@email.com',
      phone: '+91 98765 43211',
      type: 'Family Portrait',
      date: '2025-10-10',
      time: '3:00 PM - 5:00 PM',
      location: 'Park Avenue',
      assignedTo: 'Lisa Kumari',
      status: 'Completed',
      amount: 250,
      paymentStatus: 'Paid',
      deliveryDate: '2025-10-17',
      rating: 5,
      photos: 80,
      feedback: 'Very professional and friendly photographer!',
    },
    {
      id: 'BK-2024-093',
      client: 'William Johnson',
      email: 'william.j@email.com',
      phone: '+91 98765 43212',
      type: 'Birthday Party',
      date: '2025-10-08',
      time: '4:00 PM - 8:00 PM',
      location: 'Party Hall, Satellite',
      assignedTo: 'Mark Wilson',
      status: 'Completed',
      amount: 380,
      paymentStatus: 'Paid',
      deliveryDate: '2025-10-15',
      rating: 4,
      photos: 200,
      feedback: 'Great photos, captured all the special moments.',
    },
    {
      id: 'BK-2024-092',
      client: 'Ava Martinez',
      email: 'ava.martinez@email.com',
      phone: '+91 98765 43213',
      type: 'Corporate Event',
      date: '2025-10-05',
      time: '9:00 AM - 6:00 PM',
      location: 'Business Center',
      assignedTo: 'David Kumar',
      status: 'Cancelled',
      amount: 720,
      paymentStatus: 'Refunded',
      cancellationReason: 'Event postponed due to weather',
      cancellationDate: '2025-10-03',
    },
    {
      id: 'BK-2024-091',
      client: 'Ethan Davis',
      email: 'ethan.davis@email.com',
      phone: '+91 98765 43214',
      type: 'Product Photography',
      date: '2025-10-01',
      time: '11:00 AM - 2:00 PM',
      location: 'Studio B',
      assignedTo: 'Sarah Joshi',
      status: 'Completed',
      amount: 320,
      paymentStatus: 'Paid',
      deliveryDate: '2025-10-05',
      rating: 5,
      photos: 150,
      feedback: 'Professional product shots, exceeded expectations!',
    },
    {
      id: 'BK-2024-090',
      client: 'Mia Wilson',
      email: 'mia.wilson@email.com',
      phone: '+91 98765 43215',
      type: 'Pre-Wedding Shoot',
      date: '2025-09-28',
      time: '6:00 AM - 12:00 PM',
      location: 'Beach Resort, Gujarat',
      assignedTo: 'Lisa Kumari',
      status: 'Completed',
      amount: 650,
      paymentStatus: 'Paid',
      deliveryDate: '2025-10-10',
      rating: 5,
      photos: 320,
      feedback: 'Beautiful locations and stunning photos!',
    },
    {
      id: 'BK-2024-089',
      client: 'James Taylor',
      email: 'james.t@email.com',
      phone: '+91 98765 43216',
      type: 'Fashion Shoot',
      date: '2025-09-25',
      time: '2:00 PM - 6:00 PM',
      location: 'Fashion Studio',
      assignedTo: 'David Kumar',
      status: 'Cancelled',
      amount: 480,
      paymentStatus: 'Refunded',
      cancellationReason: 'Client scheduling conflict',
      cancellationDate: '2025-09-23',
    },
    {
      id: 'BK-2024-088',
      client: 'Isabella Thomas',
      email: 'isabella.t@email.com',
      phone: '+91 98765 43217',
      type: 'Engagement Photos',
      date: '2025-09-20',
      time: '5:00 PM - 8:00 PM',
      location: 'Heritage Park',
      assignedTo: 'Mark Wilson',
      status: 'Completed',
      amount: 420,
      paymentStatus: 'Paid',
      deliveryDate: '2025-09-27',
      rating: 5,
      photos: 180,
      feedback: 'Captured our love story perfectly!',
    },
     {
      id: 'BK-2024-012',
      client: 'Isabella Thomas',
      email: 'isabella.t@email.com',
      phone: '+91 98765 43217',
      type: 'Engagement Photos',
      date: '2025-09-20',
      time: '5:00 PM - 8:00 PM',
      location: 'Heritage Park',
      assignedTo: 'Mark Wilson',
      status: 'Disputed',
      amount: 420,
      paymentStatus: 'Paid',
      deliveryDate: '2025-09-27',
      rating: 5,
      photos: 180,
      feedback: 'Captured our love story perfectly!',
      cancellationReason: 'Client scheduling conflict',
      cancellationDate: '2025-09-23',
    },
  ];

  // Stats calculation
  const totalOrders = orderHistory.length;
  const completedOrders = orderHistory.filter(o => o.status === 'Completed').length;
  const cancelledOrders = orderHistory.filter(o => o.status === 'Cancelled').length;
  const disputedOrders = orderHistory.filter(o => o.status === 'Disputed').length;
  const totalRevenue = orderHistory
    .filter(o => o.status === 'Completed')
    .reduce((sum, o) => sum + o.amount, 0);

  const stats = [
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: MdHistory,
      gradient: 'from-blue-500 to-indigo-500',
      bgGradient: 'from-blue-50 to-indigo-50',
    },
    {
      title: 'Completed',
      value: completedOrders,
      icon: MdCheckCircle,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
    },
    {
      title: 'Cancelled',
      value: cancelledOrders,
      icon: MdCancel,
      gradient: 'from-red-500 to-pink-500',
      bgGradient: 'from-red-50 to-pink-50',
    },
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: MdAttachMoney,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
    },
  ];

  // Filter and sort orders
  const getFilteredOrders = () => {
    let filtered = orderHistory;

    // Filter by status
    if (activeTab === 'completed') {
      filtered = filtered.filter(o => o.status === 'Completed');
    } else if (activeTab === 'cancelled') {
      filtered = filtered.filter(o => o.status === 'Cancelled');
    }else if (activeTab === 'Disputed') {
      filtered = filtered.filter(o => o.status === 'Disputed');
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(o => 
        o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by date
    if (dateFilter !== 'all') {
      const now = new Date();
      filtered = filtered.filter(o => {
        const orderDate = new Date(o.date);
        if (dateFilter === 'week') {
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return orderDate >= weekAgo;
        } else if (dateFilter === 'month') {
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return orderDate >= monthAgo;
        }
        return true;
      });
    }

    // Sort orders
    filtered.sort((a, b) => {
      if (sortBy === 'date-desc') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === 'date-asc') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === 'amount-desc') {
        return b.amount - a.amount;
      } else if (sortBy === 'amount-asc') {
        return a.amount - b.amount;
      }
      return 0;
    });

    return filtered;
  };

  const filteredOrders = getFilteredOrders();

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  return (
    <div className="mt-20 p-6 md:p-8 bg-gray-50 min-h-screen"
    style={{ marginLeft: isMinimized ? '5rem' : '16rem' }}>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.5s ease-out forwards;
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.3s ease-out forwards;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8 opacity-0 animate-fadeInDown">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-900 rounded-2xl flex items-center justify-center shadow-xl">
                <History className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">Order History</h1>
                <p className="text-xs md:text-sm lg:text-base text-gray-600 flex items-center gap-2 mt-1">
                  View all completed and cancelled orders
                </p>
              </div>
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-900 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-200">
              <MdDownload className="w-5 h-5" />
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 opacity-0 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <div className="relative p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-xs md:text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`relative z-20 p-2 md:p-3 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden opacity-0 animate-fadeInUp mb-6" style={{ animationDelay: '0.4s' }}>
          {/* Tabs */}
          <div className="flex overflow-x-auto border-b border-gray-200">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 min-w-max px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-semibold transition-colors duration-200 ${
                activeTab === 'all'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              All Orders ({totalOrders})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`flex-1 min-w-max px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-semibold transition-colors duration-200 ${
                activeTab === 'completed'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Completed ({completedOrders})
            </button>
            <button
              onClick={() => setActiveTab('cancelled')}
              className={`flex-1 min-w-max px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-semibold transition-colors duration-200 ${
                activeTab === 'cancelled'
                  ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Cancelled ({cancelledOrders})
            </button>
            <button
              onClick={() => setActiveTab('Disputed')}
              className={`flex-1 min-w-max px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-semibold transition-colors duration-200 ${
                activeTab === 'Disputed'
                  ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Disputed ({disputedOrders})
            </button>
          </div>

          {/* Search and Filters */}
          <div className="p-4 md:p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col lg:flex-row gap-3 md:gap-4">
              <div className="flex-1 relative">
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                <input
                  type="text"
                  placeholder="Search by order ID, client, or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 md:pl-10 pr-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-3">
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="all">All Time</option>
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="date-desc">Date (Newest)</option>
                  <option value="date-asc">Date (Oldest)</option>
                  <option value="amount-desc">Amount (High to Low)</option>
                  <option value="amount-asc">Amount (Low to High)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="p-4 md:p-6">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <MdInfo className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No orders found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order, index) => (
                  <div
                    key={order.id}
                    className={`p-4 rounded-xl hover:shadow-lg transition-all duration-200 border-2 opacity-0 animate-fadeInLeft ${
                      order.status === 'Completed'
                        ? 'bg-green-50 border-green-200'
                        : 'bg-red-50 border-red-200'
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            order.status === 'Completed' ? 'bg-green-600' : 'bg-red-600'
                          }`}>
                            {order.status === 'Completed' ? (
                              <MdCheckCircle className="w-5 h-5 text-white" />
                            ) : (
                              <MdCancel className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{order.id}</p>
                            <p className="text-sm text-gray-600">{order.type}</p>
                          </div>
                          <span className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'Completed' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 mt-3">
                          <div className="flex items-center gap-2">
                            <MdPerson className="w-4 h-4" />
                            <span>{order.client}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MdCalendarToday className="w-4 h-4" />
                            <span>{order.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MdAccessTime className="w-4 h-4" />
                            <span>{order.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MdLocationOn className="w-4 h-4" />
                            <span>{order.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mt-3 text-sm">
                          <MdAssignment className="w-4 h-4 text-purple-600" />
                          <span className="text-gray-700">Handled by:</span>
                          <span className="font-semibold text-purple-600">{order.assignedTo}</span>
                        </div>

                        {order.status === 'Completed' && order.rating && (
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-sm text-gray-600">Rating:</span>
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < order.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-row lg:flex-col items-center gap-3">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">${order.amount}</p>
                          <p className={`text-xs font-semibold ${
                            order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-orange-600'
                          }`}>
                            {order.paymentStatus}
                          </p>
                          {order.status === 'Completed' && order.photos && (
                            <p className="text-xs text-gray-500 mt-1">{order.photos} photos</p>
                          )}
                        </div>
                        <button 
                          onClick={() => handleViewDetails(order)}
                          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                        >
                          <MdVisibility className="w-4 h-4" />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {showDetailsModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="sticky top-0 bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-900 text-white p-6 rounded-t-2xl z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Order Details</h2>
                  <p className="text-purple-100 mt-1">{selectedOrder.id}</p>
                </div>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    setSelectedOrder(null);
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
                >
                  <span className="text-2xl text-black">×</span>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Status Badge */}
              <div className="flex items-center justify-center">
                <span className={`px-6 py-2 rounded-full text-sm font-bold ${
                  selectedOrder.status === 'Completed'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {selectedOrder.status}
                </span>
              </div>

              {/* Client Information */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 mb-3">Client Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MdPerson className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-600">Name:</span>
                    <span className="font-semibold">{selectedOrder.client}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">📧 Email:</span>
                    <span className="font-semibold">{selectedOrder.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">📱 Phone:</span>
                    <span className="font-semibold">{selectedOrder.phone}</span>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 mb-3">Order Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MdCamera className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-600">Type:</span>
                    <span className="font-semibold">{selectedOrder.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdCalendarToday className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-600">Date:</span>
                    <span className="font-semibold">{selectedOrder.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdAccessTime className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-600">Time:</span>
                    <span className="font-semibold">{selectedOrder.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdLocationOn className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-600">Location:</span>
                    <span className="font-semibold">{selectedOrder.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdAssignment className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-600">Photographer:</span>
                    <span className="font-semibold">{selectedOrder.assignedTo}</span>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 mb-3">Payment Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-bold text-2xl text-gray-900">${selectedOrder.amount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Payment Status:</span>
                    <span className={`font-semibold ${
                      selectedOrder.paymentStatus === 'Paid' ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {selectedOrder.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Completion Details (for completed orders) */}
              {selectedOrder.status === 'Completed' && (
                <>
                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <h3 className="font-bold text-gray-900 mb-3">Delivery Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Delivery Date:</span>
                        <span className="font-semibold">{selectedOrder.deliveryDate}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Total Photos:</span>
                        <span className="font-semibold">{selectedOrder.photos} photos</span>
                      </div>
                      {selectedOrder.rating && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Rating:</span>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-xl ${i < selectedOrder.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedOrder.feedback && (
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                      <h3 className="font-bold text-gray-900 mb-3">Client Feedback</h3>
                      <p className="text-gray-700 italic">"{selectedOrder.feedback}"</p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2">
                      <MdDownload className="w-5 h-5" />
                      Download Photos
                    </button>
                    <button className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2">
                      <MdVisibility className="w-5 h-5" />
                      View Gallery
                    </button>
                  </div>
                </>
              )}

              {/* Cancellation Details (for cancelled orders) */}
              {selectedOrder.status === 'Cancelled' && (
                <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                  <h3 className="font-bold text-gray-900 mb-3">Cancellation Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Cancelled On:</span>
                      <span className="font-semibold">{selectedOrder.cancellationDate}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-600">Reason:</span>
                      <p className="font-semibold text-gray-900">{selectedOrder.cancellationReason}</p>
                    </div>
                  </div>
                </div>  
                )}
                {selectedOrder.status === 'Disputed' && (
                <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                  <h3 className="font-bold text-gray-900 mb-3">Dispute Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Disputed On:</span>
                      <span className="font-semibold">{selectedOrder.cancellationDate}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-600">Reason:</span>
                      <p className="font-semibold text-gray-900">{selectedOrder.cancellationReason}</p>
                    </div>
                  </div>
                </div>  
                )}
            </div>
            </div>
        </div>
      )}
    </div>
  );
}