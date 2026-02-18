"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Zap } from "lucide-react"

export function AchievementList() {

    const [achievements, setAchievements] = useState<any[]>([])
    const [unlockedIds, setUnlockedIds] = useState<string[]>([])

    useEffect(() => {
        load()
    }, [])

    async function load() {

        // هات كل achievements
        const { data: achievementsData } =
            await supabase
                .from("achievements")
                .select("*")

        // هات الإنجازات اللي اتفتحت
        const { data: unlockedData } =
            await supabase
                .from("user_achievements")
                .select("achievement_id")

        setAchievements(achievementsData || [])

        if (unlockedData) {
            setUnlockedIds(unlockedData.map(a => a.achievement_id))
        }
    }

    return (

        <div className="grid grid-cols-2 gap-3">

            {achievements.map(a => {

                const isUnlocked = unlockedIds.includes(a.id)

                return (
                    <div
                        key={a.id}
                        className={`
              border p-4 rounded transition-all duration-300
              ${isUnlocked
                                ? "border-green-500 text-green-400 bg-green-900/20"
                                : "border-gray-700 text-gray-500 opacity-40"}
            `}>

                        <Zap size={16} className={isUnlocked ? "text-green-400" : "text-gray-600"} />

                        <div className="font-semibold">
                            {a.name}
                        </div>

                        <div className="text-xs">
                            {a.description}
                        </div>

                    </div>
                )
            })}

        </div>
    )
}
