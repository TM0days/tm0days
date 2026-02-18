"use client"

import { Clock, Code, FlaskConical, Plus } from "lucide-react"
import { useStats } from "@/lib/useStats"
import { supabase } from "@/lib/supabase"
import { AnimatedCounter } from "./animated-counter"
import { useState } from "react"


export function StatsCounter() {

  const stats = useStats()

  if (!stats) return null

  async function updateStat(field: string) {

    const oldLevel = stats.level

    const newStats = {
      ...stats,
      [field]: stats[field] + 1,
    }

    const newXP =
      newStats.study_hours * 10 +
      newStats.research_hours * 15 +
      newStats.exploits_written * 120 +
      newStats.cves_found * 1000

    const newLevel = Math.floor(newXP / 1000) + 1

    await supabase
      .from("stats")
      .update({
        ...newStats,
        xp: newXP,
        level: newLevel
      })
      .eq("id", stats.id)


  }




  const items = [

    {
      icon: Clock,
      value: stats.study_hours,
      label: "Hours Studied",
      field: "study_hours"
    },

    {
      icon: Code,
      value: stats.exploits_written,
      label: "Exploits Written",
      field: "exploits_written"
    },

    {
      icon: FlaskConical,
      value: stats.research_hours,
      label: "Research Hours",
      field: "research_hours"
    },

  ]

  return (

    <>
      <div className="grid grid-cols-3 gap-6 p-6">

        {items.map((item, index) => (

          <div key={index}
            className="border border-green-500 p-6 text-center hover:scale-105 transition">

            <item.icon className="mx-auto text-green-400 mb-2" />

            <div className="text-4xl text-green-400 mb-2">

              <AnimatedCounter value={item.value} />

            </div>

            <div className="text-green-300 mb-4">
              {item.label}
            </div>

            <button
              onClick={() => updateStat(item.field)}
              className="px-4 py-2 border border-green-500 hover:bg-green-500 hover:text-black transition rounded">

              <Plus size={16} />

            </button>

          </div>

        ))}

      </div>


    </>
  )
}
