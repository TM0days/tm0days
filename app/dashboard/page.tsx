"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Footer } from "@/components/footer"
import {
  Clock,
  Code,
  FlaskConical,
  Plus,
  Minus,
  RotateCcw,
  Shield,
  Zap,
  Star,
  TrendingUp,
  LogOut,
} from "lucide-react"

interface CounterStat {
  label: string
  value: number
  icon: React.ComponentType<{ className?: string }>
  description: string
}

const defaultStats: CounterStat[] = [
  {
    label: "Hours Studied",
    value: 2480,
    icon: Clock,
    description: "Total learning & training hours",
  },
  {
    label: "Exploits Written",
    value: 147,
    icon: Code,
    description: "Custom exploits & PoCs developed",
  },
  {
    label: "Research Hours",
    value: 1320,
    icon: FlaskConical,
    description: "Vulnerability research time",
  },
]

const levelConfig = {
  title: "Elite Researcher",
  rank: "Shadow Operator",
  xpPerAction: 25,
}

function CounterCard({
  stat,
  onIncrement,
  onDecrement,
  onReset,
}: {
  stat: CounterStat
  onIncrement: () => void
  onDecrement: () => void
  onReset: () => void
}) {
  const Icon = stat.icon

  return (
    <div className="card-glow rounded-lg border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{stat.label}</p>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label={`Reset ${stat.label}`}
          title="Reset to default"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="mb-4 text-center">
        <span className="font-mono text-4xl font-bold text-foreground">
          {stat.value.toLocaleString()}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onDecrement}
          disabled={stat.value <= 0}
          className="flex-1 border-border font-mono text-xs text-muted-foreground hover:border-destructive/40 hover:text-destructive"
        >
          <Minus className="h-3.5 w-3.5" />
          <span className="sr-only md:not-sr-only">Remove</span>
        </Button>
        <Button
          size="sm"
          onClick={onIncrement}
          className="flex-1 font-mono text-xs hover:shadow-[0_0_15px_oklch(0.75_0.18_150/0.3)]"
        >
          <Plus className="h-3.5 w-3.5" />
          <span className="sr-only md:not-sr-only">Add</span>
        </Button>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { isAuthenticated, username, logout } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState(defaultStats)
  const [xp, setXp] = useState(7450)
  const [level, setLevel] = useState(42)

  const xpForNext = 10000
  const xpProgress = (xp / xpForNext) * 100

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  function handleIncrement(index: number) {
    setStats((prev) =>
      prev.map((s, i) => (i === index ? { ...s, value: s.value + 1 } : s))
    )
    gainXP()
  }

  function handleDecrement(index: number) {
    setStats((prev) =>
      prev.map((s, i) =>
        i === index ? { ...s, value: Math.max(0, s.value - 1) } : s
      )
    )
  }

  function handleReset(index: number) {
    setStats((prev) =>
      prev.map((s, i) => (i === index ? { ...s, value: defaultStats[i].value } : s))
    )
  }

  function gainXP() {
    setXp((prev) => {
      const newXp = prev + levelConfig.xpPerAction
      if (newXp >= xpForNext) {
        setLevel((l) => l + 1)
        return newXp - xpForNext
      }
      return newXp
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[calc(100vh-65px)] items-center justify-center">
        <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          Redirecting to login...
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen scanlines">
      <div className="mx-auto max-w-6xl px-6 py-10 md:py-16">
        {/* Dashboard header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 font-mono text-sm text-primary">
              {"// dashboard"}
            </p>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              Welcome back,{" "}
              <span className="text-glow text-primary">{username}</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your stats and track your progression.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="w-fit border-border font-mono text-xs text-muted-foreground hover:border-destructive/40 hover:text-destructive"
          >
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </Button>
        </div>

        {/* Level card */}
        <div className="mb-8 card-glow rounded-lg border border-border bg-card p-6">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
                <span className="font-mono text-xl font-bold text-primary">
                  {level}
                </span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  {levelConfig.title}
                </h2>
                <p className="flex items-center gap-1.5 font-mono text-sm text-muted-foreground">
                  <Star className="h-3.5 w-3.5 text-primary" />
                  {levelConfig.rank}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5 rounded-md border border-primary/20 bg-primary/5 px-3 py-1.5">
                <Zap className="h-3.5 w-3.5 text-primary" />
                <span className="font-mono text-xs text-primary">
                  +{levelConfig.xpPerAction} XP per action
                </span>
              </div>
            </div>
          </div>

          <div className="mb-2">
            <Progress value={xpProgress} className="h-3 bg-secondary progress-glow" />
          </div>
          <div className="flex justify-between">
            <span className="font-mono text-xs text-muted-foreground">
              Level {level}
            </span>
            <span className="font-mono text-xs text-foreground">
              {xp.toLocaleString()} / {xpForNext.toLocaleString()} XP
            </span>
            <span className="flex items-center gap-1 font-mono text-xs text-primary">
              <TrendingUp className="h-3 w-3" />
              {Math.round(xpProgress)}%
            </span>
          </div>
        </div>

        {/* Counter cards */}
        <div className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 font-mono text-sm font-medium text-muted-foreground">
            <Shield className="h-4 w-4 text-primary" />
            STAT COUNTERS
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <CounterCard
                key={stat.label}
                stat={stat}
                onIncrement={() => handleIncrement(index)}
                onDecrement={() => handleDecrement(index)}
                onReset={() => handleReset(index)}
              />
            ))}
          </div>
        </div>

        {/* Quick stats summary */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 flex items-center gap-2 font-mono text-sm font-medium text-muted-foreground">
            <TrendingUp className="h-4 w-4 text-primary" />
            SESSION SUMMARY
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="text-center">
              <p className="font-mono text-2xl font-bold text-foreground">{level}</p>
              <p className="text-xs text-muted-foreground">Current Level</p>
            </div>
            <div className="text-center">
              <p className="font-mono text-2xl font-bold text-foreground">
                {stats.reduce((sum, s) => sum + s.value, 0).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Total Stats</p>
            </div>
            <div className="text-center">
              <p className="font-mono text-2xl font-bold text-primary">
                {xp.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Current XP</p>
            </div>
            <div className="text-center">
              <p className="font-mono text-2xl font-bold text-foreground">
                {Math.round(xpProgress)}%
              </p>
              <p className="text-xs text-muted-foreground">To Next Level</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
