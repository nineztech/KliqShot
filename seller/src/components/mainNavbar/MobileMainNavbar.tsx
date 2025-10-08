'use client';

import React, { useState } from 'react';
import { Search, Menu, Sun, Bell} from 'lucide-react';
import { useSidebar } from '../Sidebar/SidebarContext'; // Import the context
 
export default function DesktopMainNavbar() {
  const { isMinimized, toggleSidebar } = useSidebar(); // Get the state and toggle function

  return (
    <nav 
      className="bg-white border-b border-gray-200 px-6 py-4 fixed top-0 right-0 z-10 transition-all duration-300"
      style={{ left: isMinimized ? '5rem' : '16rem' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="relative">
           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
           <input
             type="text"
             placeholder="Search"
             className="pl-10 pr-4 py-2 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-80"
           />
         </div>
        </div>

       <div className="flex items-center gap-4">
         <button className="p-2 hover:bg-gray-100 rounded-lg transition">
           <Sun className="w-5 h-5 text-gray-600" />
         </button>

        <button className="w-12 h-6 bg-indigo-600 rounded-full relative">
          <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition"></div>
         </button>

         <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
           <Bell className="w-5 h-5 text-gray-600" />
           <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

       <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
           <span className="text-sm font-medium text-gray-700">Jenny</span>
           <img
             src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
            alt="Profile"
             className="w-10 h-10 rounded-full object-cover"
           />
         </div>
         </div>
      </div>
   </nav>
   );
};