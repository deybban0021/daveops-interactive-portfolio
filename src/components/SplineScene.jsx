import { lazy, Suspense, useState } from 'react'
import { motion } from 'framer-motion'

const Spline = lazy(() => import('@splinetool/react-spline'))

function SplineFallback() {
  return (
    <motion.div
      className="hero-artwork-loading"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="hero-artwork-loading__core" />
      <div className="hero-artwork-loading__bar hero-artwork-loading__bar--wide" />
      <div className="hero-artwork-loading__bar" />
      <div className="hero-artwork-loading__pulse" />
    </motion.div>
  )
}

function SplineScene({
  scene = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode',
}) {
  const [isReady, setIsReady] = useState(false)

  return (
    <div className="hero-artwork-shell">
      <div className="hero-artwork-glow hero-artwork-glow--left" />
      <div className="hero-artwork-glow hero-artwork-glow--right" />
      <motion.div
        className="hero-artwork-frame"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className={`hero-artwork-surface${isReady ? ' is-ready' : ''}`}>
          <Suspense fallback={<SplineFallback />}>
            <Spline
              scene={scene}
              onLoad={() => setIsReady(true)}
              className="hero-artwork-canvas"
            />
          </Suspense>
        </div>
      </motion.div>
    </div>
  )
}

export default SplineScene
