import JellyAnimatedHero from '@/components/jelly-animated-hero'
import { LiquidGlassButton } from '@/components/liquid-glass'

const navItems = ['Home', 'Work', 'Services', 'Stack', 'Contact']
const chips = ['GoHighLevel', 'n8n', 'Webhooks', 'AI Workflows', 'Dashboards']

export default function Hero() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#000000] text-slate-50">
      <JellyAnimatedHero />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-12 pt-5 sm:px-6 lg:px-8">
        <header className="animate-navbar mx-auto w-full max-w-6xl">
          <nav className="mx-auto flex w-full items-center justify-between rounded-full border border-cyan-300/10 bg-[rgba(2,6,23,0.46)] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_0_24px_rgba(0,0,0,0.26)] backdrop-blur-xl sm:px-6">
            <a
              href="#home"
              className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-100"
            >
              DaveOps
            </a>

            <div className="hidden items-center gap-6 md:flex">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-slate-400 transition duration-300 hover:text-slate-200"
                >
                  {item}
                </a>
              ))}
            </div>

            <a
              href="#contact"
              className="rounded-full border border-cyan-300/14 bg-black/24 px-4 py-2 text-xs font-medium text-slate-200 transition duration-300 hover:border-cyan-300/28 hover:text-white"
            >
              Let&apos;s Talk
            </a>
          </nav>
        </header>

        <div className="flex flex-1 items-center">
          <div className="mx-auto w-full max-w-6xl">
            <div className="max-w-3xl pt-16 sm:pt-20 lg:pt-12">
              <div className="animate-fade-up animation-delay-100">
                <p className="inline-flex rounded-full border border-cyan-300/14 bg-[rgba(2,6,23,0.52)] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.36em] text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_0_14px_rgba(34,211,238,0.06)]">
                  DAVEOPS PORTFOLIO
                </p>
              </div>

              <h1 className="animate-fade-up animation-delay-200 mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[0.96] tracking-[-0.04em] text-slate-50 sm:text-5xl md:text-6xl lg:text-[4.8rem]">
                I build GoHighLevel systems, AI automations, and CRM dashboards.
              </h1>

              <p className="animate-fade-up animation-delay-300 mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                I help teams automate lead flow, follow-ups, booking, reporting,
                and client operations with connected GHL, n8n, webhook, AI, and
                dashboard systems.
              </p>

              <div className="animate-fade-up animation-delay-400 mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <LiquidGlassButton href="#work" variant="primary">
                  View Work
                </LiquidGlassButton>
                <LiquidGlassButton href="#contact" variant="secondary">
                  Contact Me
                </LiquidGlassButton>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                {chips.map((chip, index) => (
                  <span
                    key={chip}
                    className="animate-chip inline-flex rounded-full border border-white/8 bg-[rgba(2,6,23,0.4)] px-4 py-2 text-sm text-slate-300 backdrop-blur-md"
                    style={{ animationDelay: `${0.55 + index * 0.08}s` }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
