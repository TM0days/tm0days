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

        <section className="mt-20">

            {/* Title */}
            <div className="text-center mb-10">
                <p className="text-green-500 text-sm">// quests</p>
                <h2 className="text-2xl text-green-300 font-semibold">
                    Mission System
                </h2>
            </div>

            {/* Centered Container */}
            <div className="max-w-4xl mx-auto
                    border border-green-600
                    rounded-2xl
                    p-8
                    bg-black/50
                    shadow-[0_0_40px_rgba(0,255,0,0.15)]">

                {/* 🔥 Streak */}
                <div className="text-orange-400 text-sm mb-6">
                    🔥 Streak: {stats?.streak || 0} Days
                </div>

                {/* Active Quest */}
                <h3 className="text-green-400 text-lg mb-4">
                    🎮 Active Quest
                </h3>

                {current ? (

                    <div className="border border-green-700
                        rounded-xl p-5
                        bg-green-950/20
                        mb-10">

                        <div className="flex justify-between items-center mb-2">
                            <div className="font-semibold text-green-300">
                                🗡️ {current.title}
                            </div>

                            <div className="text-sm text-green-400">
                                +{current.xp_reward} XP
                            </div>
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

                        <button
                            onClick={completeMission}
                            className="mt-4 w-full py-2
                       bg-green-600 text-black
                       rounded-md hover:bg-green-500 transition">

                            ⚔️ Claim Reward

                        </button>

                    </div>

                ) : (
                    <div className="text-gray-500 italic mb-10">
                        💤 No Active Quest
                    </div>
                )}

                {/* Create Quest */}
                <h3 className="text-green-400 mb-4">
                    ➕ Create New Quest
                </h3>

                <input
                    placeholder="Quest Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full mb-3 p-3
                   bg-black border border-green-800
                   text-green-400 rounded-lg"
                />

                <textarea
                    placeholder="Quest Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full mb-3 p-3
                   bg-black border border-green-800
                   text-green-400 rounded-lg"
                />

                <input
                    type="number"
                    value={xpReward}
                    onChange={e => setXpReward(Number(e.target.value))}
                    className="w-full mb-4 p-3
                   bg-black border border-green-800
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

                {/* Quest Log */}
                <div className="mt-12">

                    <h3 className="text-green-400 mb-4">
                        📜 Quest Log
                    </h3>

                    {completed.map(m => (

                        <div
                            key={m.id}
                            className="border border-green-800
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

        </section>

    )
}