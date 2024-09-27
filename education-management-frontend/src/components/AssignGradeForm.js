import React, { useState, useEffect } from 'react';
import axios from '../services/axios'; // Assuming axios is set up

const AssignGradeForm = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [gradeData, setGradeData] = useState({
        studentId: '',
        courseId: '',
        grade: ''
    });

    useEffect(() => {
        // Fetch all students
        const fetchStudents = async () => {
            try {
                const token = localStorage.getItem('token'); // Get token from localStorage
                const { data } = await axios.get('/api/users/students', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setStudents(data);
            } catch (error) {
                console.error('Error fetching students', error);
            }
        };

        // Fetch all courses
        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem('token'); // Get token from localStorage
                const { data } = await axios.get('/api/courses/teacher/courses', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses', error);
            }
        };

        fetchStudents();
        fetchCourses();
    }, []);

    // Handle input changes
    const handleInputChange = (e) => {
        setGradeData({
            ...gradeData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/grades', gradeData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Grade assigned successfully!');
        } catch (error) {
            console.error('Error assigning grade', error);
        }
    };

    return (
        <div>
            <h1>Assign Grade</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label>Select Student</label>
                    <select
                        name="studentId"
                        value={gradeData.studentId}
                        onChange={handleInputChange}
                        required
                    >
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
                    <select
                        name="courseId"
                        value={gradeData.courseId}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Course</option>
                        {courses.map((course) => (
                            <option key={course._id} value={course._id}>
                                {course.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Enter Grade</label>
                    <input
                        type="text"
                        name="grade"
                        value={gradeData.grade}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2">
                    Assign Grade
                </button>
            </form>
        </div>
    );
};

export default AssignGradeForm;
