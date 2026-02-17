"use client"

import { useEffect, useState, useRef } from "react"
import { Progress } from "@/components/ui/progress"
import { Zap, Star, TrendingUp } from "lucide-react"

const levelData = {
  currentLevel: 42,
  title: "Elite Researcher",
  currentXP: 7450,
  xpForNext: 10000,
  rank: "Shadow Operator",
  achievements: [
    { name: "First Blood", description: "Reported first vulnerability" },
    { name: "Chain Master", description: "Chained 3+ bugs in one report" },
    { name: "Night Owl", description: "1000+ hours of research" },
    { name: "Code Breaker", description: "100+ exploits written" },
  ],
}

export function LevelSystem() {
  const [progress, setProgress] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const percentage = (levelData.currentXP / levelData.xpForNext) * 100

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setProgress(percentage), 200)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [percentage])

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <p className="mb-2 font-mono text-sm text-primary">
            {"// progression"}
          </p>
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            Level System
          </h2>
        </div>

        <div className="mx-auto max-w-3xl">
          {/* Main level card */}
          <div className="card-glow rounded-lg border border-border bg-card p-6 md:p-8">
            <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
                  <span className="font-mono text-2xl font-bold text-primary">
                    {levelData.currentLevel}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {levelData.title}
                  </h3>
                  <p className="flex items-center gap-1.5 font-mono text-sm text-muted-foreground">
                    <Star className="h-3.5 w-3.5 text-primary" />
                    {levelData.rank}
                  </p>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <p className="font-mono text-sm text-muted-foreground">XP</p>
                <p className="font-mono text-lg font-bold text-foreground">
                  {levelData.currentXP.toLocaleString()}{" "}
                  <span className="text-sm text-muted-foreground">
                    / {levelData.xpForNext.toLocaleString()}
                  </span>
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-2">
              <Progress
                value={progress}
                className="h-3 bg-secondary progress-glow"
              />
            </div>
            <div className="flex justify-between">
              <span className="font-mono text-xs text-muted-foreground">
                Level {levelData.currentLevel}
              </span>
              <span className="flex items-center gap-1 font-mono text-xs text-primary">
                <TrendingUp className="h-3 w-3" />
                {Math.round(percentage)}%
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                Level {levelData.currentLevel + 1}
              </span>
            </div>
          </div>

          {/* Achievements */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {levelData.achievements.map((achievement) => (
              <div
                key={achievement.name}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/30"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">
                    {achievement.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
