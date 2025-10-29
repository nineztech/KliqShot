'use client';

import { 
  MdCheckCircle,
  MdPending,
  MdAttachMoney,
  MdTrendingUp,
  MdCalendarToday,
  MdPerson,
  MdSearch,
  MdFilterList,
  MdMoreVert,
  MdDialerSip
} from 'react-icons/md';
import { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { useSidebar } from '@/components/Sidebar/SidebarContext';
import { Wallet } from 'lucide-react';

export default function WalletPage() {
  const { isMinimized } = useSidebar();
  const [activeTab, setActiveTab] = useState('all');

  // Revenue trend data
  const revenueData = [
    { name: 'Jan', revenue: 15000 },
    { name: 'Feb', revenue: 18000 },
    { name: 'Mar', revenue: 12000 },
    { name: 'Apr', revenue: 19000 },
    { name: 'May', revenue: 10000 },
    { name: 'Jun', revenue: 28000 }
  ];

  // Payment stats
  const stats = [
    { 
      title: 'Total Revenue', 
      value: '1274', 
      icon: MdAttachMoney, 
      gradient: 'from-teal-400 to-emerald-500',
      bgGradient: 'from-teal-40 to-emerald-50',
      change: '+23.5%',
      trend: 'up'
    },
    { 
      title: 'Successful Payments', 
      value: 1847, 
      icon: MdCheckCircle, 
      gradient: 'from-violet-500 to-sky-600',
      bgGradient: 'from-violet-50 to-sky-60',
      change: '+18%',
      trend: 'up'
    },
    { 
      title: 'Pending Payments', 
      value: 143, 
      icon: MdPending, 
      gradient: 'from-amber-500 to-orange-600',
      bgGradient: 'from-amber-50 to-orange-60',
      change: '-5%',
      trend: 'down'
    },
    { 
      title: 'Disputed Payments', 
      value: 283, 
      icon: MdDialerSip, 
      gradient: 'from-pink-500 to-rose-600',
      bgGradient: 'from-pink-50 to-rose-60',
      change: '-7%',
      trend: 'down'
    },
  ];

  // Successful payments data
  const successfulPayments = [
    {
      id: 'PAY-2024-001',
      photographer: 'Sarah Joshi',
      client: 'Michael Chen',
      amount: 450,
      date: '2025-10-09',
      time: '10:30 AM',
      method: 'Credit Card',
      category: 'Wedding'
    },
    {
      id: 'PAY-2024-002',
      photographer: 'David Kumar',
      client: 'Emma Wilson',
      amount: 280,
      date: '2025-10-09',
      time: '09:15 AM',
      method: 'PayPal',
      category: 'Portrait'
    },
    {
      id: 'PAY-2024-003',
      photographer: 'Lisa Kumari',
      client: 'James Taylor',
      amount: 650,
      date: '2025-10-08',
      time: '03:45 PM',
      method: 'Credit Card',
      category: 'Event'
    },
    {
      id: 'PAY-2024-004',
      photographer: 'Narendra Modi',
      client: 'Sophia Davis',
      amount: 320,
      date: '2025-10-08',
      time: '11:20 AM',
      method: 'Debit Card',
      category: 'Commercial'
    },
    {
      id: 'PAY-2024-005',
      photographer: 'Amit Shah',
      client: 'Daniel Brown',
      amount: 890,
      date: '2025-10-07',
      time: '02:00 PM',
      method: 'Bank Transfer',
      category: 'Wedding'
    }
  ];

  // Pending payments data
  const pendingPayments = [
    {
      id: 'PAY-2024-101',
      photographer: 'Mark Thompson',
      client: 'Olivia Garcia',
      amount: 550,
      date: '2025-10-09',
      time: '08:00 AM',
      method: 'Credit Card',
      category: 'Wedding',
      reason: 'Payment processing'
    },
    {
      id: 'PAY-2024-102',
      photographer: 'Amanda White',
      client: 'William Johnson',
      amount: 380,
      date: '2025-10-08',
      time: '04:30 PM',
      method: 'PayPal',
      category: 'Portrait',
      reason: 'Awaiting confirmation'
    },
    {
      id: 'PAY-2024-103',
      photographer: 'Chris Miller',
      client: 'Ava Martinez',
      amount: 720,
      date: '2025-10-08',
      time: '01:15 PM',
      method: 'Bank Transfer',
      category: 'Event',
      reason: 'Bank verification'
    },
    {
      id: 'PAY-2024-104',
      photographer: 'Jessica Moore',
      client: 'Ethan Anderson',
      amount: 420,
      date: '2025-10-07',
      time: '10:45 AM',
      method: 'Credit Card',
      category: 'Commercial',
      reason: 'Payment processing'
    }
  ];

   

  return (
    <div 
      className="mt-20 p-6 md:p-8 bg-gray-50 min-h-screen transition-all duration-300"
      style={{ marginLeft: isMinimized ? '5rem' : '16rem' }}
    >
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
         <div className="mb-6 md:mb-8 opacity-0 animate-fadeInDown">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-900 rounded-2xl flex items-center justify-center shadow-xl">
                <Wallet className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">Wallet & Payment's</h1>
                <p className="text-xs md:text-sm lg:text-base text-gray-600 flex items-center gap-2 mt-1">
                  Manage and track all payment transactions
                </p>
              </div>
            </div>
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
                      <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                      <div className="flex items-center space-x-1">
                        <MdTrendingUp className={`w-3 h-3 md:w-4 md:h-4 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                        <span className={`text-xs md:text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.change}
                        </span>
                        <span className="text-xs md:text-sm text-gray-500">vs last month</span>
                      </div>
                    </div>
                   <div
  className={`relative z-20 p-2 md:p-3 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
>
  <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
</div>


                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100 mb-6 md:mb-8 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
              <YAxis axisLine={false} tickLine={false} fontSize={12} />
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: 'none', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden opacity-0 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          <div className="flex overflow-x-auto border-b border-gray-200">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 min-w-max px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-semibold transition-colors duration-200 ${
                activeTab === 'all'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              All Payments ({successfulPayments.length + pendingPayments.length})
            </button>
            <button
              onClick={() => setActiveTab('successful')}
              className={`flex-1 min-w-max px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-semibold transition-colors duration-200 ${
                activeTab === 'successful'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Successful ({successfulPayments.length})
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`flex-1 min-w-max px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-semibold transition-colors duration-200 ${
                activeTab === 'pending'
                  ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Pending ({pendingPayments.length})
            </button>
          </div>

          {/* Search and Filter */}
          <div className="p-4 md:p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <div className="flex-1 relative">
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                <input
                  type="text"
                  placeholder="Search by ID, photographer, or client..."
                  className="w-full pl-9 md:pl-10 pr-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <MdFilterList className="w-4 h-4 md:w-5 md:h-5 mr-2 text-gray-600" />
                <span className="font-medium text-sm md:text-base text-gray-700">Filters</span>
              </button>
            </div>
          </div>

          {/* Successful Payments */}
          {(activeTab === 'all' || activeTab === 'successful') && (
            <div className="p-4 md:p-6">
              <div className="space-y-3 md:space-y-4">
                {successfulPayments.map((payment, index) => (
                  <div
                    key={payment.id}
                    className="flex flex-col md:flex-row md:items-center md:justify-between p-3 md:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 border border-gray-200 hover:translate-x-1 opacity-0 animate-fadeInLeft gap-3 md:gap-0"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-center space-x-3 md:space-x-4 flex-1">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <MdCheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <p className="font-semibold text-sm md:text-base text-gray-900">{payment.id}</p>
                          
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs md:text-sm text-gray-600">
                          <span className="flex items-center">
                            <MdPerson className="w-3 h-3 md:w-4 md:h-4 mr-1 flex-shrink-0" />
                            <span className="truncate">{payment.photographer} → {payment.client}</span>
                          </span>
                          <span className="flex items-center">
                            <MdCalendarToday className="w-3 h-3 md:w-4 md:h-4 mr-1 flex-shrink-0" />
                            {payment.date} at {payment.time}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-gray-500 mt-1">
                          <span>{payment.method}</span>
                          <span>•</span>
                          <span>{payment.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end md:space-x-4">
                      <div className="text-left md:text-right">
                        <p className="text-xl md:text-2xl font-bold text-gray-900">${payment.amount}</p>
                      </div>
                      <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200">
                        <MdMoreVert className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pending Payments */}
          {(activeTab === 'all' || activeTab === 'pending') && (
            <div className={`p-4 md:p-6 ${activeTab === 'all' ? 'border-t border-gray-200' : ''}`}>
              <div className="space-y-3 md:space-y-4">
                {pendingPayments.map((payment, index) => (
                  <div
                    key={payment.id}
                    className="flex flex-col md:flex-row md:items-center md:justify-between p-3 md:p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-all duration-200 border border-orange-200 hover:translate-x-1 opacity-0 animate-fadeInLeft gap-3 md:gap-0"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-center space-x-3 md:space-x-4 flex-1">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <MdPending className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <p className="font-semibold text-sm md:text-base text-gray-900">{payment.id}</p>
                          
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs md:text-sm text-gray-600">
                          <span className="flex items-center">
                            <MdPerson className="w-3 h-3 md:w-4 md:h-4 mr-1 flex-shrink-0" />
                            <span className="truncate">{payment.photographer} → {payment.client}</span>
                          </span>
                          <span className="flex items-center">
                            <MdCalendarToday className="w-3 h-3 md:w-4 md:h-4 mr-1 flex-shrink-0" />
                            {payment.date} at {payment.time}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-gray-500 mt-1">
                          <span>{payment.method}</span>
                          <span>•</span>
                          <span>{payment.category}</span>
                          <span>•</span>
                          <span className="text-orange-600 font-medium">{payment.reason}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end md:space-x-4">
                      <div className="text-left md:text-right">
                        <p className="text-xl md:text-2xl font-bold text-gray-900">${payment.amount}</p>
                      </div>
                      <button className="p-2 hover:bg-orange-200 rounded-lg transition-colors duration-200">
                        <MdMoreVert className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}