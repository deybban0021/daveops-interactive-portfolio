import JellyAnimatedHero from '@/components/jelly-animated-hero'
import { LiquidGlassButton } from '@/components/liquid-glass'

const navItems = ['Home', 'Work', 'Services', 'Stack', 'Contact']
const chips = ['GoHighLevel', 'n8n', 'Webhooks', 'AI Workflows', 'Dashboards']

export default function Hero() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#020617] text-slate-50">
      <JellyAnimatedHero />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-12 pt-5 sm:px-6 lg:px-8">
        <header className="animate-navbar mx-auto w-full max-w-6xl">
          <nav className="mx-auto flex w-full items-center justify-between rounded-full border border-white/10 bg-white/6 px-4 py-3 backdrop-blur-xl sm:px-6">
            <a
              href="#home"
              className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300"
            >
              DaveOps
            </a>

            <div className="hidden items-center gap-6 md:flex">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-slate-300 transition duration-300 hover:text-cyan-200"
                >
                  {item}
                </a>
              ))}
            </div>

            <a
              href="#contact"
              className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium text-cyan-100 transition duration-300 hover:border-cyan-300/40 hover:bg-cyan-400/16"
            >
              Let&apos;s Talk
            </a>
          </nav>
        </header>

        <div className="flex flex-1 items-center">
          <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.7fr)] lg:items-center">
            <div className="max-w-3xl pt-16 sm:pt-20 lg:pt-12">
              <div className="animate-fade-up animation-delay-100">
                <p className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/8 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.36em] text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.14)]">
                  DAVEOPS PORTFOLIO
                </p>
              </div>

              <h1 className="animate-fade-up animation-delay-200 mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[0.96] tracking-[-0.04em] text-slate-50 sm:text-5xl md:text-6xl lg:text-[4.8rem]">
                I build GoHighLevel systems, AI automations, and CRM dashboards.
              </h1>

              <p className="animate-fade-up animation-delay-300 mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
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
                    className="animate-chip inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-slate-200 backdrop-blur-md"
                    style={{ animationDelay: `${0.55 + index * 0.08}s` }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative hidden min-h-[28rem] lg:block">
              <div className="absolute inset-x-0 top-1/2 h-64 -translate-y-1/2 rounded-full bg-cyan-400/14 blur-3xl" />
              <div className="absolute right-[10%] top-[20%] h-40 w-40 rounded-full border border-cyan-300/20 bg-white/5 backdrop-blur-2xl animate-float-slow" />
              <div className="absolute bottom-[20%] left-[8%] h-24 w-24 rounded-full border border-white/10 bg-sky-300/8 backdrop-blur-xl animate-float-slower" />
              <div className="absolute left-[24%] top-[16%] h-px w-36 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
              <div className="absolute right-[18%] top-[56%] h-px w-28 bg-gradient-to-r from-transparent via-sky-300/55 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
