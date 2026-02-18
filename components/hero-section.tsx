"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Shield, ArrowRight } from "lucide-react"
import { useRank } from "@/lib/useRank"

export function HeroSection() {
  const rank = useRank()
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.75 0.18 150) 1px, transparent 1px), linear-gradient(90deg, oklch(0.75 0.18 150) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        {/* Profile picture */}
        <div className="relative mb-8">
          <div className="absolute -inset-1 rounded-full bg-primary/20 blur-md" />
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-primary/40 md:h-40 md:w-40">
            <Image
              src="/images/profile.jpg"
              alt="TM0days profile picture"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-1 -right-1 rounded-full border-2 border-background bg-primary p-1.5">
            <Shield className="h-4 w-4 text-primary-foreground" />
          </div>
        </div>

        {/* Username & title */}
        <Badge variant="outline" className="mb-4 border-primary/30 font-mono text-primary">
          {"// active"}
        </Badge>
        <h1 className="mb-3 font-mono text-4xl font-bold tracking-tight text-foreground md:text-6xl">
          <span className="text-glow text-primary">{"TM0days"}</span>
        </h1>
        {rank && (

          <div className="mt-2 text-green-400 font-mono">

            {rank.badge} {rank.name}

          </div>

        )}
        <p className="mb-2 text-lg font-medium text-foreground md:text-xl">
          Android Security Researcher
        </p>
        <p className="mb-8 max-w-lg text-balance text-muted-foreground">
          Exploring the boundaries of digital security. Vulnerability research,
          exploit development, offensive security, and Bug Hunter🪲.
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_20px_oklch(0.75_0.18_150/0.3)]"
          >
            View Profile
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Read Blog
          </Link>
        </div>
      </div>
    </section>
  )
}
