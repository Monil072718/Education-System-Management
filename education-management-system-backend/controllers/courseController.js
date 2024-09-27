const Course = require('../models/Course');

// Create a new course (Admin Role)
const createCourse = async (req, res) => {
  try {
    const { title, description, startDate, endDate, teacher } = req.body;

    const newCourse = await Course.create({
      title,
      description,
      startDate,
      endDate,
      teacher,
    });
    
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ message: 'Error creating course', error: error.message });
  }
};

// Fetch all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('teacher', 'name email');
    res.json(courses);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching courses', error: error.message });
  }
};

// Fetch a single course by ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('teacher', 'name email');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching course', error: error.message });
  }
};

// Update a course (Admin Role)
const updateCourse = async (req, res) => {
  try {
    const { title, description, startDate, endDate, teacher } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { title, description, startDate, endDate, teacher },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: 'Error updating course', error: error.message });
  }
};

// Delete a course (Admin Role)
const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting course', error: error.message });
  }
};

const getTeacherCourses = async (req, res) => {
  try {
    const courses = await Course.find({ teacher: req.user._id });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses' });
  }
};
module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getTeacherCourses
};
