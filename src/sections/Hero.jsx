import { useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function Hero() {
  const ref = useRef(null)
  useScrollAnimation(ref)

  return (
    <section ref={ref} className="content-section hero-section" id="hero">
      <div className="section-copy hero-copy">
        <p className="eyebrow">CRM Systems • Automation • Interactive Experiences</p>
        <h1>GoHighLevel systems designed to feel premium, connected, and alive.</h1>
        <p className="lede">
          This foundation pairs a cinematic 3D backdrop with clear sections for service
          storytelling, case studies, and future portfolio proof.
        </p>
        <div className="hero-actions">
          <a href="#case-studies" className="button button-primary">
            View Work
          </a>
          <a href="#final-cta" className="button button-secondary">
            Start a Build
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
