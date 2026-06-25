import { useEffect, useState } from 'react'
import { codespaceName, getFetchUrl, normalizeApiResponse } from '../api'

export default function Teams() {
  const [teams, setTeams] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const url = getFetchUrl('teams')
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch teams: ${res.status}`)
        return res.json()
      })
      .then((json) => setTeams(normalizeApiResponse(json).items))
      .catch((reason) => setError(String(reason)))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container py-4">
      <h1>Teams</h1>
      {codespaceName ? null : (
        <div className="alert alert-warning">VITE_CODESPACE_NAME is not set; using localhost fallback.</div>
      )}
      {loading && <p>Loading teams…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row gx-3 gy-3">
          {teams.map((team) => (
            <div className="col-12 col-md-6" key={team._id ?? team.id ?? team.name}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">{team.description || 'No description available.'}</p>
                  <p className="mb-0"><strong>Members:</strong> {team.members ?? '—'}</p>
                  <p className="mb-0"><strong>Captain:</strong> {team.captain || '—'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
