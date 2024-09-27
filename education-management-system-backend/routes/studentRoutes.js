const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { getStudentCourses } = require('../controllers/studentController');

const router = express.Router();

// Route for student to fetch enrolled courses
router.get('/courses', protect, getStudentCourses);

module.exports = router;
