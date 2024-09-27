const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Allow requests from your frontend (localhost:3000)
app.use(cors({
    origin: 'http://localhost:3000', // Make sure this matches your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the necessary methods
    credentials: true // Allow cookies/auth tokens
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/grades', gradeRoutes);

app.use('/api/teachers', teacherRoutes);
app.use('/api/students', studentRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
