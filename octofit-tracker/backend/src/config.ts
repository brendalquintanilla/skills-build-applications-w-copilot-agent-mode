export const PORT = process.env.PORT ? Number(process.env.PORT) : 8000
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit'

const codespace = process.env.CODESPACE_NAME
export const API_HOST = codespace
  ? `${codespace}-8000.githubpreview.dev`
  : `localhost:${PORT}`

export const API_URL = codespace
  ? `https://${API_HOST}`
  : `http://localhost:${PORT}`
