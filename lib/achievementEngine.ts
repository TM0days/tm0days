import { supabase } from "./supabase"

export async function checkAchievements(stats: any) {

    const { data: achievements } =
        await supabase.from("achievements").select("*")

    if (!achievements) return null

    for (const achievement of achievements) {

        const [type, valueStr] = achievement.key.split("_")
        const requirement = parseInt(valueStr)

        let currentValue = 0

        if (type === "study")
            currentValue = stats.study_hours

        if (type === "exploit")
            currentValue = stats.exploits_written

        if (type === "level")
            currentValue = stats.level

        if (currentValue >= requirement) {

            const { data: existing } =
                await supabase
                    .from("user_achievements")
                    .select("id")
                    .eq("achievement_id", achievement.id)

            if (!existing || existing.length === 0) {

                await supabase
                    .from("user_achievements")
                    .insert({
                        achievement_id: achievement.id
                    })

                return achievement
            }
        }
    }

    return null
}
