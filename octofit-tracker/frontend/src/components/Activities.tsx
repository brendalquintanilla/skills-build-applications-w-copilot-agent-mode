import { useEffect, useState } from 'react'
import { codespaceName, getFetchUrl, normalizeApiResponse } from '../api'

export default function Activities() {
  const [activities, setActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const url = getFetchUrl('activities')
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch activities: ${res.status}`)
        return res.json()
      })
      .then((json) => setActivities(normalizeApiResponse(json).items))
      .catch((reason) => setError(String(reason)))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container py-4">
      <h1>Activities</h1>
      {codespaceName ? null : (
        <div className="alert alert-warning">VITE_CODESPACE_NAME is not set; using localhost fallback.</div>
      )}
      {loading && <p>Loading activities…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Type</th>
                <th>User</th>
                <th>Duration</th>
                <th>Distance</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id ?? activity.id ?? `${activity.userId}-${activity.type}` }>
                  <td>{activity.type}</td>
                  <td>{activity.userId}</td>
                  <td>{activity.duration ?? '—'} min</td>
                  <td>{activity.distanceKm ?? '—'} km</td>
                  <td>{activity.calories ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
