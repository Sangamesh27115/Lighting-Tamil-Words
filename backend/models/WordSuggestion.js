const mongoose = require('mongoose');

const WordSuggestionSchema = new mongoose.Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  word: { type: String, required: true },
  meaning_ta: { type: String, default: null },
  meaning_en: { type: String, default: null },
  domain: { type: String, default: null },
  period: { type: String, default: null },
  modern_equivalent: { type: String, default: null },
  status: { type: String, default: null },
  notes: { type: String, default: null },
  approved: { type: Boolean, default: false },
  reviewedByAdminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', default: null },
}, { timestamps: true });

module.exports = mongoose.model('WordSuggestion', WordSuggestionSchema);



