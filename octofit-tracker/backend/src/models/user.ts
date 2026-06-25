import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  joinDate: { type: Date, default: () => new Date() },
  profileSummary: { type: String, default: '' },
  teamId: { type: String },
})

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User
