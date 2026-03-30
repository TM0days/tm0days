"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer"
import { Calendar, Clock } from "lucide-react"
import Link from "next/link"

export default function BlogPage() {

  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    loadPosts()
  }, [])

  async function loadPosts() {
    const { data } = await supabase
      .from("articles")
      .select("*")
      .order("date", { ascending: false })

    setPosts(data || [])
  }

  const featuredPost = posts.find(p => p.featured)
  const regularPosts = posts.filter(p => !p.featured)

  const allTags = Array.from(
    new Set(posts.flatMap(p => p.tags || []))
  )

  return (
    <div className="relative min-h-screen">

      <div className="mx-auto max-w-6xl px-6 py-16">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-green-400">
            Articles
          </h1>
        </div>

        {/* Tags */}
        <div className="mb-10 flex flex-wrap gap-2">
          {allTags.map(tag => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        {/* Featured */}
        {featuredPost && (
          <div className="mb-10 border p-6 rounded">
            <h2 className="text-xl font-bold text-green-400">
              {featuredPost.title}
            </h2>
            <p>{featuredPost.excerpt}</p>
          </div>
        )}

        {/* Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {regularPosts.map(post => (

            <div
              onClick={() => {
                console.log("CLICKED", post.slug)
                window.location.href = `/blog/${post.slug}`
              }}
              className="border p-4 rounded cursor-pointer"
            > </div>

          ))}

        </div>

      </div>

      <Footer />

    </div>
  )
}