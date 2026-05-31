import { Line, RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'

function HeroNodeLandscape() {
  const rootRef = useRef(null)
  const haloRef = useRef(null)
  const frameRef = useRef(null)
  const accentRef = useRef(null)
  const arcs = useMemo(
    () => [
      [
        [-1.8, -0.25, 0.1],
        [-1.05, 0.25, 0.25],
        [-0.25, 0.1, 0.16],
      ],
      [
        [-0.1, 0.04, 0.12],
        [0.78, -0.22, 0.2],
        [1.58, -0.02, 0.14],
      ],
      [
        [-0.45, -0.6, 0.05],
        [0.2, -0.92, 0.1],
        [1.15, -0.76, 0.06],
      ],
    ],
    [],
  )

  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (rootRef.current) {
      rootRef.current.position.y = -0.08 + Math.sin(t * 0.22) * 0.05
      rootRef.current.rotation.z = Math.sin(t * 0.1) * 0.012
    }

    if (haloRef.current) {
      haloRef.current.scale.x = 1 + Math.sin(t * 0.32) * 0.04
      haloRef.current.scale.y = 1 + Math.cos(t * 0.24) * 0.05
    }

    if (frameRef.current) {
      frameRef.current.rotation.z = -0.08 + Math.sin(t * 0.16) * 0.01
    }

    if (accentRef.current) {
      accentRef.current.position.x = 1.44 + Math.sin(t * 0.3) * 0.06
      accentRef.current.position.y = -0.12 + Math.cos(t * 0.34) * 0.04
    }
  })

  return (
    <group ref={rootRef} position={[0.95, -0.08, -0.5]}>
      {/* Future 3D/Spline node sculpture goes here */}
      <mesh ref={haloRef} position={[0.42, -0.08, -1.4]}>
        <circleGeometry args={[3.9, 64]} />
        <meshBasicMaterial color="#163554" transparent opacity={0.18} />
      </mesh>

      <mesh position={[0.7, -0.3, -1.2]} rotation={[0, 0, -0.2]}>
        <planeGeometry args={[7.4, 4.2]} />
        <meshBasicMaterial color="#08111d" transparent opacity={0.34} />
      </mesh>

      <group ref={frameRef} position={[0.86, -0.16, -0.34]}>
        <RoundedBox args={[5.6, 2.55, 0.05]} radius={0.2} smoothness={6}>
          <meshBasicMaterial color="#08121d" transparent opacity={0.18} />
        </RoundedBox>
        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[5.18, 2.16]} />
          <meshBasicMaterial color="#0d1d2d" transparent opacity={0.2} />
        </mesh>
      </group>

      <group position={[-0.38, -0.05, 0.16]}>
        <RoundedBox args={[1.48, 0.84, 0.12]} radius={0.18} smoothness={8}>
          <meshStandardMaterial
            color="#0a1522"
            transparent
            opacity={0.36}
            roughness={0.16}
            metalness={0.24}
            emissive="#2bb6ff"
            emissiveIntensity={0.02}
          />
        </RoundedBox>
        <mesh position={[0, 0, 0.075]}>
          <planeGeometry args={[1.22, 0.6]} />
          <meshBasicMaterial color="#102235" transparent opacity={0.34} />
        </mesh>
      </group>

      <group position={[1.74, -0.1, 0.24]}>
        <RoundedBox args={[1.92, 1.12, 0.14]} radius={0.2} smoothness={8}>
          <meshStandardMaterial
            color="#091421"
            transparent
            opacity={0.46}
            roughness={0.16}
            metalness={0.28}
            emissive="#5ad2ff"
            emissiveIntensity={0.028}
          />
        </RoundedBox>
        <mesh position={[0, 0, 0.086]}>
          <planeGeometry args={[1.58, 0.8]} />
          <meshBasicMaterial color="#12263b" transparent opacity={0.34} />
        </mesh>
        <mesh position={[-0.36, 0.2, 0.094]}>
          <boxGeometry args={[0.14, 0.14, 0.01]} />
          <meshBasicMaterial color="#86e9ff" transparent opacity={0.5} />
        </mesh>
        <mesh position={[0.15, 0.1, 0.094]}>
          <boxGeometry args={[0.62, 0.035, 0.01]} />
          <meshBasicMaterial color="#dff6ff" transparent opacity={0.3} />
        </mesh>
        <mesh position={[0.22, -0.07, 0.094]}>
          <boxGeometry args={[0.76, 0.02, 0.01]} />
          <meshBasicMaterial color="#5d92b7" transparent opacity={0.22} />
        </mesh>
      </group>

      <mesh ref={accentRef} position={[1.44, -0.12, 0.46]}>
        <sphereGeometry args={[0.16, 22, 22]} />
        <meshBasicMaterial color="#6ae0ff" transparent opacity={0.42} />
      </mesh>

      <mesh position={[-0.92, -0.66, -0.08]} rotation={[0, 0, -0.42]}>
        <planeGeometry args={[2.8, 0.72]} />
        <meshBasicMaterial color="#09131e" transparent opacity={0.26} />
      </mesh>

      <mesh position={[1.42, -0.98, -0.2]} rotation={[0, 0, 0.16]}>
        <planeGeometry args={[3.4, 0.9]} />
        <meshBasicMaterial color="#09131e" transparent opacity={0.24} />
      </mesh>

      {arcs.map((points, index) => (
        <group key={index}>
          <Line points={points} color="#8ce8ff" lineWidth={1.25} transparent opacity={0.08} />
          <Line points={points} color="#3dc5ff" lineWidth={0.8} transparent opacity={0.4} />
        </group>
      ))}
    </group>
  )
}

export default HeroNodeLandscape
