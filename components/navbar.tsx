"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Terminal, Menu, X, Shield, FileText, User, LayoutDashboard, LogIn } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"

const publicLinks = [
  { href: "/", label: "Home", icon: Terminal },
  { href: "/blog", label: "Articles", icon: FileText },
  { href: "/profile", label: "Profile", icon: User },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isAuthenticated } = useAuth()

  const navLinks = [
    ...publicLinks,
    ...(isAuthenticated
      ? [{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }]
      : [{ href: "/login", label: "Login", icon: LogIn }]),
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 group">
          <Shield className="h-6 w-6 text-primary transition-all group-hover:drop-shadow-[0_0_8px_oklch(0.75_0.18_150)]" />
          <span className="font-mono text-lg font-bold tracking-tight text-foreground">
            {"TM0days"}
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary text-glow"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-foreground md:hidden"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 pb-4 md:hidden">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            )
          })}
        </div>
      )}
    </header>
  )
}
