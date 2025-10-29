import express from 'express';
import {
  registerSeller,
  loginSeller,
  getSellerProfile,
  updateSellerProfile,
  logoutSeller,
  getAllSellers,
  verifySeller
} from '../controllers/sellerController.js';
import { authenticateSeller } from '../middleware/authmiddelware.js';

const router = express.Router();

// Public routes
router.post('/register', registerSeller);
router.post('/login', loginSeller);

// Protected routes (require seller authentication)
router.post('/logout', authenticateSeller, logoutSeller);
router.get('/profile', authenticateSeller, getSellerProfile);
router.put('/profile', authenticateSeller, updateSellerProfile);

// Admin routes (should be protected with admin authentication in production)
router.get('/all', getAllSellers);
router.put('/verify/:id', verifySeller);

export default router;