// middleware/authmiddleware.js - Complete version with token tracking for logout

import jwt from 'jsonwebtoken';
import Seller from '../models/Seller.js';
import User from '../models/User.js';

// Seller authentication middleware
export const authenticateSeller = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if token contains sellerId (for sellers)
    if (!decoded.sellerId) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Seller authentication required.'
      });
    }

    const seller = await Seller.findByPk(decoded.sellerId, {
      attributes: { exclude: ['password'] }
    });

    if (!seller) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token or seller not found.'
      });
    }

    // Attach token and seller info to request (needed for logout)
    req.token = token;
    req.seller = { sellerId: seller.id, seller };
    next();
  } catch (error) {
    console.error('Seller Authentication Error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired.'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Server error during authentication.'
    });
  }
};

// Optional seller authentication middleware (doesn't fail if no token)
export const optionalSellerAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      if (decoded.sellerId) {
        const seller = await Seller.findByPk(decoded.sellerId, {
          attributes: { exclude: ['password'] }
        });

        if (seller) {
          req.token = token;
          req.seller = { sellerId: seller.id, seller };
        }
      }
    }

    next();
  } catch (error) {
    // Continue without authentication for optional auth
    next();
  }
};

// Combined authentication (accepts both user and seller tokens)
export const authenticateAny = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if it's a seller token
    if (decoded.sellerId) {
      const seller = await Seller.findByPk(decoded.sellerId, {
        attributes: { exclude: ['password'] }
      });

      if (seller) {
        req.token = token;
        req.seller = { sellerId: seller.id, seller };
        req.userType = 'seller';
        return next();
      }
    }

    // Check if it's a user token
    if (decoded.userId) {
      const user = await User.findByPk(decoded.userId);

      if (user && user.isActive) {
        req.token = token;
        req.user = { userId: user.id, user };
        req.userType = 'user';
        return next();
      }
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid token or account not found.'
    });

  } catch (error) {
    console.error('Authentication Error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired.'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Server error during authentication.'
    });
  }
};

// Seller-only authorization middleware
export const sellerOnly = (req, res, next) => {
  if (!req.seller) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Seller authentication required.'
    });
  }
  next();
};

// Combined authorization: Allow both sellers and users with specific roles
export const allowSellerOrUserRoles = (allowedUserRoles = []) => {
  return (req, res, next) => {
    // Check if it's a seller
    if (req.seller) {
      return next();
    }

    // Check if it's a user with allowed role
    if (req.user) {
      const userRole = req.user.user.role;
      
      if (allowedUserRoles.includes(userRole)) {
        return next();
      }
      
      return res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.'
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Access denied. Authentication required.'
    });
  };
};

// Allow sellers or admins
export const sellerOrAdmin = allowSellerOrUserRoles(['admin']);

// Allow sellers, admins, or any user
export const sellerOrAnyUser = allowSellerOrUserRoles(['user', 'seller', 'admin']);