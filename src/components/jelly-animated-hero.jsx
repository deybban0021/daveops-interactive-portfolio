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
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.54),rgba(2,6,23,0.74)_22%,rgba(2,6,23,0.84)_46%,rgba(2,6,23,0.58)_68%,rgba(0,0,0,0.9))]" />

      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        src={JELLY_VIDEO_SRC}
        className="absolute bottom-[-12%] left-0 h-[88%] w-full scale-[1.12] object-cover object-bottom opacity-[0.56] [filter:brightness(0.68)_saturate(0.72)_contrast(1.16)] [mask-image:linear-gradient(to_bottom,transparent_0%,transparent_18%,rgba(0,0,0,0.18)_34%,rgba(0,0,0,0.72)_56%,rgba(0,0,0,1)_100%)]"
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.6),rgba(0,0,0,0.36)_22%,rgba(2,6,23,0.22)_44%,rgba(2,6,23,0.12)_62%,rgba(0,0,0,0.28)_78%,rgba(0,0,0,0.72))]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.72),rgba(2,6,23,0.78)_24%,rgba(2,6,23,0.42)_48%,rgba(34,211,238,0.02)_64%,rgba(56,189,248,0.08)_86%,rgba(0,0,0,0.82))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(56,189,248,0.12),transparent_30%),radial-gradient(circle_at_18%_100%,rgba(34,211,238,0.08),transparent_26%)]" />
      <div className="absolute inset-0 backdrop-blur-[1.5px]" />
      <div className="absolute inset-x-0 top-0 h-[38%] bg-[linear-gradient(180deg,rgba(0,0,0,0.82),rgba(2,6,23,0.54),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(0deg,rgba(0,0,0,0.92),transparent)]" />
    </div>
  )
}
