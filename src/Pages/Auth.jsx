import  { useContext, useState } from 'react'
import {useForm} from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthContext from '../context/auth-context.jsx'


const Auth = () => {
  const location = useLocation()
  const [mode,setMode] = useState(location.state?.mode || 'signup')
  const navigate = useNavigate()
  const { register, handleSubmit,formState: { errors } } = useForm()
  const { signUp, login } = useContext(AuthContext)

  const onSubmit = (data) => {
    const result = mode === 'signup'
      ? signUp(data.email, data.password)
      : login(data.email, data.password)

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
              <input  className="form-input" type="email" id="email" {...register('email', { required: "Email is required" })} />
            </div>
            {errors.email && <p className="error-message">{errors.email.message}</p>}
            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input className="form-input" type="password" id="password" {...register('password', { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters", } })} />
            </div>
            {errors.password && <p className="error-message">{errors.password.message}</p>}
            <button className="btn btn-primary btn-large" type="submit">{mode === 'signup' ? 'Sign up' : 'Log in'}</button>
          </form>
          <div className="auth-switch">
          <p>{mode === 'signup' ? 'Already have an account?' : 'Don\'t have an account?'} <span className="auth-link" onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}>{mode === 'signup' ? 'Log in' : 'Sign up'}</span></p>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Auth