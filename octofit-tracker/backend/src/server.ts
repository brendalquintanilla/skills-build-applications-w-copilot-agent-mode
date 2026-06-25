import express from 'express'
import { connectDatabase, MONGO_URI } from './config/database'
import { PORT } from './config'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import leaderboardRouter from './routes/leaderboard'
import workoutsRouter from './routes/workouts'

const app = express()

const codespace = process.env.CODESPACE_NAME
const API_HOST = codespace
  ? `${codespace}-8000.app.github.dev`
  : `localhost:${PORT}`
const API_URL = codespace
  ? `https://${API_HOST}`
  : `http://localhost:${PORT}`

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
