const express = require('express');
const {
  assignGrade,
  getGradesForCourse,
  getGradesForStudent,
} = require('../controllers/gradeController');
const { protect, admin, teacher, adminOrTeacher, student } = require('../middlewares/authMiddleware');
const router = express.Router();

// Admin: Assign a grade
router.post('/', protect, teacher, assignGrade);

// Get grades for a specific course
router.get('/course/:courseId', protect,adminOrTeacher, getGradesForCourse);

// Get grades for a specific student
router.get('/student/:studentId', protect,adminOrTeacher, getGradesForStudent);

router.get('/student/me', protect, student, getGradesForStudent);

module.exports = router;
