import { QuadraticBezierLine } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'

function ConnectorLine({ from, to, mid, progress = 1 }) {
  const curve = useMemo(
    () =>
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(...from),
        new THREE.Vector3(...mid),
        new THREE.Vector3(...to),
      ),
    [from, mid, to],
  )

  const endPoint = useMemo(() => curve.getPoint(Math.max(0.001, progress)), [curve, progress])
  const currentMid = useMemo(() => curve.getPoint(Math.max(0.001, progress * 0.5)), [curve, progress])

  return (
    <>
      <QuadraticBezierLine
        start={from}
        end={endPoint.toArray()}
        mid={currentMid.toArray()}
        color="#f7d98e"
        lineWidth={2.4}
        transparent
        opacity={0.08 * progress}
      />
      <QuadraticBezierLine
        start={from}
        end={endPoint.toArray()}
        mid={currentMid.toArray()}
        color="#d6a647"
        lineWidth={1.15}
        transparent
        opacity={0.92 * progress}
      />
    </>
  )
}

export default ConnectorLine
