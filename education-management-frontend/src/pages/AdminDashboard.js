import React from 'react';
import AdminCourses from './AdminCourses';
import AdminTeachers from './AdminTeachers';
import EnrollmentForm from '../components/EnrollmentForm';

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <AdminCourses />
      <EnrollmentForm/>
      {/* <AdminTeachers /> */}
    </div>
  );
};

export default AdminDashboard;
