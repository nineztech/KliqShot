import express from 'express';
import {
  getAllCategories,
  getCategoryById,
  getSubCategories,
  createCategory,
  updateCategory
} from '../controllers/categoryController.js';

// Import middleware (uncomment when auth is needed)
// import { authenticate } from '../middleware/auth.js';
// import { authorize } from '../middleware/authorize.js';

const router = express.Router();

// Public routes
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.get('/:id/subcategories', getSubCategories);

// Protected routes (temporarily public for development)
// TODO: Add authentication middleware for production
router.post('/', createCategory);
router.put('/:id', updateCategory);

// When ready to add authentication:
// router.post('/', authenticate, authorize(['admin']), createCategory);
// router.put('/:id', authenticate, authorize(['admin']), updateCategory);

export default router;

