"use client"

import { useEffect, useState, useRef } from "react"
import { Progress } from "@/components/ui/progress"
import { Zap, Star, TrendingUp } from "lucide-react"
import { useStats } from "@/lib/useStats"

export function LevelSystem() {

  const stats = useStats()
  const [progress, setProgress] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {

    if (!stats) return

    const percentage = (stats.xp % 1000) / 10

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setProgress(percentage), 200)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()

  }, [stats])

  if (!stats) return null

  const level = stats.level
  const xp = stats.xp
  const xpForNext = level * 1000
  const percentage = Math.round((xp % 1000) / 10)

  function getTitle(level: number) {

    if (level < 5) return "Beginner"
    if (level < 10) return "Learner"
    if (level < 20) return "Researcher"
    if (level < 40) return "Exploit Developer"
    if (level < 60) return "Elite Researcher"
    return "Security Master"
  }

  return (
    <section ref={ref} className="py-16 md:py-24">

      <div className="mx-auto max-w-6xl px-6">

        <div className="mb-10 text-center">
          <p className="mb-2 font-mono text-sm text-primary">
            {"// progression"}
          </p>

          <h2 className="text-2xl font-bold">
            Level System
          </h2>
        </div>

        <div className="mx-auto max-w-3xl">

          <div className="card-glow rounded-lg border border-border bg-card p-6 md:p-8">

            <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">

                  <span className="font-mono text-2xl font-bold text-primary">
                    {level}
                  </span>

                </div>

                <div>

                  <h3 className="text-lg font-bold">
                    {getTitle(level)}
                  </h3>

                  <p className="flex items-center gap-1.5 font-mono text-sm text-muted-foreground">
                    <Star className="h-3.5 w-3.5 text-primary" />
                    TM0days
                  </p>

                </div>

              </div>

              <div className="text-center sm:text-right">

                <p className="font-mono text-sm text-muted-foreground">
                  XP
                </p>

                <p className="font-mono text-lg font-bold">
                  {xp}
                  <span className="text-sm text-muted-foreground">
                    {" / "} {xpForNext}
                  </span>
                </p>

              </div>

            </div>

            <div className="mb-2">

              <Progress
                value={progress}
                className="h-3 bg-secondary progress-glow"
              />

            </div>

            <div className="flex justify-between">

              <span className="font-mono text-xs text-muted-foreground">
                Level {level}
              </span>

              <span className="flex items-center gap-1 font-mono text-xs text-primary">
                <TrendingUp className="h-3 w-3" />
                {percentage}%
              </span>

              <span className="font-mono text-xs text-muted-foreground">
                Level {level + 1}
              </span>

            </div>

          </div>

          {/* Achievements */}

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">

            <Achievement name="First Step" desc="Start your journey" />
            <Achievement name="Explorer" desc="Study 10 hours" />
            <Achievement name="Exploit Writer" desc="Write first exploit" />
            <Achievement name="Elite Path" desc="Reach Level 10" />

          </div>

        </div>

      </div>

    </section>
  )
}

function Achievement({ name, desc }: { name: string, desc: string }) {

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">

      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">

        <Zap className="h-4 w-4 text-primary" />

      </div>

      <div>

        <p className="text-sm font-medium">
          {name}
        </p>

        <p className="text-xs text-muted-foreground">
          {desc}
        </p>

      </div>

    </div>
  )
}
