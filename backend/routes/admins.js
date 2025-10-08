const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', adminController.getAllAdmins);
router.post('/', adminController.createAdmin);
router.get('/:id', adminController.getAdminById);

// Admin review suggestions
router.get('/:id/suggestions/pending', authenticateToken, authorizeRoles('Admin'), adminController.getPendingSuggestions);
router.post('/:id/suggestions/:suggestionId/approve', authenticateToken, authorizeRoles('Admin'), adminController.approveSuggestion);

module.exports = router;
