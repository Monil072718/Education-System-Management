import React, { useState, useEffect } from 'react';
import axios from '../services/axios'; // Use your configured Axios instance

const EnrollmentForm = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  // Fetch students and courses
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token');  // Get the token from localStorage
        const { data } = await axios.get('/api/users/students', {
          headers: {
            Authorization: `Bearer ${token}`,  // Include the token in the request headers
          },
        });
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');  // Get the token from localStorage
        const { data } = await axios.get('/api/courses', {
          headers: {
            Authorization: `Bearer ${token}`,  // Include the token in the request headers
          },
        });
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchStudents();
    fetchCourses();
  }, []);

  const handleEnroll = async () => {
    try {
      const token = localStorage.getItem('token');  // Get the token from localStorage
      await axios.post(
        '/api/enrollments',
        {
          studentId: selectedStudent,
          courseId: selectedCourse,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Include the token in the request headers
          },
        }
      );
      alert('Student enrolled successfully');
    } catch (error) {
      console.error('Error enrolling student:', error);
    }
  };

  return (
    <div>
      <h2>Enroll Student in Course</h2>
      <div>
        <label>Select Student</label>
        <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
          <option value="">Select Student</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Select Course</label>
        <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleEnroll}>Enroll</button>
    </div>
  );
};

export default EnrollmentForm;
