import Seller from '../models/Seller.js';
import TeamMember from '../models/Teammember.js';
import VendorProfile from '../models/VendorProfile.js'; // Add this import
import jwt from 'jsonwebtoken';

// Generate JWT Token for Seller
const generateToken = (sellerId) => {
  return jwt.sign({ sellerId }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '30d',
  });
};

// @desc    Register a new seller
// @route   POST /api/sellers/register
// @access  Public
export const registerSeller = async (req, res) => {
  try {
    const { firstname, lastname, Phone, email, password } = req.body;

    // Validation
    if (!firstname || !lastname || !Phone || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if seller already exists
    const sellerExists = await Seller.findOne({ where: { email } });

    if (sellerExists) {
      return res.status(400).json({
        success: false,
        message: 'Seller with this email already exists'
      });
    }

    // Validate phone number length
    if (Phone.length !== 10) {
      return res.status(400).json({
        success: false,
        message: 'Phone number must be exactly 10 digits'
      });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long'
      });
    }

    // Create seller
    const seller = await Seller.create({
      firstname,
      lastname,
      Phone,
      email,
      password
    });

    if (seller) {
      // ✨ AUTO-CREATE OWNER TEAM MEMBER
      try {
        console.log('🔍 Creating owner team member for seller:', seller.id);
        console.log('Seller data:', {
          id: seller.id,
          email: seller.email,
          firstname: seller.firstname,
          lastname: seller.lastname,
          phone: seller.Phone
        });
        
        // Create owner team member with all required fields
        const ownerMember = await TeamMember.create({
          sellerId: seller.id,
          Owneremail: seller.email.toLowerCase().trim(),
          firstName: seller.firstname.trim(),
          lastName: seller.lastname.trim(),
          email: seller.email.toLowerCase().trim(),
          mobile: seller.Phone.toString(),
          designation: JSON.stringify(['Owner']), // Store as JSON array
          category: 'Full-time',
          experience: '0-1 years',
          profileImage: null,
          availability: 'Available',
          isActive: true,
          isOwner: true, // ✨ Mark as owner
          bookingsCount: 0,
          completedBookings: 0
        });
        
        console.log('✅ Owner team member created successfully:', ownerMember.id);
      } catch (teamError) {
        console.error('❌ ERROR creating owner team member:');
        console.error('Error name:', teamError.name);
        console.error('Error message:', teamError.message);
        console.error('Error details:', teamError);
        
        // Log detailed error for debugging
        if (teamError.errors) {
          console.error('Validation errors:', teamError.errors);
        }
        if (teamError.parent) {
          console.error('Database error:', teamError.parent);
        }
        
        // ⚠️ WARNING: Owner team member creation failed
        // We don't fail the registration, but we log it prominently
        console.warn('⚠️ WARNING: Seller registered but owner team member creation failed');
        console.warn('Seller can still login, but should manually add themselves as a team member');
      }

      res.status(201).json({
        success: true,
        message: 'Seller registered successfully',
        data: {
          id: seller.id,
          firstname: seller.firstname,
          lastname: seller.lastname,
          email: seller.email,
          Phone: seller.Phone,
          token: generateToken(seller.id)
        }
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors.map(e => e.message)
      });
    }

    // Handle unique constraint errors
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message
    });
  }
};

// @desc    Logout seller
// @route   POST /api/sellers/logout
// @access  Private
export const logoutSeller = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during logout',
      error: error.message
    });
  }
};

// @desc    Login seller
// @route   POST /api/sellers/login
// @access  Public
export const loginSeller = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find seller by email
    const seller = await Seller.findOne({ where: { email } });

    if (!seller) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordValid = await seller.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if vendor profile exists
    const vendorProfile = await VendorProfile.findOne({ 
      where: { sellerId: seller.id } 
    });

    // Determine if profile is completed
    const hasVendorProfile = !!vendorProfile;

    // Send response with profile status
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        id: seller.id,
        firstname: seller.firstname,
        lastname: seller.lastname,
        email: seller.email,
        Phone: seller.Phone,
        hasVendorProfile: hasVendorProfile, // Flag to check vendor profile
        isProfileCompleted: hasVendorProfile, // Keep for backward compatibility
        token: generateToken(seller.id)
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
};

// @desc    Get seller profile
// @route   GET /api/sellers/profile
// @access  Private
export const getSellerProfile = async (req, res) => {
  try {
    const seller = await Seller.findByPk(req.seller.sellerId, {
      attributes: { exclude: ['password'] }
    });

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: 'Seller not found'
      });
    }

    res.status(200).json({
      success: true,
      data: seller
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update seller profile
// @route   PUT /api/sellers/profile
// @access  Private
export const updateSellerProfile = async (req, res) => {
  try {
    const seller = await Seller.findByPk(req.seller.sellerId);

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: 'Seller not found'
      });
    }

    const { firstname, lastname, Phone, email, password } = req.body;

    // Update fields if provided
    if (firstname) seller.firstname = firstname;
    if (lastname) seller.lastname = lastname;
    if (Phone) {
      if (Phone.length !== 10) {
        return res.status(400).json({
          success: false,
          message: 'Phone number must be exactly 10 digits'
        });
      }
      seller.Phone = Phone;
    }
    if (email) seller.email = email;
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 6 characters long'
        });
      }
      seller.password = password;
    }

    await seller.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: seller.id,
        firstname: seller.firstname,
        lastname: seller.lastname,
        email: seller.email,
        Phone: seller.Phone
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};