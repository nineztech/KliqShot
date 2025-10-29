import TeamMember from "../models/Teammember.js";
import { Op } from "sequelize";

// Create a new team member
export const createTeamMember = async (req, res) => {
  try {
    console.log('📥 Received request body:', JSON.stringify(req.body, null, 2));
    
    const { sellerId, firstName, lastName, email, mobile, designation, category, experience, profileImage, Owneremail } = req.body;

    console.log('🔍 Parsed fields:', { 
      sellerId, 
      firstName, 
      lastName, 
      email, 
      mobile, 
      designation, 
      category, 
      experience,
      Owneremail,
      profileImage: profileImage ? 'has value' : 'empty/null'
    });

    // Validate required fields
    if (!sellerId) {
      console.log('❌ Missing sellerId');
      return res.status(400).json({
        success: false,
        message: "Seller ID is required"
      });
    }

    // Validate Owneremail is provided
    if (!Owneremail) {
      console.log('❌ Missing Owneremail');
      return res.status(400).json({
        success: false,
        message: "Owner email is required. Please ensure you're logged in."
      });
    }

    if (!firstName || !lastName || !email || !mobile || !designation || !category || !experience) {
      console.log('❌ Missing required fields');
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
        missing: {
          firstName: !firstName,
          lastName: !lastName,
          email: !email,
          mobile: !mobile,
          designation: !designation,
          category: !category,
          experience: !experience
        }
      });
    }

    // Check if email already exists
    console.log('🔍 Checking for existing email:', email);
    const existingMember = await TeamMember.findOne({ 
      where: { email } 
    });

    if (existingMember) {
      console.log('⚠️ Email already exists:', email);
      return res.status(409).json({
        success: false,
        message: `Email ${email} is already registered. Please use a different email.`
      });
    }

    // Parse designation - support both single string and array
    let designationArray = designation;
    if (typeof designation === 'string') {
      try {
        designationArray = JSON.parse(designation);
      } catch {
        designationArray = [designation];
      }
    }

    // Ensure it's an array
    if (!Array.isArray(designationArray)) {
      designationArray = [designationArray];
    }

    console.log('📝 Parsed designations:', designationArray);

    // Prepare data for creation
    const memberData = {
      sellerId: parseInt(sellerId),
      Owneremail: Owneremail.trim().toLowerCase(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      mobile: mobile.trim(),
      designation: JSON.stringify(designationArray), // Store as JSON array
      category,
      experience,
      profileImage: profileImage && profileImage !== '' ? profileImage : null,
      availability: 'Available',
      bookingsCount: 0,
      completedBookings: 0,
      isActive: true,
      isOwner: false // New members are never owners by default
    };

    console.log('💾 Creating team member with data:', JSON.stringify(memberData, null, 2));

    // Create new team member
    const teamMember = await TeamMember.create(memberData);

    console.log('✅ Team member created successfully:', teamMember.id);

    return res.status(201).json({
      success: true,
      message: "Team member added successfully",
      data: teamMember
    });

  } catch (error) {
    console.error("❌ ERROR creating team member:");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Full error:", error);
    
    if (error.stack) {
      console.error("Stack trace:", error.stack);
    }
    
    // Handle Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
      const errorMessages = error.errors.map(e => ({
        field: e.path,
        message: e.message,
        value: e.value
      }));
      console.error("Validation errors:", errorMessages);
      
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errorMessages
      });
    }

    // Handle unique constraint errors
    if (error.name === 'SequelizeUniqueConstraintError') {
      console.error("Unique constraint error:", error.errors);
      return res.status(409).json({
        success: false,
        message: "This email is already registered"
      });
    }

    // Handle database errors
    if (error.name === 'SequelizeDatabaseError') {
      console.error("Database error details:", error.parent);
      return res.status(400).json({
        success: false,
        message: "Database error: " + error.message,
        details: error.parent ? error.parent.message : null
      });
    }

    // Handle foreign key constraint errors
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      console.error("Foreign key error - sellerId might not exist:", error);
      return res.status(400).json({
        success: false,
        message: "Invalid seller ID. Please ensure you're logged in correctly."
      });
    }

    // Generic error handler
    return res.status(500).json({
      success: false,
      message: "Failed to create team member",
      error: error.message,
      errorType: error.name
    });
  }
};

// Get all team members for a seller
export const getAllTeamMembers = async (req, res) => {
  try {
    const { sellerId, availability, designation, isActive, search, category } = req.query;

    if (!sellerId) {
      return res.status(400).json({
        success: false,
        message: "Seller ID is required"
      });
    }

    // Build query conditions
    const whereConditions = { sellerId };

    if (availability) {
      whereConditions.availability = availability;
    }

    if (category) {
      whereConditions.category = category;
    }

    // Filter by designation (check if JSON array contains the designation)
    if (designation) {
      whereConditions.designation = { [Op.like]: `%"${designation}"%` };
    }

    if (isActive !== undefined) {
      whereConditions.isActive = isActive === 'true';
    }

    if (search) {
      whereConditions[Op.or] = [
        { firstName: { [Op.like]: `%${search}%` } },
        { lastName: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } }
      ];
    }

    const teamMembers = await TeamMember.findAll({
      where: whereConditions,
      order: [
        ['isOwner', 'DESC'], // Owner always first
        ['createdAt', 'DESC']
      ]
    });

    return res.status(200).json({
      success: true,
      count: teamMembers.length,
      data: teamMembers
    });

  } catch (error) {
    console.error("Error fetching team members:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Get single team member by ID
export const getTeamMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const { sellerId } = req.query;

    if (!sellerId) {
      return res.status(400).json({
        success: false,
        message: "Seller ID is required"
      });
    }

    const teamMember = await TeamMember.findOne({
      where: { 
        id, 
        sellerId 
      }
    });

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: "Team member not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: teamMember
    });

  } catch (error) {
    console.error("Error fetching team member:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Update team member
export const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { sellerId, designation, isActive, ...updateData } = req.body;

    if (!sellerId) {
      return res.status(400).json({
        success: false,
        message: "Seller ID is required"
      });
    }

    // Find team member
    const teamMember = await TeamMember.findOne({
      where: { 
        id, 
        sellerId 
      }
    });

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: "Team member not found"
      });
    }

    // ⚠️ OWNER PROTECTION: Prevent deactivating owner
    if (teamMember.isOwner && isActive === false) {
      return res.status(403).json({
        success: false,
        message: "Cannot deactivate the owner team member"
      });
    }

    // ⚠️ OWNER PROTECTION: Prevent removing Owner designation
    if (teamMember.isOwner && designation) {
      let designationArray = designation;
      if (typeof designation === 'string') {
        try {
          designationArray = JSON.parse(designation);
        } catch {
          designationArray = [designation];
        }
      }
      
      if (!Array.isArray(designationArray) || !designationArray.includes('Owner')) {
        return res.status(403).json({
          success: false,
          message: 'Owner must always have "Owner" designation'
        });
      }
    }

    // Parse designation if provided
    if (designation) {
      let designationArray = designation;
      if (typeof designation === 'string') {
        try {
          designationArray = JSON.parse(designation);
        } catch {
          designationArray = [designation];
        }
      }
      
      if (!Array.isArray(designationArray)) {
        designationArray = [designationArray];
      }
      
      updateData.designation = JSON.stringify(designationArray);
    }

    // If email is being updated, check if it already exists
    if (updateData.email && updateData.email !== teamMember.email) {
      const existingMember = await TeamMember.findOne({
        where: {
          email: updateData.email,
          sellerId,
          id: { [Op.ne]: id }
        }
      });

      if (existingMember) {
        return res.status(409).json({
          success: false,
          message: "Email already exists for another team member"
        });
      }
    }

    // Update team member (including isActive if provided)
    await teamMember.update({
      ...updateData,
      ...(isActive !== undefined && { isActive })
    });

    return res.status(200).json({
      success: true,
      message: "Team member updated successfully",
      data: teamMember
    });

  } catch (error) {
    console.error("Error updating team member:", error);
    
    // Handle Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors.map(e => e.message)
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Delete team member (soft delete by setting isActive to false)
export const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { sellerId, permanent } = req.query;

    if (!sellerId) {
      return res.status(400).json({
        success: false,
        message: "Seller ID is required"
      });
    }

    const teamMember = await TeamMember.findOne({
      where: { 
        id, 
        sellerId 
      }
    });

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: "Team member not found"
      });
    }

    // ⚠️ OWNER PROTECTION: Prevent deleting owner
    if (teamMember.isOwner) {
      return res.status(403).json({
        success: false,
        message: "Cannot delete the owner team member"
      });
    }

    // Check if team member has active bookings
    if (teamMember.bookingsCount > 0 && permanent === 'true') {
      return res.status(400).json({
        success: false,
        message: "Cannot permanently delete team member with active bookings. Please reassign bookings first."
      });
    }

    if (permanent === 'true') {
      // Permanent deletion
      await teamMember.destroy();
      return res.status(200).json({
        success: true,
        message: "Team member permanently deleted"
      });
    } else {
      // Soft delete (deactivate)
      await teamMember.update({ isActive: false });
      return res.status(200).json({
        success: true,
        message: "Team member deactivated successfully",
        data: teamMember
      });
    }

  } catch (error) {
    console.error("Error deleting team member:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Toggle active status
export const toggleActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { sellerId, isActive } = req.body;

    if (!sellerId) {
      return res.status(400).json({
        success: false,
        message: "Seller ID is required"
      });
    }

    if (typeof isActive !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: "isActive must be a boolean value"
      });
    }

    const teamMember = await TeamMember.findOne({
      where: { 
        id, 
        sellerId 
      }
    });

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: "Team member not found"
      });
    }

    // ⚠️ OWNER PROTECTION: Prevent deactivating owner
    if (teamMember.isOwner && isActive === false) {
      return res.status(403).json({
        success: false,
        message: "Cannot deactivate the owner team member"
      });
    }

    // Update only the isActive status
    await teamMember.update({ isActive });

    return res.status(200).json({
      success: true,
      message: `Team member ${isActive ? 'activated' : 'deactivated'} successfully`,
      data: teamMember
    });

  } catch (error) {
    console.error("Error toggling active status:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Update team member availability
export const updateAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { sellerId, availability } = req.body;

    if (!sellerId) {
      return res.status(400).json({
        success: false,
        message: "Seller ID is required"
      });
    }

    if (!['Available', 'Busy', 'On Leave'].includes(availability)) {
      return res.status(400).json({
        success: false,
        message: "Invalid availability status"
      });
    }

    const teamMember = await TeamMember.findOne({
      where: { 
        id, 
        sellerId 
      }
    });

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: "Team member not found"
      });
    }

    await teamMember.update({ availability });

    return res.status(200).json({
      success: true,
      message: "Availability updated successfully",
      data: teamMember
    });

  } catch (error) {
    console.error("Error updating availability:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Get team member statistics
export const getTeamStatistics = async (req, res) => {
  try {
    const { sellerId } = req.query;

    if (!sellerId) {
      return res.status(400).json({
        success: false,
        message: "Seller ID is required"
      });
    }

    const totalMembers = await TeamMember.count({
      where: { sellerId, isActive: true }
    });

    const availableMembers = await TeamMember.count({
      where: { sellerId, availability: 'Available', isActive: true }
    });

    const busyMembers = await TeamMember.count({
      where: { sellerId, availability: 'Busy', isActive: true }
    });

    const onLeaveMembers = await TeamMember.count({
      where: { sellerId, availability: 'On Leave', isActive: true }
    });

    const inactiveMembers = await TeamMember.count({
      where: { sellerId, isActive: false }
    });

    const topPerformers = await TeamMember.findAll({
      where: { sellerId, isActive: true },
      order: [['bookingsCount', 'DESC']],
      limit: 5
    });

    return res.status(200).json({
      success: true,
      data: {
        totalMembers,
        availableMembers,
        busyMembers,
        onLeaveMembers,
        inactiveMembers,
        topPerformers
      }
    });

  } catch (error) {
    console.error("Error fetching team statistics:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};