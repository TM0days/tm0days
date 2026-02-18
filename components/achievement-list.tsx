"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Zap } from "lucide-react"

export function AchievementList() {

    const [achievements, setAchievements] = useState<any[]>([])

    useEffect(() => {
        load()
    }, [])

    async function load() {

        const { data } =
            await supabase
                .from("achievements")
                .select("*")
                .order("requirement")

        setAchievements(data || [])
    }

    return (

        <div className="grid grid-cols-2 gap-3">

            {achievements.map(a => (

                <div
                    key={a.id}
                    className={`
            border p-4 rounded
            ${a.unlocked
                            ? "border-green-500 text-green-400"
                            : "border-gray-700 text-gray-500"}
          `}>

                    <Zap size={16} />

                    <div>{a.name}</div>

                    <div className="text-xs">
                        {a.description}
                    </div>

                </div>

            ))}

        </div>

    )
}
