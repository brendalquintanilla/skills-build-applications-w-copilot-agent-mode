import { useEffect, useState } from 'react'
import { codespaceName, getFetchUrl, normalizeApiResponse } from '../api'

export default function Users() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const url = getFetchUrl('users')
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`)
        return res.json()
      })
      .then((json) => setUsers(normalizeApiResponse(json).items))
      .catch((reason) => setError(String(reason)))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container py-4">
      <h1>Users</h1>
      {codespaceName ? null : (
        <div className="alert alert-warning">VITE_CODESPACE_NAME is not set; using localhost fallback.</div>
      )}
      {loading && <p>Loading users…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id ?? user.id ?? user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.teamId || user.team || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
