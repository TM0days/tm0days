"use client"

import { useEffect, useState } from "react"
import { Zap } from "lucide-react"

export function AchievementPopup({ show, text }: any) {

    const [visible, setVisible] = useState(false)

    useEffect(() => {

        if (show) {

            setVisible(true)

            setTimeout(() => {
                setVisible(false)
            }, 3000)

        }

    }, [show])

    if (!visible) return null

    return (

        <div className="fixed bottom-6 right-6 bg-green-500 text-black px-6 py-4 rounded shadow-lg animate-bounce">

            <div className="flex items-center gap-2">

                <Zap />

                {text}

            </div>

        </div>

    )
}
