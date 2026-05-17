import { useState } from "react";
import AuthContext from "./auth-context.jsx";

function readJSON(key, fallback) {
    try {
        const rawValue = localStorage.getItem(key)
        return rawValue ? JSON.parse(rawValue) : fallback
    } catch {
        return fallback
    }
}

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        return readJSON('currentUser', null)
    })

    function signUp(email, password) {
        const normalizedEmail = email.trim().toLowerCase()
        const users = readJSON('users', [])

        if (users.find(u => u.email === normalizedEmail)) {
            return { success: false, message: 'User already exists' }
        }

        const newUser = { email: normalizedEmail, password }
        users.push(newUser)
        localStorage.setItem('users', JSON.stringify(users))
        localStorage.setItem('currentUser', JSON.stringify({ email: normalizedEmail }))
        setUser({ email: normalizedEmail })
        return { success: true, message: 'User created successfully' }
    }

    function login(email, password) {
        const normalizedEmail = email.trim().toLowerCase()
        const users = readJSON('users', [])
        const user = users.find(u => u.email === normalizedEmail && u.password === password)

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify({ email: normalizedEmail }))
            setUser({ email: normalizedEmail })
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