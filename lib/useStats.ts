"use client"

import { useEffect, useState } from "react"
import { supabase } from "./supabase"

export function useStats() {

    const [stats, setStats] = useState<any>(null)

    useEffect(() => {

        loadStats()

        const channel = supabase
            .channel("stats-realtime")
            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "stats",
                },
                (payload) => {
                    setStats(payload.new)
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }

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
