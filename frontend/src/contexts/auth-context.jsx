import { createContext, useContext, useEffect, useState } from "react"

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Restore session on refresh
    useEffect(() => {
        const loadUser = async () => {
            try {
                const res = await fetch("/api/auth/me", {
                    credentials: "include",
                })
                console.log(res)

                if (res.ok) {
                    const data = await res.json()
                    setUser(data.user)
                }
                console.log(user)
            } catch (err) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        loadUser()
    }, [])

    const login = (userData) => {
        setUser(userData)
        localStorage.setItem("auth_user", JSON.stringify(userData))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("auth_user")
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
