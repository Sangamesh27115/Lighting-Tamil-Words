const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
  // Unique Tamil headword
  word: { type: String, required: true, unique: true },
  // Meanings can be null
  meaning_ta: { type: String, default: null },
  meaning_en: { type: String, default: null },
  domain: { type: String, default: null },
  period: { type: String, default: null },
  modern_equivalent: { type: String, default: null },
  status: { type: String, default: null },
  notes: { type: String, default: null },
  // Game-related
  approved: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Word', WordSchema);



