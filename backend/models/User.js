const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['student', 'teacher', 'admin'], required: true },
  points:   { type: Number, default: 0 },      // Total points earned
  rewards:  { type: Number, default: 0 },      // Student only
  level:    { type: Number, default: 1 },      // Current level
  fullName: { type: String },                   // Optional full name
  avatar_url: { type: String },                 // Optional avatar
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
