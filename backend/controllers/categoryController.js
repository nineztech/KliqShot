import { Op } from 'sequelize';
import { sequelize } from '../config/dbConnection.js';
import Category from '../models/Category.js';

// @desc    Get all categories with subcategories
// @route   GET /api/categories
// @access  Public
export const getAllCategories = async (req, res) => {
  try {
    const includeInactive = req.query.includeInactive === 'true';
    
    // Build where clause
    const whereClause = includeInactive ? {} : { isActive: true };
    
    // Get all parent categories (where parentId is null)
    const categories = await Category.findAll({
      where: {
        ...whereClause,
        parentId: null
      },
      include: [{
        model: Category,
        as: 'subCategories',
        where: includeInactive ? {} : { isActive: true },
        required: false,
        separate: true,
        order: [['displayOrder', 'ASC'], ['name', 'ASC']]
      }],
      order: [['displayOrder', 'ASC'], ['name', 'ASC']]
    });

    res.status(200).json({
      success: true,
      data: {
        categories,
        total: categories.length
      }
    });
  } catch (error) {
    console.error('Get All Categories Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get single category by ID
// @route   GET /api/categories/:id
// @access  Public
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id, {
      include: [{
        model: Category,
        as: 'subCategories',
        order: [['displayOrder', 'ASC'], ['name', 'ASC']]
      }, {
        model: Category,
        as: 'parent'
      }]
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        category
      }
    });
  } catch (error) {
    console.error('Get Category By ID Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get subcategories of a category
// @route   GET /api/categories/:id/subcategories
// @access  Public
export const getSubCategories = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if parent category exists
    const parentCategory = await Category.findByPk(id);
    if (!parentCategory) {
      return res.status(404).json({
        success: false,
        message: 'Parent category not found'
      });
    }

    const subCategories = await Category.findAll({
      where: { parentId: id },
      order: [['displayOrder', 'ASC'], ['name', 'ASC']]
    });

    res.status(200).json({
      success: true,
      data: {
        subCategories,
        total: subCategories.length
      }
    });
  } catch (error) {
    console.error('Get SubCategories Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Create a new category or subcategory
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = async (req, res) => {
  try {
    const {
      name,
      description,
      image,
      parentId,
      displayOrder,
      isActive
    } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required'
      });
    }

    // If parentId is provided, check if parent category exists
    if (parentId) {
      const parentCategory = await Category.findByPk(parentId);
      if (!parentCategory) {
        return res.status(404).json({
          success: false,
          message: 'Parent category not found'
        });
      }

      // Check if parent is already a subcategory (prevent more than 2 levels)
      if (parentCategory.parentId) {
        return res.status(400).json({
          success: false,
          message: 'Cannot create subcategory under another subcategory. Maximum 2 levels allowed.'
        });
      }
    }

    // Check for duplicate name at the same level (case-insensitive)
    const existingCategory = await Category.findOne({
      where: {
        [Op.and]: [
          sequelize.where(
            sequelize.fn('LOWER', sequelize.col('name')),
            sequelize.fn('LOWER', name.trim())
          ),
          { parentId: parentId || null }
        ]
      }
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: `${parentId ? 'Subcategory' : 'Category'} with this name already exists at this level`
      });
    }

    // Create category
    const category = await Category.create({
      name,
      description: description || null,
      image: image || null,
      parentId: parentId || null,
      displayOrder: displayOrder || 0,
      isActive: isActive !== undefined ? isActive : true,
      photographerCount: 0
    });

    // Fetch the created category with associations
    const createdCategory = await Category.findByPk(category.id, {
      include: [{
        model: Category,
        as: 'subCategories'
      }, {
        model: Category,
        as: 'parent'
      }]
    });

    res.status(201).json({
      success: true,
      message: `${parentId ? 'Subcategory' : 'Category'} created successfully`,
      data: {
        category: createdCategory
      }
    });
  } catch (error) {
    console.error('Create Category Error:', error);
    
    // Handle Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors.map(e => e.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during category creation',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update category or subcategory
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      image,
      parentId,
      displayOrder,
      isActive,
      photographerCount
    } = req.body;

    // Find category
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // If changing parentId, validate
    if (parentId !== undefined && parentId !== category.parentId) {
      if (parentId) {
        // Check if new parent exists
        const parentCategory = await Category.findByPk(parentId);
        if (!parentCategory) {
          return res.status(404).json({
            success: false,
            message: 'Parent category not found'
          });
        }

        // Prevent moving a category under its own subcategory
        if (parentCategory.parentId === id) {
          return res.status(400).json({
            success: false,
            message: 'Cannot move category under its own subcategory'
          });
        }

        // Prevent more than 2 levels
        if (parentCategory.parentId) {
          return res.status(400).json({
            success: false,
            message: 'Cannot create subcategory under another subcategory. Maximum 2 levels allowed.'
          });
        }
      }

      // If category has subcategories and trying to make it a subcategory
      if (parentId && category.parentId === null) {
        const hasSubCategories = await Category.count({
          where: { parentId: id }
        });

        if (hasSubCategories > 0) {
          return res.status(400).json({
            success: false,
            message: 'Cannot move a category with subcategories under another category'
          });
        }
      }
    }

    // Check for duplicate name if name is being changed (case-insensitive)
    if (name && name !== category.name) {
      const existingCategory = await Category.findOne({
        where: {
          [Op.and]: [
            sequelize.where(
              sequelize.fn('LOWER', sequelize.col('name')),
              sequelize.fn('LOWER', name.trim())
            ),
            { parentId: parentId !== undefined ? parentId : category.parentId },
            { id: { [Op.ne]: id } }
          ]
        }
      });

      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: 'Category with this name already exists at this level'
        });
      }
    }

    // Update category
    await category.update({
      name: name || category.name,
      description: description !== undefined ? description : category.description,
      image: image !== undefined ? image : category.image,
      parentId: parentId !== undefined ? parentId : category.parentId,
      displayOrder: displayOrder !== undefined ? displayOrder : category.displayOrder,
      isActive: isActive !== undefined ? isActive : category.isActive,
      photographerCount: photographerCount !== undefined ? photographerCount : category.photographerCount
    });

    // Fetch updated category with associations
    const updatedCategory = await Category.findByPk(id, {
      include: [{
        model: Category,
        as: 'subCategories',
        order: [['displayOrder', 'ASC'], ['name', 'ASC']]
      }, {
        model: Category,
        as: 'parent'
      }]
    });

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: {
        category: updatedCategory
      }
    });
  } catch (error) {
    console.error('Update Category Error:', error);

    // Handle Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors.map(e => e.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during category update',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

