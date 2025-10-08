const Admin = require('../models/Admin');
const WordSuggestion = require('../models/WordSuggestion');
const Word = require('../models/Word');

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createAdmin = async (req, res) => {
  const { username, password } = req.body;
  const admin = new Admin({ username, password });

  try {
    const newAdmin = await admin.save();
    res.status(201).json(newAdmin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: list pending suggestions
exports.getPendingSuggestions = async (req, res) => {
  try {
    const list = await WordSuggestion.find({ approved: false }).sort({ createdAt: 1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: approve suggestion -> create/merge into Word
exports.approveSuggestion = async (req, res) => {
  try {
    const suggestion = await WordSuggestion.findById(req.params.suggestionId);
    if (!suggestion) return res.status(404).json({ message: 'Suggestion not found' });

    // Upsert word
    const update = {
      meaning_ta: suggestion.meaning_ta,
      meaning_en: suggestion.meaning_en,
      domain: suggestion.domain,
      period: suggestion.period,
      modern_equivalent: suggestion.modern_equivalent,
      status: suggestion.status,
      notes: suggestion.notes,
      approved: true,
    };
    const word = await Word.findOneAndUpdate(
      { word: suggestion.word },
      { $set: { word: suggestion.word, ...update } },
      { upsert: true, new: true }
    );

    suggestion.approved = true;
    suggestion.reviewedByAdminId = req.params.id; // admin id from route
    await suggestion.save();

    res.json({ message: 'Suggestion approved', word });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
