import { useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'

const JELLY_VIDEO_SRC = 'https://ease-one.vercel.app/bg/something.mp4'

export default function JellyAnimatedHero({ className = '' }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current

    if (!video) {
      return
    }

    const syncPlaybackRate = () => {
      video.playbackRate = 0.75
    }

    syncPlaybackRate()
    video.addEventListener('loadedmetadata', syncPlaybackRate)

    return () => {
      video.removeEventListener('loadedmetadata', syncPlaybackRate)
    }
  }, [])

  return (
    <div
      className={cn(
        'absolute inset-0 overflow-hidden rounded-[inherit]',
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_36%),linear-gradient(180deg,rgba(2,6,23,0.48),rgba(0,0,0,0.82))]" />
      <div className="absolute inset-x-[-8%] top-[-12%] h-[34rem] rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute bottom-[-18%] right-[-10%] h-[28rem] w-[28rem] rounded-full bg-sky-500/12 blur-3xl" />

      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        src={JELLY_VIDEO_SRC}
        className="absolute inset-0 h-full w-full scale-[1.18] object-cover opacity-45 mix-blend-screen"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.14),transparent_28%),radial-gradient(circle_at_75%_18%,rgba(34,211,238,0.1),transparent_22%),radial-gradient(circle_at_50%_100%,rgba(2,132,199,0.16),transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.4),rgba(2,6,23,0.72)_45%,rgba(0,0,0,0.9))]" />
      <div className="absolute inset-0 backdrop-blur-[1px]" />
    </div>
  )
}
