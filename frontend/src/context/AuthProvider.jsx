import { useState } from "react"
import { AuthContext } from "./AuthContext"

export function AuthProvider({children}){
    const [token, setToken] = useState(() => {
    // Carrega o token ao iniciar
    return localStorage.getItem("token")
    })

    const login = (newToken) => {
        localStorage.setItem("token", newToken)
        setToken(newToken)
    }

    const logout = () => {
        localStorage.removeItem("token")
        setToken(null)
    }

    return(
        <AuthContext.Provider value={{token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}