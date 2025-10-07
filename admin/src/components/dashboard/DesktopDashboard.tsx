'use client';

import { 
  MdDashboard, 
  MdPeople, 
  MdCameraAlt, 
  MdBarChart,
  MdAdd,
  MdEdit,
  MdDelete,
  MdVisibility,
  MdTrendingUp,
  MdTrendingDown,
  MdArrowUpward,
  MdArrowDownward
} from 'react-icons/md';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import CategoryManagement from '../category';
import PhotographerManagement from '../photographer';

interface DesktopDashboardProps {
  activeTab: string;
}

export default function DesktopDashboard({ activeTab }: DesktopDashboardProps) {
  const [categories, setCategories] = useState([
    {
      id: '1',
      name: 'Wedding & Pre-Wedding',
      description: 'Capture your special day',
      photographerCount: 420,
      subCategories: [
        { id: '1-1', name: 'Haldi', photographerCount: 45 },
        { id: '1-2', name: 'Mehendi', photographerCount: 38 },
        { id: '1-3', name: 'Reception', photographerCount: 67 }
      ]
    },
    {
      id: '2',
      name: 'Portrait & Portfolio',
      description: 'Professional headshots & portraits',
      photographerCount: 380,
      subCategories: [
        { id: '2-1', name: 'Headshots', photographerCount: 78 },
        { id: '2-2', name: 'Portfolio', photographerCount: 65 }
      ]
    }
  ]);

  const [photographers, setPhotographers] = useState([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 234 567 8900',
      location: 'New York, NY',
      specialty: 'Wedding Photography',
      rating: 4.9,
      reviews: 156,
      price: '₹15,000',
      experience: '5+ years',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      status: 'active' as 'active' | 'inactive' | 'pending',
      joinDate: '2023-01-15',
      categories: ['wedding', 'portrait']
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 987 654 3210',
      location: 'Mumbai, India',
      specialty: 'Haldi Photography',
      rating: 4.8,
      reviews: 203,
      price: '₹12,000',
      experience: '7+ years',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      status: 'active' as 'active' | 'inactive' | 'pending',
      joinDate: '2023-02-20',
      categories: ['wedding', 'events']
    }
  ]);

  // Chart data
  const bookingData = [
    { name: 'Jan', bookings: 65, revenue: 12000 },
    { name: 'Feb', bookings: 78, revenue: 15000 },
    { name: 'Mar', bookings: 92, revenue: 18000 },
    { name: 'Apr', bookings: 85, revenue: 16000 },
    { name: 'May', bookings: 110, revenue: 22000 },
    { name: 'Jun', bookings: 125, revenue: 25000 },
    { name: 'Jul', bookings: 140, revenue: 28000 },
    { name: 'Aug', bookings: 135, revenue: 27000 },
    { name: 'Sep', bookings: 150, revenue: 30000 },
    { name: 'Oct', bookings: 165, revenue: 33000 },
    { name: 'Nov', bookings: 180, revenue: 36000 },
    { name: 'Dec', bookings: 200, revenue: 40000 }
  ];

  const categoryData = [
    { name: 'Wedding', value: 45, color: '#8B5CF6' },
    { name: 'Portrait', value: 25, color: '#06B6D4' },
    { name: 'Event', value: 20, color: '#10B981' },
    { name: 'Commercial', value: 10, color: '#F59E0B' }
  ];

  const userGrowthData = [
    { name: 'Week 1', users: 120, photographers: 45 },
    { name: 'Week 2', users: 180, photographers: 62 },
    { name: 'Week 3', users: 250, photographers: 78 },
    { name: 'Week 4', users: 320, photographers: 95 }
  ];

  const stats = [
    { 
      title: 'Total Categories', 
      value: categories.length, 
      icon: MdDashboard, 
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      change: '+12%',
      trend: 'up'
    },
    { 
      title: 'Total Photographers', 
      value: 1247, 
      icon: MdCameraAlt, 
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      change: '+8%',
      trend: 'up'
    },
    { 
      title: 'Total Users', 
      value: 3421, 
      icon: MdPeople, 
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      change: '+15%',
      trend: 'up'
    },
    { 
      title: 'Total Bookings', 
      value: 892, 
      icon: MdBarChart, 
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
      change: '+23%',
      trend: 'up'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Animated Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    <div className="relative p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                          <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value.toLocaleString()}</p>
                          <div className="flex items-center space-x-1">
                            {stat.trend === 'up' ? (
                              <MdTrendingUp className="w-4 h-4 text-green-500" />
                            ) : (
                              <MdTrendingDown className="w-4 h-4 text-red-500" />
                            )}
                            <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                              {stat.change}
                            </span>
                            <span className="text-sm text-gray-500">vs last month</span>
                          </div>
                        </div>
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Booking Trends Chart */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Booking Trends</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Bookings</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={bookingData}>
                    <defs>
                      <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: 'none', 
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="bookings" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorBookings)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Category Distribution */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Category Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: 'none', 
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {categoryData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-600">{item.name}</span>
                      <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* User Growth Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">User Growth</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Users</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Photographers</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={userGrowthData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: 'none', 
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }} 
                  />
                  <Bar dataKey="users" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="photographers" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  {
                    icon: MdAdd,
                    title: "New category added",
                    description: "Wedding Photography category was created",
                    time: "2 hours ago",
                    color: "blue",
                    bgColor: "bg-blue-50"
                  },
                  {
                    icon: MdPeople,
                    title: "New photographer registered",
                    description: "Sarah Johnson joined the platform",
                    time: "4 hours ago",
                    color: "green",
                    bgColor: "bg-green-50"
                  },
                  {
                    icon: MdBarChart,
                    title: "Monthly report generated",
                    description: "December analytics report is ready",
                    time: "6 hours ago",
                    color: "purple",
                    bgColor: "bg-purple-50"
                  }
                ].map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className={`w-12 h-12 ${activity.bgColor} rounded-full flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 text-${activity.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                      </div>
                      <span className="text-sm text-gray-500 font-medium">{activity.time}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        );
      
      case 'categories':
        return <CategoryManagement categories={categories} setCategories={setCategories} />;
      
      case 'photographers':
        return <PhotographerManagement photographers={photographers} setPhotographers={setPhotographers} />;
      
      case 'users':
        return (
          <div className="admin-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Users Management</h2>
              <button className="admin-button-primary">
                <MdAdd className="w-4 h-4 mr-2" />
                Add User
              </button>
            </div>
            <p className="text-gray-600">User management interface coming soon...</p>
          </div>
        );
      
      case 'analytics':
        return (
          <div className="admin-card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Analytics Dashboard</h2>
            <p className="text-gray-600">Analytics dashboard coming soon...</p>
          </div>
        );
      
      case 'notifications':
        return (
          <div className="admin-card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Notifications</h2>
            <p className="text-gray-600">Notification management coming soon...</p>
          </div>
        );
      
      case 'settings':
        return (
          <div className="admin-card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Settings</h2>
            <p className="text-gray-600">Settings panel coming soon...</p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="admin-main p-8 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
}
