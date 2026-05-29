import { useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function Hero() {
  const ref = useRef(null)
  useScrollAnimation(ref)

  return (
    <section ref={ref} className="content-section hero-section panel-left" id="hero" data-stage="0">
      <div className="section-panel hero-panel">
        <p className="eyebrow">DaveOps Portfolio</p>
        <h1>I build GoHighLevel systems, AI automations, and CRM dashboards.</h1>
        <p className="lede">
          I help teams automate lead flow, follow-ups, booking, reporting, and client
          operations with connected GHL, n8n, webhook, AI, and dashboard systems.
        </p>
        <div className="hero-summary">
          <span>GoHighLevel</span>
          <span>n8n</span>
          <span>Webhooks</span>
          <span>AI Workflows</span>
          <span>Dashboards</span>
        </div>
        <div className="hero-actions">
          <a href="#ghl-systems" className="button button-primary">
            View Work
          </a>
          <a href="#final-cta" className="button button-secondary">
            Contact Me
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
