const Teacher = require('../models/Teacher');
const WordSuggestion = require('../models/WordSuggestion');

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTeacher = async (req, res) => {
  const { name, email, password, tempWordsFile } = req.body;
  const teacher = new Teacher({ name, email, password, tempWordsFile });

  try {
    const newTeacher = await teacher.save();
    res.status(201).json(newTeacher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

    if (req.body.tempWordsFile !== undefined) teacher.tempWordsFile = req.body.tempWordsFile;

    const updatedTeacher = await teacher.save();
    res.json(updatedTeacher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Create a word suggestion (teacher -> admin review)
exports.createSuggestion = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const { word, meaning_ta, meaning_en, domain, period, modern_equivalent, status, notes } = req.body;
    const suggestion = new WordSuggestion({
      teacherId,
      word,
      meaning_ta,
      meaning_en,
      domain,
      period,
      modern_equivalent,
      status,
      notes,
      approved: false,
    });
    const saved = await suggestion.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get suggestions by teacher
exports.getMySuggestions = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const list = await WordSuggestion.find({ teacherId }).sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
