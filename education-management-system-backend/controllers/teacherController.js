const Course = require('../models/Course');

// Fetch courses assigned to the logged-in teacher
const getTeacherCourses = async (req, res) => {
    try {
        const courses = await Course.find({ teacher: req.user._id });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses for teacher' });
    }
};

module.exports = { getTeacherCourses };
