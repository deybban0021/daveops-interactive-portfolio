import { useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function GHLSystems() {
  const ref = useRef(null)
  useScrollAnimation(ref)

  return (
    <section ref={ref} className="content-section panel-right" id="ghl-systems" data-stage="1">
      <div className="section-panel">
        <p className="eyebrow">02 / GHL Systems</p>
        <h2>GoHighLevel becomes the control layer for cleaner lead handling and client ops.</h2>
        <p className="lede">
          This branch of the workflow focuses on the systems I build inside GHL itself:
          funnels, forms, calendars, pipeline structure, opportunities, and the automations
          that tie them together.
        </p>
        <div className="bullet-grid two-col">
          {[
            'Pipelines and opportunities mapped to real sales stages',
            'Funnels, forms, and surveys connected to CRM records',
            'Calendars and booking flows tied to follow-up automations',
            'Email and SMS workflows triggered by lead activity',
            'Operational cleanup so teams can see what happens next',
          ].map((item) => (
            <div key={item} className="mini-card">
              <span className="mini-dot" />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GHLSystems
