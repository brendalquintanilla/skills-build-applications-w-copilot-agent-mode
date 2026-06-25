import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  members: { type: Number, required: true },
  captain: { type: String, required: true },
})

const Team = mongoose.models.Team || mongoose.model('Team', teamSchema)
export default Team
