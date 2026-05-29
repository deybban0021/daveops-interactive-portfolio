import { useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function DashboardBuild() {
  const ref = useRef(null)
  useScrollAnimation(ref)

  return (
    <section ref={ref} className="content-section" id="dashboard-build">
      <div className="section-copy">
        <p className="eyebrow">03 • Dashboard Build</p>
        <h2>Custom dashboards can become the centerpiece for reporting and decision-making.</h2>
        <p>
          Placeholder copy for KPI panels, conversion metrics, and the dashboard experience.
          This section is ready for screenshots, animated data reveals, or embedded UI previews.
        </p>
      </div>
    </section>
  )
}

export default DashboardBuild
