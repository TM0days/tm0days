import { supabase } from "@/lib/supabase"
import { notFound } from "next/navigation"
import { Calendar, Clock } from "lucide-react"

export default async function ArticlePage({
    params,
}: {
    params: { slug: string }
}) {

    const { data: article } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", params.slug)
        .single()

    if (!article) return notFound()

    return (
        <div className="min-h-screen px-6 py-16">

            <div className="max-w-3xl mx-auto">

                {/* Title */}
                <h1 className="text-3xl font-bold text-green-400 mb-4">
                    {article.title}
                </h1>

                {/* Meta */}
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

                {/* Tags */}
                <div className="flex gap-2 mb-6">
                    {article.tags?.map((tag: string) => (
                        <span
                            key={tag}
                            className="text-xs border border-green-500 px-2 py-1 rounded text-green-400"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Content */}
                <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
                    {article.content}
                </div>

            </div>

        </div>
    )
}