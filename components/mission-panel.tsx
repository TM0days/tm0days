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
    const [loading, setLoading] = useState(false)

    async function createMission() {

        if (!title) return

        setLoading(true)

        // اقفل أي mission حالية
        if (current) {
            await supabase
                .from("missions")
                .update({ status: "completed", progress: 100 })
                .eq("id", current.id)
        }

        // أضف mission جديدة
        await supabase
            .from("missions")
            .insert({
                title,
                description,
                progress: 0,
                status: "active"
            })

        setTitle("")
        setDescription("")
        setLoading(false)

        window.location.reload()
    }

    return (

        <div className="border border-green-500 p-6 rounded-lg">

            <h2 className="text-green-400 text-xl mb-4">
                Current Mission
            </h2>

            {current ? (
                <>
                    <div className="text-lg">
                        {current.title}
                    </div>

                    <div className="text-sm text-gray-400">
                        {current.description}
                    </div>

                    <div className="w-full bg-gray-800 h-3 mt-3">
                        <div
                            className="bg-green-500 h-3"
                            style={{ width: `${current.progress}%` }}
                        />
                    </div>

                    <div className="text-sm mt-1">
                        {current.progress}%
                    </div>
                </>
            ) : (
                <div>No active mission</div>
            )}

            {/* 🔥 Create Mission Form */}

            <div className="mt-8 border-t border-gray-800 pt-6">

                <h3 className="text-green-400 mb-4">
                    Create New Mission
                </h3>

                <input
                    placeholder="Mission Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full mb-3 p-2 bg-black border border-gray-700 text-green-400"
                />

                <textarea
                    placeholder="Mission Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full mb-3 p-2 bg-black border border-gray-700 text-green-400"
                />

                <button
                    onClick={createMission}
                    disabled={loading}
                    className="px-4 py-2 border border-green-500 text-green-400 hover:bg-green-500 hover:text-black transition">

                    Start Mission

                </button>

            </div>

            {/* Mission History */}

            <div className="mt-8">

                <h3 className="text-green-400 mb-2">
                    Mission History
                </h3>

                {completed.map(m => (

                    <div
                        key={m.id}
                        className="text-green-400 text-sm">

                        ✓ {m.title}

                    </div>

                ))}

            </div>

        </div>
    )
}
