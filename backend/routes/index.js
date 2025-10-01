import express from 'express';
import userRoutes from './userRoutes.js';

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

// Add other route modules here as they are created
// router.use('/products', productRoutes);
// router.use('/orders', orderRoutes);
// router.use('/categories', categoryRoutes);

export default router;
