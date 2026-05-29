import { useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function AIIntegrations() {
  const ref = useRef(null)
  useScrollAnimation(ref)

  return (
    <section ref={ref} className="content-section panel-left" id="ai-integrations" data-stage="3">
      <div className="section-panel">
        <p className="eyebrow">04 / AI Integrations</p>
        <h2>AI layers can plug into the workflow without turning the system into a black box.</h2>
        <p className="lede">
          I connect OpenAI-powered experiences, Google Chat AI workflows, and assistant logic
          to CRM operations so teams can move faster without losing control of the pipeline.
        </p>
        <div className="bullet-grid two-col">
          {[
            'AI chat windows tied to CRM actions',
            'OpenAI API projects for workflow-driven use cases',
            'Google Chat AI connected to team operations',
            'Assistant logic for replies, qualification, and support',
            'SMS / Email follow-ups activated after AI decisions',
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

export default AIIntegrations
