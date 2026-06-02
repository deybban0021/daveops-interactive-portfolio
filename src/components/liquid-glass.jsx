import { ArrowRight } from 'lucide-react'

import { cn } from '@/lib/utils'

function GlassFilter() {
  return (
    <svg className="pointer-events-none absolute h-0 w-0">
      <filter
        id="liquid-glass-distortion"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.004 0.012"
          numOctaves="1"
          seed="17"
          result="turbulence"
        />
        <feGaussianBlur in="turbulence" stdDeviation="2" result="softMap" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="softMap"
          scale="48"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  )
}

export function LiquidGlassButton({
  children,
  href,
  variant = 'primary',
  className = '',
}) {
  const isPrimary = variant === 'primary'

  return (
    <>
      <GlassFilter />
      <a
        href={href}
        className={cn(
          'liquid-glass group relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold tracking-[0.02em] text-slate-50 transition duration-500 ease-out',
          isPrimary
            ? 'border-cyan-300/40 bg-cyan-400/16 shadow-[0_0_40px_rgba(34,211,238,0.18)]'
            : 'border-white/16 bg-white/8 shadow-[0_0_28px_rgba(14,165,233,0.12)]',
          className,
        )}
      >
        <span className="absolute inset-0 rounded-full border border-white/12" />
        <span
          className={cn(
            'absolute inset-0 rounded-full',
            isPrimary
              ? 'bg-[linear-gradient(135deg,rgba(255,255,255,0.26),rgba(34,211,238,0.14)_45%,rgba(14,165,233,0.2))]'
              : 'bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(148,163,184,0.08)_45%,rgba(34,211,238,0.12))]',
          )}
        />
        <span className="absolute inset-[1px] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.05)_18%,rgba(2,6,23,0.28)_68%,rgba(2,6,23,0.42))] backdrop-blur-md [filter:url(#liquid-glass-distortion)]" />
        <span className="absolute inset-x-[16%] top-[1px] h-1/2 rounded-full bg-white/18 blur-md transition duration-500 group-hover:translate-y-1" />
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
          <ArrowRight className="h-4 w-4 transition duration-500 group-hover:translate-x-1" />
        </span>
      </a>
    </>
  )
}
