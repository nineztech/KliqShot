import express from 'express';
import { saveVendorProfile } from '../controllers/VendorController.js';
import { authenticateSeller } from '../middleware/authmiddelware.js';

const router = express.Router();

// Save vendor profile
router.post('/profile', authenticateSeller, saveVendorProfile);

export default router;