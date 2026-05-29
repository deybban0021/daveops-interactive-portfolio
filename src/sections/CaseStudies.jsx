import { useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function CaseStudies() {
  const ref = useRef(null)
  useScrollAnimation(ref)

  return (
    <section ref={ref} className="content-section panel-left section-grid" id="case-studies" data-stage="5">
      <div className="section-panel">
        <p className="eyebrow">06 / Case Studies</p>
        <h2>Each larger node in the workflow can represent a real system already built.</h2>
        <p className="lede">
          The workflow becomes more specific here: actual implementations, the stack behind
          them, and the purpose each system was designed to solve.
        </p>
      </div>
      <div className="case-grid">
        {[
          {
            title: 'Property Strats',
            tools: 'GHL, n8n, dashboards',
            body: 'GoHighLevel workflows, Q&A landing page, forms, lead handling, dashboard reporting, and n8n backend logic.',
          },
          {
            title: 'The Legacy Link',
            tools: 'Funnels, reminders, payments',
            body: 'Webinar funnels, email/SMS reminders, subscription and payment flow pages, calendar reminders, and event communications.',
          },
          {
            title: 'Kimble Wealth A2P',
            tools: 'Compliance, SMS, pages',
            body: 'A2P opt-in pages, terms/privacy pages, SMS consent language, compliance structure, and campaign support.',
          },
          {
            title: 'Custom GHL Dashboard',
            tools: 'Frontend, AI, n8n',
            body: 'AI-assisted frontend with n8n backend logic for tracking GHL leads and monthly performance stats.',
          },
        ].map((item) => (
          <article className="case-card" key={item.title}>
            <p className="case-index">{item.tools}</p>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default CaseStudies
