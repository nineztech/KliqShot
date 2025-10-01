import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
  getAllUsers,
  getUserById,
  updateUserStatus,
  deleteUser
} from '../controllers/userController.js';

// Import middleware
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/authorize.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes (require authentication)
router.get('/profile', authenticate, getUserProfile);
router.put('/profile', authenticate, updateUserProfile);
router.put('/change-password', authenticate, changePassword);

// Admin routes (require authentication and admin role)
router.get('/', authenticate, authorize(['admin']), getAllUsers);
router.get('/:id', authenticate, authorize(['admin']), getUserById);
router.put('/:id/status', authenticate, authorize(['admin']), updateUserStatus);
router.delete('/:id', authenticate, authorize(['admin']), deleteUser);

export default router;
