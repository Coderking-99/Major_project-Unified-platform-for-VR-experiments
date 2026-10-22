const jwt = require('jsonwebtoken');
const { User } = require('../models/store');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_arvr_jwt_key_2026_future_tech_987654321';

// Verify JWT token and attach user to req
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token required. Please log in.'
      });
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired session token. Please log in again.'
      });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User account no longer exists.'
      });
    }

    if (user.status !== 'active') {
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated. Please contact the administrator.'
      });
    }

    // Attach sanitized user to request
    req.user = {
      id: user.id,
      username: user.username,
      role: user.role,
      status: user.status,
      mustChangePassword: !!user.mustChangePassword
    };

    next();
  } catch (error) {
    console.error('Authentication middleware error:', error);
    res.status(500).json({ success: false, message: 'Internal authentication error.' });
  }
};

// Middleware to require specific roles
const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required.' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Requires one of [${allowedRoles.join(', ')}] privileges.`
      });
    }

    next();
  };
};

const requireOwner = requireRole('OWNER');
const requireClient = requireRole('CLIENT');

module.exports = {
  authenticate,
  requireRole,
  requireOwner,
  requireClient,
  JWT_SECRET
};
