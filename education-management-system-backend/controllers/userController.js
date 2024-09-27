const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
  };

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }
  
    const user = await User.create({ name, email, password, role });
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role), // Pass role to generateToken
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  };
  

// Login user
const authUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role), // Include role when generating token
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const getAllTeachers = async (req, res) => {
  try {
      const teachers = await User.find({ role: 'Teacher' }).select('_id name email');
      res.json(teachers);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching teachers' });
  }
};

const getStudents = async (req, res) => {
  try {
      const students = await User.find({ role: 'Student' });  // Fetch only students
      res.json(students);
  } catch (error) {
      res.status(500).json({ message: 'Server error while fetching students' });
  }
};

module.exports = { registerUser, authUser, getUserProfile,getAllTeachers,getStudents };
