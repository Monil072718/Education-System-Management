const express = require('express');
const { registerUser, authUser, getUserProfile, getAllTeachers } = require('../controllers/userController');
const { getStudents } = require('../controllers/userController');
const { protect, admin,  adminOrTeacher } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);
router.get('/teachers', protect, admin, getAllTeachers);
router.get('/students', protect, adminOrTeacher, getStudents);

module.exports = router;
