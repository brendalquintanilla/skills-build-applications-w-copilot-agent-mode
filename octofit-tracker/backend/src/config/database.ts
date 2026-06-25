import mongoose from 'mongoose'

export const DB_NAME = 'octofit_db'
export const MONGO_URI = process.env.MONGO_URI || `mongodb://127.0.0.1:27017/${DB_NAME}`

export function connectDatabase() {
  return mongoose.connect(MONGO_URI)
}
