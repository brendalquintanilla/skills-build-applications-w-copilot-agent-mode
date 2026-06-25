// Note: Define VITE_CODESPACE_NAME in .env.local for GitHub Codespaces API URL support.
// Example: VITE_CODESPACE_NAME=cuddly-eureka-6vvggx7wrvr7h5x5p

const rawCodespaceName = import.meta.env.VITE_CODESPACE_NAME
const isValidCodespaceName =
  typeof rawCodespaceName === 'string' &&
  rawCodespaceName.trim() !== '' &&
  rawCodespaceName.trim().toLowerCase() !== 'undefined'

export const codespaceName = isValidCodespaceName ? rawCodespaceName.trim() : ''
export const API_PROTOCOL = codespaceName ? 'https' : 'http'
export const API_HOST = codespaceName
  ? `${codespaceName}-8000.app.github.dev`
  : 'localhost:8000'
export const API_BASE_URL = `${API_PROTOCOL}://${API_HOST}/api`

export function getFetchUrl(path: string) {
  return `${API_BASE_URL}/${path.replace(/^\//, '')}/`
}

export function normalizeApiResponse(payload: any) {
  if (!payload) {
    return { items: [], meta: null }
  }

  if (Array.isArray(payload)) {
    return { items: payload, meta: null }
  }

  const paginatedArrays = ['data', 'items', 'docs', 'results', 'users', 'teams', 'activities', 'leaderboard', 'workouts']
  for (const key of paginatedArrays) {
    if (Array.isArray(payload[key])) {
      return { items: payload[key], meta: payload.meta || null }
    }
  }

  const firstArrayKey = Object.keys(payload).find((key) => Array.isArray(payload[key]))
  if (firstArrayKey) {
    return { items: payload[firstArrayKey], meta: payload.meta || null }
  }

  return { items: [], meta: null }
}
