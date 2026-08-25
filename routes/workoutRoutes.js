const express = require('express');
const { addWorkout, getMyWorkouts } = require('../controllers/workoutController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/addWorkout', authenticate, addWorkout);
router.get('/getMyWorkouts', authenticate, getMyWorkouts);

module.exports = router;