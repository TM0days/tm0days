"use client"

import { useMissions } from "@/lib/useMissions"
import { supabase } from "@/lib/supabase"
import { useState } from "react"
import { useStats } from "@/lib/useStats"
import { useAuth } from "@/lib/auth-context"

export function MissionPanel() {

    const missions = useMissions()
    const stats = useStats()
    const { isAuthenticated, username } = useAuth()

    const isAdmin = isAuthenticated && username === "TM0days"

    const activeMissions =
        missions.filter(m => m.status === "active")

    const completed =
        missions.filter(m => m.status === "completed")

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [xpReward, setXpReward] = useState(200)
    const [loading, setLoading] = useState(false)
    const [xpGain, setXpGain] = useState<number | null>(null)
    const [showLog, setShowLog] = useState(false)

    // 🎯 Create Mission
    async function createMission() {

        if (!title) return

        setLoading(true)

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

    // 🏆 Complete Mission
    async function completeMission(mission: any) {

        if (!stats) return

        await supabase
            .from("missions")
            .update({
                status: "completed",
                progress: 100,
                completed_at: new Date()
            })
            .eq("id", mission.id)

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
            (mission.xp_reward || 0) + bonusXP

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
        }, 1500)
    }

    return (

        <section className="mt-20">

            {/* Title */}
            <div className="text-center mb-10">
                <p className="text-green-500 text-sm">// quests</p>
                <h2 className="text-2xl text-green-300 font-semibold">
                    Mission System
                </h2>
            </div>

            <div className="max-w-4xl mx-auto border border-green-600 rounded-2xl p-8 bg-black/50">

                {/* 🔥 Streak */}
                <div className="text-orange-400 text-sm mb-6">
                    🔥 Streak: {stats?.streak || 0} Days
                </div>

                {/* Active Missions */}
                <h3 className="text-green-400 text-lg mb-4">
                    🎮 Active Quests
                </h3>

                {activeMissions.length > 0 ? (

                    <div className="space-y-4">

                        {activeMissions.map(m => (

                            <div
                                key={m.id}
                                className="border border-green-700 rounded-xl p-5 bg-green-950/20"
                            >

                                <div className="flex justify-between mb-2">

                                    <div className="text-green-300 font-semibold">
                                        🗡️ {m.title}
                                    </div>

                                    <div className="text-green-400 text-sm">
                                        +{m.xp_reward} XP
                                    </div>

                                </div>

                                <div className="text-gray-400 text-sm mb-3">
                                    {m.description}
                                </div>

                                <div className="w-full bg-green-900/40 h-2 rounded">
                                    <div
                                        className="bg-green-400 h-2"
                                        style={{ width: `${m.progress}%` }}
                                    />
                                </div>

                                {isAdmin && (
                                    <button
                                        onClick={() => completeMission(m)}
                                        className="mt-4 w-full py-2 bg-green-600 text-black rounded-md"
                                    >
                                        ⚔️ Claim Reward
                                    </button>
                                )}

                            </div>

                        ))}

                    </div>

                ) : (
                    <div className="text-gray-500">
                        No active quests
                    </div>
                )}

                {/* ➕ Create Mission */}
                {isAdmin && (
                    <div className="mt-10">

                        <h3 className="text-green-400 mb-4">
                            ➕ Create Quest
                        </h3>

                        <input
                            placeholder="Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="w-full mb-3 p-2 bg-black border border-green-700 rounded"
                        />

                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="w-full mb-3 p-2 bg-black border border-green-700 rounded"
                        />

                        <input
                            type="number"
                            value={xpReward}
                            onChange={e => setXpReward(Number(e.target.value))}
                            className="w-full mb-3 p-2 bg-black border border-green-700 rounded"
                        />

                        <button
                            onClick={createMission}
                            className="px-4 py-2 border border-green-500 text-green-400 rounded"
                        >
                            Start Quest
                        </button>

                    </div>
                )}

                {/* 📜 Quest Log */}
                <div className="mt-10">

                    <button
                        onClick={() => setShowLog(!showLog)}
                        className="w-full border border-green-800 p-3 rounded"
                    >
                        📜 Quest Log {showLog ? "▲" : "▼"}
                    </button>

                    {showLog && (
                        <div className="mt-4 space-y-2">

                            {completed.map(m => (
                                <div
                                    key={m.id}
                                    className="border border-green-800 p-3 rounded"
                                >
                                    🏆 {m.title} (+{m.xp_reward} XP)
                                </div>
                            ))}

                        </div>
                    )}

                </div>

            </div>

        </section>

    )
}