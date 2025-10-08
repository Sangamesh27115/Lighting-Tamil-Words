const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const studentRoutes = require('./routes/students');
const teacherRoutes = require('./routes/teachers');
const adminRoutes = require('./routes/admins');
const wordRoutes = require('./routes/words');
const gameRoutes = require('./routes/games');
const authRoutes = require('./routes/auth');



dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/words', wordRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/auth', authRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Basic test route
app.get('/', (req, res) => {
  res.send('Welcome to Tamil Words Learning App Backend');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
