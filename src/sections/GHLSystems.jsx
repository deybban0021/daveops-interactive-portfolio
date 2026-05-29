import { useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function GHLSystems() {
  const ref = useRef(null)
  useScrollAnimation(ref)

  return (
    <section ref={ref} className="content-section" id="ghl-systems">
      <div className="section-copy">
        <p className="eyebrow">01 • GHL Systems</p>
        <h2>Built for scalable pipelines, nurture flows, and cleaner operations.</h2>
        <p>
          Placeholder copy for the systems overview. This section can later explain how
          onboarding, lead routing, and internal workflows are designed inside
          GoHighLevel for speed and clarity.
        </p>
      </div>
    </section>
  )
}

export default GHLSystems
