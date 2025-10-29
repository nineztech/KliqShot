'use client';

import { useState, useEffect } from 'react';
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
  MdClose,
} from 'react-icons/md';
import { Users, Crown } from 'lucide-react';
import { useSidebar } from '../Sidebar/SidebarContext';

interface TeamMember {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  designation: string | string[];
  category: string;
  experience: string;
  profileImage?: string;
  availability: 'Available' | 'Busy' | 'On Leave';
  bookingsCount: number;
  completedBookings?: number;
  isActive: boolean;
  isOwner?: boolean;
}

interface TeamForm {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  profileImage?: string;
  designation: string[];
  category: string;
  experience: string;
}

export default function TeamManagement() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
 const {isMinimized} =useSidebar();
  const [teamForm, setTeamForm] = useState<TeamForm>({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    designation: [],
    category: '',
    experience: '',
    profileImage: '',
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [sellerId, setSellerId] = useState<number | null>(null);
  const [ownerEmail, setOwnerEmail] = useState<string>('');

  const designationOptions = [
    'Lead Photographer',
    'Wedding Specialist',
    'Portrait Expert',
    'Event Photographer',
    'Assistant Photographer',
    'Videographer',
    'Editor',
    'Other'
  ];

  const getApiUrl = () => {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  };

  const getUserData = () => {
    try {
      const storedUser = localStorage.getItem('user') || 
                        localStorage.getItem('userData') || 
                        localStorage.getItem('currentUser');
      
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        console.log('✅ User data from localStorage:', userData);
        return userData;
      }

      console.warn('⚠️ No user data found in localStorage');
      return null;
    } catch (error) {
      console.error('Error reading user data:', error);
      return null;
    }
  };

  useEffect(() => {
    const initializeUser = async () => {
      try {
        setIsLoadingData(true);

        let userData = getUserData();

        if (!userData) {
          const email = prompt('Please enter your email address:');
          if (!email || !email.includes('@')) {
            alert('Valid email is required to manage team members.');
            return;
          }

          userData = {
            id: Date.now(),
            email: email,
            firstname: email.split('@')[0],
          };

          localStorage.setItem('user', JSON.stringify(userData));
          console.log('✅ Created and saved user data:', userData);
        }

        const userId = userData.id || userData.sellerId || userData.userId || Date.now();
        const userEmail = userData.email || userData.Owneremail || userData.userEmail;

        setSellerId(userId);
        setOwnerEmail(userEmail);

        console.log('✅ User initialized:', { userId, userEmail });

        await fetchTeamMembers(userId);
      } catch (error) {
        console.error('Error initializing user:', error);
        alert('Failed to initialize. Please refresh the page.');
      } finally {
        setIsLoadingData(false);
      }
    };

    initializeUser();
  }, []);

 const fetchTeamMembers = async (id: number) => {
  try {
    const API_URL = getApiUrl();
    console.log('Fetching team members for seller:', id);

    const response = await fetch(`${API_URL}/team-members?sellerId=${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Fetch result:', result);

    if (result.success && Array.isArray(result.data)) {
      setTeamMembers(result.data);
      console.log('✅ Team members loaded:', result.data.length);
    } else {
      console.warn('No team members found or invalid response');
      setTeamMembers([]);
    }
  } catch (error) {
    console.error('Error fetching team members:', error);
    setTeamMembers([]);
  }
};

  const uploadProfileImage = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const API_URL = getApiUrl();

      const response = await fetch(`${API_URL}/upload/profile-image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();

      if (result.success) {
        const imageUrl = result.url || result.imageUrl || result.filePath || result.path || result.data?.url;
        
        if (imageUrl) {
          console.log('✅ Image uploaded successfully:', imageUrl);
          return imageUrl;
        }
      }
      
      throw new Error('Upload succeeded but no image URL returned');
    } catch (error) {
      console.error('Profile image upload error:', error);
      throw error;
    }
  };

  const getImageUrl = (imagePath: string | undefined): string => {
    if (!imagePath) {
      return 'https://via.placeholder.com/96?text=No+Image';
    }
    
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    const API_BASE = getApiUrl().replace('/api', '');
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    
    return `${API_BASE}/${cleanPath}`;
  };

  const validateImageFile = (file: File): { valid: boolean; error?: string } => {
    if (!file.type.startsWith('image/')) {
      return { valid: false, error: 'Please select a valid image file' };
    }

    if (file.size > 5 * 1024 * 1024) {
      return { valid: false, error: 'File size must be less than 5MB' };
    }

    return { valid: true };
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTeamForm({
      ...teamForm,
      [e.target.name]: e.target.value
    });
  };

  const toggleDesignation = (designation: string) => {
    setTeamForm(prev => ({
      ...prev,
      designation: prev.designation.includes(designation)
        ? prev.designation.filter(d => d !== designation)
        : [...prev.designation, designation]
    }));
  };

  const handleFormSubmit = async () => {
    if (!teamForm.firstName || !teamForm.lastName || !teamForm.email || !teamForm.mobile || 
        teamForm.designation.length === 0 || !teamForm.category || !teamForm.experience) {
      alert('Please fill in all required fields');
      return;
    }

    if (!sellerId) {
      alert('User ID not found. Please refresh the page.');
      return;
    }

    if (!ownerEmail) {
      alert('Owner email not found. Please refresh the page.');
      return;
    }

    setIsLoading(true);

    try {
      const API_URL = getApiUrl();

      const requestBody = {
        sellerId,
        Owneremail: ownerEmail,
        firstName: teamForm.firstName,
        lastName: teamForm.lastName,
        email: teamForm.email,
        mobile: teamForm.mobile,
        designation: JSON.stringify(teamForm.designation),
        category: teamForm.category,
        experience: teamForm.experience,
        profileImage: teamForm.profileImage || ''
      };

      console.log('📤 Sending team member data:', requestBody);

      const response = await fetch(`${API_URL}/team-members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert('Team member added successfully!');
        setShowAddModal(false);
        setTeamForm({
          firstName: '',
          lastName: '',
          email: '',
          mobile: '',
          designation: [],
          category: '',
          experience: '',
          profileImage: '',
        });
        await fetchTeamMembers(sellerId);
      } else {
        alert(result.message || 'Failed to add team member');
      }
    } catch (error) {
      console.error('Error adding team member:', error);
      alert('Failed to add team member. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
    
    let designationArray: string[] = [];
    if (typeof member.designation === 'string') {
      try {
        designationArray = JSON.parse(member.designation);
      } catch {
        designationArray = [member.designation];
      }
    } else if (Array.isArray(member.designation)) {
      designationArray = member.designation;
    }

    setTeamForm({
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email,
      mobile: member.mobile,
      designation: designationArray,
      category: member.category,
      experience: member.experience,
      profileImage: member.profileImage || '',
    });
    setShowEditModal(true);
  };

  const handleUpdateMember = async () => {
    if (!editingMember || !sellerId) return;

    if (!teamForm.firstName || !teamForm.lastName || !teamForm.email || !teamForm.mobile || 
        teamForm.designation.length === 0 || !teamForm.category || !teamForm.experience) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      const API_URL = getApiUrl();

      const response = await fetch(`${API_URL}/team-members/${editingMember.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sellerId,
          ...teamForm,
          designation: JSON.stringify(teamForm.designation)
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert('Team member updated successfully!');
        setShowEditModal(false);
        setEditingMember(null);
        setTeamForm({
          firstName: '',
          lastName: '',
          email: '',
          mobile: '',
          designation: [],
          category: '',
          experience: '',
          profileImage: '',
        });
        await fetchTeamMembers(sellerId);
      } else {
        alert(result.message || 'Failed to update team member');
      }
    } catch (error) {
      console.error('Error updating team member:', error);
      alert('Failed to update team member. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMember = async (id: number, isOwner: boolean) => {
    if (isOwner) {
      alert('Cannot delete the owner team member!');
      return;
    }

    if (!sellerId) return;

    if (!window.confirm('Are you sure you want to permanently delete this team member? This action cannot be undone.')) {
      return;
    }

    try {
      const API_URL = getApiUrl();

      const response = await fetch(`${API_URL}/team-members/${id}?sellerId=${sellerId}&permanent=true`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert('Team member deleted successfully!');
        await fetchTeamMembers(sellerId);
      } else {
        alert(result.message || 'Failed to delete team member');
      }
    } catch (error) {
      console.error('Error deleting team member:', error);
      alert('Failed to delete team member. Please try again.');
    }
  };

  const handleToggleActive = async (id: number, currentStatus: boolean, isOwner: boolean) => {
    if (isOwner) {
      alert('Cannot deactivate the owner team member!');
      return;
    }

    if (!sellerId) return;

    const action = currentStatus ? 'deactivate' : 'activate';
    if (!window.confirm(`Are you sure you want to ${action} this team member?`)) {
      return;
    }

    try {
      const API_URL = getApiUrl();

      const response = await fetch(`${API_URL}/team-members/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sellerId,
          isActive: !currentStatus
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert(`Team member ${action}d successfully!`);
        await fetchTeamMembers(sellerId);
      } else {
        alert(result.message || `Failed to ${action} team member`);
      }
    } catch (error) {
      console.error(`Error ${action}ing team member:`, error);
      alert(`Failed to ${action} team member. Please try again.`);
    }
  };

  const getDesignationDisplay = (designation: string | string[]) => {
    let designations: string[] = [];
    
    if (typeof designation === 'string') {
      try {
        designations = JSON.parse(designation);
      } catch {
        designations = [designation];
      }
    } else if (Array.isArray(designation)) {
      designations = designation;
    }

    if (designations.length === 0) return 'No designation';
    if (designations.length === 1) return designations[0];
    if (designations.length === 2) return designations.join(' & ');
    return `${designations[0]} +${designations.length - 1}`;
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = 
      `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || member.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const stats = [
    {
      title: 'Total Team Members',
      value: teamMembers.filter(m => m.isActive).length,
      icon: MdGroup,
      gradient: 'from-blue-500 to-indigo-500',
      bgGradient: 'from-blue-50 to-indigo-50',
    },
    {
      title: 'Available Now',
      value: teamMembers.filter(m => m.availability === 'Available' && m.isActive).length,
      icon: MdCheckCircle,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
    },
    {
      title: 'Currently Inactive',
      value: teamMembers.filter(m => !m.isActive).length,
      icon: MdCancel,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
    },
  ];

  const renderTeamForm = (isEdit: boolean = false) => (
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
          Profile Picture
        </label>

        {teamForm.profileImage && teamForm.profileImage !== 'uploading...' && (
          <div className="mb-3 relative inline-block">
            <img
              src={getImageUrl(teamForm.profileImage)}
              alt="Profile Preview"
              className="w-24 h-24 object-cover rounded-full border-2 border-purple-200"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/96?text=Error';
              }}
            />
            <button
              type="button"
              onClick={() => setTeamForm(prev => ({ ...prev, profileImage: '' }))}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 text-xs shadow-lg"
            >
              ×
            </button>
          </div>
        )}

        {teamForm.profileImage === 'uploading...' && (
          <div className="mb-3 flex items-center gap-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
            <span className="text-sm text-gray-600">Uploading profile image...</span>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const validation = validateImageFile(file);
            if (!validation.valid) {
              alert(validation.error);
              e.target.value = '';
              return;
            }

            try {
              setTeamForm(prev => ({ ...prev, profileImage: 'uploading...' }));
              const uploadedUrl = await uploadProfileImage(file);
              setTeamForm(prev => ({ ...prev, profileImage: uploadedUrl }));
              e.target.value = '';
            } catch (err) {
              alert('Profile image upload failed. Please try again.');
              setTeamForm(prev => ({ ...prev, profileImage: '' }));
              e.target.value = '';
            }
          }}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
        />
        <p className="text-xs text-gray-500 mt-1">
          Max file size: 5MB. Supported formats: JPG, PNG, GIF, WebP
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Designations <span className="text-red-500">*</span>
          <span className="text-xs text-gray-500 font-normal ml-2">
            (Select one or more)
          </span>
        </label>
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 max-h-64 overflow-y-auto">
          {designationOptions.map((designation) => (
            <label
              key={designation}
              className={`flex items-center gap-3 rounded-lg cursor-pointer hover:text-purple-50 transition-colors mb-2 ${
                teamForm.designation.includes(designation) ? 'text-purple-500' : 'text-gray-200'
              }`}
            >
              <input
                type="checkbox"
                checked={teamForm.designation.includes(designation)}
                onChange={() => toggleDesignation(designation)}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
              <span className={`flex-1 ${teamForm.designation.includes(designation) ? 'font-semibold text-purple-700' : 'text-gray-700'}`}>
                {designation}
              </span>
            </label>
          ))}
        </div>
        {teamForm.designation.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {teamForm.designation.map((designation) => (
              <span
                key={designation}
                className="inline-flex items-center gap-1 px-3 py-1 bg-purple-600 text-white text-sm rounded-full"
              >
                {designation}
                <button
                  type="button"
                  onClick={() => toggleDesignation(designation)}
                  className="ml-1 hover:bg-purple-700 rounded-full p-0.5"
                >
                  <MdClose className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          name="category"
          value={teamForm.category}
          onChange={handleFormChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
        >
          <option value="">Select category</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Freelance">Freelance</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Experience <span className="text-red-500">*</span>
        </label>
        <select
          name="experience"
          value={teamForm.experience}
          onChange={handleFormChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
        >
          <option value="">Select experience</option>
          <option value="0-1 years">0-1 years</option>
          <option value="1-3 years">1-3 years</option>
          <option value="3-5 years">3-5 years</option>
          <option value="5+ years">5+ years</option>
        </select>
      </div>
  
      <div className="flex gap-4 pt-4 border-t border-gray-200">
        <button
          onClick={() => {
            if (isEdit) {
              setShowEditModal(false);
              setEditingMember(null);
            } else {
              setShowAddModal(false);
            }
            setTeamForm({
              firstName: '',
              lastName: '',
              email: '',
              mobile: '',
              designation: [],
              category: '',
              experience: '',
              profileImage: '',
            });
          }}
          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
        >
          Cancel
        </button>
        <button
          onClick={isEdit ? handleUpdateMember : handleFormSubmit}
          disabled={isLoading}
          className="flex-1 px-6 py-3 bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-900 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : isEdit ? 'Update Team Member' : 'Add Team Member'}
        </button>
      </div>
    </div>
  );

  if (isLoadingData) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading team members...</p>
        </div>
      </div>
    );
  }

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
        <div className="mb-8">
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
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <div className="relative p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`relative p-3 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or email..."
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
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Freelance">Freelance</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              <div className="bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-900 p-6 text-white relative">
                {member.isOwner && (
                  <div className="absolute top-3 left-22">
                    <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500 text-yellow-900 text-xs font-bold rounded-full">
                      <Crown className="w-3 h-3" />
                      OWNER
                    </div>
                  </div>
                )}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm overflow-hidden">
                    {member.profileImage ? (
                      <img
                        src={getImageUrl(member.profileImage)}
                        alt={`${member.firstName} ${member.lastName}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML = '<div class="w-10 h-10 text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div>';
                        }}
                      />
                    ) : (
                      <MdPerson className="w-10 h-10 text-white" />
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEditMember(member)}
                      className="p-2 hover:bg-blue-500 hover:bg-opacity-20 rounded-lg transition-all"
                      title="Edit member"
                    >
                      <MdEdit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteMember(member.id, member.isOwner || false)}
                      className={`p-2 hover:bg-red-500 hover:bg-opacity-20 rounded-lg transition-all ${member.isOwner ? 'opacity-50 cursor-not-allowed' : ''}`}
                      title={member.isOwner ? "Cannot delete owner" : "Delete member"}
                      disabled={member.isOwner}
                    >
                      <MdDelete className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1">
                  {member.firstName} {member.lastName}
                </h3>
                <div className="flex flex-wrap gap-1 mt-2">
                  {(() => {
                    let designations: string[] = [];
                    if (typeof member.designation === 'string') {
                      try {
                        designations = JSON.parse(member.designation);
                      } catch {
                        designations = [member.designation];
                      }
                    } else if (Array.isArray(member.designation)) {
                      designations = member.designation;
                    }
                    
                    return designations.map((des, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-purple-200 bg-opacity-30 text-gray-500 text-xs rounded-full border border-purple-300"
                      >
                        {des}
                      </span>
                    ));
                  })()}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <MdEmail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 truncate">{member.email}</span>
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
                    <span className="text-gray-600">{member.experience} experience</span>
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-gray-200">
                  <div className="flex-1 text-center">
                    <p className="text-2xl font-bold text-gray-900">{member.bookingsCount}</p>
                    <p className="text-xs text-gray-500">Active</p>
                  </div>
                  <div className="flex-1 text-center border-l border-gray-200">
                    <p className="text-2xl font-bold text-gray-900">{member.completedBookings || 0}</p>
                    <p className="text-xs text-gray-500">Completed</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleToggleActive(member.id, member.isActive, member.isOwner || false)}
                    disabled={member.isOwner}
                    className={`w-full text-center px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      member.isOwner
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : member.isActive
                        ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    {member.isOwner ? 'Owner (Always Active)' : member.isActive ? 'Active' : 'Inactive'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <MdGroup className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No team members found</p>
            <p className="text-gray-400 text-sm mt-2">
              {searchQuery || filterCategory !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Click "Add Team Member" to get started'}
            </p>
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
                  onClick={() => {
                    setShowAddModal(false);
                    setTeamForm({
                      firstName: '',
                      lastName: '',
                      email: '',
                      mobile: '',
                      designation: [],
                      category: '',
                      experience: '',
                      profileImage: '',
                    });
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
                >
                  <span className="text-2xl text-black">×</span>
                </button>
              </div>
            </div>
            <div className="overflow-y-auto p-6">
              {renderTeamForm(false)}
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="sticky top-0 bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-900 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Edit Team Member</h2>
                  <p className="text-purple-100 mt-1">Update team member information</p>
                </div>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingMember(null);
                    setTeamForm({
                      firstName: '',
                      lastName: '',
                      email: '',
                      mobile: '',
                      designation: [],
                      category: '',
                      experience: '',
                      profileImage: '',
                    });
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
                >
                  <span className="text-2xl text-black">×</span>
                </button>
              </div>
            </div>
            <div className="overflow-y-auto p-6">
              {renderTeamForm(true)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}