const express = require('express');
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getTeacherCourses,
} = require('../controllers/courseController');
const { protect, admin, teacher } = require('../middlewares/authMiddleware');
const router = express.Router();

// Public: Get all courses
router.get('/', getCourses);

// Public: Get a single course by ID
router.get('/:id', getCourseById);

// Admin: Create a new course
router.post('/', protect, admin, createCourse);

// Admin: Update a course
router.put('/:id', protect, admin, updateCourse);

// Admin: Delete a course
router.delete('/:id', protect, admin, deleteCourse);

// Teachers can fetch their assigned courses
router.get('/teacher/courses', protect, teacher, getTeacherCourses);


module.exports = router;
