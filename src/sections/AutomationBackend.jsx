import { useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function AutomationBackend() {
  const ref = useRef(null)
  useScrollAnimation(ref)

  return (
    <section ref={ref} className="content-section panel-right" id="automation-backend" data-stage="2">
      <div className="section-panel">
        <p className="eyebrow">03 / Automation Backend</p>
        <h2>Backend logic connects GHL activity to the systems that keep operations moving.</h2>
        <p className="lede">
          I build automation backbones that sit behind the CRM so lead intake, follow-up
          sequences, field updates, and branch logic happen without messy manual work.
        </p>
        <div className="bullet-grid">
          {[
            'n8n workflows and backend orchestration',
            'Zapier handoffs where lightweight routing makes sense',
            'Webhook parsing and conditional branch logic',
            'Custom field updates synced back into GHL',
            'Follow-up automations connected to CRM state changes',
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

export default AutomationBackend
