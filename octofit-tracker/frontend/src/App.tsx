import { Routes, Route, Link } from 'react-router-dom'

function Home() {
  return (
    <div className="container py-5">
      <h1>OctoFit Tracker</h1>
      <p className="lead">A modern React 19 + Vite frontend for the OctoFit Tracker.</p>
    </div>
  )
}

export default function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            OctoFit Tracker
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}
