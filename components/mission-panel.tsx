"use client"

import { useMissions } from "@/lib/useMissions"
import { supabase } from "@/lib/supabase"
import { useState } from "react"

export function MissionPanel() {

    const missions = useMissions()

    const current =
        missions.find(m => m.status === "active")

    const completed =
        missions.filter(m => m.status === "completed")

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [xpReward, setXpReward] = useState(200)
    const [loading, setLoading] = useState(false)

    // 🟢 Create Mission
    async function createMission() {

        if (!title) return

        setLoading(true)

        // اقفل أي mission حالية
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

    // 🟢 Complete Mission + Give XP
    async function completeMission() {

        if (!current) return

        // 1️⃣ تحديث mission
        await supabase
            .from("missions")
            .update({
                status: "completed",
                progress: 100,
                completed_at: new Date()
            })
            .eq("id", current.id)

        // 2️⃣ جلب stats
        const { data: stats } =
            await supabase
                .from("stats")
                .select("*")
                .single()

        if (!stats) return

        // 3️⃣ إضافة XP
        const newXP = stats.xp + (current.xp_reward || 0)

        const newLevel =
            Math.floor(newXP / 1000) + 1

        await supabase
            .from("stats")
            .update({
                xp: newXP,
                level: newLevel
            })
            .eq("id", stats.id)

        window.location.reload()
    }

    return (

        <div className="border border-green-500 p-6 rounded-lg">

            <h2 className="text-green-400 text-xl mb-4">
                Current Mission
            </h2>

            {current ? (
                <>
                    <div className="text-lg font-semibold">
                        {current.title}
                    </div>

                    <div className="text-sm text-gray-400">
                        {current.description}
                    </div>

                    <div className="w-full bg-gray-800 h-3 mt-3 rounded">
                        <div
                            className="bg-green-500 h-3 rounded"
                            style={{ width: `${current.progress}%` }}
                        />
                    </div>

                    <div className="text-sm mt-2">
                        {current.progress}%
                    </div>

                    <button
                        onClick={completeMission}
                        className="mt-4 px-4 py-2 border border-green-500 text-green-400 hover:bg-green-500 hover:text-black transition rounded">

                        Complete Mission (+{current.xp_reward} XP)

                    </button>
                </>
            ) : (
                <div>No active mission</div>
            )}

            {/* 🔥 Create Mission */}

            <div className="mt-10 border-t border-gray-800 pt-6">

                <h3 className="text-green-400 mb-4">
                    Create New Mission
                </h3>

                <input
                    placeholder="Mission Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full mb-3 p-2 bg-black border border-gray-700 text-green-400 rounded"
                />

                <textarea
                    placeholder="Mission Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full mb-3 p-2 bg-black border border-gray-700 text-green-400 rounded"
                />

                <input
                    type="number"
                    placeholder="XP Reward"
                    value={xpReward}
                    onChange={e => setXpReward(Number(e.target.value))}
                    className="w-full mb-3 p-2 bg-black border border-gray-700 text-green-400 rounded"
                />

                <button
                    onClick={createMission}
                    disabled={loading}
                    className="px-4 py-2 border border-green-500 text-green-400 hover:bg-green-500 hover:text-black transition rounded">

                    Start Mission

                </button>

            </div>

            {/* Mission History */}

            <div className="mt-10">

                <h3 className="text-green-400 mb-2">
                    Mission History
                </h3>

                {completed.map(m => (

                    <div
                        key={m.id}
                        className="text-green-400 text-sm mb-1">

                        ✓ {m.title} (+{m.xp_reward} XP)

                    </div>

                ))}

            </div>

        </div>
    )
}
