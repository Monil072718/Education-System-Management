import React, { useState, useEffect } from 'react';
import axios from '../services/axios';
import { Link } from 'react-router-dom';

const TeacherDashboard = () => {


    return (
        <div>
            
            <li>
                    <Link to="/teacher/assign-grade">Assign Grades to Students</Link>
                    <Link to="/course-grades/:courseId">View Course Grades</Link> {/* Dynamic course ID */}
                    <Link to="/student-grades">My Grades</Link>
                </li>
        </div>
    );
};

export default TeacherDashboard;
