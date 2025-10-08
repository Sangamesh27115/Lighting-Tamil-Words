const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Admin = require('../models/Admin');

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Helper to find user by email from all collections
async function findUserByEmail(email) {
  let user = await Student.findOne({ email });
  if (user) return { user, model: Student };
  user = await Teacher.findOne({ email });
  if (user) return { user, model: Teacher };
  user = await Admin.findOne({ username: email }); // Admin uses username
  if (user) return { user, model: Admin };
  return { user: null, model: null };
}

// Register (Student or Teacher)
exports.register = async (req, res) => {
  const { role, name, email, username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;
    if (role === 'student') {
      newUser = new Student({ name, email, password: hashedPassword, role });
    } else if (role === 'teacher') {
      newUser = new Teacher({ name, email, password: hashedPassword, role });
    } else if (role === 'admin') {
      newUser = new Admin({ username, password: hashedPassword, role });
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    await newUser.save();
    res.status(201).json({ message: `${role} registered successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login for all roles
exports.login = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    let foundUserData;
    if (email) {
      foundUserData = await findUserByEmail(email);
    } else if (username) {
      foundUserData = await Admin.findOne({ username }) ? { user: await Admin.findOne({ username }), model: Admin } : { user: null };
    } else {
      return res.status(400).json({ message: 'Email or Username required' });
    }

    if (!foundUserData || !foundUserData.user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = foundUserData.user;

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role || (user.username ? 'admin' : '') },
      jwtSecret,
      { expiresIn: '1d' }
    );

    res.json({ token, role: user.role || (user.username ? 'admin' : '') });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
