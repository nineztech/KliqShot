'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import { userApi } from '@/lib/api';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { 
  UserCircleIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  CalendarIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  ShieldCheckIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  profileImage?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  createdAt?: string;
  lastLoginAt?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user: authUser, isAuthenticated, loading: authLoading } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<Partial<UserProfile>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [verifying, setVerifying] = useState<'email' | 'phone' | null>(null);
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push('/signin');
        return;
      }
      fetchUserProfile();
    }
  }, [authLoading, isAuthenticated, router]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await userApi.getProfile();
      
      if (response.success && response.data?.user) {
        setUserProfile(response.data.user);
        setEditedData({
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          phone: response.data.user.phone,
          dateOfBirth: response.data.user.dateOfBirth,
          gender: response.data.user.gender,
          address: response.data.user.address,
          city: response.data.user.city,
          state: response.data.user.state,
          country: response.data.user.country,
          zipCode: response.data.user.zipCode,
        });
      } else {
        setError('Failed to load profile');
      }
    } catch (err: any) {
      console.error('Error fetching profile:', err);
      setError(err.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({
      firstName: userProfile?.firstName,
      lastName: userProfile?.lastName,
      phone: userProfile?.phone,
      dateOfBirth: userProfile?.dateOfBirth,
      gender: userProfile?.gender,
      address: userProfile?.address,
      city: userProfile?.city,
      state: userProfile?.state,
      country: userProfile?.country,
      zipCode: userProfile?.zipCode,
    });
    setError('');
    setSuccessMessage('');
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError('');
      setSuccessMessage('');
      
      const response = await userApi.updateProfile({
        firstName: editedData.firstName,
        lastName: editedData.lastName,
        phone: editedData.phone,
        dateOfBirth: editedData.dateOfBirth,
        gender: editedData.gender,
        address: editedData.address,
        city: editedData.city,
        state: editedData.state,
        country: editedData.country,
        zipCode: editedData.zipCode,
      });
      
      if (response.success && response.data?.user) {
        setUserProfile(response.data.user);
        setIsEditing(false);
        setSuccessMessage('Profile updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError(response.message || 'Failed to update profile');
      }
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendVerification = async (type: 'email' | 'phone') => {
    try {
      setVerifying(type);
      setError('');
      setVerificationMessage('');

      if (type === 'email') {
        await userApi.sendEmailVerification();
        setVerificationMessage('Verification email sent! Check your inbox.');
      } else {
        const response = await userApi.sendPhoneVerification();
        setShowOtpInput(true);
        if (response.data?.otp) {
          setVerificationMessage(`OTP: ${response.data.otp}`);
        } else {
          setVerificationMessage('Verification code sent to your phone!');
        }
      }
    } catch (err: any) {
      console.error('Error sending verification:', err);
      setError(err.message || 'Failed to send verification');
    } finally {
      setVerifying(null);
    }
  };

  const handleVerifyPhone = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }

    try {
      setVerifying('phone');
      setError('');
      const response = await userApi.verifyPhone({ code: otp });
      
      if (response.success && response.data?.user) {
        setUserProfile(response.data.user);
        setSuccessMessage('Phone verified successfully!');
        setShowOtpInput(false);
        setOtp('');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (err: any) {
      console.error('Error verifying phone:', err);
      setError(err.message || 'Failed to verify phone');
    } finally {
      setVerifying(null);
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Not set';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-2"></div>
          <p className="text-gray-600 font-light text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-600 font-light mb-3 text-sm">{error || 'Failed to load profile'}</p>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg font-light hover:bg-purple-700 transition-colors text-sm"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      <div className="py-6 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Compact Header Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
            <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 h-24 relative">
              <div className="absolute bottom-0 left-6 transform translate-y-1/2">
                <div className="relative">
                  {userProfile.profileImage ? (
                    <img
                      src={userProfile.profileImage}
                      alt={`${userProfile.firstName} ${userProfile.lastName}`}
                      className="w-20 h-20 rounded-full border-3 border-white shadow-lg object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full border-3 border-white shadow-lg bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
                      <span className="text-white text-2xl font-light">
                        {userProfile.firstName?.charAt(0)?.toUpperCase()}{userProfile.lastName?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="pt-12 pb-4 px-6">
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div>
                  <h1 className="text-2xl font-light text-gray-900 mb-1">
                    {userProfile.firstName} {userProfile.lastName}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <EnvelopeIcon className="w-4 h-4" />
                      <span className="font-light">{userProfile.email}</span>
                      {userProfile.isEmailVerified ? (
                        <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded">
                          <ShieldCheckIcon className="w-4 h-4" />
                          <span className="text-xs">Verified</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => handleSendVerification('email')}
                          disabled={verifying === 'email'}
                          className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-0.5 rounded hover:bg-amber-100 transition-colors text-xs disabled:opacity-50"
                        >
                          {verifying === 'email' ? (
                            <ArrowPathIcon className="w-3 h-3 animate-spin" />
                          ) : (
                            <PencilIcon className="w-3 h-3" />
                          )}
                          <span>Verify</span>
                        </button>
                      )}
                    </div>
                    {userProfile.phone && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <PhoneIcon className="w-4 h-4" />
                        <span className="font-light">{userProfile.phone}</span>
                        {userProfile.isPhoneVerified ? (
                          <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded">
                            <ShieldCheckIcon className="w-4 h-4" />
                            <span className="text-xs">Verified</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => handleSendVerification('phone')}
                            disabled={verifying === 'phone'}
                            className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-0.5 rounded hover:bg-amber-100 transition-colors text-xs disabled:opacity-50"
                          >
                            {verifying === 'phone' ? (
                              <ArrowPathIcon className="w-3 h-3 animate-spin" />
                            ) : (
                              <PencilIcon className="w-3 h-3" />
                            )}
                            <span>Verify</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {!isEditing && (
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-light text-sm"
                  >
                    <PencilIcon className="w-4 h-4" />
                    Edit
                  </button>
                )}
              </div>

              {(successMessage || error || verificationMessage) && (
                <div className={`mt-3 p-2 rounded-lg text-sm font-light ${
                  successMessage ? 'bg-green-50 border border-green-200 text-green-700' : 
                  verificationMessage ? 'bg-blue-50 border border-blue-200 text-blue-700' :
                  'bg-red-50 border border-red-200 text-red-700'
                }`}>
                  {successMessage || verificationMessage || error}
                </div>
              )}

              {/* OTP Input */}
              {showOtpInput && (
                <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="Enter 6-digit OTP"
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-light"
                      maxLength={6}
                    />
                    <button
                      onClick={handleVerifyPhone}
                      disabled={verifying === 'phone' || otp.length !== 6}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-light text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {verifying === 'phone' ? (
                        <ArrowPathIcon className="w-4 h-4 animate-spin" />
                      ) : (
                        <CheckIcon className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setShowOtpInput(false);
                        setOtp('');
                        setVerificationMessage('');
                      }}
                      className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-light text-sm"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Compact Profile Grid */}
          <div className="grid lg:grid-cols-3 gap-4">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h2 className="text-base font-light text-gray-900 mb-3 pb-2 border-b border-gray-200">
                Personal Info
              </h2>
              
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 font-light mb-1 block">First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.firstName || ''}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-light"
                    />
                  ) : (
                    <p className="text-sm text-gray-900 font-light">{userProfile.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-gray-500 font-light mb-1 block">Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.lastName || ''}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-light"
                    />
                  ) : (
                    <p className="text-sm text-gray-900 font-light">{userProfile.lastName}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-gray-500 font-light mb-1 block">Date of Birth</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editedData.dateOfBirth || ''}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-light"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-gray-400" />
                      <p className="text-sm text-gray-900 font-light">{formatDate(userProfile.dateOfBirth)}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-xs text-gray-500 font-light mb-1 block">Gender</label>
                  {isEditing ? (
                    <select
                      value={editedData.gender || ''}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-light"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer_not_to_say">Prefer not to say</option>
                    </select>
                  ) : (
                    <p className="text-sm text-gray-900 font-light capitalize">{userProfile.gender || 'Not specified'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h2 className="text-base font-light text-gray-900 mb-3 pb-2 border-b border-gray-200">
                Contact Info
              </h2>
              
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 font-light mb-1 block">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedData.phone || ''}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-light"
                      placeholder="Enter phone"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <PhoneIcon className="w-4 h-4 text-gray-400" />
                      <p className="text-sm text-gray-900 font-light">{userProfile.phone || 'Not provided'}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-xs text-gray-500 font-light mb-1 block">Address</label>
                  {isEditing ? (
                    <textarea
                      value={editedData.address || ''}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-light"
                      rows={2}
                      placeholder="Enter address"
                    />
                  ) : (
                    <div className="flex items-start gap-2">
                      <MapPinIcon className="w-4 h-4 text-gray-400 mt-0.5" />
                      <p className="text-sm text-gray-900 font-light">{userProfile.address || 'Not provided'}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-xs text-gray-500 font-light mb-1 block">City</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.city || ''}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-light"
                      placeholder="Enter city"
                    />
                  ) : (
                    <p className="text-sm text-gray-900 font-light">{userProfile.city || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-gray-500 font-light mb-1 block">State</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.state || ''}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-light"
                      placeholder="Enter state"
                    />
                  ) : (
                    <p className="text-sm text-gray-900 font-light">{userProfile.state || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Location & Account */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h2 className="text-base font-light text-gray-900 mb-3 pb-2 border-b border-gray-200">
                Location & Account
              </h2>
              
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 font-light mb-1 block">Country</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.country || ''}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-light"
                      placeholder="Enter country"
                    />
                  ) : (
                    <p className="text-sm text-gray-900 font-light">{userProfile.country || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-gray-500 font-light mb-1 block">Zip Code</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.zipCode || ''}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-light"
                      placeholder="Enter zip"
                    />
                  ) : (
                    <p className="text-sm text-gray-900 font-light">{userProfile.zipCode || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-gray-500 font-light mb-1 block">Member Since</label>
                  <p className="text-sm text-gray-900 font-light">{formatDate(userProfile.createdAt)}</p>
                </div>
                
                {userProfile.lastLoginAt && (
                  <div>
                    <label className="text-xs text-gray-500 font-light mb-1 block">Last Login</label>
                    <p className="text-sm text-gray-900 font-light">{formatDate(userProfile.lastLoginAt)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Compact Action Buttons */}
          {isEditing && (
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={handleCancel}
                disabled={isSaving}
                className="flex items-center gap-1.5 px-4 py-1.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-light text-sm"
              >
                <XMarkIcon className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-light text-sm disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckIcon className="w-4 h-4" />
                    Save
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
