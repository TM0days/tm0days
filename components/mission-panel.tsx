"use client"

import { useMissions } from "@/lib/useMissions"
import { supabase } from "@/lib/supabase"
import { useState } from "react"
import { useStats } from "@/lib/useStats"

export function MissionPanel() {

    const missions = useMissions()
    const stats = useStats()

    const current =
        missions.find(m => m.status === "active")

    const completed =
        missions.filter(m => m.status === "completed")

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [xpReward, setXpReward] = useState(200)
    const [loading, setLoading] = useState(false)
    const [xpGain, setXpGain] = useState<number | null>(null)

    // 🎯 Create Mission
    async function createMission() {

        if (!title) return

        setLoading(true)

        if (current) {
            await supabase
                .from("missions")
                .update({
                    status: "completed",
                    progress: 100,
                    completed_at: new Date()
                })
                .eq("id", current.id)
        }

        await supabase
            .from("missions")
            .insert({
                title,
                description,
                progress: 0,
                status: "active",
                xp_reward: xpReward
            })

        setTitle("")
        setDescription("")
        setXpReward(200)
        setLoading(false)

        window.location.reload()
    }

    // 🏆 Complete Mission + Streak + Bonus
    async function completeMission() {

        if (!current || !stats) return

        // 1️⃣ Update mission
        await supabase
            .from("missions")
            .update({
                status: "completed",
                progress: 100,
                completed_at: new Date()
            })
            .eq("id", current.id)

        const today = new Date().toISOString().split("T")[0]

        let newStreak = stats.streak || 0

        if (stats.last_completed_date !== today) {
            newStreak += 1
        }

        let bonusXP = 0

        if (newStreak % 5 === 0) {
            bonusXP = 500
        }

        const totalGain =
            (current.xp_reward || 0) + bonusXP

        const newXP = stats.xp + totalGain
        const newLevel =
            Math.floor(newXP / 1000) + 1

        await supabase
            .from("stats")
            .update({
                xp: newXP,
                level: newLevel,
                streak: newStreak,
                last_completed_date: today
            })
            .eq("id", stats.id)

        setXpGain(totalGain)

        setTimeout(() => {
            setXpGain(null)
            window.location.reload()
        }, 2000)
    }

    const difficulty =
        current?.xp_reward >= 1000
            ? "🔥 Legendary"
            : current?.xp_reward >= 500
                ? "⚡ Hard"
                : "🟢 Normal"

    return (

        <div className="border border-green-600 p-6 rounded-xl bg-black/40">

            {/* 🔥 Streak Display */}
            <div
                className={`flex items-center gap-2 mb-4 text-sm
        ${stats?.streak >= 5
                        ? "text-red-400 animate-pulse"
                        : "text-orange-400"}
      `}
            >
                🔥 Streak: {stats?.streak || 0} Days
            </div>

            <h2 className="text-green-400 text-xl mb-4">
                🎮 Active Quest
            </h2>

            {current ? (

                <div className="relative 
                        border border-green-600 
                        bg-gradient-to-br from-green-950/40 to-black 
                        rounded-xl p-4 
                        shadow-[0_0_20px_rgba(0,255,0,0.25)]
                        transition-all duration-300">

                    <div className="flex justify-between items-center mb-2">

                        <div className="flex items-center gap-2 text-green-400 font-semibold">
                            🗡️ {current.title}
                        </div>

                        <div className="text-xs px-2 py-1 
                            border border-green-500 
                            rounded-full text-green-400">
                            🎁 +{current.xp_reward} XP
                        </div>

                    </div>

                    <div className="text-xs text-yellow-400 mb-2">
                        {difficulty}
                    </div>

                    <div className="text-gray-400 text-sm mb-3">
                        {current.description}
                    </div>

                    <div className="w-full bg-green-900/40 h-2 rounded-full overflow-hidden">
                        <div
                            className="bg-green-400 h-2 transition-all duration-500"
                            style={{ width: `${current.progress}%` }}
                        />
                    </div>

                    <div className="text-xs text-green-500 mt-1">
                        {current.progress}% Complete
                    </div>

                    <button
                        onClick={completeMission}
                        className="mt-3 w-full py-2 text-sm 
                       bg-green-600 text-black font-semibold 
                       rounded-md hover:bg-green-500 
                       transition">

                        ⚔️ Claim Reward

                    </button>

                    {xpGain && (
                        <div className="text-green-400 text-lg animate-bounce mt-3 text-center">
                            +{xpGain} XP 🎉
                        </div>
                    )}

                </div>

            ) : (
                <div className="text-gray-500 text-sm italic">
                    💤 No Active Quest
                </div>
            )}

            {/* 🔥 Create Quest */}
            <div className="mt-10 border-t border-green-900 pt-6">

                <h3 className="text-green-400 mb-4">
                    ➕ Create New Quest
                </h3>

                <input
                    placeholder="Quest Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full mb-3 p-3 
                     bg-green-950/20 
                     border border-green-900 
                     text-green-400 rounded-lg"
                />

                <textarea
                    placeholder="Quest Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full mb-3 p-3 
                     bg-green-950/20 
                     border border-green-900 
                     text-green-400 rounded-lg"
                />

                <input
                    type="number"
                    value={xpReward}
                    onChange={e => setXpReward(Number(e.target.value))}
                    className="w-full mb-3 p-3 
                     bg-green-950/20 
                     border border-green-900 
                     text-green-400 rounded-lg"
                />

                <button
                    onClick={createMission}
                    disabled={loading}
                    className="px-5 py-2 
                     border border-green-500 
                     text-green-400 
                     hover:bg-green-500 hover:text-black 
                     transition rounded-lg">

                    Start Quest

                </button>

            </div>

            {/* 🏆 Quest Log */}
            <div className="mt-10">

                <h3 className="text-green-400 mb-4">
                    📜 Quest Log
                </h3>

                {completed.map(m => (

                    <div
                        key={m.id}
                        className="border border-green-800 
                       bg-black/40 
                       rounded-lg p-3 mb-3 
                       flex justify-between items-center">

                        <div className="text-green-400 text-sm">
                            🏆 {m.title}
                        </div>

                        <div className="text-xs text-green-500">
                            +{m.xp_reward} XP
                        </div>

                    </div>

                ))}

            </div>

        </div>
    )
}