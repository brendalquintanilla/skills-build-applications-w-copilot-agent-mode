import mongoose from 'mongoose'

const activitySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  distanceKm: { type: Number },
  calories: { type: Number },
  date: { type: Date, default: () => new Date() },
})

const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema)
export default Activity
