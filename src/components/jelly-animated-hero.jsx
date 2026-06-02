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
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.34),rgba(2,6,23,0.62)_24%,rgba(2,6,23,0.84)_58%,rgba(0,0,0,0.96))]" />

      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        src={JELLY_VIDEO_SRC}
        className="absolute inset-0 h-full w-full scale-[1.14] object-cover opacity-[0.34] [filter:brightness(0.5)_saturate(0.55)_contrast(1.12)]"
      />

      <div className="absolute inset-0 bg-black/58" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(34,211,238,0.06),transparent_18%,transparent_82%,rgba(56,189,248,0.05))]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.48),rgba(2,6,23,0.76)_40%,rgba(3,7,18,0.9)_65%,rgba(0,0,0,0.98))]" />
      <div className="absolute inset-0 backdrop-blur-[2px]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(0,0,0,0.68),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(0deg,rgba(0,0,0,0.88),transparent)]" />
    </div>
  )
}
