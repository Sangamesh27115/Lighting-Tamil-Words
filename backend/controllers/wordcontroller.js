const Word = require('../models/Word');

exports.getAllWords = async (req, res) => {
  try {
    const words = await Word.find();
    res.json(words);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createWord = async (req, res) => {
  const { word, meaning_ta, meaning_en, domain, period, modern_equivalent, status, notes, approved } = req.body;
  const newWord = new Word({ word, meaning_ta, meaning_en, domain, period, modern_equivalent, status, notes, approved });

  try {
    const savedWord = await newWord.save();
    res.status(201).json(savedWord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getWordById = async (req, res) => {
  try {
    const word = await Word.findById(req.params.id);
    if (!word) return res.status(404).json({ message: 'Word not found' });
    res.json(word);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateWord = async (req, res) => {
  try {
    const word = await Word.findById(req.params.id);
    if (!word) return res.status(404).json({ message: 'Word not found' });

    Object.assign(word, req.body);

    const updatedWord = await word.save();
    res.json(updatedWord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all words pending approval
exports.getPendingWords = async (req, res) => {
  try {
    const pendingWords = await Word.find({ approved: false });
    res.json(pendingWords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Approve a word - update approved to true
exports.approveWord = async (req, res) => {
  try {
    const word = await Word.findById(req.params.id);
    if (!word) return res.status(404).json({ message: 'Word not found' });

    word.approved = true;
    const updatedWord = await word.save();
    res.json(updatedWord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get approved words for quizzes
exports.getApprovedWords = async (req, res) => {
  try {
    const approvedWords = await Word.find({ approved: true });
    res.json(approvedWords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
