import mongoose from 'mongoose'

const leaderboardSchema = new mongoose.Schema({
  rank: { type: Number, required: true },
  userId: { type: String, required: true },
  score: { type: Number, required: true },
  totalWorkouts: { type: Number, required: true },
})

const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema)
export default Leaderboard
