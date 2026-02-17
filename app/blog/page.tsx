import type { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer"
import { Calendar, Clock, ArrowRight, Search } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog | TM0days",
  description: "Security research articles, vulnerability writeups, and exploit development guides.",
}

const posts = [
  {
    slug: "buffer-overflow-modern-mitigations",
    title: "Bypassing Modern Buffer Overflow Mitigations",
    excerpt:
      "A deep dive into ASLR, DEP, and stack canaries -- and how creative attackers work around them in 2026. We explore ROP chains, ret2libc, and novel bypass techniques.",
    date: "2026-02-10",
    readTime: "12 min",
    tags: ["Binary Exploitation", "Research"],
    featured: true,
  },
  {
    slug: "api-security-common-flaws",
    title: "API Security: 5 Flaws Nobody Talks About",
    excerpt:
      "From broken object-level authorization to mass assignment, these API vulnerabilities remain dangerously common across production environments.",
    date: "2026-01-28",
    readTime: "8 min",
    tags: ["Web Security", "API"],
    featured: false,
  },
  {
    slug: "reverse-engineering-firmware",
    title: "Reverse Engineering IoT Firmware",
    excerpt:
      "Extracting, analyzing, and finding vulnerabilities in embedded device firmware using open-source tools like Binwalk, Ghidra, and QEMU.",
    date: "2026-01-15",
    readTime: "15 min",
    tags: ["IoT", "Reverse Engineering"],
    featured: false,
  },
  {
    slug: "cloud-misconfigurations-aws",
    title: "AWS Misconfigurations That Lead to Full Compromise",
    excerpt:
      "How misconfigured S3 buckets, overly permissive IAM roles, and exposed metadata endpoints can chain into complete cloud account takeover.",
    date: "2025-12-20",
    readTime: "10 min",
    tags: ["Cloud Security", "AWS"],
    featured: false,
  },
  {
    slug: "fuzzing-with-afl",
    title: "Coverage-Guided Fuzzing with AFL++",
    excerpt:
      "A practical guide to setting up AFL++ for binary fuzzing, writing custom harnesses, and triaging crashes into exploitable vulnerabilities.",
    date: "2025-12-05",
    readTime: "14 min",
    tags: ["Fuzzing", "Tools"],
    featured: false,
  },
  {
    slug: "privilege-escalation-linux",
    title: "Linux Privilege Escalation: A Methodical Approach",
    excerpt:
      "Systematic enumeration and exploitation techniques for escalating privileges on Linux systems, from SUID binaries to kernel exploits.",
    date: "2025-11-18",
    readTime: "11 min",
    tags: ["Linux", "Privilege Escalation"],
    featured: false,
  },
]

const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)))

export default function BlogPage() {
  const featuredPost = posts.find((p) => p.featured)
  const regularPosts = posts.filter((p) => !p.featured)

  return (
    <div className="relative min-h-screen scanlines">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        {/* Header */}
        <div className="mb-12">
          <p className="mb-2 font-mono text-sm text-primary">
            {"// research & writeups"}
          </p>
          <h1 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
            Articles
          </h1>
          <p className="max-w-xl text-muted-foreground">
            Security research, vulnerability writeups, and technical deep-dives
            into offensive and defensive security topics.
          </p>
        </div>

        {/* Tags filter */}
        <div className="mb-10 flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className="cursor-pointer border-primary/40 bg-primary/10 px-3 py-1 font-mono text-xs text-primary"
          >
            All
          </Badge>
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="cursor-pointer border-border px-3 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Featured post */}
        {featuredPost && (
          <div className="mb-10">
            <article className="card-glow group relative overflow-hidden rounded-lg border border-primary/20 bg-card p-6 md:p-8">
              <div className="absolute right-4 top-4">
                <Badge className="bg-primary/10 font-mono text-xs text-primary border-primary/20">
                  Featured
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {featuredPost.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-primary/20 text-xs text-primary"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <h2 className="mb-3 text-xl font-bold text-foreground transition-colors group-hover:text-primary md:text-2xl">
                {featuredPost.title}
              </h2>
              <p className="mb-4 max-w-2xl leading-relaxed text-muted-foreground">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date(featuredPost.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {featuredPost.readTime}
                </span>
                <span className="ml-auto flex items-center gap-1 font-mono text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  {"read article ->"}
                </span>
              </div>
            </article>
          </div>
        )}

        {/* Post grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {regularPosts.map((post) => (
            <article
              key={post.slug}
              className="card-glow group flex flex-col rounded-lg border border-border bg-card p-6 transition-all"
            >
              <div className="mb-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-primary/20 text-xs text-primary"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                {post.title}
              </h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </span>
                <span className="ml-auto font-mono text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  {"read ->"}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
