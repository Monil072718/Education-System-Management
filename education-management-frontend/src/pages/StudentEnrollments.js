import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const StudentEnrollments = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get('/api/courses');
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const enrollInCourse = async (courseId) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.post(`/api/enrollments/${courseId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEnrolledCourses([...enrolledCourses, courseId]);
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  return (
    <div>
      <h1>Available Courses</h1>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            {course.title} - {course.teacher}
            <button onClick={() => enrollInCourse(course._id)} disabled={enrolledCourses.includes(course._id)}>
              {enrolledCourses.includes(course._id) ? 'Enrolled' : 'Enroll'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentEnrollments;
