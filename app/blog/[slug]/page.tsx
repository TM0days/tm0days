"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useParams } from "next/navigation"
import { Calendar, Clock } from "lucide-react"

export default function ArticlePage() {

    const params = useParams()
    const slug = params.slug as string

    const [article, setArticle] = useState<any>(null)

    useEffect(() => {
        loadArticle()
    }, [slug])

    async function loadArticle() {

        const { data } = await supabase
            .from("articles")
            .select("*")
            .eq("slug", slug)
            .single()

        setArticle(data)
    }

    if (!article) return <div className="p-10">Loading...</div>

    return (
        <div className="min-h-screen px-6 py-16">

            <div className="max-w-3xl mx-auto">

                <h1 className="text-3xl font-bold text-green-400 mb-4">
                    {article.title}
                </h1>

                <div className="flex gap-4 text-sm text-gray-400 mb-6">

                    <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(article.date).toDateString()}
                    </span>

                    <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {article.read_time}
                    </span>

                </div>

                <div className="text-gray-300 leading-relaxed">
                    {article.content}
                </div>

            </div>

        </div>
    )
}