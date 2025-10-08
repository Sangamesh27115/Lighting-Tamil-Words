const mongoose = require('mongoose');

const wordModificationRequestSchema = new mongoose.Schema({
  wordId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Word'
  },
  requestType: {
    type: String,
    enum: ['update', 'delete'],
    required: true
  },
  // For update requests - new values
  updatedData: {
    word: String,
    meaning_ta: String,
    meaning_en: String,
    level: Number,
    domain: String,
    period: String,
    notes: String
  },
  // Reason for modification/deletion
  reason: {
    type: String,
    required: true
  },
  // Original word data (for reference)
  originalWord: {
    word: String,
    meaning_ta: String,
    meaning_en: String,
    level: Number,
    domain: String,
    period: String,
    notes: String
  },
  // Request metadata
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewedAt: Date,
  rejectionReason: String
}, {
  timestamps: true
});

module.exports = mongoose.model('WordModificationRequest', wordModificationRequestSchema);
