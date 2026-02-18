import { supabase } from "./supabase"

export async function checkAchievements(stats: any) {

    const { data } =
        await supabase.from("achievements").select("*")

    if (!data) return null

    for (const achievement of data) {

        if (achievement.unlocked) continue

        let value = 0

        if (achievement.category === "study")
            value = stats.study_hours

        if (achievement.category === "exploit")
            value = stats.exploits_written

        if (achievement.category === "level")
            value = stats.level

        if (value >= achievement.requirement) {

            await supabase
                .from("achievements")
                .update({
                    unlocked: true,
                    unlocked_at: new Date()
                })
                .eq("id", achievement.id)

            return achievement
        }
    }

    return null
}
