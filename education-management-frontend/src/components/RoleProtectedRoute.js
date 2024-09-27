import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Ensure the correct import

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // No token found, redirect to login
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token); // Decode the token to get user info
    console.log(decodedToken)
    if (!allowedRoles.includes(decodedToken.role)) {
      // If the user's role is not in the allowedRoles, redirect to login
      return <Navigate to="/login" />;
    }

    // If everything is fine, render the children (the protected component)
    return children;

  } catch (error) {
    console.error('Error decoding token:', error);
    return <Navigate to="/login" />; // In case of any error, redirect to login
  }
};

export default RoleProtectedRoute;
