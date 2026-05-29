import { useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function DashboardBuild() {
  const ref = useRef(null)
  useScrollAnimation(ref)

  return (
    <section ref={ref} className="content-section panel-right" id="dashboard-build" data-stage="4">
      <div className="section-panel">
        <p className="eyebrow">05 / Dashboards and Reporting</p>
        <h2>Reporting is where the workflow becomes visible, useful, and easy to trust.</h2>
        <p className="lede">
          I build dashboards that surface lead movement, monthly performance, and operational
          reporting through custom frontend layers backed by GHL and automation systems.
        </p>
        <div className="bullet-grid">
          {[
            'Custom frontend dashboards with cleaner UX than stock CRM views',
            'n8n and webhook-backed reporting pipelines',
            'Lead tracking tied directly to GHL activity',
            'Monthly stats and client-facing performance snapshots',
            'Pipeline updates and reporting views for operations teams',
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

export default DashboardBuild
