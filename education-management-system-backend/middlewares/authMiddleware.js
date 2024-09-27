const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Make sure the path to your User model is correct

// Middleware to protect routes by verifying the JWT token
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token and decode it
      req.user = await User.findById(decoded.id).select('-password'); // Find the user by the decoded ID and attach to req object without password
      next(); // Proceed to the next middleware or controller
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to check for the Admin role
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

// Middleware to check for the Teacher role
const teacher = (req, res, next) => {
  if (req.user && req.user.role === 'Teacher') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as a teacher' });
  }
};

// Middleware to check for the Student role
const student = (req, res, next) => {
  if (req.user && req.user.role === 'Student') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as a student' });
  }
};

const adminOrTeacher = (req, res, next) => {
  if (req.user && (req.user.role === 'Admin' || req.user.role === 'Teacher')) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin or teacher' });
  }
};
module.exports = { protect, admin, teacher, student,adminOrTeacher };
