import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import AdminCourses from './pages/AdminCourses';
import AssignGradeForm from './components/AssignGradeForm';
import CourseGrades from './components/CourseGrades';
import StudentGrades from './components/StudentGrades';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Role-based routes */}
          <Route
            path="/admin-dashboard"
            element={
              <RoleProtectedRoute allowedRoles={['Admin']}>
                <AdminDashboard />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/admin-courses"
            element={
              <RoleProtectedRoute allowedRoles={['Admin']}>
                <AdminCourses />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/teacher-dashboard"
            element={
              <RoleProtectedRoute allowedRoles={['Teacher']}>
                <TeacherDashboard />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/teacher/assign-grade"
            element={
              <RoleProtectedRoute allowedRoles={['Teacher']}>
                <AssignGradeForm />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/teacher/grades"
            element={
              
                <CourseGrades />
            }
          />
          
          
          <Route
            path="/student-dashboard"
            element={
              <RoleProtectedRoute allowedRoles={['Student']}>
                <StudentDashboard />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/student/grades"
            element={
              <RoleProtectedRoute allowedRoles={['Student']}>
                <StudentGrades />
              </RoleProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
