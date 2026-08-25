const Workout = require('../models/Workout');

// ✅ Add Workout → POST /workouts/addWorkout
const addWorkout = async (req, res) => {
  try {
    const { name, duration } = req.body;

    const workout = await Workout.create({
      name,
      duration,
      userId: req.user._id
      // status & dateAdded auto-set by model
    });

    // ✅ Return full document exactly as screenshot
    return res.status(201).json(workout);

  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// ✅ Get My Workouts → GET /workouts/getMyWorkouts
const getMyWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user._id });

    // ✅ Exact wrapper shape from screenshot
    return res.status(200).json({ workouts });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { addWorkout, getMyWorkouts };