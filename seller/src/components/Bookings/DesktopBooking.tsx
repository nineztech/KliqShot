'use client';

import { useState } from 'react';
import {
  MdCalendarToday,
  MdPerson,
  MdCheckCircle,
  MdPending,
  MdCancel,
  MdGroup,
  MdAdd,
  MdSearch,
  MdFilterList,
  MdMoreVert,
  MdCamera,
  MdLocationOn,
  MdAccessTime,
  MdEvent,
  MdAssignment,
} from 'react-icons/md';
import { Calendar } from 'lucide-react';
import { useSidebar } from '../Sidebar/SidebarContext';

export default function BookingManagement() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>([]);
  const { isMinimized } = useSidebar();
  
  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Team form state
  const [teamForm, setTeamForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    designation: '',
    category: '',
    experience: ''
  });

  const handleTeamFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTeamForm({
      ...teamForm,
      [e.target.name]: e.target.value
    });
  };

  const handleTeamFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New team member:', teamForm);
    // Add your submission logic here
    setShowTeamModal(false);
    setTeamForm({
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      designation: '',
      category: '',
      experience: ''
    });
  };

  // Stats data
  const stats = [
    {
      title: 'Upcoming Bookings',
      value: 24,
      icon: MdEvent,
      gradient: 'from-orange-500 to-yellow-500',
      bgGradient: 'from-orange-50 to-yellow-50',
      change: '+12%',
    },
    {
      title: 'Completed',
      value: 156,
      icon: MdCheckCircle,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      change: '+8%',
    },
    {
      title: 'Team Members',
      value: 8,
      icon: MdGroup,
      gradient: 'from-rose-500 to-pink-500',
      bgGradient: 'from-rose-50 to-pink-50',
      change: '+2',
    },
  ];

  // Team members
  const teamMembers = [
    { id: 1, name: 'You (Owner)', role: 'Lead Photographer', availability: 'Available', bookings: 12 },
    { id: 2, name: 'Sarah Joshi', role: 'Lead Photographer' , availability: 'Available', bookings: 12 },
    { id: 3, name: 'David Kumar', role: 'Wedding Specialist' , availability: 'Busy', bookings: 8 },
    { id: 4, name: 'Lisa Kumari', role: 'Portrait Expert' , availability: 'Available', bookings: 15 },
    { id: 5, name: 'Mark Wilson', role: 'Event Photographer',  availability: 'Available', bookings: 10 },
  ];

  // Upcoming bookings
  const upcomingBookings = [
    {
      id: 'BK-2024-001',
      client: 'Michael Chen',
      type: 'Wedding Photography',
      date: '2025-10-18',
      time: '10:00 AM - 6:00 PM',
      location: 'Grand Hotel, Ahmedabad',
      assignedTo: 'Sarah Joshi',
      status: 'Confirmed',
      amount: 850,
      slots: 8,
    },
    {
      id: 'BK-2024-002',
      client: 'Emma Wilson',
      type: 'Portrait Session',
      date: '2025-10-16',
      time: '2:00 PM - 4:00 PM',
      location: 'Studio A',
      assignedTo: 'Lisa Kumari',
      status: 'Confirmed',
      amount: 280,
      slots: 2,
    },
    {
      id: 'BK-2024-003',
      client: 'James Taylor',
      type: 'Corporate Event',
      date: '2025-10-20',
      time: '9:00 AM - 5:00 PM',
      location: 'Tech Park, Gujarat',
      assignedTo: 'Mark Wilson',
      status: 'Pending',
      amount: 650,
      slots: 8,
    },
    {
      id: 'BK-2024-004',
      client: 'Sophia Davis',
      type: 'Product Photography',
      date: '2025-10-17',
      time: '11:00 AM - 1:00 PM',
      location: 'Studio B',
      assignedTo: 'David Kumar',
      status: 'Confirmed',
      amount: 320,
      slots: 2,
    },
  ];

  // Booking history
  const bookingHistory = [
    {
      id: 'BK-2024-095',
      client: 'Daniel Brown',
      type: 'Wedding Photography',
      date: '2025-10-12',
      time: '10:00 AM - 8:00 PM',
      location: 'Palace Grounds, Ahmedabad',
      assignedTo: 'Sarah Joshi',
      status: 'Completed',
      amount: 890,
    },
    {
      id: 'BK-2024-094',
      client: 'Olivia Garcia',
      type: 'Family Portrait',
      date: '2025-10-10',
      time: '3:00 PM - 5:00 PM',
      location: 'Park Avenue',
      assignedTo: 'Lisa Kumari',
      status: 'Completed',
      amount: 250,
    },
    {
      id: 'BK-2024-093',
      client: 'William Johnson',
      type: 'Birthday Party',
      date: '2025-10-08',
      time: '4:00 PM - 8:00 PM',
      location: 'Party Hall, Satellite',
      assignedTo: 'Mark Wilson',
      status: 'Completed',
      amount: 380,
    },
    {
      id: 'BK-2024-092',
      client: 'Ava Martinez',
      type: 'Corporate Event',
      date: '2025-10-05',
      time: '9:00 AM - 6:00 PM',
      location: 'Business Center',
      assignedTo: 'David Kumar',
      status: 'Cancelled',
      amount: 720,
    },
  ];

  // Calendar data (October 2025)
  const calendarDays = [];
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Booked dates - dynamically update based on current month/year
  const bookedDates: Record<string, { slots: number; type: string }> = {
    '2025-11-16': { slots: 4, type: 'Portrait' },
    '2025-10-17': { slots: 2, type: 'Product' },
    '2025-10-18': { slots: 8, type: 'Wedding' },
    '2025-10-20': { slots: 8, type: 'Event' },
    '2025-10-25': { slots: 4, type: 'Portrait' },
    '2025-10-28': { slots: 6, type: 'Wedding' },
  };

  // Generate calendar
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push({ day: null, isBooked: false });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    calendarDays.push({ 
      day: i, 
      isBooked: bookedDates[dateKey] !== undefined,
      slots: bookedDates[dateKey]?.slots || 0,
      type: bookedDates[dateKey]?.type || ''
    });
  }

  // Calendar navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Handle booking actions
  const handleAssignTeam = (booking: any) => {
    setSelectedBooking(booking);
    setSelectedTeamMembers(booking.assignedTeam || []);
    setShowAssignModal(true);
  };

  const handleConfirmBooking = () => {
    if (selectedTeamMembers.length === 0) {
      alert('Please assign at least one team member before confirming the booking.');
      return;
    }
    console.log('Booking confirmed with team:', selectedTeamMembers);
    // Update booking status logic here
    setShowAssignModal(false);
    setSelectedBooking(null);
    setSelectedTeamMembers([]);
    alert('Booking confirmed successfully!');
  };

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      console.log('Booking cancelled:', bookingId);
      // Add cancellation logic here
      alert('Booking cancelled successfully!');
    }
  };

  const toggleTeamMember = (memberName: string) => {
    setSelectedTeamMembers(prev => {
      if (prev.includes(memberName)) {
        return prev.filter(name => name !== memberName);
      } else {
        return [...prev, memberName];
      }
    });
  };

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

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8 opacity-0 animate-fadeInDown">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-900 rounded-2xl flex items-center justify-center shadow-xl">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">Booking Management</h1>
                <p className="text-xs md:text-sm lg:text-base text-gray-600 flex items-center gap-2 mt-1">
                  Manage bookings, calendar, and team assignments
                </p>
              </div>
            </div>
            
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
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
                      <span className="text-xs md:text-sm font-medium text-gray-500">{stat.change} this month</span>
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

        {/* Calendar and Team Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 md:mb-8">
          {/* Calendar */}
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                {monthNames[month]} {year}
              </h3>
              <div className="flex gap-2">
                <button 
                  onClick={goToPreviousMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Previous Month"
                >
                  <span className="text-gray-600 font-bold">←</span>
                </button>
                <button 
                  onClick={goToToday}
                  className="px-3 py-2 hover:bg-blue-50 text-indigo-600 rounded-lg text-sm font-semibold transition-colors"
                  title="Go to Today"
                >
                  Today
                </button>
                <button 
                  onClick={goToNextMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Next Month"
                >
                  <span className="text-gray-600 font-bold">→</span>
                </button>
              </div>
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}
              {calendarDays.map((dayObj, index) => {
                const isToday = dayObj.day === new Date().getDate() && 
                                month === new Date().getMonth() && 
                                year === new Date().getFullYear();
                return (
                  <div
                    key={index}
                    className={`aspect-square flex flex-col items-center justify-center rounded-lg text-sm cursor-pointer transition-all duration-200 ${
                      dayObj.day === null
                        ? 'bg-transparent'
                        : isToday
                        ? 'bg-indigo-600 text-white font-bold hover:bg-indigo-700'
                        : dayObj.isBooked
                        ? 'bg-purple-100 hover:bg-purple-200 border-2 border-purple-500'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => dayObj.day && setSelectedDate(dayObj.day)}
                  >
                    {dayObj.day && (
                      <>
                        <span className={`font-semibold ${
                          isToday 
                            ? 'text-white' 
                            : dayObj.isBooked 
                            ? 'text-purple-700' 
                            : 'text-gray-700'
                        }`}>
                          {dayObj.day}
                        </span>
                        {dayObj.isBooked && !isToday && (
                          <span className="text-xs text-purple-600 font-medium mt-1">
                            {dayObj.slots}h
                          </span>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-indigo-600 rounded"></div>
                <span className="text-gray-600">Today</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-500 rounded border-2 border-purple-500"></div>
                <span className="text-gray-600">Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <span className="text-gray-600">Available</span>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-bold text-gray-900">Team Members</h3>
              <button
                onClick={() => setShowTeamModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-900 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors"
              >
                <MdAdd className="w-4 h-4" />
                Add Member
              </button>
            </div>

            <div className="space-y-3">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 opacity-0 animate-fadeInLeft"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-900 rounded-full flex items-center justify-center text-2xl">
                       <MdPerson className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      member.availability === 'Available' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {member.availability}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{member.bookings} bookings</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bookings Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden opacity-0 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          <div className="flex overflow-x-auto border-b border-gray-200">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 min-w-max px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-semibold transition-colors duration-200 ${
                activeTab === 'upcoming'
                  ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Upcoming Bookings ({upcomingBookings.length})
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 min-w-max px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-semibold transition-colors duration-200 ${
                activeTab === 'history'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Booking History ({bookingHistory.length})
            </button>
          </div>

          {/* Search and Filter */}
          <div className="p-4 md:p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <div className="flex-1 relative">
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                <input
                  type="text"
                  placeholder="Search by booking ID, client, or type..."
                  className="w-full pl-9 md:pl-10 pr-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <MdFilterList className="w-4 h-4 md:w-5 md:h-5 mr-2 text-gray-600" />
                <span className="font-medium text-sm md:text-base text-gray-700">Filters</span>
              </button>
            </div>
          </div>

          {/* Upcoming Bookings */}
          {activeTab === 'upcoming' && (
            <div className="p-4 md:p-6">
              <div className="space-y-4">
                {upcomingBookings.map((booking, index) => (
                  <div
                    key={booking.id}
                    className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl hover:shadow-lg transition-all duration-200 border-2 border-purple-400 opacity-0 animate-fadeInLeft"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                            <MdCamera className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{booking.id}</p>
                            <p className="text-sm text-gray-600">{booking.type}</p>
                          </div>
                          <span className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold ${
                            booking.status === 'Confirmed' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-orange-100 text-orange-700'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 mt-3">
                          <div className="flex items-center gap-2">
                            <MdPerson className="w-4 h-4" />
                            <span>{booking.client}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MdCalendarToday className="w-4 h-4" />
                            <span>{booking.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MdAccessTime className="w-4 h-4" />
                            <span>{booking.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MdLocationOn className="w-4 h-4" />
                            <span>{booking.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mt-3 text-sm">
                          <MdAssignment className="w-4 h-4 text-purple-600" />
                          <span className="text-gray-700">Assigned to:</span>
                          <span className="font-semibold text-purple-600">{booking.assignedTo}</span>
                        </div>
                      </div>

                      <div className="flex flex-row md:flex-col items-center gap-3">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">${booking.amount}</p>
                          <p className="text-xs text-gray-500">{booking.slots} hours</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          {booking.status === 'Pending' ? (
                            <>
                              <button 
                                onClick={() => handleAssignTeam(booking)}
                                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-200 whitespace-nowrap"
                              >
                                Assign & Confirm
                              </button>
                              <button 
                                onClick={() => handleCancelBooking(booking.id)}
                                className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-200"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button 
                                onClick={() => handleAssignTeam(booking)}
                                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-200 whitespace-nowrap"
                              >
                                Reassign Team
                              </button>
                              <button 
                                onClick={() => handleCancelBooking(booking.id)}
                                className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-200"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Booking History */}
          {activeTab === 'history' && (
            <div className="p-4 md:p-6">
              <div className="space-y-4">
                {bookingHistory.map((booking, index) => (
                  <div
                    key={booking.id}
                    className={`p-4 rounded-xl hover:shadow-lg transition-all duration-200 border opacity-0 animate-fadeInLeft ${
                      booking.status === 'Completed'
                        ? 'bg-green-50 border-green-200'
                        : 'bg-red-50 border-red-200'
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            booking.status === 'Completed' ? 'bg-green-600' : 'bg-red-600'
                          }`}>
                            {booking.status === 'Completed' ? (
                              <MdCheckCircle className="w-5 h-5 text-white" />
                            ) : (
                              <MdCancel className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{booking.id}</p>
                            <p className="text-sm text-gray-600">{booking.type}</p>
                          </div>
                          <span className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold ${
                            booking.status === 'Completed' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 mt-3">
                          <div className="flex items-center gap-2">
                            <MdPerson className="w-4 h-4" />
                            <span>{booking.client}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MdCalendarToday className="w-4 h-4" />
                            <span>{booking.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MdAccessTime className="w-4 h-4" />
                            <span>{booking.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MdLocationOn className="w-4 h-4" />
                            <span>{booking.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mt-3 text-sm">
                          <MdAssignment className="w-4 h-4 text-purple-600" />
                          <span className="text-gray-700">Handled by:</span>
                          <span className="font-semibold text-purple-600">{booking.assignedTo}</span>
                        </div>
                      </div>

                      <div className="flex flex-row md:flex-col items-center gap-3">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">${booking.amount}</p>
                        </div>
                        <button className={`p-2 rounded-lg transition-colors duration-200 ${
                          booking.status === 'Completed' ? 'hover:bg-green-200' : 'hover:bg-red-200'
                        }`}>
                          <MdMoreVert className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Team Member Modal */}
      {showTeamModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
             <div className="sticky top-0 bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-900 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Add Team Member</h2>
                  <p className="text-purple-100 mt-1">Fill in the details to add a new photographer</p>
                </div>
                <button
                  onClick={() => setShowTeamModal(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
                >
                  <span className="text-2xl text-black">×</span>
                </button>
              </div>
            </div>
<div className="overflow-y-auto px-6 py-6 space-y-6">
            <form onSubmit={handleTeamFormSubmit} className="p-6 space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={teamForm.firstName}
                    onChange={handleTeamFormChange}
                    required
                    placeholder="Enter first name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={teamForm.lastName}
                    onChange={handleTeamFormChange}
                    required
                    placeholder="Enter last name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={teamForm.email}
                  onChange={handleTeamFormChange}
                  required
                  placeholder="photographer@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={teamForm.mobile}
                  onChange={handleTeamFormChange}
                  required
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Designation */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Designation <span className="text-red-500">*</span>
                </label>
                <select
                  name="designation"
                  value={teamForm.designation}
                  onChange={handleTeamFormChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                >
                  <option value="">Select designation</option>
                  <option value="Lead Photographer">Lead Photographer</option>
                  <option value="Senior Photographer">Senior Photographer</option>
                  <option value="Photographer">Photographer</option>
                  <option value="Assistant Photographer">Assistant Photographer</option>
                  <option value="Junior Photographer">Junior Photographer</option>
                </select>
              </div>

              {/* Photography Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Photography Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={teamForm.category}
                  onChange={handleTeamFormChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                >
                  <option value="">Select category</option>
                  <option value="Wedding Photography">Wedding Photography</option>
                  <option value="Portrait Photography">Portrait Photography</option>
                  <option value="Event Photography">Event Photography</option>
                  <option value="Product Photography">Product Photography</option>
                  <option value="Corporate Photography">Corporate Photography</option>
                  <option value="Fashion Photography">Fashion Photography</option>
                  <option value="Wildlife Photography">Wildlife Photography</option>
                  <option value="Food Photography">Food Photography</option>
                  <option value="All Categories">All Categories</option>
                </select>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Experience (Years) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="experience"
                  value={teamForm.experience}
                  onChange={handleTeamFormChange}
                  required
                  min="0"
                  max="50"
                  placeholder="Enter years of experience"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowTeamModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-900 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                >
                  Add Team Member
                </button>
              </div>
            </form>
            </div>
          </div>
        </div>
      )}

      {/* Team Assignment Modal */}
      {showAssignModal && selectedBooking && (
       <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="sticky top-0 bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-900 text-white p-6 rounded-t-2xl z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Assign Team Members</h2>
                  <p className="text-blue-100 mt-1">Select one or more team members for this booking</p>
                </div>
                <button
                  onClick={() => {
                    setShowAssignModal(false);
                    setSelectedBooking(null);
                    setSelectedTeamMembers([]);
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
                >
                  <span className="text-2xl text-black">×</span>
                </button>
              </div>
            </div>
<div className="flex-1 overflow-y-auto p-2">
            <div className="p-3">
              {/* Booking Details */}
               
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border-2 border-blue-200">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Booking Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <MdAssignment className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-600">ID:</span>
                    <span className="font-semibold">{selectedBooking.id}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdPerson className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-600">Client:</span>
                    <span className="font-semibold">{selectedBooking.client}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdCamera className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-600">Type:</span>
                    <span className="font-semibold">{selectedBooking.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdCalendarToday className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-600">Date:</span>
                    <span className="font-semibold">{selectedBooking.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdAccessTime className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-600">Time:</span>
                    <span className="font-semibold">{selectedBooking.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdLocationOn className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-600">Location:</span>
                    <span className="font-semibold">{selectedBooking.location}</span>
                  </div>
                </div>
              </div>

              {/* Selected Team Members Summary */}
              {selectedTeamMembers.length > 0 && (
                <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                  <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                    <MdCheckCircle className="w-5 h-5" />
                    Selected Team Members ({selectedTeamMembers.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTeamMembers.map((member, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                      >
                        {member}
                        <button
                          onClick={() => toggleTeamMember(member)}
                          className="hover:bg-green-200 rounded-full p-0.5 transition-colors"
                        >
                          <span className="text-green-600">×</span>
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Team Members List */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Available Team Members</h3>
                <div className="space-y-3">

                  {teamMembers.map((member) => {
                    const isSelected = selectedTeamMembers.includes(member.name);
                    const isAvailable = member.availability === 'Available';
                    
                    return (
                      <div
                        key={member.id}
                        onClick={() => isAvailable && toggleTeamMember(member.name)}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 ${
                          isSelected
                            ? 'bg-blue-50 border-blue-500 shadow-md'
                            : isAvailable
                            ? 'bg-gray-50 border-gray-200 hover:border-blue-300 hover:shadow-md cursor-pointer'
                            : 'bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="relative">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                              isSelected 
                                ? 'bg-gradient-to-br from-blue-600 to-indigo-600' 
                                : 'bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-900'
                            }`}>
                              <MdPerson className="text-white" />
                            </div>
                            {isSelected && (
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <MdCheckCircle className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{member.name}</p>
                            <p className="text-sm text-gray-600">{member.role}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            isAvailable
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {member.availability}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">{member.bookings} bookings</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
</div>
              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowAssignModal(false);
                    setSelectedBooking(null);
                    setSelectedTeamMembers([]);
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  disabled={selectedTeamMembers.length === 0}
                  className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    selectedTeamMembers.length === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg'
                  }`}
                >
                  {selectedBooking.status === 'Pending' ? 'Confirm Booking' : 'Update Assignment'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}