import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'

import { LiquidGlassButton } from '@/components/liquid-glass'
import JellyAnimatedHero from '@/components/jelly-animated-hero'

const navItems = ['Home', 'Work', 'Services', 'Stack', 'Contact']
const chips = ['GoHighLevel', 'n8n', 'Webhooks', 'AI Workflows', 'Dashboards']

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    const onPointerDown = (event) => {
      if (!menuRef.current || menuRef.current.contains(event.target)) {
        return
      }

      setMenuOpen(false)
    }

    if (menuOpen) {
      document.addEventListener('keydown', onKey)
      document.addEventListener('pointerdown', onPointerDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointerDown)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#000000] text-slate-50">
      <JellyAnimatedHero />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-12 pt-5 sm:px-6 lg:px-8">
        <header className="animate-navbar mx-auto w-full max-w-6xl">
          <nav className="mx-auto flex w-full items-center justify-between rounded-[2rem] border border-cyan-300/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.72),rgba(2,6,23,0.55))] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_30px_rgba(0,0,0,0.24),0_0_18px_rgba(34,211,238,0.05)] backdrop-blur-xl sm:px-6">
            <a
              href="#home"
              className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-100"
            >
              DaveOps
            </a>

            <div className="hidden items-center gap-7 md:flex">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="group relative h-5 overflow-hidden text-sm font-medium text-slate-400"
                >
                  <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full group-focus-visible:-translate-y-full">
                    {item}
                  </span>
                  <span className="absolute left-0 top-full block text-slate-100 transition-transform duration-300 ease-out group-hover:-translate-y-full group-focus-visible:-translate-y-full">
                    {item}
                  </span>
                </a>
              ))}
            </div>

            <a
              href="#contact"
              className="hidden rounded-full border border-cyan-300/14 bg-[rgba(2,6,23,0.58)] px-4 py-2 text-xs font-medium text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-300 hover:border-cyan-300/30 hover:text-white md:inline-flex"
            >
              Let&apos;s Talk
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex rounded-xl border border-white/10 bg-black/30 p-2 text-slate-200 transition duration-300 hover:text-white md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </nav>

          <div
            className={[
              'fixed inset-0 z-30 bg-black/72 backdrop-blur-md transition duration-300 md:hidden',
              menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
            ].join(' ')}
          >
            <div
              ref={menuRef}
              className={[
                'absolute inset-x-4 top-4 rounded-[2rem] border border-cyan-300/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.94),rgba(2,6,23,0.88))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_16px_40px_rgba(0,0,0,0.35)] transition duration-300',
                menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0',
              ].join(' ')}
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-100">
                  DaveOps
                </span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl border border-white/10 bg-black/28 p-2 text-slate-200 transition duration-300 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-8 flex flex-col gap-5">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-lg text-slate-300 transition duration-300 hover:text-white"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>

              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-cyan-300/14 bg-[rgba(2,6,23,0.64)] px-4 py-3 text-sm font-medium text-slate-100"
              >
                Let&apos;s Talk
              </a>
            </div>
          </div>
        </header>

        <div className="flex flex-1 items-center">
          <div className="mx-auto w-full max-w-6xl">
            <div className="max-w-3xl pt-16 sm:pt-20 lg:pt-14">
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
                    className="animate-chip inline-flex rounded-full border border-white/8 bg-[rgba(2,6,23,0.34)] px-4 py-2 text-sm text-slate-300 backdrop-blur-md"
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
