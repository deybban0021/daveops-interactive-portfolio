import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import Scene from './components/Scene'
import Hero from './sections/Hero'
import GHLSystems from './sections/GHLSystems'
import AutomationBackend from './sections/AutomationBackend'
import AIIntegrations from './sections/AIIntegrations'
import DashboardBuild from './sections/DashboardBuild'
import CaseStudies from './sections/CaseStudies'
import FinalCTA from './sections/FinalCTA'

const sections = [
  Hero,
  GHLSystems,
  AutomationBackend,
  AIIntegrations,
  DashboardBuild,
  CaseStudies,
  FinalCTA,
]

function App() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeStage, setActiveStage] = useState(0)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    })

    let frameId = 0

    const raf = (time) => {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }

    frameId = requestAnimationFrame(raf)

    const updateProgress = () => {
      const scrollTop = window.scrollY
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      )

      setScrollProgress(Math.min(scrollTop / maxScroll, 1))

      const sectionsInDom = Array.from(document.querySelectorAll('[data-stage]'))
      const viewportAnchor = window.innerHeight * 0.42

      let nextStage = 0

      sectionsInDom.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const stage = Number(section.getAttribute('data-stage') || 0)

        if (rect.top <= viewportAnchor) {
          nextStage = stage
        }
      })

      setActiveStage(nextStage)
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Scene scrollProgress={scrollProgress} activeStage={activeStage} />
      <div className="page-shell">
        {sections.map((SectionComponent) => (
          <SectionComponent key={SectionComponent.displayName || SectionComponent.name} />
        ))}
      </div>
    </>
  )
}

export default App
