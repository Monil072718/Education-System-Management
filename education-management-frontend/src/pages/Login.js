import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
  
      // Save token in local storage
      localStorage.setItem('token', response.data.token);
  
      // Navigate based on role
      const userRole = response.data.role;
        
      // Ensure case-sensitive role matching and proper navigation
      if (userRole === 'Admin') {
        console.log("admin")
        navigate('/admin-dashboard');
      } else if (userRole === 'Teacher') {
        console.log("Teacher")
        navigate('/teacher-dashboard');
      } else if (userRole === 'Student') {
        console.log("Student")
        navigate('/student-dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Login</button>
      </form>
    </div>
  );
};

export default Login;
