"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Shield, Lock, User, AlertCircle, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Small delay for UX feel
    await new Promise((r) => setTimeout(r, 600))

    const success = login(username, password)
    if (success) {
      router.push("/dashboard")
    } else {
      setError("Access denied. Invalid credentials.")
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-[calc(100vh-65px)] items-center justify-center px-6 scanlines">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.75 0.18 150) 1px, transparent 1px), linear-gradient(90deg, oklch(0.75 0.18 150) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Terminal header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-1 font-mono text-2xl font-bold text-foreground">
            <span className="text-glow text-primary">{"TM0days"}</span>
          </h1>
          <p className="font-mono text-sm text-muted-foreground">
            {"// secure access terminal"}
          </p>
        </div>

        {/* Login card */}
        <div className="card-glow rounded-lg border border-border bg-card">
          {/* Terminal title bar */}
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-chart-4/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-primary/60" />
            <span className="ml-2 font-mono text-xs text-muted-foreground">
              login@tm0days:~$
            </span>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {error && (
              <div className="mb-4 flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span className="font-mono text-xs">{error}</span>
              </div>
            )}

            <div className="mb-4">
              <Label htmlFor="username" className="mb-2 font-mono text-xs text-muted-foreground">
                <User className="h-3.5 w-3.5" />
                USERNAME
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="border-border bg-secondary/50 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus-visible:border-primary focus-visible:ring-primary/30"
                autoComplete="username"
                required
              />
            </div>

            <div className="mb-6">
              <Label htmlFor="password" className="mb-2 font-mono text-xs text-muted-foreground">
                <Lock className="h-3.5 w-3.5" />
                PASSWORD
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="border-border bg-secondary/50 pr-10 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus-visible:border-primary focus-visible:ring-primary/30"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full font-mono text-sm hover:shadow-[0_0_20px_oklch(0.75_0.18_150/0.3)]"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Authenticate
                </span>
              )}
            </Button>

            <p className="mt-4 text-center font-mono text-xs text-muted-foreground/60">
              {"// authorized personnel only"}
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
