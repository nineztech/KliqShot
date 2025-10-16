import VendorProfile from "../models/VendorProfile.js";
import Seller from "../models/Seller.js";

// Save or Update Vendor Profile
export const saveVendorProfile = async (req, res) => {
  try {
    const sellerId = req.seller.sellerId; // Get from authenticateSeller middleware
    
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

    return res.status(existingProfile ? 200 : 201).json({
      success: true,
      message: message,
      data: profile
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