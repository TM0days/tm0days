import { HeroSection } from "@/components/hero-section"
import { StatsCounter } from "@/components/stats-counter"
import { LevelSystem } from "@/components/level-system"
import { BlogPreview } from "@/components/blog-preview"
import { Footer } from "@/components/footer"
import { MissionPanel } from "@/components/mission-panel"

export default function HomePage() {
  return (
    <div className="relative min-h-screen scanlines">
      <HeroSection />
      <StatsCounter />
      <LevelSystem />
      <MissionPanel />
      <BlogPreview />
      <Footer />
    </div>
  )
}
