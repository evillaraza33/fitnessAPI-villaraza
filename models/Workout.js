const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Workout name is required"]
  },
  duration: {
    type: String,
    required: [true, "Duration is required"]
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    default: "pending"
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
}, { timestamps: false });

module.exports = mongoose.model('Workout', workoutSchema);