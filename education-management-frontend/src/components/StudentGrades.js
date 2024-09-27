// src/pages/StudentGrades.jsx
import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const StudentGrades = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/grades/student/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGrades(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch grades');
        setLoading(false);
      }
    };

    fetchGrades();
  }, []);

  if (loading) return <p>Loading grades...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>My Grades</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Course Title</th>
            <th className="py-2">Grade</th>
            <th className="py-2">Graded Date</th>
          </tr>
        </thead>
        <tbody>
          {grades.length > 0 ? (
            grades.map((grade) => (
              <tr key={grade._id} className="text-center border-b">
                <td className="py-2">{grade.course.title}</td>
                <td className="py-2">{grade.grade}</td>
                <td className="py-2">{new Date(grade.gradedDate).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No grades available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentGrades;
