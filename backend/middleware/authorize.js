// Authorization middleware
export const authorize = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Authentication required.'
      });
    }

    const userRole = req.user.user.role;
    
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.'
      });
    }

    next();
  };
};

// Admin only middleware
export const adminOnly = authorize(['admin']);

// Admin or seller middleware
export const adminOrSeller = authorize(['admin', 'seller']);

// Any authenticated user middleware
export const anyUser = authorize(['user', 'seller', 'admin']);
