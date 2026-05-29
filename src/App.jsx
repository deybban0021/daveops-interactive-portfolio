import { useEffect } from 'react'
import Lenis from 'lenis'
import Scene from './components/Scene'
import Hero from './sections/Hero'
import GHLSystems from './sections/GHLSystems'
import AIAutomation from './sections/AIAutomation'
import DashboardBuild from './sections/DashboardBuild'
import CaseStudies from './sections/CaseStudies'
import FinalCTA from './sections/FinalCTA'

const sections = [
  Hero,
  GHLSystems,
  AIAutomation,
  DashboardBuild,
  CaseStudies,
  FinalCTA,
]

function App() {
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

    return () => {
      cancelAnimationFrame(frameId)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Scene />
      <div className="page-shell">
        {sections.map((SectionComponent) => (
          <SectionComponent key={SectionComponent.displayName || SectionComponent.name} />
        ))}
      </div>
    </>
  )
}

export default App
