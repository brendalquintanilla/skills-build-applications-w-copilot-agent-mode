import express from 'express'
import { connectDatabase, MONGO_URI } from './config/database.js'
import { PORT, API_URL } from './config.js'
import usersRouter from './routes/users.js'
import teamsRouter from './routes/teams.js'
import activitiesRouter from './routes/activities.js'
import leaderboardRouter from './routes/leaderboard.js'
import workoutsRouter from './routes/workouts.js'

const app = express()

app.use(express.json())

app.get('/', (_req, res) => {
  res.json({
    message: 'OctoFit Tracker backend is running.',
    apiUrl: API_URL,
  })
})

app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

connectDatabase()
  .then(() => {
    console.log(`Connected to MongoDB at ${MONGO_URI}`)
    app.listen(PORT, () => {
      console.log(`Backend listening on http://localhost:${PORT}`)
      console.log(`API URL: ${API_URL}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error)
    process.exit(1)
  })
