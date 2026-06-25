import { useEffect, useState } from 'react'
import { codespaceName, getFetchUrl, normalizeApiResponse } from '../api'

export default function Workouts() {
  const [workouts, setWorkouts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const url = getFetchUrl('workouts')
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch workouts: ${res.status}`)
        return res.json()
      })
      .then((json) => setWorkouts(normalizeApiResponse(json).items))
      .catch((reason) => setError(String(reason)))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container py-4">
      <h1>Workouts</h1>
      {codespaceName ? null : (
        <div className="alert alert-warning">VITE_CODESPACE_NAME is not set; using localhost fallback.</div>
      )}
      {loading && <p>Loading workouts…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row gx-3 gy-3">
          {workouts.map((workout) => (
            <div className="col-12 col-md-6" key={workout._id ?? workout.id ?? workout.name}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{workout.name}</h5>
                  <p className="card-text">{workout.category || 'No category'}</p>
                  <p className="mb-1"><strong>Duration:</strong> {workout.durationMinutes ?? '—'} min</p>
                  <p className="mb-1"><strong>Difficulty:</strong> {workout.difficulty || '—'}</p>
                  <p className="mb-0"><strong>Focus:</strong> {workout.focusArea || '—'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
