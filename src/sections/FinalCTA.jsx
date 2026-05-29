import { useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function FinalCTA() {
  const ref = useRef(null)
  useScrollAnimation(ref)

  return (
    <section ref={ref} className="content-section final-cta panel-right" id="final-cta" data-stage="6">
      <div className="section-panel">
        <p className="eyebrow">07 / Final CTA</p>
        <h2>Ready to build a CRM system that actually works?</h2>
        <p>
          Whether you need GHL workflows, AI automations, dashboards, or backend logic,
          I can help turn messy operations into a cleaner system.
        </p>
        <div className="hero-actions">
          <a href="mailto:dave@example.com" className="button button-primary">
            Contact Dave
          </a>
          <a href="#case-studies" className="button button-secondary">
            View Portfolio Samples
          </a>
        </div>
      </div>
    </section>
  )
}

export default FinalCTA
