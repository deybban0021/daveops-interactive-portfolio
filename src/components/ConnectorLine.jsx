import { Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'

function ConnectorLine({ from, to, mid, progress = 1, opacityMultiplier = 1 }) {
  const curve = useMemo(
    () =>
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(...from),
        new THREE.Vector3(...mid),
        new THREE.Vector3(...to),
      ),
    [from, mid, to],
  )

  const visiblePoints = useMemo(() => {
    const safeProgress = Math.max(0.001, progress)
    const segments = 36
    const basePoints = curve.getPoints(segments).map((point) => point.toArray())
    const activeCount = Math.max(2, Math.ceil(segments * safeProgress) + 1)
    const partial = basePoints.slice(0, activeCount)
    partial[partial.length - 1] = curve.getPoint(safeProgress).toArray()
    return partial
  }, [curve, progress])

  return (
    <>
      <Line
        points={visiblePoints}
        color="#7fe6ff"
        lineWidth={2.2}
        transparent
        opacity={0.08 * progress * opacityMultiplier}
      />
      <Line
        points={visiblePoints}
        color="#39bfff"
        lineWidth={1.04}
        transparent
        opacity={0.52 * progress * opacityMultiplier}
      />
    </>
  )
}

export default ConnectorLine
