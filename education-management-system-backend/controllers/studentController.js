const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// Fetch courses the student is enrolled in
const getStudentCourses = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({ student: req.user._id }).populate('course');
        const courses = enrollments.map(enrollment => enrollment.course);
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses for student' });
    }
};

module.exports = { getStudentCourses };
