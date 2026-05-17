import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthContext from '../context/auth-context.jsx'


const Auth = () => {
  const location = useLocation()
  const [mode, setMode] = useState(location.state?.mode || 'signup')
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signUp, login } = useContext(AuthContext)

  useEffect(() => {
    if (location.state?.mode) {
      setMode(location.state.mode)
    }
  }, [location.state?.mode])

  const onSubmit = (data) => {
    const email = data.email.trim().toLowerCase()
    const password = data.password

    const result = mode === 'signup'
      ? signUp(email, password)
      : login(email, password)

    alert(result.message)

    if (result.success) {
      navigate(mode === 'signup' ? '/auth' : '/', {
        state: mode === 'signup' ? { mode: 'login' } : undefined,
        replace: true,
      })
    }
  }

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          <h1 className="page-title">{mode === 'signup' ? 'Sign up' : 'Log in'}</h1>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                className="form-input"
                type="email"
                id="email"
                autoComplete="email"
                {...register('email', { required: 'Email is required' })}
              />
            </div>
            {errors.email && <p className="error-message">{errors.email.message}</p>}
            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                className="form-input"
                type="password"
                id="password"
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 8, message: 'Password must be at least 8 characters' },
                })}
              />
            </div>
            {errors.password && <p className="error-message">{errors.password.message}</p>}
            <button
              className={`btn btn-large auth-submit-btn ${mode === 'signup' ? 'btn-primary auth-signup-btn' : 'btn-secondary auth-login-btn'}`}
              type="submit"
            >
              {mode === 'signup' ? 'Sign up' : 'Log in'}
            </button>
          </form>
          <div className="auth-switch">
          <p>
            {mode === 'signup' ? 'Already have an account?' : 'Don\'t have an account?'}{' '}
            <button
              type="button"
              className="auth-link auth-toggle-btn"
              onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
            >
              {mode === 'signup' ? 'Log in' : 'Sign up'}
            </button>
          </p>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Auth