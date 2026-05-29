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
      <mesh position={[0.14, -0.12, -0.08]}>
        <planeGeometry args={[1.64, 1.0]} />
        <meshBasicMaterial color="#01060c" transparent opacity={0.16 * progress} />
      </mesh>
      <RoundedBox args={[1.66, 1.04, 0.018]} radius={0.15} smoothness={7}>
        <meshStandardMaterial
          color={palette.shell}
          metalness={0.3}
          roughness={0.18}
          emissive={palette.glow}
          emissiveIntensity={0.022 * progress}
          transparent
          opacity={0.46 + progress * 0.54}
        />
      </RoundedBox>
      <mesh position={[0, 0, 0.012]}>
        <planeGeometry args={[1.56, 0.94]} />
        <meshBasicMaterial color={palette.border} transparent opacity={0.08 * progress} />
      </mesh>
      <mesh position={[0, 0, 0.016]}>
        <planeGeometry args={[1.48, 0.88]} />
        <meshBasicMaterial color={palette.panel} transparent opacity={0.95 * progress} />
      </mesh>
      <mesh position={[0, 0.28, 0.018]}>
        <planeGeometry args={[1.38, 0.24]} />
        <meshBasicMaterial color={palette.panelSoft} transparent opacity={0.74 * progress} />
      </mesh>
      <mesh position={[0, 0.41, 0.02]}>
        <boxGeometry args={[1.4, 0.034, 0.008]} />
        <meshBasicMaterial color={palette.border} transparent opacity={0.92 * progress} />
      </mesh>
      <mesh position={[0, -0.43, 0.02]}>
        <boxGeometry args={[1.38, 0.016, 0.008]} />
        <meshBasicMaterial color={palette.border} transparent opacity={0.28 * progress} />
      </mesh>
      <mesh position={[-0.5, 0.09, 0.022]}>
        <boxGeometry args={[0.26, 0.26, 0.008]} />
        <meshBasicMaterial color={palette.strip} transparent opacity={progress} />
      </mesh>
      <mesh position={[-0.5, 0.09, 0.028]}>
        <boxGeometry args={[0.12, 0.12, 0.008]} />
        <meshBasicMaterial color={palette.accent} transparent opacity={progress} />
      </mesh>
      <mesh position={[0.11, 0.18, 0.024]}>
        <boxGeometry args={[0.64, 0.048, 0.008]} />
        <meshBasicMaterial color={palette.text} transparent opacity={0.95 * progress} />
      </mesh>
      <mesh position={[0.16, 0.06, 0.024]}>
        <boxGeometry args={[0.76, 0.028, 0.008]} />
        <meshBasicMaterial color={palette.meta} transparent opacity={0.7 * progress} />
      </mesh>
      <mesh position={[0.08, -0.11, 0.024]}>
        <boxGeometry args={[0.88, 0.016, 0.008]} />
        <meshBasicMaterial color={palette.border} transparent opacity={0.28 * progress} />
      </mesh>
      <mesh position={[0.0, -0.24, 0.024]}>
        <boxGeometry args={[1.14, 0.2, 0.008]} />
        <meshBasicMaterial color={palette.panelMuted} transparent opacity={0.95 * progress} />
      </mesh>
      <mesh position={[-0.46, -0.24, 0.03]}>
        <boxGeometry args={[0.06, 0.06, 0.008]} />
        <meshBasicMaterial color={palette.glow} transparent opacity={progress} />
      </mesh>
      <mesh position={[0.48, 0.14, 0.024]}>
        <boxGeometry args={[0.14, 0.036, 0.008]} />
        <meshBasicMaterial color={palette.border} transparent opacity={progress} />
      </mesh>
      <mesh position={[0.53, 0.22, 0.028]}>
        <boxGeometry args={[0.1, 0.1, 0.008]} />
        <meshBasicMaterial color={palette.glow} transparent opacity={0.65 * progress} />
      </mesh>
      <mesh position={[-0.835, 0, 0.016]}>
        <boxGeometry args={[0.035, 0.11, 0.02]} />
        <meshBasicMaterial color={palette.glow} transparent opacity={0.6 * progress} />
      </mesh>
      <mesh position={[0.835, 0, 0.016]}>
        <boxGeometry args={[0.035, 0.11, 0.02]} />
        <meshBasicMaterial color={palette.glow} transparent opacity={0.6 * progress} />
      </mesh>
      {detailLevel === 'full' && (
        <>
          <mesh position={[0.14, -0.02, 0.024]}>
            <boxGeometry args={[0.66, 0.026, 0.008]} />
            <meshBasicMaterial color={palette.meta} transparent opacity={0.58 * progress} />
          </mesh>
          <mesh position={[0.14, -0.08, 0.024]}>
            <boxGeometry args={[0.5, 0.026, 0.008]} />
            <meshBasicMaterial color={palette.meta} transparent opacity={0.42 * progress} />
          </mesh>
          <mesh position={[0.58, -0.24, 0.03]}>
            <boxGeometry args={[0.08, 0.08, 0.008]} />
            <meshBasicMaterial color={palette.border} transparent opacity={progress} />
          </mesh>
        </>
      )}
      <Text
        position={[0.0, 0.145, 0.032]}
        fontSize={0.122}
        maxWidth={0.92}
        lineHeight={1.08}
        color={palette.text}
        anchorX="left"
        anchorY="middle"
        fillOpacity={progress}
      >
        {title}
      </Text>
      <Text
        position={[0.0, 0.0, 0.032]}
        fontSize={0.06}
        maxWidth={0.94}
        lineHeight={1.08}
        color={palette.meta}
        anchorX="left"
        anchorY="middle"
        fillOpacity={0.95 * progress}
      >
        {subtitle}
      </Text>
      <Text
        position={[0.04, -0.24, 0.032]}
        fontSize={0.05}
        maxWidth={0.98}
        lineHeight={1}
        color="#d7f5ff"
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
