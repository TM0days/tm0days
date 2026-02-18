"use client"

import { useEffect, useState } from "react"
import { getCurrentRank } from "./rankEngine"
import { useStats } from "./useStats"

export function useRank() {

    const stats = useStats()
    const [rank, setRank] = useState<any>(null)

    useEffect(() => {

        if (!stats) return

        async function load() {

            const r = await getCurrentRank(stats.level)

            setRank(r)
        }

        load()

    }, [stats])

    return rank
}
