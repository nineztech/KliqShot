import express from 'express';
import { saveVendorProfile, getVendorProfile } from '../controllers/VendorController.js';
import { authenticateSeller } from '../middleware/authmiddelware.js';

const router = express.Router();

router.post('/profile', authenticateSeller, saveVendorProfile);
router.put('/profile', authenticateSeller, saveVendorProfile); // Add PUT route
router.get('/profile', authenticateSeller, getVendorProfile);

export default router;