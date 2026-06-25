import mongoose from 'mongoose'

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true },
  focusArea: { type: String },
})

const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema)
export default Workout
