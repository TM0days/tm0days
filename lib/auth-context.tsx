"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface AuthContextType {
  isAuthenticated: boolean
  username: string | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const VALID_CREDENTIALS = {
  username: "TM0days",
  password: "admin",
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const router = useRouter()

  const login = useCallback(
    (user: string, pass: string) => {
      if (user === VALID_CREDENTIALS.username && pass === VALID_CREDENTIALS.password) {
        setIsAuthenticated(true)
        setUsername(user)
        return true
      }
      return false
    },
    []
  )

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    setUsername(null)
    router.push("/login")
  }, [router])

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
