export function calculateXP(stats: any) {
    return (
        stats.study_hours * 10 +
        stats.research_hours * 15 +
        stats.exploits_written * 120 +
        stats.cves_found * 1000
    )
}

export function calculateLevel(xp: number) {
    return Math.floor(xp / 1000) + 1
}
