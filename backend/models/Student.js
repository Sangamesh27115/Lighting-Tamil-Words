const mongoose = require('mongoose');

// role field should be inside the schema definition


const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'Student' },
  points: { type: Number, default: 0 },
  rewards: [{ type: String }], // List of reward names or IDs
  leaderboardRank: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
