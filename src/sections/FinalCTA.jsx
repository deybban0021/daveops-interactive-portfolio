import { useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function FinalCTA() {
  const ref = useRef(null)
  useScrollAnimation(ref)

  return (
    <section ref={ref} className="content-section final-cta" id="final-cta">
      <div className="section-copy">
        <p className="eyebrow">05 • Final CTA</p>
        <h2>Ready to turn the foundation into a full interactive portfolio experience.</h2>
        <p>
          Placeholder close. This final area is prepared for stronger conversion messaging,
          contact methods, or a tailored discovery call CTA.
        </p>
        <a href="mailto:dave@example.com" className="button button-primary">
          Book the Build
        </a>
      </div>
    </section>
  )
}

export default FinalCTA
