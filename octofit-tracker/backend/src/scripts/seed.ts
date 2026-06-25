import mongoose from 'mongoose'
import User from '../models/user'
import Team from '../models/team'
import Activity from '../models/activity'
import Leaderboard from '../models/leaderboard'
import Workout from '../models/workout'

// Seed the octofit_db database with test data
const MONGO_URI = 'mongodb://127.0.0.1:27017/octofit_db'

async function seed() {
  await mongoose.connect(MONGO_URI)
  console.log('Connected to MongoDB for seeding octofit_db')

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ])

  const users = await User.create([
    { name: 'Avery Octo', email: 'avery@octofit.app', joinDate: new Date('2025-08-01'), profileSummary: 'Track record setter and team motivator.', teamId: 't1' },
    { name: 'Jordan Pulse', email: 'jordan@octofit.app', joinDate: new Date('2025-09-12'), profileSummary: 'Endurance specialist with a love for group runs.', teamId: 't2' },
    { name: 'Casey Tempo', email: 'casey@octofit.app', joinDate: new Date('2025-10-05'), profileSummary: 'Strength training evangelist and recovery coach.', teamId: 't1' },
  ])

  const teams = await Team.create([
    { name: 'Octo Warriors', description: 'A high-energy team focused on daily progress.', members: 8, captain: 'Avery Octo' },
    { name: 'Tracker Tribe', description: 'Community-driven group training and accountability.', members: 12, captain: 'Jordan Pulse' },
  ])

  const activities = await Activity.create([
    { userId: users[0]._id.toString(), type: 'running', duration: 42, distanceKm: 8.5, calories: 520, date: new Date('2026-06-20') },
    { userId: users[1]._id.toString(), type: 'cycling', duration: 60, distanceKm: 22.3, calories: 780, date: new Date('2026-06-22') },
    { userId: users[2]._id.toString(), type: 'yoga', duration: 30, distanceKm: 0, calories: 170, date: new Date('2026-06-23') },
  ])

  const leaderboard = await Leaderboard.create([
    { rank: 1, userId: users[0]._id.toString(), score: 1125, totalWorkouts: 38 },
    { rank: 2, userId: users[1]._id.toString(), score: 1040, totalWorkouts: 34 },
    { rank: 3, userId: users[2]._id.toString(), score: 980, totalWorkouts: 29 },
  ])

  const workouts = await Workout.create([
    { name: 'Morning Mobility', category: 'Flexibility', durationMinutes: 20, difficulty: 'Easy', focusArea: 'Full body' },
    { name: 'Strength Circuit', category: 'Strength', durationMinutes: 45, difficulty: 'Medium', focusArea: 'Upper body' },
    { name: 'HIIT Blast', category: 'Cardio', durationMinutes: 30, difficulty: 'Hard', focusArea: 'Core' },
  ])

  console.log('Seed the octofit_db database with test data')
  console.log({
    users: users.length,
    teams: teams.length,
    activities: activities.length,
    leaderboard: leaderboard.length,
    workouts: workouts.length,
  })

  await mongoose.disconnect()
  console.log('Disconnected from MongoDB after seeding')
}

seed().catch((error) => {
  console.error('Seeding failed:', error)
  process.exit(1)
})
