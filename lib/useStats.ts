"use client"

import { useEffect, useState } from "react"
import { supabase } from "./supabase"

export function useStats() {

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

    return stats
}
