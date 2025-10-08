const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

// Game rounds
router.get('/match', authenticateToken, authorizeRoles('Student'), gameController.getMatchRound);
router.get('/mcq', authenticateToken, authorizeRoles('Student'), gameController.getMcqRound);
router.get('/hint/:wordId', authenticateToken, authorizeRoles('Student'), gameController.getHint);

// Submit result and award points
router.post('/submit', authenticateToken, authorizeRoles('Student'), gameController.submitResult);

module.exports = router;



