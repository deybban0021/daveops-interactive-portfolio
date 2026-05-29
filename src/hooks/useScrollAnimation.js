import { useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export function useScrollAnimation(ref) {
  useGSAP(
    () => {
      if (!ref.current) {
        return
      }

      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, y: 48 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: undefined,
        },
      )
    },
    { scope: ref },
  )

  useEffect(() => {
    if (!ref.current) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current.classList.add('is-visible')
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [ref])
}
