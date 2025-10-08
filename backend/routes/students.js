const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentcontroller');

// Add points to student after quiz
router.put('/addpoints/:id', studentController.addPoints);

// Get top students leaderboard
router.get('/leaderboard', studentController.getLeaderboard);



// Get all students
router.get('/', studentController.getAllStudents);

// Create new student
router.post('/', studentController.createStudent);

// Get student by id
router.get('/:id', studentController.getStudentById);

// Update student points or rewards
router.put('/:id', studentController.updateStudent);

module.exports = router;
