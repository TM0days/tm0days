import type { Metadata } from "next"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Footer } from "@/components/footer"
import {
  Shield,
  MapPin,
  Calendar,
  Github,
  Twitter,
  Globe,
  Terminal,
  Bug,
  Lock,
  Wifi,
  Code,
  Server,
  Star,
  TrendingUp,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Profile | TM0days",
  description: "Security researcher profile - skills, tools, and experience.",
}

const skills = [
  { name: "Binary Exploitation", level: 92, icon: Terminal },
  { name: "Web Application Security", level: 88, icon: Globe },
  { name: "Reverse Engineering", level: 85, icon: Code },
  { name: "Network Penetration", level: 80, icon: Wifi },
  { name: "Malware Analysis", level: 78, icon: Bug },
  { name: "Cloud Security", level: 72, icon: Server },
]

const tools = [
  "Burp Suite",
  "IDA Pro",
  "Ghidra",
  "Metasploit",
  "Wireshark",
  "Nmap",
  "Radare2",
  "GDB",
  "Frida",
  "Hashcat",
  "John the Ripper",
  "SQLMap",
]

const certifications = [
  { name: "OSCP", issuer: "Offensive Security", year: "2024" },
  { name: "CRTP", issuer: "Pentester Academy", year: "2023" },
  { name: "eWPTX", issuer: "eLearnSecurity", year: "2023" },
]

export default function ProfilePage() {
  return (
    <div className="relative min-h-screen scanlines">
      <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8">
          <div className="relative shrink-0">
            <div className="absolute -inset-1 rounded-full bg-primary/20 blur-md" />
            <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-primary/40">
              <Image
                src="/images/profile.jpg"
                alt="TM0days profile picture"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h1 className="mb-1 font-mono text-3xl font-bold text-foreground md:text-4xl">
              <span className="text-glow text-primary">{"TM0days"}</span>
            </h1>
            <p className="mb-3 text-lg font-medium text-foreground">
              Security Researcher
            </p>
            <div className="mb-4 flex flex-wrap justify-center gap-3 text-sm text-muted-foreground md:justify-start">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                Undisclosed
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                Active since 2020
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-primary" />
                Level 42
              </span>
            </div>
            <div className="flex justify-center gap-3 md:justify-start">
              <a
                href="#"
                className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                aria-label="GitHub profile"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                aria-label="Twitter profile"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                aria-label="Personal website"
              >
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-12 rounded-lg border border-border bg-card p-6">
          <h2 className="mb-3 flex items-center gap-2 font-mono text-sm font-medium text-primary">
            <Terminal className="h-4 w-4" />
            {"about.md"}
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              Independent security researcher focused on vulnerability discovery and
              exploit development. Passionate about understanding how systems break --
              and how to build them stronger.
            </p>
            <p>
              Contributed to multiple CVEs, participated in bug bounty programs
              across major platforms, and published research on binary exploitation
              techniques. My work spans web application security, embedded systems,
              and cloud infrastructure.
            </p>
            <p>
              When not hunting bugs, I document my research and share knowledge with
              the security community through blog posts and open-source tools.
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-12">
          <h2 className="mb-6 flex items-center gap-2 font-mono text-lg font-bold text-foreground">
            <Lock className="h-5 w-5 text-primary" />
            Skills
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {skills.map((skill) => {
              const Icon = skill.icon
              return (
                <div
                  key={skill.name}
                  className="rounded-lg border border-border bg-card p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Icon className="h-4 w-4 text-primary" />
                      {skill.name}
                    </span>
                    <span className="font-mono text-xs text-primary">
                      {skill.level}%
                    </span>
                  </div>
                  <Progress value={skill.level} className="h-2 bg-secondary" />
                </div>
              )
            })}
          </div>
        </div>

        {/* Tools */}
        <div className="mb-12">
          <h2 className="mb-6 flex items-center gap-2 font-mono text-lg font-bold text-foreground">
            <Code className="h-5 w-5 text-primary" />
            Toolkit
          </h2>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <Badge
                key={tool}
                variant="outline"
                className="border-border bg-secondary/50 px-3 py-1 font-mono text-xs text-foreground transition-colors hover:border-primary/30 hover:text-primary"
              >
                {tool}
              </Badge>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-12">
          <h2 className="mb-6 flex items-center gap-2 font-mono text-lg font-bold text-foreground">
            <Star className="h-5 w-5 text-primary" />
            Certifications
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="card-glow rounded-lg border border-border bg-card p-5 text-center"
              >
                <p className="mb-1 font-mono text-lg font-bold text-primary">
                  {cert.name}
                </p>
                <p className="text-sm text-foreground">{cert.issuer}</p>
                <p className="mt-1 text-xs text-muted-foreground">{cert.year}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Activity summary */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 flex items-center gap-2 font-mono text-lg font-bold text-foreground">
            <TrendingUp className="h-5 w-5 text-primary" />
            Activity
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "CVEs Found", value: "12" },
              { label: "Bug Bounties", value: "38" },
              { label: "Tools Built", value: "7" },
              { label: "Talks Given", value: "5" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="font-mono text-2xl font-bold text-foreground">
                  {item.value}
                </p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
