import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const StudentDashboard = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await axios.get('/api/student/courses');
                setCourses(data);
            } catch (error) {
                console.error('Error fetching student courses', error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div>
            <h1>Your Enrolled Courses</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Title</th>
                        <th className="py-2">Description</th>
                        <th className="py-2">Start Date</th>
                        <th className="py-2">End Date</th>
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
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No courses available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default StudentDashboard;
