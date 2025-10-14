import React, { useState } from 'react';
import { FileText, Download, User, Calendar, FileSpreadsheet, Edit2 } from 'lucide-react';
 
import {useSidebar} from '@/components/Sidebar/SidebarContext';
interface Document {
  id: string;
  name: string;
  date: string;
  status: 'active' | 'inactive';
}

interface Appointment {
  date: string;
  time: string;
  type: string;
  doctor: string;
  status: 'confirmed' | 'pending';
}

// Import your actual sidebar context
// import { useSidebar } from '@/components/Sidebar/SidebarContext';

const UserProfile: React.FC = () => {
 const { isMinimized } = useSidebar();
  const [activeTab, setActiveTab] = useState('appointments');

  const appointments: Appointment[] = [
    {
      date: '26 Mei 2025',
      time: '10:00',
      type: 'Cardiology',
      doctor: 'Dr.Smith',
      status: 'confirmed'
    },
    {
      date: '27 Dec 2024',
      time: '14:00',
      type: 'Teeth',
      doctor: 'Dr.Williams',
      status: 'confirmed'
    }
  ];

  const documents: Document[] = [
    { id: '1', name: 'Chest X-Ray Result.pdf', date: '28 Mar 2025', status: 'active' },
    { id: '2', name: 'Lipnea Lab Result.pdf', date: '28 Mar 2025', status: 'inactive' },
    { id: '3', name: 'Blood Lab Result.pdf', date: '28 Mar 2025', status: 'inactive' },
    { id: '4', name: 'Chest X-Ray Result.pdf', date: '28 Mar 2025', status: 'inactive' }
  ];

  const notes = [
    { title: 'Note 01-05-24.txt.pdf', date: '28 Mar 2025' },
    { title: 'Note 01-05-24.p.pdf', date: '28 Mar 2025' }
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
        {/* Header */}
        <div className="mb-6 md:mb-8 opacity-0 animate-fadeInDown">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-900 rounded-2xl flex items-center justify-center shadow-xl">
                <User className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">User Profile</h1>
                <p className="text-xs md:text-sm lg:text-base text-gray-600 flex items-center gap-2 mt-1">
                  Manage your personal information and appointments
                </p>
              </div>
            </div>
          </div>
        </div>
        

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section - User Info */}
          <div className="lg:col-span-1 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-gray-100 group-hover:ring-cyan-200 transition-all duration-300"
                  />
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                </div>
                
                <h2 className="mt-4 text-xl font-semibold text-gray-900">Irene Phyton</h2>
                <p className="text-sm text-gray-500">irene.phyton@gmail.com</p>
                <p className="text-sm text-gray-500 mt-1 flex items-center">
                  <span className="mr-1">📍</span>Jakarta, Indonesia
                </p>
                
                <button className="mt-4 w-full py-2.5 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium flex items-center justify-center">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="mt-6 space-y-2">
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`w-full py-2.5 px-4 rounded-xl text-left transition-all duration-200 flex items-center ${
                    activeTab === 'personal'
                      ? 'bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-600 font-medium shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <User className="w-4 h-4 mr-3" />
                  Personal Information
                </button>
                <button
                  onClick={() => setActiveTab('appointments')}
                  className={`w-full py-2.5 px-4 rounded-xl text-left transition-all duration-200 flex items-center ${
                    activeTab === 'appointments'
                      ? 'bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-600 font-medium shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Calendar className="w-4 h-4 mr-3" />
                  Appointments
                </button>
                <button
                  onClick={() => setActiveTab('records')}
                  className={`w-full py-2.5 px-4 rounded-xl text-left transition-all duration-200 flex items-center ${
                    activeTab === 'records'
                      ? 'bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-600 font-medium shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FileSpreadsheet className="w-4 h-4 mr-3" />
                  Medical Records
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* General Information */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
                <h3 className="text-lg md:text-xl font-bold text-gray-900">General Information</h3>
                <button className="text-cyan-500 hover:text-cyan-600 text-sm font-medium hover:underline flex items-center self-start sm:self-auto">
                  <Edit2 className="w-3 h-3 mr-1" />
                  Edit
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-4 md:gap-y-5">
                <div className="group">
                  <p className="text-xs md:text-sm text-gray-500 mb-1">Date of Birth</p>
                  <p className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-cyan-600 transition-colors">July 28, 2000</p>
                </div>
                <div className="group">
                  <p className="text-xs md:text-sm text-gray-500 mb-1">Gender</p>
                  <p className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-cyan-600 transition-colors">Female</p>
                </div>
                <div className="group">
                  <p className="text-xs md:text-sm text-gray-500 mb-1">Phone Number</p>
                  <p className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-cyan-600 transition-colors">+123 456 7890</p>
                </div>
                <div className="group">
                  <p className="text-xs md:text-sm text-gray-500 mb-1">Blood Type</p>
                  <p className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-cyan-600 transition-colors">O+</p>
                </div>
                <div className="group">
                  <p className="text-xs md:text-sm text-gray-500 mb-1">Address</p>
                  <p className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-cyan-600 transition-colors">Srengseng, Kec Kb, Jakarta</p>
                </div>
                <div className="group">
                  <p className="text-xs md:text-sm text-gray-500 mb-1">Insurance Provider</p>
                  <p className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-cyan-600 transition-colors">2365846</p>
                </div>
              </div>
            </div>

            {/* Appointments Section */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
                <h3 className="text-lg md:text-xl font-bold text-gray-900">Appointments</h3>
                <button className="text-cyan-500 hover:text-cyan-600 text-sm font-medium hover:underline self-start sm:self-auto">
                  View All
                </button>
              </div>

              <div className="space-y-3 md:space-y-4">
                {appointments.map((apt, idx) => (
                  <div 
                    key={idx} 
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 md:p-4 border-2 border-gray-200 rounded-xl hover:border-cyan-300 hover:shadow-md transition-all duration-200 gap-3 opacity-0 animate-fadeInLeft"
                    style={{ animationDelay: `${0.4 + idx * 0.1}s` }}
                  >
                    <div className="flex items-center gap-3 md:gap-4 flex-1">
                      <div className="text-center bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-2 md:p-3 min-w-[60px] md:min-w-[70px]">
                        <p className="text-xs text-gray-500">{apt.date.split(' ')[1]}</p>
                        <p className="text-lg md:text-xl font-bold text-gray-900">{apt.date.split(' ')[0]}</p>
                        <p className="text-xs text-gray-500">{apt.date.split(' ')[2]}</p>
                      </div>
                      <div className="h-12 w-px bg-gray-200 hidden sm:block"></div>
                      <div className="flex-1">
                        <p className="text-sm md:text-base font-semibold text-gray-900">{apt.time}</p>
                        <p className="text-xs md:text-sm text-gray-500">{apt.type}</p>
                        <p className="text-xs md:text-sm text-gray-600 mt-1">{apt.doctor}</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs md:text-sm rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg font-medium self-start sm:self-auto">
                      {apt.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Files Section */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
                <h3 className="text-lg md:text-xl font-bold text-gray-900">Files</h3>
                <button className="text-cyan-500 hover:text-cyan-600 text-sm font-medium hover:underline self-start sm:self-auto">
                  View All
                </button>
              </div>

              <div className="space-y-2 md:space-y-3">
                {documents.map((doc, idx) => (
                  <div 
                    key={doc.id} 
                    className="flex items-center justify-between p-3 md:p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-red-50 rounded-xl transition-all duration-200 border border-transparent hover:border-red-200 opacity-0 animate-fadeInLeft"
                    style={{ animationDelay: `${0.6 + idx * 0.05}s` }}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                        <FileText className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm md:text-base font-semibold text-gray-900 truncate">{doc.name}</p>
                        <p className="text-xs md:text-sm text-gray-500">{doc.date}</p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-red-100 rounded-lg transition-colors flex-shrink-0 ml-2">
                      <Download className="w-4 h-4 md:w-5 md:h-5 text-gray-500 hover:text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes Section */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
                <h3 className="text-lg md:text-xl font-bold text-gray-900">Notes</h3>
                <button className="text-cyan-500 hover:text-cyan-600 text-sm font-medium hover:underline self-start sm:self-auto">
                  View All
                </button>
              </div>

              <div className="space-y-2 md:space-y-3">
                {notes.map((note, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center justify-between p-3 md:p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 rounded-xl transition-all duration-200 border border-transparent hover:border-blue-200 opacity-0 animate-fadeInLeft"
                    style={{ animationDelay: `${0.8 + idx * 0.05}s` }}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                        <FileText className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm md:text-base font-semibold text-gray-900 truncate">{note.title}</p>
                        <p className="text-xs md:text-sm text-gray-500">{note.date}</p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors flex-shrink-0 ml-2">
                      <Download className="w-4 h-4 md:w-5 md:h-5 text-gray-500 hover:text-blue-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;