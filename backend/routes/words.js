const express = require('express');
const router = express.Router();
const wordController = require('../controllers/wordController');

const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

// Get all words pending approval for Admin
router.get('/pending', authenticateToken, authorizeRoles('admin'), wordController.getPendingWords);

// Approve a word by ID (Admin only)
router.put('/approve/:id', authenticateToken, authorizeRoles('admin'), wordController.approveWord);

// Get approved words for quizzes
router.get('/approved', wordController.getApprovedWords);

router.get('/', wordController.getAllWords);
router.post('/', wordController.createWord);
router.get('/:id', wordController.getWordById);
router.put('/:id', wordController.updateWord);

module.exports = router;
