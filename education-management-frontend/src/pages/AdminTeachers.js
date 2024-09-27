import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const AdminTeachers = () => {
  const [teachers, setTeachers] = useState([]);

  // Fetch all teachers
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const { data } = await axios.get('/api/teachers'); // Make sure the route matches your backend
        setTeachers(data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div>
      <h1>Manage Teachers</h1>
      <h2 className="text-xl mt-4">All Teachers</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {teachers.length > 0 ? (
            teachers.map((teacher) => (
              <tr key={teacher._id} className="text-center border-b">
                <td className="py-2">{teacher.name}</td>
                <td className="py-2">{teacher.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No teachers available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTeachers;
