import { supabase } from "./supabase"

export async function checkAchievements(stats: any) {

    console.log("Stats received:", stats)

    const { data: achievements, error } =
        await supabase.from("achievements").select("*")

    if (error) {
        console.log("Error loading achievements:", error)
        return null
    }

    console.log("Achievements:", achievements)

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

        console.log("Checking:", achievement.key)
        console.log("Current:", currentValue)
        console.log("Required:", requirement)

        if (currentValue >= requirement) {

            console.log("Condition passed!")

            const { data: existing, error: checkError } =
                await supabase
                    .from("user_achievements")
                    .select("id")
                    .eq("achievement_id", achievement.id)

            if (checkError) {
                console.log("Check existing error:", checkError)
            }

            console.log("Existing:", existing)

            if (!existing || existing.length === 0) {

                const { error: insertError } =
                    await supabase
                        .from("user_achievements")
                        .insert({
                            achievement_id: achievement.id
                        })

                if (insertError) {
                    console.log("Insert error:", insertError)
                } else {
                    console.log("Inserted successfully!")
                }

                return achievement
            }
        }
    }

    return null
}
