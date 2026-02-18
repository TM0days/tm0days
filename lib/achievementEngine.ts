import { supabase } from "./supabase"

export async function checkAchievements(userId: string, stats: any) {

    const { data: achievements } =
        await supabase.from("achievements").select("*")

    if (!achievements) return null

    for (const achievement of achievements) {

        let value = 0

        if (achievement.category === "study")
            value = stats.study_hours

        if (achievement.category === "exploit")
            value = stats.exploits_written

        if (achievement.category === "level")
            value = stats.level

        if (value >= achievement.requirement) {

            // نشوف لو متسجل قبل كده
            const { data: existing } = await supabase
                .from("user_achievements")
                .select("id")
                .eq("user_id", userId)
                .eq("achievement_id", achievement.id)
                .single()

            if (!existing) {
                await supabase
                    .from("user_achievements")
                    .insert({
                        user_id: userId,
                        achievement_id: achievement.id
                    })

                return achievement
            }
        }
    }

    return null
}
