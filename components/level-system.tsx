"use client"

import { useEffect, useState, useRef } from "react"
import { Progress } from "@/components/ui/progress"
import { Zap, Star, TrendingUp } from "lucide-react"
import { supabase } from "@/lib/supabase"

export function LevelSystem() {

  const [stats, setStats] = useState<any>(null)
  const [progress, setProgress] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadStats()
  }, [])

  async function loadStats() {

    const { data } = await supabase
      .from("stats")
      .select("*")
      .single()

    if (data) {
      setStats(data)

      const percentage = (data.xp % 1000)
      setProgress(percentage / 10)
    }
  }
}