import { useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function AIAutomation() {
  const ref = useRef(null)
  useScrollAnimation(ref)

  return (
    <section ref={ref} className="content-section section-split" id="ai-automation">
      <div className="section-copy">
        <p className="eyebrow">02 • AI + Automation</p>
        <h2>Automation logic presented as a living system instead of a static diagram.</h2>
        <p>
          Placeholder text for AI assistants, CRM event triggers, and outbound sequences.
          The 3D background sets up the visual language for future, more advanced scenes.
        </p>
      </div>
      <div className="info-card">
        <p className="info-label">Foundation Notes</p>
        <p>
          Procedural nodes, connector lines, and dashboard surfaces are intentionally model-free
          so the scene stays lightweight while the product story evolves.
        </p>
      </div>
    </section>
  )
}

export default AIAutomation
