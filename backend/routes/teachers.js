const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', teacherController.getAllTeachers);
router.post('/', teacherController.createTeacher);
router.get('/:id', teacherController.getTeacherById);
router.put('/:id', teacherController.updateTeacher);

// Teacher suggestions
router.post('/:id/suggestions', authenticateToken, authorizeRoles('Teacher'), teacherController.createSuggestion);
router.get('/:id/suggestions', authenticateToken, authorizeRoles('Teacher'), teacherController.getMySuggestions);

module.exports = router;
