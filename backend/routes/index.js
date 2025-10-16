import express from 'express';
import userRoutes from './userRoutes.js';
import sellerRoutes from './sellerRoutes.js';
import vendorProfileRoutes from './VendorRoutes.js';
 
import adminRoutes from './adminRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import uploadRoutes from './uploadRoutes.js';
const router = express.Router();

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
router.use('/users', userRoutes);
router.use('/sellers', sellerRoutes);
router.use('/vendors', vendorProfileRoutes);
router.use('/admins', adminRoutes);
router.use('/categories', categoryRoutes);
router.use('/upload', uploadRoutes);
// Add other route modules here as they are created
// router.use('/products', productRoutes);
// router.use('/orders', orderRoutes);

export default router;
