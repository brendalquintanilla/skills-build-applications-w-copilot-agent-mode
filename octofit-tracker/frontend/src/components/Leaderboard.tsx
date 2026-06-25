import { useEffect, useState } from 'react'
import { codespaceName, getFetchUrl, normalizeApiResponse } from '../api'

export default function Leaderboard() {
  const [entries, setEntries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const url = getFetchUrl('leaderboard')
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch leaderboard: ${res.status}`)
        return res.json()
      })
      .then((json) => setEntries(normalizeApiResponse(json).items))
      .catch((reason) => setError(String(reason)))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container py-4">
      <h1>Leaderboard</h1>
      {codespaceName ? null : (
        <div className="alert alert-warning">VITE_CODESPACE_NAME is not set; using localhost fallback.</div>
      )}
      {loading && <p>Loading leaderboard…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Score</th>
                <th>Workouts</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id ?? `${entry.rank}-${entry.user}`}>
                  <td>{entry.rank}</td>
                  <td>{entry.user || entry.userId}</td>
                  <td>{entry.score}</td>
                  <td>{entry.totalWorkouts ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
