import express from 'express';
import { uploadImage } from '../config/multerConfig.js';

const router = express.Router();

// Image upload route
router.post('/category-image', uploadImage);
router.post('/profile-image', uploadImage);

router.post('/', uploadImage);
export default router;

