const Student = require('../models/Student');

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new student
exports.createStudent = async (req, res) => {
  const { name, email, password } = req.body;

  const student = new Student({ name, email, password });

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get student by id
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update student (points or rewards)
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    if (req.body.points !== undefined) student.points = req.body.points;
    if (req.body.rewards !== undefined) student.rewards = req.body.rewards;

    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add points to student after quiz
exports.addPoints = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const pointsToAdd = req.body.points || 0;
    student.points += pointsToAdd;

    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get leaderboard - students ordered by points descending
exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Student.find()
      .sort({ points: -1 })
      .limit(10); // Top 10 students
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
