import { uploadCategoryImage } from '../config/multerConfig.js';

// @desc    Upload category image
// @route   POST /api/upload/category-image
// @access  Public (should be protected in production)
export const uploadImage = (req, res) => {
  uploadCategoryImage(req, res, (err) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(400).json({
        success: false,
        message: err.message || 'Error uploading image'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Generate the URL for the uploaded file
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/categories/${req.file.filename}`;

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        filename: req.file.filename,
        path: req.file.path,
        url: imageUrl,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
  });
};

