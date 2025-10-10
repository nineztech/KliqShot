import express from 'express';
import { uploadImage } from '../controllers/uploadController.js';

const router = express.Router();

// Image upload route
router.post('/category-image', uploadImage);

export default router;

