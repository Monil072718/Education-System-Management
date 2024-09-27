const Enrollment = require('../models/Enrollment');

// Enroll a student in a course
const enrollStudent = async (req, res) => {
  const { studentId, courseId } = req.body;

  try {
    const existingEnrollment = await Enrollment.findOne({ student: studentId, course: courseId });
    if (existingEnrollment) {
      return res.status(400).json({ message: 'Student is already enrolled in this course' });
    }

    const enrollment = await Enrollment.create({
      student: studentId,
      course: courseId,
    });

    res.status(201).json(enrollment);
  } catch (error) {
    res.status(400).json({ message: 'Error enrolling student', error: error.message });
  }
};

// Unenroll a student from a course
const unenrollStudent = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const deletedEnrollment = await Enrollment.findByIdAndDelete(enrollmentId);
    if (!deletedEnrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    res.json({ message: 'Unenrolled successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error unenrolling student', error: error.message });
  }
};

// Get all students enrolled in a specific course
const getCourseEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ course: req.params.courseId }).populate('student', 'name email');
    res.json(enrollments);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching enrollments', error: error.message });
  }
};

module.exports = {
  enrollStudent,
  unenrollStudent,
  getCourseEnrollments,
};
