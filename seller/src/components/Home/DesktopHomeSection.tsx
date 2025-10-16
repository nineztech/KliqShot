'use client';

import React from 'react';
import { ChevronDown, MoreVertical } from 'lucide-react';
import {MdHome} from 'react-icons/md';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSidebar } from '@/components/Sidebar/SidebarContext';
import Home from '@/app/page';

export default function DesktopHomeSection() {
  const { isMinimized } = useSidebar();

  const earningsData = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 45 },
    { month: 'Mar', value: 55 },
    { month: 'Apr', value: 35 },
    { month: 'May', value: 60 },
    { month: 'Jun', value: 50 },
    { month: 'Jul', value: 55 },
    { month: 'Aug', value: 45 },
    { month: 'Sep', value: 60 },
    { month: 'Okt', value: 50 },
    { month: 'Nov', value: 65 },
    { month: 'Dec', value: 70 },
  ];

  const categories = [
    { name: 'Healthcare', percentage: 40, color: 'bg-indigo-600' },
    { name: 'Fashion', percentage: 30, color: 'bg-indigo-400' },
    { name: 'Otomotif', percentage: 20, color: 'bg-gray-300' },
    { name: 'Electronic', percentage: 10, color: 'bg-gray-200' },
  ];

  const products = [
    { id: 1, name: "Women's Sock", price: 2.3, stock: 100, active: true, image: '👜' },
    { id: 2, name: 'Smart Watch', price: 5.0, stock: 50, active: false, image: '⌚' },
  ];

  const messages = [
    { id: 1, name: 'Stephanie', message: 'Hi, can the product be free shipping?', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', time: '2m' },
    { id: 2, name: 'Cameron Williamson', message: 'Hi, can the product be free shipping?', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', time: '5m' },
    { id: 3, name: 'Kathryn Murphy', message: 'Hi, can the product be free shipping?', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100', time: '10m' },
  ];

  return (
    <div 
      className="mt-20 p-8 bg-gray-50 min-h-screen transition-all duration-300"
      style={{ marginLeft: isMinimized ? '5rem' : '16rem' }}
    ><style>{`
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

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
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

        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out forwards;
        }

        @media (max-width: 768px) {
          .portfolio-container {
            margin-left: 0 !important;
            width: 100% !important;
          }
        }
      `}</style>

      <div className="mb-6 md:mb-8 opacity-0 animate-fadeInDown"> 
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-900 rounded-2xl flex items-center justify-center shadow-xl">
                 <MdHome className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-xs md:text-sm lg:text-base text-gray-600 flex items-center gap-2 mt-1">
                  Your space to manage photos, sales, and earnings.
                </p>
              </div>
            </div>
          </div>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Earnings Overview</h2>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition">3 M</button>
              <button className="px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition">6 M</button>
              <button className="px-4 py-1.5 text-sm bg-indigo-600 text-white rounded-lg">12 M</button>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#4f46e5" 
                strokeWidth={3}
                dot={{ fill: '#4f46e5', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Product Category</h2>
          
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="96" cy="96" r="80" fill="none" stroke="#e5e7eb" strokeWidth="32" />
              <circle cx="96" cy="96" r="80" fill="none" stroke="#4f46e5" strokeWidth="32" 
                strokeDasharray="502" strokeDashoffset="200" strokeLinecap="round" />
              <circle cx="96" cy="96" r="80" fill="none" stroke="#818cf8" strokeWidth="32" 
                strokeDasharray="502" strokeDashoffset="350" strokeLinecap="round" />
            </svg>
          </div>

          <div className="space-y-3">
            {categories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                  <span className="text-sm text-gray-700">{category.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-800">{category.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">All Products</h2>
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
              Sort by <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-12 gap-4 mb-4 text-sm font-medium text-gray-600 pb-3 border-b">
            <div className="col-span-5">Info Products</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2">Stock</div>
            <div className="col-span-2">Active</div>
            <div className="col-span-1"></div>
          </div>

          {products.map((product) => (
            <div key={product.id} className="grid grid-cols-12 gap-4 items-center py-4 border-b border-gray-100 last:border-0">
              <div className="col-span-5 flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-xl">
                  {product.image}
                </div>
                <span className="text-sm font-medium text-gray-800">{product.name}</span>
              </div>
              <div className="col-span-2 text-sm text-gray-700">${product.price}</div>
              <div className="col-span-2 text-sm text-gray-700">{product.stock}</div>
              <div className="col-span-2">
                <button className={`w-12 h-6 rounded-full relative transition ${
                  product.active ? 'bg-indigo-600' : 'bg-gray-300'
                }`}>
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition ${
                    product.active ? 'right-0.5' : 'left-0.5'
                  }`}></div>
                </button>
              </div>
              <div className="col-span-1 flex justify-end">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-indigo-600 text-white p-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Direct Message</h2>
            <ChevronDown className="w-5 h-5" />
          </div>

          <div className="p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3">
                <img src={msg.avatar} alt={msg.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-800">{msg.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{msg.message}</p>
                </div>
                <span className="text-xs text-gray-400">{msg.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}