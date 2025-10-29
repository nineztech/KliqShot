import React, { useState, useEffect } from 'react';
import { User, Edit2,Cog,Landmark, Loader,CreditCard,CalendarDays, MapPin,Factory, UserCircle,MessageCircle, Hash, Mail,Calendar, MessageSquare, FileText, Building2, Upload, Phone, X, Save, Plus } from 'lucide-react';
import { useSidebar } from '../Sidebar/SidebarContext';

interface FormData {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  gstNumber: string;
  panNumber: string;
  permanentAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  residentialAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  sameAsPermanent: boolean;
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  confirmAccountNumber: string;
  ifscCode: string;
  branchName: string;
  agreeToTerms: boolean;
  serviceRadius?: string;
  travelPreference?: string;
  dateOfBirth?: string;
  incorporationDate?: string;
  languagePreferences?: string[];
  bio?: string;
  businessType?: string;
  whatsappNumber?: string;
  documents?: {
    businessRegistration?: string;
    gstCertificate?: string;
  };
}

const UserProfile = () => {
  const [vendorData, setVendorData] = useState<FormData | null>(null);
  const [editData, setEditData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useMockData, setUseMockData] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editSection, setEditSection] = useState<string | null>(null);
  const [newLanguage, setNewLanguage] = useState('');
  const { isMinimized } = useSidebar();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
   
  useEffect(() => {
    fetchVendorProfile();
  }, []);

  const fetchVendorProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_URL}/vendors/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to fetch vendor profile (${response.status})`);
      }

      const data = await response.json();
      setVendorData(data.data);
      setEditData(data.data);
      setError(null);
      setUseMockData(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Error fetching vendor profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (section: string) => {
    setEditSection(section);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditData(vendorData);
    setIsEditing(false);
    setEditSection(null);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_URL}/vendors/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const data = await response.json();
      setVendorData(data.data);
      setEditData(data.data);
      setIsEditing(false);
      setEditSection(null);
      alert('Profile updated successfully!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      alert(errorMessage);
      console.error('Error updating profile:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setEditData(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleAddressChange = (type: 'permanentAddress' | 'residentialAddress', field: string, value: string) => {
    setEditData(prev => prev ? {
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value
      }
    } : null);
  };

  const handleAddLanguage = () => {
    if (newLanguage.trim() && editData) {
      const currentLanguages = editData.languagePreferences || [];
      if (!currentLanguages.includes(newLanguage.trim())) {
        setEditData({
          ...editData,
          languagePreferences: [...currentLanguages, newLanguage.trim()]
        });
      }
      setNewLanguage('');
    }
  };

  const handleRemoveLanguage = (lang: string) => {
    if (editData) {
      setEditData({
        ...editData,
        languagePreferences: (editData.languagePreferences || []).filter(l => l !== lang)
      });
    }
  };

  const handleFileUpload = async (type: 'businessRegistration' | 'gstCertificate', file: File) => {
    // Placeholder for file upload logic
    console.log('Uploading file:', type, file);
    alert('File upload functionality - connect to your backend endpoint');
  };

  const getTravelPreferenceDisplay = (pref?: string) => {
    const preferences: { [key: string]: string } = {
      'local': 'Local Only',
      'up_to_100km': 'Up to 100 km',
      'national': 'National',
      'international': 'International'
    };
    return pref ? preferences[pref] || pref : 'N/A';
  };

  const getBusinessTypeDisplay = (type?: string) => {
    const types: { [key: string]: string } = {
      'llc': 'Limited Liability Company (LLC)',
      'llp': 'Limited Liability Partnership (LLP)',
      'sole_proprietorship': 'Sole Proprietorship',
      'partnership': 'Partnership',
      'private_limited': 'Private Limited Company'
    };
    return type ? types[type] || type : 'N/A';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading vendor profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚠️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Profile</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={fetchVendorProfile}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const displayData = isEditing ? editData : vendorData;

  return (
    <div 
      className="mt-20 p-6 md:p-8 bg-gray-50 min-h-screen transition-all duration-300"
      style={{ marginLeft: isMinimized ? '5rem' : '16rem' }}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.5s ease-out forwards; }
        .animate-fadeInDown { animation: fadeInDown 0.5s ease-out forwards; }
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
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">Vendor Profile</h1>
                <p className="text-xs md:text-sm lg:text-base text-gray-600 flex items-center gap-2 mt-1">
                  {useMockData && <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-medium">Demo Mode</span>}
                  Manage your vendor information and details
                </p>
              </div>
            </div>
            {isEditing && (
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium flex items-center"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-colors font-medium flex items-center disabled:opacity-50"
                >
                  {saving ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 mb-6 gap-6">
          {/* Left Section */}
          <div className="lg:col-span-1 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold ring-4 ring-gray-100 group-hover:ring-cyan-200 transition-all duration-300">
                    {displayData?.firstName?.charAt(0) || 'V'}{displayData?.lastName?.charAt(0) || 'V'}
                  </div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                </div>
                
                <h2 className="mt-4 text-xl font-semibold text-gray-900">
                  {displayData?.firstName && displayData?.lastName 
                    ? `${displayData.firstName} ${displayData.lastName}`
                    : displayData?.firstName || displayData?.lastName || 'N/A'}
                </h2>
                <p className="text-sm text-gray-500">{displayData?.email || 'No email provided'}</p>
                <p className="text-sm text-gray-500 mt-1 flex items-center">
                  <span className="mr-1">📞</span>{displayData?.mobileNumber || 'No phone number'}
                </p>

                {/* Bio Section */}
                <div className="mt-4 w-full">
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1 font-medium">ADD Bio or Short Note</p>
                    {isEditing && editSection === 'bio' ? (
                      <textarea
                        value={editData?.bio || ''}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        className="w-full text-sm text-gray-700 leading-relaxed border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        rows={4}
                        placeholder="Tell us about yourself..."
                      />
                    ) : (
                      <p className="text-sm text-gray-700 leading-relaxed">{displayData?.bio || 'No bio added yet'}</p>
                    )}
                  </div>
                  <div className="flex justify-end">
              <button className="text-xs hover:text-purple-600 hover:underline transition">
                    Enhance with <span className="text-purple-500 font-semibold">AI</span>
                 </button>
              </div>
                </div>

                <button
                  onClick={() => isEditing ? handleCancel() : handleEdit('bio')}
                  className="mt-4 w-full py-2.5 px-4 bg-gradient-to-r from-slate-800 via-purple-800 to-indigo-900 text-white rounded-xl hover:from-slate-700 hover:to-indigo-800 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-medium flex items-center justify-center"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                </button>
              </div>
            </div>

            {/* Service Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center"><Cog className="w-5 h-5 mr-2 text-indigo-600" />Service Information</h3>
                {!isEditing && (
                  <button
                    onClick={() => handleEdit('service')}
                    className="text-cyan-500 hover:text-cyan-600 flex items-center text-sm font-medium"
                  >
                    <Edit2 className="w-3 h-3 mr-1" />Edit
                  </button>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Service Radius</label>
                  {isEditing && editSection === 'service' ? (
                    <input
                      type="text"
                      value={editData?.serviceRadius || ''}
                      onChange={(e) => handleInputChange('serviceRadius', e.target.value)}
                      className="w-full text-sm font-semibold text-gray-900 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g., 50km"
                    />
                  ) : (
                    <p className="text-sm font-semibold text-gray-900">{displayData?.serviceRadius || 'N/A'}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Travel Preference</label>
                  {isEditing && editSection === 'service' ? (
                    <select
                      value={editData?.travelPreference || ''}
                      onChange={(e) => handleInputChange('travelPreference', e.target.value)}
                      className="w-full text-sm font-semibold text-gray-900 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select...</option>
                      <option value="local">Local Only</option>
                      <option value="up_to_100km">In Current State only</option>
                      <option value="national">National</option>
                      <option value="international">International</option>
                    </select>
                  ) : (
                    <p className="text-sm font-semibold text-gray-900">{getTravelPreferenceDisplay(displayData?.travelPreference)}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Languages</label>
                  {isEditing && editSection === 'service' ? (
                    <div>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={newLanguage}
                          onChange={(e) => setNewLanguage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddLanguage()}
                          className="flex-1 text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Add language..."
                        />
                        <button
                          onClick={handleAddLanguage}
                          className="px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {(editData?.languagePreferences || []).map((lang, idx) => (
                          <span key={idx} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                            {lang}
                            <button onClick={() => handleRemoveLanguage(lang)} className="hover:text-indigo-900">
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {displayData?.languagePreferences && displayData.languagePreferences.length > 0 ? (
                        displayData.languagePreferences.map((lang, idx) => (
                          <span key={idx} className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs font-medium">
                            {lang}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">No languages added</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

           
           {/* Addresses */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mt-6 border border-gray-100 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center"><MapPin className='w-5 h-5 mr-2 text-indigo-600' />Address Information</h3>
                <button
                  onClick={() => isEditing && editSection === 'address' ? handleCancel() : handleEdit('address')}
                  className="text-cyan-500 hover:text-cyan-600 text-sm font-medium hover:underline flex items-center"
                >
                  <Edit2 className="w-3 h-3 mr-1" />
                  Edit
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {[
                  { title: '🏠 Permanent Address', type: 'permanentAddress' as const },
                  { title: '📍 Current Address', type: 'residentialAddress' as const }
                ].map(({ title, type }) => (
                  <div key={type} className="border-2 border-gray-200 rounded-xl p-4 hover:border-indigo-300 transition-colors">
                    <h4 className="font-semibold text-gray-900 mb-3">{title}</h4>
                    {isEditing && editSection === 'address' ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Street"
                          value={editData?.[type]?.street || ''}
                          onChange={(e) => handleAddressChange(type, 'street', e.target.value)}
                          className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                          type="text"
                          placeholder="City"
                          value={editData?.[type]?.city || ''}
                          onChange={(e) => handleAddressChange(type, 'city', e.target.value)}
                          className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                          type="text"
                          placeholder="State"
                          value={editData?.[type]?.state || ''}
                          onChange={(e) => handleAddressChange(type, 'state', e.target.value)}
                          className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                          type="text"
                          placeholder="Pincode"
                          value={editData?.[type]?.pincode || ''}
                          onChange={(e) => handleAddressChange(type, 'pincode', e.target.value)}
                          className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    ) : (
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-700"><span className='text-black'>Street:</span> {displayData?.[type]?.street || 'N/A'}</p>
                        <p className="text-gray-700"><span className='text-black'>City & State:</span>
                          {displayData?.[type]?.city && displayData?.[type]?.state
                            ? `${displayData[type].city}, ${displayData[type].state}`
                            : displayData?.[type]?.city || displayData?.[type]?.state || 'N/A'}
                        </p>
                        <p className="text-gray-700"><span className='text-black'>Pincode:</span> {displayData?.[type]?.pincode || 'N/A'}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center">
                  <UserCircle className="w-5 h-5 mr-2 text-indigo-600" />
                   Personal Information
                 </h3>
                <button
                  onClick={() => isEditing && editSection === 'personal' ? handleCancel() : handleEdit('personal')}
                  className="text-cyan-500 hover:text-cyan-600 text-sm font-medium hover:underline flex items-center"
                >
                  <Edit2 className="w-3 h-3 mr-1" />
                  Edit
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-3 md:gap-y-4">
                {[
                   { icon: User, label: "First Name", field: "firstName", type: "text" },
                   { icon: User, label: "Last Name", field: "lastName", type: "text" },
                   { icon: Mail, label: "Email", field: "email", type: "email" },
                   { icon: Phone, label: "Mobile Number", field: "mobileNumber", type: "tel" },
                   { icon: MessageCircle, label: "WhatsApp Number", field: "whatsappNumber", type: "tel" },
                   { icon: Calendar, label: "Date of Birth", field: "dateOfBirth", type: "date" },
                   { icon: Hash, label: "GST Number", field: "gstNumber", type: "text" },
                   { icon: FileText, label: "PAN Number", field: "panNumber", type: "text" },
                   ].map(({ icon: Icon, label, field, type }) => (
                    <div key={field} className="group">
                     <p className="text-xs md:text-sm text-gray-500 mb-1 flex items-center gap-2">
                           <Icon className="w-4 h-4 text-indigo-500" />
                         {label}
                          </p>
                    {isEditing && editSection === 'personal' ? (
                      <input
                        type={type}
                        value={(editData as any)?.[field] || ''}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        className="w-full text-sm md:text-base font-semibold text-gray-900 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {(displayData as any)?.[field] || 'N/A'}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

                {/* About Section */}
                <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
               
                <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-indigo-600" />
                   About Information
                 </h3>
                <button
                  onClick={() => isEditing && editSection === 'about' ? handleCancel() : handleEdit('about')}
                  className="text-cyan-500 hover:text-cyan-600 text-sm font-medium hover:underline flex items-center"
                >
                  <Edit2 className="w-3 h-3 mr-1" />
                  Edit
                </button>
              </div>
                <div className="mt-4 w-full">
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1 font-medium">ADD About Ditailed Information</p>
                    {isEditing && editSection === 'about' ? (
                      <textarea
          
                        className="w-full text-sm text-gray-700 leading-relaxed border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        rows={4}
                        placeholder="Tell us about yourself..."
                      />
                    ) : (
                      <p className="text-sm text-gray-700 leading-relaxed">{displayData?.bio || 'No About info added yet'}</p>
                    )}
                  </div>
                </div> 
              <div className="flex justify-end">
              <button className="text-xs hover:text-purple-600 hover:underline transition">
                    Enhance with <span className="text-purple-500 font-semibold">AI</span>
                 </button>
              </div>
              </div>

            {/* Business Information */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.25s' }}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center">
                  <Building2 className="w-5 h-5 mr-2 text-indigo-600" />
                  Business Information
                </h3>
                <button
                  onClick={() => isEditing && editSection === 'business' ? handleCancel() : handleEdit('business')}
                  className="text-cyan-500 hover:text-cyan-600 text-sm font-medium hover:underline flex items-center"
                >
                  <Edit2 className="w-3 h-3 mr-1" />
                  Edit
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-4 md:gap-y-5">
                <div className="group">
                  <div className='flex item-center gap-2'>
                  <Factory className="w-5 h-5 text-parpul-500"/>
                  <p className="text-xs md:text-sm text-gray-500 mb-1">Business Type</p>
                  </div>
                  {isEditing && editSection === 'business' ? (
                    <select
                      value={editData?.businessType || ''}
                      onChange={(e) => handleInputChange('businessType', e.target.value)}
                      className="w-full text-sm md:text-base font-semibold text-gray-900 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select...</option>
                      <option value="llc">LLC</option>
                      <option value="llp">LLP</option>
                      <option value="sole_proprietorship">Sole Proprietorship</option>
                      <option value="partnership">Partnership</option>
                      <option value="private_limited">Private Limited</option>
                    </select>
                  ) : (
                    <p className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {getBusinessTypeDisplay(displayData?.businessType)}
                    </p>
                  )}
                </div>
                <div className="group">
                  <div className='flex item-center gap-2'> 
                  <CalendarDays className="w-5 h-5 text-blue-500"/>
                  <p className="text-xs md:text-sm text-gray-500 mb-1">Incorporation Date</p>
                  </div>
                  {isEditing && editSection === 'business' ? (
                    <input
                      type="date"
                      value={editData?.incorporationDate || ''}
                      onChange={(e) => handleInputChange('incorporationDate', e.target.value)}
                      className="w-full text-sm md:text-base font-semibold text-gray-900 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    <p className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {displayData?.incorporationDate || 'N/A'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.28s' }}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-indigo-600" />
                  Documents
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Business Registration', field: 'businessRegistration', color: 'indigo' },
                  { label: 'GST Certificate', field: 'gstCertificate', color: 'green' }
                ].map(({ label, field, color }) => (
                  <div key={field} className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-indigo-400 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <FileText className={`w-6 h-6 text-${color}-600`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">{label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {(displayData?.documents as any)?.[field] ? 'Uploaded ✓' : 'Not uploaded'}
                        </p>
                        <label className="text-xs text-indigo-600 hover:underline mt-1 inline-block cursor-pointer">
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => e.target.files?.[0] && handleFileUpload(field as any, e.target.files[0])}
                            accept=".pdf,.jpg,.jpeg,.png"
                          />
                          {(displayData?.documents as any)?.[field] ? 'Replace' : 'Upload'}
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

             

            {/* Bank Details */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.35s' }}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center"><CreditCard className="w-5 h-5 mr-2 text-indigo-600" />Bank Details</h3>
                <button
                  onClick={() => isEditing && editSection === 'bank' ? handleCancel() : handleEdit('bank')}
                  className="text-cyan-500 hover:text-cyan-600 text-sm font-medium hover:underline flex items-center"
                >
                  <Edit2 className="w-3 h-3 mr-1" />
                  Edit
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-4 md:gap-y-5">
                {[
                 { icon: Landmark, label: "Bank Name", field: "bankName" },
  { icon: User, label: "Account Holder Name", field: "accountHolderName" },
  { icon: CreditCard, label: "Account Number", field: "accountNumber" },
  { icon: Hash, label: "IFSC Code", field: "ifscCode" },
                ].map(({ icon: Icon,label, field }) => (
                  <div key={field} className="group">
                    <p className="text-xs md:text-sm text-gray-500 mb-1 flex items-center gap-2">
        <Icon className="w-4 h-4 text-indigo-500" />
        {label}
      </p>
                    {isEditing && editSection === 'bank' ? (
                      <input
                        type="text"
                        value={(editData as any)?.[field] || ''}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        className="w-full text-sm md:text-base font-semibold text-gray-900 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {(displayData as any)?.[field] || 'N/A'}
                      </p>
                    )}
                  </div>
                ))}
                <div className="group sm:col-span-2">
                  <p className="text-xs md:text-sm text-gray-500 mb-1 flex item-cenetr gap-2">
                    <MapPin className="w-4 h-4 text-indigo-500" />
                    Branch Name</p>
                  {isEditing && editSection === 'bank' ? (
                    <input
                      type="text"
                      value={editData?.branchName || ''}
                      onChange={(e) => handleInputChange('branchName', e.target.value)}
                      className="w-full text-sm md:text-base font-semibold text-gray-900 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    <p className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {displayData?.branchName || 'N/A'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;