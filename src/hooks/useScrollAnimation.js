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
        { y: 28 },
        {
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
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
