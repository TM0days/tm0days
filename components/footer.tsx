import { Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          <span className="font-mono text-sm font-medium text-foreground">
            {"TM0days"}
          </span>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          {"// Security Researcher | Exploit Developer | Bug Hunter"}
        </p>
        <p className="text-xs text-muted-foreground">
          {"Built with purpose. Stay curious, stay ethical."}
        </p>
      </div>
    </footer>
  )
}
