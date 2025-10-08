const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'Teacher' },
  tempWordsFile: { type: String } // Path or JSON string for temporary words
}, { timestamps: true });

module.exports = mongoose.model('Teacher', TeacherSchema);
