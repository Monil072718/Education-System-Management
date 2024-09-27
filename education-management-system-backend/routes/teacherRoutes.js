const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { getTeacherCourses } = require('../controllers/teacherController');

const router = express.Router();

// Route for teacher to fetch their courses
router.get('/courses', protect, getTeacherCourses);

module.exports = router;
