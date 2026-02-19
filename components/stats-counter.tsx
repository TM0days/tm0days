"use client"

import { BugIcon, Clock, Code, FlaskConical, Plus } from "lucide-react"
import { useStats } from "@/lib/useStats"
import { supabase } from "@/lib/supabase"
import { AnimatedCounter } from "./animated-counter"
import { useState } from "react"
import { checkAchievements } from "@/lib/achievementEngine"




export function StatsCounter() {

  const stats = useStats()
  const [achievement, setAchievement] = useState<string | null>(null)

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

    newStats.xp = newXP
    newStats.level = newLevel

    await supabase
      .from("stats")
      .update(newStats)
      .eq("id", stats.id)

    // 🔥 هنا بقى نعمل check
    const unlocked = await checkAchievements(newStats)

    if (unlocked) {
      setAchievement(unlocked.name)

      // عشان AchievementList يتحدث
      window.dispatchEvent(new Event("achievement-unlocked"))
    }
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
    {
      icon: BugIcon,
      value: stats.cves_found,
      label: "CVEs Found",
      field: "cves_found"
    }

  ]

  return (

    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {items.map((item, index) => (

          <div key={index}
            className="
group
relative
border border-green-700
bg-black/40
backdrop-blur-sm
p-6
rounded-xl
text-center
transition-all duration-300
hover:border-green-400
hover:shadow-[0_0_25px_rgba(0,255,0,0.25)]
hover:-translate-y-1
min-h-[200px]
flex flex-col justify-between
">

            <item.icon className="mx-auto text-green-400 mb-3 h-8 w-8 group-hover:scale-110 transition" />

            <div className="text-4xl font-bold text-green-300 mb-3">
              <div className="h-[2px] w-12 mx-auto bg-green-500/50 mb-3" />
              <AnimatedCounter value={item.value} />

            </div>

            <div className="text-green-300 mb-4">
              {item.label}
            </div>

            <button
              onClick={() => updateStat(item.field)}
              className="
mt-4
px-4 py-2
border border-green-600
text-green-400
rounded-md
hover:bg-green-500
hover:text-black
transition-all duration-300
">

              <Plus size={16} />

            </button>

          </div>

        ))}

      </div>

    </>
  )
}
