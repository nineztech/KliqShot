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