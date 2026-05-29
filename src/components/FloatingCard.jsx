import { RoundedBox, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

function FloatingCard({
  title,
  subtitle = 'Automation step',
  meta = 'Active',
  position,
  tone = 'default',
  rotation = [0, 0, 0],
  scale = 1,
  progress = 1,
  floatPhase = 0,
  detailLevel = 'full',
  emphasis = 1,
}) {
  const groupRef = useRef(null)
  const palette =
    tone === 'accent'
      ? {
          shell: '#0b1522',
          border: '#4cb7ff',
          panel: '#0f2034',
          panelMuted: '#0a1626',
          panelSoft: '#13283f',
          glow: '#44d1ff',
          accent: '#54c7ff',
          text: '#f6fbff',
          meta: '#a5d9f7',
          strip: '#112840',
        }
      : {
          shell: '#0c131d',
          border: '#3a8fc2',
          panel: '#111c2b',
          panelMuted: '#0b141f',
          panelSoft: '#142031',
          glow: '#39c8ff',
          accent: '#3d8dc1',
          text: '#edf7ff',
          meta: '#92c5e6',
          strip: '#0f2134',
        }

  useFrame((state) => {
    if (!groupRef.current) {
      return
    }

    const bob = Math.sin(state.clock.elapsedTime * 0.82 + floatPhase) * 0.035
    groupRef.current.position.y = position[1] + bob
  })

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale * (0.76 + progress * 0.24)}
    >
      <mesh position={[0.12, -0.08, -0.05]}>
        <planeGeometry args={[1.34, 0.78]} />
        <meshBasicMaterial color="#01060c" transparent opacity={0.08 * progress * emphasis} />
      </mesh>
      <RoundedBox args={[1.36, 0.82, 0.006]} radius={0.12} smoothness={8}>
        <meshStandardMaterial
          color={palette.shell}
          metalness={0.16}
          roughness={0.24}
          emissive={palette.glow}
          emissiveIntensity={0.01 * progress * emphasis}
          transparent
          opacity={(0.34 + progress * 0.28) * emphasis}
        />
      </RoundedBox>
      <mesh position={[0, 0, 0.012]}>
        <planeGeometry args={[1.28, 0.74]} />
        <meshBasicMaterial color={palette.border} transparent opacity={0.04 * progress * emphasis} />
      </mesh>
      <mesh position={[0, 0, 0.016]}>
        <planeGeometry args={[1.2, 0.68]} />
        <meshBasicMaterial color={palette.panel} transparent opacity={0.66 * progress * emphasis} />
      </mesh>
      <mesh position={[0, 0.21, 0.018]}>
        <planeGeometry args={[1.12, 0.16]} />
        <meshBasicMaterial color={palette.panelSoft} transparent opacity={0.46 * progress * emphasis} />
      </mesh>
      <mesh position={[0, 0.32, 0.02]}>
        <boxGeometry args={[1.16, 0.022, 0.006]} />
        <meshBasicMaterial color={palette.border} transparent opacity={0.7 * progress * emphasis} />
      </mesh>
      <mesh position={[0, -0.35, 0.02]}>
        <boxGeometry args={[1.14, 0.012, 0.006]} />
        <meshBasicMaterial color={palette.border} transparent opacity={0.14 * progress * emphasis} />
      </mesh>
      <mesh position={[-0.41, 0.06, 0.022]}>
        <boxGeometry args={[0.18, 0.18, 0.006]} />
        <meshBasicMaterial color={palette.strip} transparent opacity={progress * emphasis} />
      </mesh>
      <mesh position={[-0.41, 0.06, 0.028]}>
        <boxGeometry args={[0.08, 0.08, 0.006]} />
        <meshBasicMaterial color={palette.accent} transparent opacity={progress * emphasis} />
      </mesh>
      <mesh position={[0.1, 0.12, 0.024]}>
        <boxGeometry args={[0.52, 0.034, 0.006]} />
        <meshBasicMaterial color={palette.text} transparent opacity={0.84 * progress * emphasis} />
      </mesh>
      <mesh position={[0.13, 0.03, 0.024]}>
        <boxGeometry args={[0.6, 0.02, 0.006]} />
        <meshBasicMaterial color={palette.meta} transparent opacity={0.56 * progress * emphasis} />
      </mesh>
      <mesh position={[0.06, -0.08, 0.024]}>
        <boxGeometry args={[0.74, 0.012, 0.006]} />
        <meshBasicMaterial color={palette.border} transparent opacity={0.18 * progress * emphasis} />
      </mesh>
      <mesh position={[0.0, -0.17, 0.024]}>
        <boxGeometry args={[0.94, 0.14, 0.006]} />
        <meshBasicMaterial color={palette.panelMuted} transparent opacity={0.62 * progress * emphasis} />
      </mesh>
      <mesh position={[-0.39, -0.17, 0.03]}>
        <boxGeometry args={[0.05, 0.05, 0.006]} />
        <meshBasicMaterial color={palette.glow} transparent opacity={progress * emphasis} />
      </mesh>
      <mesh position={[0.39, 0.09, 0.024]}>
        <boxGeometry args={[0.1, 0.026, 0.006]} />
        <meshBasicMaterial color={palette.border} transparent opacity={progress * emphasis} />
      </mesh>
      <mesh position={[0.43, 0.15, 0.028]}>
        <boxGeometry args={[0.07, 0.07, 0.006]} />
        <meshBasicMaterial color={palette.glow} transparent opacity={0.44 * progress * emphasis} />
      </mesh>
      <mesh position={[-0.685, 0, 0.012]}>
        <boxGeometry args={[0.025, 0.08, 0.012]} />
        <meshBasicMaterial color={palette.glow} transparent opacity={0.38 * progress * emphasis} />
      </mesh>
      <mesh position={[0.685, 0, 0.012]}>
        <boxGeometry args={[0.025, 0.08, 0.012]} />
        <meshBasicMaterial color={palette.glow} transparent opacity={0.38 * progress * emphasis} />
      </mesh>
      {detailLevel === 'full' && (
        <>
          <mesh position={[0.11, -0.01, 0.024]}>
            <boxGeometry args={[0.48, 0.018, 0.006]} />
            <meshBasicMaterial color={palette.meta} transparent opacity={0.38 * progress * emphasis} />
          </mesh>
          <mesh position={[0.11, -0.05, 0.024]}>
            <boxGeometry args={[0.36, 0.018, 0.006]} />
            <meshBasicMaterial color={palette.meta} transparent opacity={0.28 * progress * emphasis} />
          </mesh>
          <mesh position={[0.46, -0.17, 0.03]}>
            <boxGeometry args={[0.06, 0.06, 0.006]} />
            <meshBasicMaterial color={palette.border} transparent opacity={progress * emphasis} />
          </mesh>
        </>
      )}
      <Text
        position={[0.0, 0.105, 0.03]}
        fontSize={0.09}
        maxWidth={0.72}
        lineHeight={1.08}
        color={palette.text}
        anchorX="left"
        anchorY="middle"
        fillOpacity={progress * emphasis}
      >
        {title}
      </Text>
      <Text
        position={[0.0, -0.005, 0.03]}
        fontSize={0.044}
        maxWidth={0.74}
        lineHeight={1.08}
        color={palette.meta}
        anchorX="left"
        anchorY="middle"
        fillOpacity={0.74 * progress * emphasis}
      >
        {subtitle}
      </Text>
      <Text
        position={[0.03, -0.17, 0.03]}
        fontSize={0.036}
        maxWidth={0.76}
        lineHeight={1}
        color="#d7f5ff"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.84 * progress * emphasis}
      >
        {meta}
      </Text>
    </group>
  )
}

export default FloatingCard
