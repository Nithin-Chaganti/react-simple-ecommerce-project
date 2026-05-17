import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context.jsx";


export default function Navbar() {
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        const shouldLogout = window.confirm('Are you sure you want to logout?')

        if (!shouldLogout) {
            return
        }

        logout()
        navigate('/', { replace: true })
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to='/' className="navbar-brand">
                    ShopHub
                </Link>

                <div className="navbar-links">
                    <Link to='/' className="navbar-link">Home</Link>
                    <Link to='/checkout' className="navbar-link">Checkout</Link>
                </div>

                <div className="navbar-auth">
                    {user ? (
                        <div className="navbar-user">
                            <span className="navbar-greeting">{user.email}</span>
                            <button className="btn btn-secondary" type="button" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="navbar-auth-links">
                            <Link to='/auth' state={{ mode: 'login' }} className="btn btn-secondary">
                                Login
                            </Link>

                            <Link to='/auth' state={{ mode: 'signup' }} className="btn btn-primary">
                                Signup
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}