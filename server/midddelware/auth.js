const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  // Get token from Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If no token is provided, return a 403 error
  if (!token) {
    return res.status(403).json({ message: 'Access denied. Please login to access it.' });
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded user data to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If the token is invalid or expired, return a 401 error
    return res.status(401).json({ message: 'Session expired. Please login again.' });
  }
};

// Middleware to check if the user has an 'admin' role
const adminMiddleware = (req, res, next) => {
  // Ensure the user is authenticated first
  authMiddleware(req, res, () => {
    // Check if the user has the 'admin' role
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    
    // If the user is an admin, proceed to the next middleware or route handler
    next();
  });
};

module.exports = {
  adminMiddleware,
  authMiddleware
};
