import { useState } from "react";
import AuthContext from "./auth-context.jsx";

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('currentUser')
        return storedUser ? JSON.parse(storedUser) : null
    })

    function signUp(email, password) {
        const users = JSON.parse(localStorage.getItem('users')) || []
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'User already exists' }
        }

        const newUser = { email, password }
        users.push(newUser)
        localStorage.setItem('users', JSON.stringify(users))
        localStorage.setItem('currentUser', JSON.stringify({ email }))
        setUser({ email })
        return { success: true, message: 'User created successfully' }
    }

    function login(email, password) {
        const users = JSON.parse(localStorage.getItem('users')) || []
        const user = users.find(u => u.email === email && u.password === password)

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify({ email }))
            setUser({ email })
            return { success: true, message: 'User logged in successfully' }
        }

        return { success: false, message: 'Invalid email or password' }
    }

    function logout() {
        localStorage.removeItem('currentUser')
        setUser(null)
    }

    return <AuthContext.Provider value={{ signUp, login, logout, user }}>
        {children}
    </AuthContext.Provider>
}