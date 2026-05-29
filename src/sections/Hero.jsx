import { useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function Hero() {
  const ref = useRef(null)
  useScrollAnimation(ref)

  return (
    <section ref={ref} className="content-section hero-section panel-left" id="hero" data-stage="0">
      <div className="section-panel hero-panel">
        <p className="eyebrow">01 / Workflow Journey</p>
        <h1>GoHighLevel Systems, AI Automations, and Custom CRM Dashboards</h1>
        <p className="lede">
          I build CRM systems that automate lead flow, follow-ups, booking, reporting,
          and client operations.
        </p>
        <div className="hero-summary">
          <span>Webhook</span>
          <span>Lead Capture</span>
          <span>Filter</span>
          <span>GHL CRM</span>
          <span>DaveOps Automation Hub</span>
        </div>
        <div className="hero-actions">
          <a href="#ghl-systems" className="button button-primary">
            View Workflow
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
