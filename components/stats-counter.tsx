"use client"

import { Clock, Code, FlaskConical } from "lucide-react"
import { useStats } from "@/lib/useStats"

export function StatsCounter() {

  const stats = useStats()

  if (!stats) return null

  const items = [
    {
      icon: Clock,
      value: stats.study_hours,
      label: "Hours Studied",
    },
    {
      icon: Code,
      value: stats.exploits_written,
      label: "Exploits Written",
    },
    {
      icon: FlaskConical,
      value: stats.research_hours,
      label: "Research Hours",
    },
  ]

  return (

    <div className="grid grid-cols-3 gap-6 p-6">

      {items.map((item, index) => (

        <div key={index}
          className="border border-green-500 p-6 text-center">

          <item.icon className="mx-auto text-green-400 mb-2" />

          <div className="text-3xl text-green-400">
            {item.value}
          </div>

          <div className="text-green-300 text-sm">
            {item.label}
          </div>

        </div>

      ))}

    </div>
  )
}
