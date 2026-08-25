const express = require('express');
const {
  addWorkout,
  getMyWorkouts,
  updateWorkout,        
  deleteWorkout,        
  completeWorkoutStatus 
} = require('../controllers/workoutController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

// Existing routes
router.post('/addWorkout', authenticate, addWorkout);
router.get('/getMyWorkouts', authenticate, getMyWorkouts);

// ✅ NEW routes — exactly match screenshot paths
router.patch('/updateWorkout/:id', authenticate, updateWorkout);
router.delete('/deleteWorkout/:id', authenticate, deleteWorkout);
router.patch('/completeWorkoutStatus/:id', authenticate, completeWorkoutStatus);

module.exports = router;