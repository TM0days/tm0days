"use client"

import { useEffect, useRef, useState } from "react"
import { Clock, Code, FlaskConical } from "lucide-react"

const stats = [
  {
    label: "Hours Studied",
    value: 2480,
    icon: Clock,
    suffix: "+",
  },
  {
    label: "Exploits Written",
    value: 147,
    icon: Code,
    suffix: "",
  },
  {
    label: "Research Hours",
    value: 1320,
    icon: FlaskConical,
    suffix: "+",
  },
]

function useCountUp(target: number, duration: number = 2000, shouldStart: boolean = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!shouldStart) return
    let startTime: number | null = null
    let animationFrame: number

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [target, duration, shouldStart])

  return count
}

function StatCard({
  label,
  value,
  icon: Icon,
  suffix,
  shouldAnimate,
}: {
  label: string
  value: number
  icon: React.ComponentType<{ className?: string }>
  suffix: string
  shouldAnimate: boolean
}) {
  const count = useCountUp(value, 2000, shouldAnimate)

  return (
    <div className="card-glow group flex flex-col items-center rounded-lg border border-border bg-card p-6 text-center transition-all md:p-8">
      <div className="mb-4 rounded-full border border-primary/20 bg-primary/10 p-3 transition-colors group-hover:border-primary/40 group-hover:bg-primary/20">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <span className="mb-1 font-mono text-3xl font-bold text-foreground md:text-4xl">
        {shouldAnimate ? count.toLocaleString() : "0"}
        {suffix}
      </span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  )
}

export function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <p className="mb-2 font-mono text-sm text-primary">
            {"// stats"}
          </p>
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            By the Numbers
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} shouldAnimate={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}
