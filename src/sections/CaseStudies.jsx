import { useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function CaseStudies() {
  const ref = useRef(null)
  useScrollAnimation(ref)

  return (
    <section ref={ref} className="content-section section-grid" id="case-studies">
      <div className="section-copy">
        <p className="eyebrow">04 • Case Studies</p>
        <h2>Space reserved for future proof, outcomes, and before-and-after transformations.</h2>
      </div>
      <div className="case-grid">
        {['Lead Gen Engine', 'Appointment Funnel', 'Automation Audit'].map((item) => (
          <article className="case-card" key={item}>
            <p className="case-index">Placeholder</p>
            <h3>{item}</h3>
            <p>
              This card will later hold a short result story, platform scope, and a visual
              supporting asset.
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default CaseStudies
