import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const AdminCourses = () => {
    const [courses, setCourses] = useState([]);
    const [courseData, setCourseData] = useState({ title: '', description: '', startDate: '', endDate: '', teacher: '' });
    const [teachers, setTeachers] = useState([]);

    // Fetch teachers for dropdown
    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const token = localStorage.getItem('token'); // Fetch the token from localStorage

                axios.get('/api/users/teachers', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the request headers
                    },
                })
                    .then((response) => {
                        setTeachers(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching teachers:', error);
                    });
            } catch (error) {
                console.error('Error fetching teachers', error);
            }
        };

        fetchTeachers();
    }, []);

    // Fetch courses
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await axios.get('/api/courses');
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses', error);
            }
        };

        fetchCourses();
    }, []);

    const handleInputChange = (e) => {
        setCourseData({
            ...courseData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            if (!token) {
                console.error('No token found');
                return;
            }

            await axios.post(
                '/api/courses',
                courseData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token
                    },
                }
            );

            // Reload courses after adding a new one
            const { data } = await axios.get('/api/courses');
            setCourses(data);
            setCourseData({ title: '', description: '', startDate: '', endDate: '', teacher: '' });
        } catch (error) {
            console.error('Error adding course', error);
        }
    };

    return (
        <div>
            <h1>Manage Courses</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Course Title"
                    value={courseData.title}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                    required
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Course Description"
                    value={courseData.description}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                    required
                />
                <input
                    type="date"
                    name="startDate"
                    placeholder="Start Date"
                    value={courseData.startDate}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                    required
                />
                <input
                    type="date"
                    name="endDate"
                    placeholder="End Date"
                    value={courseData.endDate}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                    required
                />

                {/* Dropdown to select a teacher */}
                <select
                    name="teacher"
                    value={courseData.teacher}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                    required
                >
                    <option value="">Select Teacher</option>
                    {teachers.map((teacher) => (
                        <option key={teacher._id} value={teacher._id}>
                            {teacher.name} ({teacher.email})
                        </option>
                    ))}
                </select>

                <button type="submit" className="bg-blue-500 text-white p-2">Add Course</button>
            </form>

            <h2 className="text-xl mt-4">All Courses</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Title</th>
                        <th className="py-2">Description</th>
                        <th className="py-2">Start Date</th>
                        <th className="py-2">End Date</th>
                        <th className="py-2">Teacher</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.length > 0 ? (
                        courses.map((course) => (
                            <tr key={course._id} className="text-center border-b">
                                <td className="py-2">{course.title}</td>
                                <td className="py-2">{course.description}</td>
                                <td className="py-2">{new Date(course.startDate).toLocaleDateString()}</td>
                                <td className="py-2">{new Date(course.endDate).toLocaleDateString()}</td>
                                <td className="py-2">{course.teacher ? course.teacher.name : 'No teacher assigned'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No courses available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminCourses;
