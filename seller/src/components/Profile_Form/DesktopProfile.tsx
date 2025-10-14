import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone,
  FileText,
  MapPin,
  Building,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Shield,
  ArrowLeftIcon
} from 'lucide-react';
 
import { useRouter } from 'next/navigation';
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

interface ValidationErrors {
  [key: string]: string;
}

const ResponsiveVendorRegistrationForm: React.FC = () => {
  // For demo purposes - in real app, get this from context like: const { isMinimized } = useSidebar();
  const [isMinimized] = useState(false);
   const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    gstNumber: '',
    panNumber: '',
    permanentAddress: {
      street: '',
      city: '',
      state: '',
      pincode: ''
    },
    residentialAddress: {
      street: '',
      city: '',
      state: '',
      pincode: ''
    },
    sameAsPermanent: false,
    bankName: '',
    accountHolderName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',
    branchName: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const validateStep = (step: number): boolean => {
    const newErrors: ValidationErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.mobileNumber.trim()) {
        newErrors.mobileNumber = 'Mobile number is required';
      } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
        newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (step === 2) {
      if (!formData.gstNumber && !formData.panNumber) {
        newErrors.gstNumber = 'Either GST or PAN number is required';
        newErrors.panNumber = 'Either GST or PAN number is required';
      }
      if (formData.gstNumber && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gstNumber)) {
        newErrors.gstNumber = 'Please enter a valid GST number';
      }
      if (formData.panNumber && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
        newErrors.panNumber = 'Please enter a valid PAN number';
      }
    }

    if (step === 3) {
      if (!formData.permanentAddress.street.trim()) newErrors.permanentStreet = 'Street address is required';
      if (!formData.permanentAddress.city.trim()) newErrors.permanentCity = 'City is required';
      if (!formData.permanentAddress.state.trim()) newErrors.permanentState = 'State is required';
      if (!formData.permanentAddress.pincode.trim()) {
        newErrors.permanentPincode = 'Pincode is required';
      } else if (!/^\d{6}$/.test(formData.permanentAddress.pincode)) {
        newErrors.permanentPincode = 'Please enter a valid 6-digit pincode';
      }

      if (!formData.sameAsPermanent) {
        if (!formData.residentialAddress.street.trim()) newErrors.residentialStreet = 'Street address is required';
        if (!formData.residentialAddress.city.trim()) newErrors.residentialCity = 'City is required';
        if (!formData.residentialAddress.state.trim()) newErrors.residentialState = 'State is required';
        if (!formData.residentialAddress.pincode.trim()) {
          newErrors.residentialPincode = 'Pincode is required';
        } else if (!/^\d{6}$/.test(formData.residentialAddress.pincode)) {
          newErrors.residentialPincode = 'Please enter a valid 6-digit pincode';
        }
      }
    }

    if (step === 4) {
      if (!formData.bankName.trim()) newErrors.bankName = 'Bank name is required';
      if (!formData.accountHolderName.trim()) newErrors.accountHolderName = 'Account holder name is required';
      if (!formData.accountNumber.trim()) {
        newErrors.accountNumber = 'Account number is required';
      } else if (!/^\d{9,18}$/.test(formData.accountNumber)) {
        newErrors.accountNumber = 'Please enter a valid account number';
      }
      if (!formData.confirmAccountNumber.trim()) {
        newErrors.confirmAccountNumber = 'Please confirm account number';
      } else if (formData.accountNumber !== formData.confirmAccountNumber) {
        newErrors.confirmAccountNumber = 'Account numbers do not match';
      }
      if (!formData.ifscCode.trim()) {
        newErrors.ifscCode = 'IFSC code is required';
      } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
        newErrors.ifscCode = 'Please enter a valid IFSC code';
      }
      if (!formData.branchName.trim()) newErrors.branchName = 'Branch name is required';
      if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    if (name.startsWith('permanent') || name.startsWith('residential')) {
      const [addressType, field] = name.includes('permanent') 
        ? ['permanentAddress', name.replace('permanent', '').toLowerCase()] 
        : ['residentialAddress', name.replace('residential', '').toLowerCase()];
      
      setFormData(prev => ({
        ...prev,
        [addressType]: {
          ...prev[addressType as 'permanentAddress' | 'residentialAddress'],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    if (name === 'sameAsPermanent' && checked) {
      setFormData(prev => ({
        ...prev,
        residentialAddress: { ...prev.permanentAddress }
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!validateStep(currentStep)) {
    return;
  }

  setIsLoading(true);

  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('Please login first');
      router.push('/login');
      return;
    }

    const apiData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      mobileNumber: formData.mobileNumber,
      email: formData.email,
      gstNumber: formData.gstNumber || null,
      panNumber: formData.panNumber || null,
      permanentAddress: formData.permanentAddress,
      residentialAddress: formData.residentialAddress,
      bankName: formData.bankName,
      accountHolderName: formData.accountHolderName,
      accountNumber: formData.accountNumber,
      ifscCode: formData.ifscCode.toUpperCase(),
      branchName: formData.branchName,
    };

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    
    const response = await fetch(`${API_URL}/vendors/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(apiData)
    });

    const result = await response.json();

    if (response.ok && result.success) {
      alert('Registration successful! Your profile has been saved.');
      
      setFormData({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        gstNumber: '',
        panNumber: '',
        permanentAddress: { street: '', city: '', state: '', pincode: '' },
        residentialAddress: { street: '', city: '', state: '', pincode: '' },
        sameAsPermanent: false,
        bankName: '',
        accountHolderName: '',
        accountNumber: '',
        confirmAccountNumber: '',
        ifscCode: '',
        branchName: '',
        agreeToTerms: false
      });
      setCurrentStep(1);
      
      setTimeout(() => {
        router.push('/Desktop');
      }, 1500);
      
    } else {
      alert(result.message || 'Registration failed. Please try again.');
    }
    
  } catch (error) {
    console.error('Registration error:', error);
    alert('Registration failed. Please check your connection and try again.');
  } finally {
    setIsLoading(false);
  }
};

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-6">
      {[1, 2, 3, 4].map((step) => (
        <React.Fragment key={step}>
          <div
            className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-medium transition-all ${
              currentStep >= step
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {currentStep > step ? (
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
            ) : (
              step
            )}
          </div>
          {step < totalSteps && (
            <div
              className={`w-8 md:w-16 h-1 mx-1 md:mx-2 transition-all ${
                currentStep > step ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="text-center mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-sm md:text-base text-gray-600">Let's start with your basic details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-2.5 md:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm md:text-base ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <p className="mt-1 text-xs md:text-sm text-red-600 flex items-center">
                <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                {errors.firstName}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-2.5 md:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm md:text-base ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <p className="mt-1 text-xs md:text-sm text-red-600 flex items-center">
                <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                {errors.lastName}
              </p>
            )}
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-2">
          Mobile Number *
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-2.5 md:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm md:text-base ${
              errors.mobileNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter 10-digit mobile number"
            maxLength={10}
          />
          {errors.mobileNumber && (
            <p className="mt-1 text-xs md:text-sm text-red-600 flex items-center">
              <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              {errors.mobileNumber}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-2.5 md:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm md:text-base ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="mt-1 text-xs md:text-sm text-red-600 flex items-center">
              <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              {errors.email}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="text-center mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Business Information</h2>
        <p className="text-sm md:text-base text-gray-600">Provide your GST or PAN details</p>
      </div>

      <div>
        <label htmlFor="gstNumber" className="block text-sm font-medium text-gray-700 mb-2">
          GST Number
        </label>
        <div className="relative">
          <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            id="gstNumber"
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-2.5 md:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all uppercase text-sm md:text-base ${
              errors.gstNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="22AAAAA0000A1Z5"
            maxLength={15}
          />
          {errors.gstNumber && (
            <p className="mt-1 text-xs md:text-sm text-red-600 flex items-center">
              <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              {errors.gstNumber}
            </p>
          )}
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm font-medium">OR</div>

      <div>
        <label htmlFor="panNumber" className="block text-sm font-medium text-gray-700 mb-2">
          PAN Number
        </label>
        <div className="relative">
          <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            id="panNumber"
            name="panNumber"
            value={formData.panNumber}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-2.5 md:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all uppercase text-sm md:text-base ${
              errors.panNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="ABCDE1234F"
            maxLength={10}
          />
          {errors.panNumber && (
            <p className="mt-1 text-xs md:text-sm text-red-600 flex items-center">
              <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              {errors.panNumber}
            </p>
          )}
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 md:p-4">
        <p className="text-xs md:text-sm text-indigo-800">
          <strong>Note:</strong> Please provide either GST Number or PAN Number. GST Number is preferred for registered businesses.
        </p>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="text-center mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Address Information</h2>
        <p className="text-sm md:text-base text-gray-600">Provide your address details</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 md:p-6">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2 text-indigo-600" />
          Permanent Address
        </h3>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="permanentStreet" className="block text-sm font-medium text-gray-700 mb-2">
              Street Address *
            </label>
            <input
              type="text"
              id="permanentStreet"
              name="permanentStreet"
              value={formData.permanentAddress.street}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 md:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm md:text-base ${
                errors.permanentStreet ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="House/Flat No., Building, Street"
            />
            {errors.permanentStreet && (
              <p className="mt-1 text-xs md:text-sm text-red-600 flex items-center">
                <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                {errors.permanentStreet}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="permanentCity" className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                id="permanentCity"
                name="permanentCity"
                value={formData.permanentAddress.city}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 md:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm md:text-base ${
                  errors.permanentCity ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="City"
              />
              {errors.permanentCity && (
                <p className="mt-1 text-xs md:text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  {errors.permanentCity}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="permanentState" className="block text-sm font-medium text-gray-700 mb-2">
                State *
              </label>
              <input
                type="text"
                id="permanentState"
                name="permanentState"
                value={formData.permanentAddress.state}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 md:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm md:text-base ${
                  errors.permanentState ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="State"
              />
              {errors.permanentState && (
                <p className="mt-1 text-xs md:text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  {errors.permanentState}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="permanentPincode" className="block text-sm font-medium text-gray-700 mb-2">
              Pincode *
            </label>
            <input
              type="text"
              id="permanentPincode"
              name="permanentPincode"
              value={formData.permanentAddress.pincode}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 md:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm md:text-base ${
                errors.permanentPincode ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="6-digit pincode"
              maxLength={6}
            />
            {errors.permanentPincode && (
              <p className="mt-1 text-xs md:text-sm text-red-600 flex items-center">
                <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                {errors.permanentPincode}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="sameAsPermanent"
          name="sameAsPermanent"
          checked={formData.sameAsPermanent}
          onChange={handleInputChange}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="sameAsPermanent" className="ml-2 text-xs md:text-sm text-gray-700">
          Residential address is same as permanent address
        </label>
      </div>

      {!formData.sameAsPermanent && (
        <div className="bg-gray-50 rounded-lg p-4 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Building className="w-4 h-4 md:w-5 md:h-5 mr-2 text-indigo-600" />
            Residential Address
          </h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="residentialStreet" className="block text-sm font-medium text-gray-700 mb-2">
                Street Address *
              </label>
              <input
                type="text"
                id="residentialStreet"
                name="residentialStreet"
                value={formData.residentialAddress.street}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 md:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm md:text-base ${
                  errors.residentialStreet ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="House/Flat No., Building, Street"
              />
              {errors.residentialStreet && (
                <p className="mt-1 text-xs md:text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  {errors.residentialStreet}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="residentialCity" className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  id="residentialCity"
                  name="residentialCity"
                  value={formData.residentialAddress.city}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 md:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm md:text-base ${
                    errors.residentialCity ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="City"
                />
                {errors.residentialCity && (
                  <p className="mt-1 text-xs md:text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                    {errors.residentialCity}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="residentialState" className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  id="residentialState"
                  name="residentialState"
                  value={formData.residentialAddress.state}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 md:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm md:text-base ${
                    errors.residentialState ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="State"
                />
                {errors.residentialState && (
                  <p className="mt-1 text-xs md:text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                    {errors.residentialState}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="residentialPincode" className="block text-sm font-medium text-gray-700 mb-2">
                Pincode *
              </label>
              <input
                type="text"
                id="residentialPincode"
                name="residentialPincode"
                value={formData.residentialAddress.pincode}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 md:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm md:text-base ${
                  errors.residentialPincode ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="6-digit pincode"
                maxLength={6}
              />
              {errors.residentialPincode && (
                <p className="mt-1 text-xs md:text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  {errors.residentialPincode}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="text-center mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Bank Details</h2>
        <p className="text-sm md:text-base text-gray-600">Provide your banking information for payments</p>
      </div>

      <div>
        <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-2">
          Bank Name *
        </label>
        <div className="relative">
          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            id="bankName"
            name="bankName"
            value={formData.bankName}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-2.5 md:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm md:text-base ${
              errors.bankName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your bank name"
          />
          {errors.bankName && (
            <p className="mt-1 text-xs md:text-sm text-red-600 flex items-center">
              <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              {errors.bankName}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="accountHolderName" className="block text-sm font-medium text-gray-700 mb-2">
          Account Holder Name *
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            id="accountHolderName"
            name="accountHolderName"
            value={formData.accountHolderName}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-2.5 md:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm md:text-base ${
              errors.accountHolderName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter account holder name"
          />
          {errors.accountHolderName && (
            <p className="mt-1 text-xs md:text-sm text-red-600 flex items-center">
              <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              {errors.accountHolderName}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-2">
          Account Number *
        </label>
        <div className="relative">
          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-2.5 md:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm md:text-base ${
              errors.accountNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter account number"
          />
          {errors.accountNumber && (
            <p className="mt-1 text-xs md:text-sm text-red-600 flex items-center">
              <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              {errors.accountNumber}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="confirmAccountNumber" className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Account Number *
        </label>
        <div className="relative">
          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            id="confirmAccountNumber"
            name="confirmAccountNumber"
            value={formData.confirmAccountNumber}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-2.5 md:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm md:text-base ${
              errors.confirmAccountNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Re-enter account number"
          />
          {errors.confirmAccountNumber && (
            <p className="mt-1 text-xs md:text-sm text-red-600 flex items-center">
              <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              {errors.confirmAccountNumber}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700 mb-2">
            IFSC Code *
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              id="ifscCode"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-2.5 md:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all uppercase text-sm md:text-base ${
                errors.ifscCode ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="SBIN0001234"
              maxLength={11}
            />
            {errors.ifscCode && (
              <p className="mt-1 text-xs md:text-sm text-red-600 flex items-center">
                <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                {errors.ifscCode}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="branchName" className="block text-sm font-medium text-gray-700 mb-2">
            Branch Name *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              id="branchName"
              name="branchName"
              value={formData.branchName}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-2.5 md:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm md:text-base ${
                errors.branchName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter branch name"
            />
            {errors.branchName && (
              <p className="mt-1 text-xs md:text-sm text-red-600 flex items-center">
                <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                {errors.branchName}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 md:p-6">
        <div className="flex items-start">
          <input
            type="checkbox"
            id="agreeToTerms"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            className="h-4 w-4 md:h-5 md:w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-0.5"
          />
          <label htmlFor="agreeToTerms" className="ml-3 text-xs md:text-sm text-gray-700">
            <Shield className="inline w-3 h-3 md:w-4 md:h-4 mr-1 text-indigo-600" />
            I agree to the <a href="#" className="text-indigo-600 hover:underline">Terms and Conditions</a> and <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>. I confirm that all the information provided is accurate and complete.
          </label>
        </div>
        {errors.agreeToTerms && (
          <p className="mt-2 text-xs md:text-sm text-red-600 flex items-center ml-7 md:ml-8">
            <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
            {errors.agreeToTerms}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div 
        className="p-4 md:p-8 transition-all duration-300"
        style={{ 
          marginLeft: isMinimized ? '5rem' : '5rem',
          marginTop: '2rem'
        }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Vendor Registration</h1>
            <p className="text-sm md:text-base text-gray-600">Complete the form to register as a vendor</p>
          </div>

             {/* Back Button */}
        <button
           onClick={() => router.back()}
          className="mb-6 flex items-center text-gray-600 hover:text-purple-700 transition-all duration-200 group"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-medium">Back</span>
        </button>
          {renderStepIndicator()}

          <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 lg:p-8">
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}

              <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="w-full sm:w-auto px-4 md:px-6 py-2.5 md:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm md:text-base"
                  >
                    Previous
                  </button>
                )}
                
                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className={`w-full sm:w-auto px-4 md:px-6 py-2.5 md:py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm md:text-base ${
                      currentStep === 1 ? 'sm:ml-auto' : ''
                    }`}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm md:text-base sm:ml-auto"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                        Submit Registration
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="text-center mt-4 md:mt-6">
            <p className="text-xs md:text-sm text-gray-600">
              Need help? Contact us at <a href="mailto:support@example.com" className="text-indigo-600 hover:underline">support@example.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveVendorRegistrationForm;