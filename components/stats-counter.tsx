"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Clock, Code, FlaskConical } from "lucide-react"

export function StatsCounter() {

  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    loadStats()
  }, [])

  async function loadStats() {

    const { data } = await supabase
      .from("stats")
      .select("*")
      .single()

    setStats(data)
  }

  if (!stats) {
    return <div className="text-green-400 p-10">Loading stats...</div>
  }

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

    <section className="py-20">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {items.map((item, index) => (

          <div key={index}
            className="bg-black border border-green-500 p-6 text-center">

            <item.icon className="mx-auto mb-4 text-green-400" />

            <div className="text-4xl text-green-400">
              {item.value}
            </div>

            <div className="text-green-300">
              {item.label}
            </div>

          </div>

        ))}

      </div>

    </section>

  )
}
