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

// ✏️ Update Workout → PATCH /workouts/updateWorkout/:id
const updateWorkout = async (req, res) => {
  try {
    // Find workout AND ensure it belongs to the logged-in user
    const workout = await Workout.findOne({ _id: req.params.id, userId: req.user._id });

    if (!workout) {
      return res.status(404).json({ error: "Workout not found or not yours" });
    }

    // Update only the fields provided (name, duration — NOT status here)
    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      { $set: { name: req.body.name || workout.name, duration: req.body.duration || workout.duration } },
      { new: true, runValidators: true }
    );

    // ✅ Exact response format from screenshot
    return res.status(200).json({
      message: "Workout updated successfully",
      updatedWorkout
    });

  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// 🗑️ Delete Workout → DELETE /workouts/deleteWorkout/:id
const deleteWorkout = async (req, res) => {
  try {
    // Find AND ensure ownership before deleting
    const workout = await Workout.findOne({ _id: req.params.id, userId: req.user._id });

    if (!workout) {
      return res.status(404).json({ error: "Workout not found or not yours" });
    }

    await Workout.findByIdAndDelete(req.params.id);

    // ✅ Exact response format from screenshot
    return res.status(200).json({
      message: "Workout deleted successfully"
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// ✅ Complete Workout → PATCH /workouts/completeWorkoutStatus/:id
const completeWorkoutStatus = async (req, res) => {
  try {
    // Find AND ensure ownership
    const workout = await Workout.findOne({ _id: req.params.id, userId: req.user._id });

    if (!workout) {
      return res.status(404).json({ error: "Workout not found or not yours" });
    }

    // Set status to "completed"
    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      { status: "completed" },
      { new: true }
    );

    // ✅ Exact response format from screenshot
    return res.status(200).json({
      message: "Workout status updated successfully",
      updatedWorkout
    });

  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// ✅ Don't forget to EXPORT the new functions!
module.exports = {
  addWorkout,
  getMyWorkouts,
  updateWorkout,      
  deleteWorkout,      
  completeWorkoutStatus 
};

