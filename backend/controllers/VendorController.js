import VendorProfile from "../models/VendorProfile.js";
import Seller from "../models/Seller.js";

export const getVendorProfile = async (req, res) => {
  try {
    const sellerId = req.seller.sellerId;
    
    const profile = await VendorProfile.findOne({
      where: { sellerId },
      include: [{
        model: Seller,
        attributes: ['id', 'email', 'isProfileCompleted']
      }]
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Vendor profile not found"
      });
    }

    // Transform the data to match frontend structure
    const transformedProfile = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      mobileNumber: profile.mobileNumber,
      email: profile.email,
      gstNumber: profile.gstNumber,
      panNumber: profile.panNumber,
      permanentAddress: {
        street: profile.permanentStreet,
        city: profile.permanentCity,
        state: profile.permanentState,
        pincode: profile.permanentPincode
      },
      residentialAddress: {
        street: profile.residentialStreet,
        city: profile.residentialCity,
        state: profile.residentialState,
        pincode: profile.residentialPincode
      },
      bankName: profile.bankName,
      accountHolderName: profile.accountHolderName,
      accountNumber: profile.accountNumber,
      ifscCode: profile.ifscCode,
      branchName: profile.branchName,
      // NEW FIELDS
      whatsappNumber: profile.whatsappNumber,
      dateOfBirth: profile.dateOfBirth,
      serviceRadius: profile.serviceRadius,
      travelPreference: profile.travelPreference,
      languagePreferences: profile.languagePreferences || [],
      bio: profile.bio,
      businessType: profile.businessType,
      incorporationDate: profile.incorporationDate,
      documents: {
        businessRegistration: profile.businessRegistrationDocument,
        gstCertificate: profile.gstCertificateDocument
      },
      seller: profile.Seller
    };

    return res.status(200).json({
      success: true,
      data: transformedProfile
    });

  } catch (error) {
    console.error("Error fetching vendor profile:", error);
    
    return res.status(500).json({
      success: false,
      message: "Failed to fetch vendor profile",
      error: error.message
    });
  }
};

// Save or Update Vendor Profile
export const saveVendorProfile = async (req, res) => {
  try {
    const sellerId = req.seller.sellerId;
    
    const {
      firstName,
      lastName,
      mobileNumber,
      email,
      gstNumber,
      panNumber,
      permanentAddress,
      residentialAddress,
      bankName,
      accountHolderName,
      accountNumber,
      ifscCode,
      branchName,
      // NEW FIELDS
      whatsappNumber,
      dateOfBirth,
      serviceRadius,
      travelPreference,
      languagePreferences,
      bio,
      businessType,
      incorporationDate,
      documents
    } = req.body;

    // Create profile data
    const profileData = {
      sellerId,
      firstName,
      lastName,
      mobileNumber,
      email,
      gstNumber: gstNumber || null,
      panNumber: panNumber || null,
      permanentStreet: permanentAddress.street,
      permanentCity: permanentAddress.city,
      permanentState: permanentAddress.state,
      permanentPincode: permanentAddress.pincode,
      residentialStreet: residentialAddress.street,
      residentialCity: residentialAddress.city,
      residentialState: residentialAddress.state,
      residentialPincode: residentialAddress.pincode,
      bankName,
      accountHolderName,
      accountNumber,
      ifscCode,
      branchName,
      // NEW FIELDS
      whatsappNumber: whatsappNumber || null,
      dateOfBirth: dateOfBirth || null,
      serviceRadius: serviceRadius || null,
      travelPreference: travelPreference || null,
      languagePreferences: languagePreferences || [],
      bio: bio || null,
      businessType: businessType || null,
      incorporationDate: incorporationDate || null,
      businessRegistrationDocument: documents?.businessRegistration || null,
      gstCertificateDocument: documents?.gstCertificate || null
    };

    // Check if vendor profile already exists
    const existingProfile = await VendorProfile.findOne({
      where: { sellerId }
    });

    let profile;
    let message;

    if (existingProfile) {
      // Update existing profile
      await existingProfile.update(profileData);
      profile = existingProfile;
      message = "Vendor profile updated successfully";
    } else {
      // Create new profile
      profile = await VendorProfile.create(profileData);
      message = "Vendor profile created successfully";
    }
    
    // Update seller's profile completion status
    await Seller.update(
      { isProfileCompleted: true },
      { where: { id: sellerId } }
    );

    // Transform response to match frontend structure
    const transformedProfile = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      mobileNumber: profile.mobileNumber,
      email: profile.email,
      gstNumber: profile.gstNumber,
      panNumber: profile.panNumber,
      permanentAddress: {
        street: profile.permanentStreet,
        city: profile.permanentCity,
        state: profile.permanentState,
        pincode: profile.permanentPincode
      },
      residentialAddress: {
        street: profile.residentialStreet,
        city: profile.residentialCity,
        state: profile.residentialState,
        pincode: profile.residentialPincode
      },
      bankName: profile.bankName,
      accountHolderName: profile.accountHolderName,
      accountNumber: profile.accountNumber,
      ifscCode: profile.ifscCode,
      branchName: profile.branchName,
      whatsappNumber: profile.whatsappNumber,
      dateOfBirth: profile.dateOfBirth,
      serviceRadius: profile.serviceRadius,
      travelPreference: profile.travelPreference,
      languagePreferences: profile.languagePreferences,
      bio: profile.bio,
      businessType: profile.businessType,
      incorporationDate: profile.incorporationDate,
      documents: {
        businessRegistration: profile.businessRegistrationDocument,
        gstCertificate: profile.gstCertificateDocument
      }
    };

    return res.status(existingProfile ? 200 : 201).json({
      success: true,
      message: message,
      data: transformedProfile
    });

  } catch (error) {
    console.error("Error saving vendor profile:", error);
    
    return res.status(500).json({
      success: false,
      message: "Failed to save vendor profile",
      error: error.message
    });
  }
};