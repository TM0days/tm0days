import { supabase } from "./supabase"

export async function getCurrentRank(level: number) {

    const { data } =
        await supabase
            .from("ranks")
            .select("*")
            .lte("level_required", level)
            .order("level_required", { ascending: false })
            .limit(1)
            .single()

    return data
}
