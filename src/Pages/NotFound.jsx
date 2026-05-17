import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="page">
      <div className="container">
        <div className="not-found-card">
          <p className="not-found-code">404</p>
          <h1 className="page-title not-found-title">Page not found</h1>
          <p className="not-found-message">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link className="btn btn-primary" to="/">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}