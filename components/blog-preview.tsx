import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar } from "lucide-react"

const latestPosts = [
  {
    slug: "buffer-overflow-modern-mitigations",
    title: "Bypassing Modern Buffer Overflow Mitigations",
    excerpt:
      "A deep dive into ASLR, DEP, and stack canaries -- and how creative attackers work around them in 2026.",
    date: "2026-02-10",
    tags: ["Binary Exploitation", "Research"],
  },
  {
    slug: "api-security-common-flaws",
    title: "API Security: 5 Flaws Nobody Talks About",
    excerpt:
      "From broken object-level authorization to mass assignment, these API vulnerabilities remain dangerously common.",
    date: "2026-01-28",
    tags: ["Web Security", "API"],
  },
  {
    slug: "reverse-engineering-firmware",
    title: "Reverse Engineering IoT Firmware",
    excerpt:
      "Extracting, analyzing, and finding vulnerabilities in embedded device firmware using open-source tools.",
    date: "2026-01-15",
    tags: ["IoT", "Reverse Engineering"],
  },
]

export function BlogPreview() {
  return (
    <section className="border-t border-border py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 font-mono text-sm text-primary">
              {"// blog"}
            </p>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              Latest Research
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary sm:flex"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {latestPosts.map((post) => (
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
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="font-mono text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  {"read ->"}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
          >
            View all posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
