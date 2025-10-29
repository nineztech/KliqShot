'use client';

import { useState } from 'react';
import {
  MdPerson,
  MdAdd,
  MdSearch,
  MdEdit,
  MdDelete,
  MdEmail,
  MdPhone,
  MdWork,
  MdCalendarToday,
  MdCheckCircle,
  MdCancel,
  MdGroup,
} from 'react-icons/md';
import { Users } from 'lucide-react';

export default function MobileTeamManagement() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  
  const [teamForm, setTeamForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    designation: '',
    category: '',
    experience: '',
    joiningDate: '',
  });

  const [teamMembers, setTeamMembers] = useState([
    { 
      id: 1, 
      firstName: 'You',
      lastName: '(Owner)',
      email: 'owner@studio.com',
      mobile: '+91 98765 43210',
      designation: 'Lead Photographer',
      category: 'All Categories',
      experience: '10',
      joiningDate: '2015-01-01',
      availability: 'Available', 
      bookings: 12,
      completedBookings: 145,
    },
    { 
      id: 2, 
      firstName: 'Sarah',
      lastName: 'Joshi',
      email: 'sarah.joshi@studio.com',
      mobile: '+91 98765 43211',
      designation: 'Lead Photographer',
      category: 'Wedding Photography',
      experience: '8',
      joiningDate: '2017-03-15',
      availability: 'Available', 
      bookings: 12,
      completedBookings: 98,
    },
    { 
      id: 3, 
      firstName: 'David',
      lastName: 'Kumar',
      email: 'david.kumar@studio.com',
      mobile: '+91 98765 43212',
      designation: 'Senior Photographer',
      category: 'Wedding Photography',
      experience: '6',
      joiningDate: '2019-06-20',
      availability: 'Busy', 
      bookings: 8,
      completedBookings: 67,
    },
    { 
      id: 4, 
      firstName: 'Lisa',
      lastName: 'Kumari',
      email: 'lisa.kumari@studio.com',
      mobile: '+91 98765 43213',
      designation: 'Photographer',
      category: 'Portrait Photography',
      experience: '5',
      joiningDate: '2020-02-10',
      availability: 'Available', 
      bookings: 15,
      completedBookings: 54,
    },
    { 
      id: 5, 
      firstName: 'Mark',
      lastName: 'Wilson',
      email: 'mark.wilson@studio.com',
      mobile: '+91 98765 43214',
      designation: 'Photographer',
      category: 'Event Photography',
      experience: '4',
      joiningDate: '2021-08-05',
      availability: 'Available', 
      bookings: 10,
      completedBookings: 42,
    },
  ]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTeamForm({
      ...teamForm,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = () => {
    if (!teamForm.firstName || !teamForm.lastName || !teamForm.email || !teamForm.mobile || 
        !teamForm.designation || !teamForm.category || !teamForm.experience || !teamForm.joiningDate) {
      alert('Please fill in all required fields');
      return;
    }
    
    const newMember = {
      id: teamMembers.length + 1,
      ...teamForm,
      availability: 'Available',
      bookings: 0,
      completedBookings: 0,
    };
    
    setTeamMembers([...teamMembers, newMember]);
    setShowAddModal(false);
    setTeamForm({
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      designation: '',
      category: '',
      experience: '',
      joiningDate: '',
    });
  };

  const handleDeleteMember = (id: number) => {
    if (id === 1) {
      alert('Cannot delete owner account');
      return;
    }
    if (window.confirm('Are you sure you want to remove this team member?')) {
      setTeamMembers(teamMembers.filter(member => member.id !== id));
    }
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = 
      `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.designation.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || member.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const stats = [
    {
      title: 'Total Team Members',
      value: teamMembers.length,
      icon: MdGroup,
      gradient: 'from-blue-500 to-indigo-500',
      bgGradient: 'from-blue-50 to-indigo-50',
    },
    {
      title: 'Available Now',
      value: teamMembers.filter(m => m.availability === 'Available').length,
      icon: MdCheckCircle,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
    },
    {
      title: 'Currently Busy',
      value: teamMembers.filter(m => m.availability === 'Busy').length,
      icon: MdCancel,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
    },
  ];

  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
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

        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.5s ease-out forwards;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="mb-8 opacity-0 animate-fadeInDown">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-900 rounded-2xl flex items-center justify-center shadow-xl">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Team Management</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Manage your photography team members
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-900 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
            >
              <MdAdd className="w-5 h-5" />
              Add Team Member
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 opacity-0 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <div className="relative p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`relative z-20 p-3 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or designation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white min-w-[200px]"
              >
                <option value="all">All Categories</option>
                <option value="Wedding Photography">Wedding Photography</option>
                <option value="Portrait Photography">Portrait Photography</option>
                <option value="Event Photography">Event Photography</option>
                <option value="Product Photography">Product Photography</option>
                <option value="Corporate Photography">Corporate Photography</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member, index) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden opacity-0 animate-fadeInUp"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-900 p-6 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <MdPerson className="w-10 h-10 text-white" />
                  </div>
                  {member.id !== 1 && (
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all">
                        <MdEdit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteMember(member.id)}
                        className="p-2 hover:bg-red-500 hover:bg-opacity-20 rounded-lg transition-all"
                      >
                        <MdDelete className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-1">
                  {member.firstName} {member.lastName}
                </h3>
                <p className="text-purple-200 text-sm">{member.designation}</p>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <MdEmail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MdPhone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{member.mobile}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MdWork className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{member.category}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MdCalendarToday className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{member.experience} years experience</span>
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-gray-200">
                  <div className="flex-1 text-center">
                    <p className="text-2xl font-bold text-gray-900">{member.bookings}</p>
                    <p className="text-xs text-gray-500">Active</p>
                  </div>
                  <div className="flex-1 text-center border-l border-gray-200">
                    <p className="text-2xl font-bold text-gray-900">{member.completedBookings}</p>
                    <p className="text-xs text-gray-500">Completed</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <span className={`inline-block w-full text-center px-4 py-2 rounded-lg text-sm font-semibold ${
                    member.availability === 'Available' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {member.availability}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <MdGroup className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No team members found</p>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="sticky top-0 bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-900 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Add Team Member</h2>
                  <p className="text-purple-100 mt-1">Fill in the details to add a new photographer</p>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
            </div>

            <div className="overflow-y-auto p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={teamForm.firstName}
                      onChange={handleFormChange}
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
                      onChange={handleFormChange}
                      placeholder="Enter last name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={teamForm.email}
                    onChange={handleFormChange}
                    placeholder="photographer@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={teamForm.mobile}
                    onChange={handleFormChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Designation <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="designation"
                    value={teamForm.designation}
                    onChange={handleFormChange}
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

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Photography Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={teamForm.category}
                    onChange={handleFormChange}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Experience (Years) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="experience"
                      value={teamForm.experience}
                      onChange={handleFormChange}
                      min="0"
                      max="50"
                      placeholder="Enter years"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Joining Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="joiningDate"
                      value={teamForm.joiningDate}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleFormSubmit}
                    className="flex-1 px-6 py-3 bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-900 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    Add Team Member
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}