"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Zap } from "lucide-react"

export function AchievementList() {

    const [achievements, setAchievements] = useState<any[]>([])
    const [unlockedIds, setUnlockedIds] = useState<string[]>([])

    useEffect(() => {
        load()

        function handleUnlock() {
            load()
        }

        window.addEventListener("achievement-unlocked", handleUnlock)

        return () => {
            window.removeEventListener("achievement-unlocked", handleUnlock)
        }
    }, [])

    async function load() {

        const { data: achievementsData } =
            await supabase
                .from("achievements")
                .select("*")

        const { data: unlockedData } =
            await supabase
                .from("user_achievements")
                .select("achievement_id")

        setAchievements(achievementsData || [])
        setUnlockedIds(unlockedData?.map(a => a.achievement_id) || [])
    }

    function getCurrentAchievement(category: string) {

        const categoryAchievements =
            achievements
                .filter(a => a.key.startsWith(category + "_"))
                .sort((a, b) => {
                    const aVal = parseInt(a.key.split("_")[1])
                    const bVal = parseInt(b.key.split("_")[1])
                    return aVal - bVal
                })

        return categoryAchievements.find(
            a => !unlockedIds.includes(a.id)
        )
    }

    const exploitCurrent = getCurrentAchievement("exploit")
    const studyCurrent = getCurrentAchievement("study")
    const levelCurrent = getCurrentAchievement("level")

    const currentAchievements =
        [exploitCurrent, studyCurrent, levelCurrent]
            .filter(Boolean)

    return (
        <div className="grid grid-cols-2 gap-3">

            {currentAchievements.map(a => (

                <div
                    key={a.id}
                    className="border border-green-500 p-4 rounded transition">

                    <Zap size={16} className="text-green-400" />

                    <div className="font-semibold">
                        {a.name}
                    </div>

                    <div className="text-xs">
                        {a.description}
                    </div>

                </div>

            ))}

        </div>
    )
}
