const express = require('express');
const {
  enrollStudent,
  unenrollStudent,
  getCourseEnrollments,
} = require('../controllers/enrollmentController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Enroll a student in a course
router.post('/', protect, enrollStudent);

// Unenroll a student from a course
router.delete('/:enrollmentId', protect, unenrollStudent);

// Get all enrollments for a specific course
router.get('/:courseId/enrollments', protect, getCourseEnrollments);

module.exports = router;
