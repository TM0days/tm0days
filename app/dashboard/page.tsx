"use client"
export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Dashboard() {

  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    loadStats()
  }, [])

  async function loadStats() {

    const { data, error } = await supabase
      .from("stats")
      .select("*")
      .limit(1)
      .single()

    if (!error) {
      setStats(data)
    }
  }

  async function updateStat(field: string) {

    const updated = {
      ...stats,
      [field]: stats[field] + 1
    }

    updated.xp =
      updated.study_hours * 10 +
      updated.exploits_written * 100 +
      updated.research_hours * 15 +
      updated.cves_found * 1000

    updated.level = Math.floor(updated.xp / 1000) + 1

    await supabase
      .from("stats")
      .update(updated)
      .eq("id", stats.id)

    setStats(updated)
  }

  if (!stats) {
    return <div className="text-green-400 p-10">Loading...</div>
  }

  return (

    <div className="min-h-screen bg-black text-green-400 p-10">

      <h1 className="text-3xl mb-6">
        TM0days Dashboard
      </h1>

      <div className="mb-6">
        Level: {stats.level}
        <br />
        XP: {stats.xp}
      </div>

      <div className="grid grid-cols-2 gap-4">

        <button
          onClick={() => updateStat("study_hours")}
          className="bg-green-600 p-4">
          Study Hours: {stats.study_hours}
        </button>

        <button
          onClick={() => updateStat("research_hours")}
          className="bg-green-600 p-4">
          Research Hours: {stats.research_hours}
        </button>

        <button
          onClick={() => updateStat("exploits_written")}
          className="bg-green-600 p-4">
          Exploits: {stats.exploits_written}
        </button>

        <button
          onClick={() => updateStat("cves_found")}
          className="bg-green-600 p-4">
          CVEs: {stats.cves_found}
        </button>

      </div>

    </div>

  )
}
