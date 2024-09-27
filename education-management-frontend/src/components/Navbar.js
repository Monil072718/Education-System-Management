import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Remove token and reset user
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <div>
        <Link to="/" className="mr-4 hover:text-yellow-500">Home</Link>

        {/* Admin Links */}
        {user?.role === 'Admin' && (
          <>
            <Link to="/admin-dashboard" className="mr-4 hover:text-yellow-500">Admin Dashboard</Link>
          </>
        )}

        {/* Teacher Links */}
        {user?.role === 'Teacher' && (
          <>
            <Link to="/teacher-dashboard" className="mr-4 hover:text-yellow-500">Teacher Dashboard</Link>
          </>
        )}

        {/* Student Links */}
        {user?.role === 'Student' && (
          <>
            <Link to="/student-dashboard" className="mr-4 hover:text-yellow-500">Student Dashboard</Link>
          </>
        )}
      </div>

      {/* Logout Button */}
      <button 
        onClick={handleLogout} 
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
