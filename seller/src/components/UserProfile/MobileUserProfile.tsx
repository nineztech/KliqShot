import React, { useState, useEffect } from 'react';
import { User, Edit2, Loader } from 'lucide-react';

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
}

const MobileUserProfile = () => {
  const [vendorData, setVendorData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useMockData, setUseMockData] = useState(false);
  const isMinimized = false;
 const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
   

  useEffect(() => {
    fetchVendorProfile();
  }, []);

  const fetchVendorProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      console.log('Token exists:', !!token);

      const response = await fetch(`${API_URL}/vendors/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error response:', errorData);
        throw new Error(errorData.message || `Failed to fetch vendor profile (${response.status})`);
      }

      const data = await response.json();
      console.log('Fetched data:', data);
      setVendorData(data.data);
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
            <div className="flex flex-col gap-3">
              <button 
                onClick={fetchVendorProfile}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Retry
              </button>
               
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Check the console for more details
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="mt-20 p-6 md:p-8 bg-gray-50 min-h-screen transition-all duration-300"
      style={{ marginLeft: isMinimized ? '5rem' : '16rem' }}
    >
      <style>{`
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
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 mb-6 gap-6">
          {/* Left Section - User Info */}
          <div className="lg:col-span-1 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold ring-4 ring-gray-100 group-hover:ring-cyan-200 transition-all duration-300">
                    {vendorData?.firstName?.charAt(0) || 'V'}
                  </div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                </div>
                
                <h2 className="mt-4 text-xl font-semibold text-gray-900">
                  {vendorData?.firstName && vendorData?.lastName 
                    ? `${vendorData.firstName} ${vendorData.lastName}`
                    : vendorData?.firstName || vendorData?.lastName || 'N/A'}
                </h2>
                <p className="text-sm text-gray-500">{vendorData?.email || 'No email provided'}</p>
                <p className="text-sm text-gray-500 mt-1 flex items-center">
                  <span className="mr-1">📞</span>{vendorData?.mobileNumber || 'No phone number'}
                </p>

                <button className="mt-4 w-full py-2.5 px-4 bg-gradient-to-r from-slate-800 via-purple-800 to-indigo-900 text-white rounded-xl hover:from-slate-700 hover:to-indigo-800 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-medium flex items-center justify-center">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* General Information */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
                <h3 className="text-lg md:text-xl font-bold text-gray-900">Personal Information</h3>
                <button className="text-cyan-500 hover:text-cyan-600 text-sm font-medium hover:underline flex items-center self-start sm:self-auto">
                  <Edit2 className="w-3 h-3 mr-1" />
                  Edit
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-4 md:gap-y-5">
                <div className="group">
                  <p className="text-xs md:text-sm text-gray-500 mb-1">First Name</p>
                  <p className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {vendorData?.firstName || 'N/A'}
                  </p>
                </div>
                <div className="group">
                  <p className="text-xs md:text-sm text-gray-500 mb-1">Last Name</p>
                  <p className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {vendorData?.lastName || 'N/A'}
                  </p>
                </div>
                <div className="group">
                  <p className="text-xs md:text-sm text-gray-500 mb-1">Email</p>
                  <p className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {vendorData?.email || 'N/A'}
                  </p>
                </div>
                <div className="group">
                  <p className="text-xs md:text-sm text-gray-500 mb-1">Mobile Number</p>
                  <p className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {vendorData?.mobileNumber || 'N/A'}
                  </p>
                </div>
                <div className="group">
                  <p className="text-xs md:text-sm text-gray-500 mb-1">GST Number</p>
                  <p className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {vendorData?.gstNumber || 'N/A'}
                  </p>
                </div>
                <div className="group">
                  <p className="text-xs md:text-sm text-gray-500 mb-1">PAN Number</p>
                  <p className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {vendorData?.panNumber || 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.25s' }}>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-6">Address Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Permanent Address */}
                <div className="border-2 border-gray-200 rounded-xl p-4 hover:border-indigo-300 transition-colors">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="mr-2">🏠</span>Permanent Address
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700">{vendorData?.permanentAddress?.street || 'N/A'}</p>
                    <p className="text-gray-700">
                      {vendorData?.permanentAddress?.city && vendorData?.permanentAddress?.state
                        ? `${vendorData.permanentAddress.city}, ${vendorData.permanentAddress.state}`
                        : vendorData?.permanentAddress?.city || vendorData?.permanentAddress?.state || 'N/A'}
                    </p>
                    <p className="text-gray-700">Pincode: {vendorData?.permanentAddress?.pincode || 'N/A'}</p>
                  </div>
                </div>

                {/* Residential Address */}
                <div className="border-2 border-gray-200 rounded-xl p-4 hover:border-indigo-300 transition-colors">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="mr-2">📍</span>Current Address
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700">{vendorData?.residentialAddress?.street || 'N/A'}</p>
                    <p className="text-gray-700">
                      {vendorData?.residentialAddress?.city && vendorData?.residentialAddress?.state
                        ? `${vendorData.residentialAddress.city}, ${vendorData.residentialAddress.state}`
                        : vendorData?.residentialAddress?.city || vendorData?.residentialAddress?.state || 'N/A'}
                    </p>
                    <p className="text-gray-700">Pincode: {vendorData?.residentialAddress?.pincode || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-6">Bank Details</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-4 md:gap-y-5">
                <div className="group">
                  <p className="text-xs md:text-sm text-gray-500 mb-1">Bank Name</p>
                  <p className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {vendorData?.bankName || 'N/A'}
                  </p>
                </div>
                <div className="group">
                  <p className="text-xs md:text-sm text-gray-500 mb-1">Account Holder Name</p>
                  <p className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {vendorData?.accountHolderName || 'N/A'}
                  </p>
                </div>
                <div className="group">
                  <p className="text-xs md:text-sm text-gray-500 mb-1">Account Number</p>
                  <p className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {vendorData?.accountNumber || 'N/A'}
                  </p>
                </div>
                <div className="group">
                  <p className="text-xs md:text-sm text-gray-500 mb-1">IFSC Code</p>
                  <p className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {vendorData?.ifscCode || 'N/A'}
                  </p>
                </div>
                <div className="group sm:col-span-2">
                  <p className="text-xs md:text-sm text-gray-500 mb-1">Branch Name</p>
                  <p className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {vendorData?.branchName || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileUserProfile;