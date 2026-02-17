"use client"

import { useEffect, useState } from "react"

export function AnimatedCounter({ value }: { value: number }) {

    const [display, setDisplay] = useState(0)

    useEffect(() => {

        let start = display
        let end = value

        if (start === end) return

        const duration = 500
        const stepTime = 10
        const steps = duration / stepTime
        const increment = (end - start) / steps

        let current = start

        const timer = setInterval(() => {

            current += increment

            if (
                (increment > 0 && current >= end) ||
                (increment < 0 && current <= end)
            ) {
                current = end
                clearInterval(timer)
            }

            setDisplay(Math.floor(current))

        }, stepTime)

        return () => clearInterval(timer)

    }, [value])

    return <span>{display}</span>
}
