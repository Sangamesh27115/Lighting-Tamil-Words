const Word = require('../models/Word');
const Student = require('../models/Student');

// Utility: random sample n from array
function sampleArray(items, n) {
  const arr = items.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, n);
}

// Match-the-following: returns pairs and shuffled meanings
exports.getMatchRound = async (req, res) => {
  try {
    const count = parseInt(req.query.count || '5', 10);
    const words = await Word.find({ approved: true, meaning_ta: { $ne: null } }).lean();
    if (words.length === 0) return res.json({ pairs: [], options: [] });
    const chosen = sampleArray(words, Math.min(count, words.length));
    const pairs = chosen.map(w => ({ id: String(w._id), word: w.word, answer: w.meaning_ta }));
    const options = sampleArray(chosen.map(w => w.meaning_ta), chosen.length);
    res.json({ pairs, options });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// MCQ: meaning of word in Tamil
exports.getMcqRound = async (req, res) => {
  try {
    const count = parseInt(req.query.count || '5', 10);
    const words = await Word.find({ approved: true, meaning_ta: { $ne: null } }).lean();
    if (words.length === 0) return res.json({ questions: [] });

    const chosen = sampleArray(words, Math.min(count, words.length));
    const questions = chosen.map(word => {
      const distractors = sampleArray(
        words.filter(w => String(w._id) !== String(word._id)).map(w => w.meaning_ta),
        Math.min(3, Math.max(0, words.length - 1))
      );
      const options = sampleArray([word.meaning_ta, ...distractors], Math.min(4, 1 + distractors.length));
      return {
        id: String(word._id),
        prompt: `meaning of (translate in tamil) ${word.word}`,
        options,
        answer: word.meaning_ta,
      };
    });
    res.json({ questions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Hint from notes
exports.getHint = async (req, res) => {
  try {
    const wordId = req.params.wordId;
    const word = await Word.findById(wordId).lean();
    if (!word || !word.notes) return res.json({ hint: null });
    res.json({ hint: word.notes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Submit result and award points
exports.submitResult = async (req, res) => {
  try {
    const { studentId, points } = req.body;
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    student.points += Number(points || 0);
    const updated = await student.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



