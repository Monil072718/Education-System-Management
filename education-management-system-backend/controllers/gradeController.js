const Grade = require('../models/Grade');

// Assign a grade to a student for a course
const assignGrade = async (req, res) => {
  const { student, course, grade } = req.body;

  try {
    // Create or update a grade record
    const gradeRecord = await Grade.findOneAndUpdate(
      { student, course },
      { grade, gradedDate: Date.now() },
      { new: true, upsert: true }
    );

    res.status(201).json({ message: 'Grade assigned successfully', grade: gradeRecord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get grades for a specific course
const getGradesForCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const grades = await Grade.find({ course: courseId }).populate('student', 'name email');

    if (grades.length === 0) {
      return res.status(404).json({ message: 'No grades found for this course' });
    }

    res.status(200).json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a student's grades for all courses
const getGradesForStudent = async (req, res) => {
  try {
    const studentId = req.user._id; // Get the logged-in student's ID
    const grades = await Grade.find({ student: studentId }).populate('course', 'title description');

    if (grades.length === 0) {
      return res.status(404).json({ message: 'No grades found for this student' });
    }

    res.status(200).json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  assignGrade,
  getGradesForCourse,
  getGradesForStudent,
};
