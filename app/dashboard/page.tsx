"use client"
export const dynamic = "force-dynamic"

import { useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function Dashboard() {

  useEffect(() => {
    async function test() {

      const { data, error } = await supabase
        .from("stats")
        .select("*")

      console.log("SUPABASE DATA:", data)
      console.log("SUPABASE ERROR:", error)
    }

    test()
  }, [])

  return <div>Dashboard test</div>
}