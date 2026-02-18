"use client"

import { useEffect, useState } from "react"
import { supabase } from "./supabase"

export function useMissions() {

    const [missions, setMissions] = useState<any[]>([])

    useEffect(() => {
        load()
    }, [])

    async function load() {

        const { data } =
            await supabase
                .from("missions")
                .select("*")
                .order("created_at", { ascending: false })

        setMissions(data || [])
    }

    return missions
}
