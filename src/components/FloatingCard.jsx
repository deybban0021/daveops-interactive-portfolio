import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

function FloatingCard({
  title,
  subtitle = 'Automation step',
  meta = 'Active',
  position,
  tone = 'dark',
  rotation = [0, 0, 0],
  scale = 1,
  progress = 1,
  floatPhase = 0,
  detailLevel = 'full',
}) {
  const groupRef = useRef(null)
  const palette =
    tone === 'gold'
      ? {
          card: '#3f2d0d',
          panel: '#f0d08a',
          panelMuted: '#e5ba5d',
          glow: '#ffd36b',
          text: '#16120a',
          accent: '#8f6926',
          border: '#f5d698',
          meta: '#62471a',
        }
      : {
          card: '#0f0f10',
          panel: '#18181b',
          panelMuted: '#232327',
          glow: '#a87b27',
          text: '#f7ead0',
          accent: '#cfa654',
          border: '#5a4720',
          meta: '#bea26b',
        }

  useFrame((state) => {
    if (!groupRef.current) {
      return
    }

    const bob = Math.sin(state.clock.elapsedTime * 0.9 + floatPhase) * 0.045
    groupRef.current.position.y = position[1] + bob
  })

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale * (0.72 + progress * 0.28)}
    >
      <mesh position={[0.14, -0.16, -0.12]}>
        <planeGeometry args={[1.4, 0.88]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.22 * progress} />
      </mesh>
      <mesh>
        <boxGeometry args={[1.52, 0.96, 0.16]} />
        <meshStandardMaterial
          color={palette.card}
          metalness={0.82}
          roughness={0.24}
          emissive={palette.glow}
          emissiveIntensity={0.09 * progress}
          transparent
          opacity={0.35 + progress * 0.65}
        />
      </mesh>
      <mesh position={[0, 0, 0.09]}>
        <planeGeometry args={[1.28, 0.72]} />
        <meshBasicMaterial color={palette.panel} transparent opacity={0.38 + progress * 0.62} />
      </mesh>
      <mesh position={[0, 0.39, 0.1]}>
        <boxGeometry args={[1.24, 0.06, 0.01]} />
        <meshBasicMaterial color={palette.border} transparent opacity={0.9 * progress} />
      </mesh>
      <mesh position={[-0.44, 0.12, 0.1]}>
        <boxGeometry args={[0.2, 0.2, 0.01]} />
        <meshBasicMaterial color={palette.accent} transparent opacity={progress} />
      </mesh>
      <mesh position={[0.12, 0.16, 0.1]}>
        <boxGeometry args={[0.52, 0.05, 0.01]} />
        <meshBasicMaterial
          color={tone === 'gold' ? '#2b2212' : '#e6cf9f'}
          transparent
          opacity={progress}
        />
      </mesh>
      <mesh position={[0.0, -0.22, 0.1]}>
        <boxGeometry args={[1.02, 0.18, 0.01]} />
        <meshBasicMaterial
          color={palette.panelMuted}
          transparent
          opacity={0.8 * progress}
        />
      </mesh>
      <mesh position={[-0.44, -0.22, 0.11]}>
        <boxGeometry args={[0.08, 0.08, 0.01]} />
        <meshBasicMaterial color={palette.glow} transparent opacity={progress} />
      </mesh>
      <mesh position={[0.48, 0.06, 0.1]}>
        <boxGeometry args={[0.14, 0.04, 0.01]} />
        <meshBasicMaterial color={palette.meta} transparent opacity={0.9 * progress} />
      </mesh>
      {detailLevel === 'full' && (
        <>
          <mesh position={[0.14, -0.02, 0.1]}>
            <boxGeometry args={[0.72, 0.04, 0.01]} />
            <meshBasicMaterial color={palette.meta} transparent opacity={0.75 * progress} />
          </mesh>
          <mesh position={[0.14, -0.1, 0.1]}>
            <boxGeometry args={[0.52, 0.04, 0.01]} />
            <meshBasicMaterial color={palette.meta} transparent opacity={0.55 * progress} />
          </mesh>
          <mesh position={[-0.56, 0.22, 0.1]}>
            <boxGeometry args={[0.03, 0.08, 0.01]} />
            <meshBasicMaterial color={palette.glow} transparent opacity={progress} />
          </mesh>
          <mesh position={[0.56, -0.26, 0.1]}>
            <boxGeometry args={[0.05, 0.05, 0.01]} />
            <meshBasicMaterial color={palette.glow} transparent opacity={progress} />
          </mesh>
        </>
      )}
      <Text
        position={[0.1, 0.08, 0.11]}
        fontSize={0.1}
        maxWidth={0.78}
        lineHeight={1.1}
        color={palette.text}
        anchorX="left"
        anchorY="middle"
        fillOpacity={progress}
      >
        {title}
      </Text>
      <Text
        position={[0.1, -0.02, 0.11]}
        fontSize={0.055}
        maxWidth={0.82}
        lineHeight={1.1}
        color={palette.meta}
        anchorX="left"
        anchorY="middle"
        fillOpacity={0.95 * progress}
      >
        {subtitle}
      </Text>
      <Text
        position={[0.0, -0.22, 0.11]}
        fontSize={0.05}
        maxWidth={0.76}
        lineHeight={1}
        color={tone === 'gold' ? '#2b2212' : '#f3dfb7'}
        anchorX="center"
        anchorY="middle"
        fillOpacity={progress}
      >
        {meta}
      </Text>
    </group>
  )
}

export default FloatingCard
