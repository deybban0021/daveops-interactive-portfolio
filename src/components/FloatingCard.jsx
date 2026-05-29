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
          shell: '#0c1625',
          border: '#2e96ff',
          panel: '#112238',
          panelMuted: '#0b1a2b',
          glow: '#44d1ff',
          accent: '#54c7ff',
          text: '#f6fbff',
          meta: '#89cff3',
          strip: '#12324f',
        }
      : {
          shell: '#10151f',
          border: '#23506f',
          panel: '#141c29',
          panelMuted: '#0f1722',
          glow: '#2fb8ff',
          accent: '#2c648b',
          text: '#edf6ff',
          meta: '#7eb6dc',
          strip: '#102334',
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
      <mesh position={[0.16, -0.18, -0.12]}>
        <planeGeometry args={[1.56, 0.96]} />
        <meshBasicMaterial color="#01060c" transparent opacity={0.26 * progress} />
      </mesh>
      <RoundedBox args={[1.62, 1.02, 0.08]} radius={0.11} smoothness={4}>
        <meshStandardMaterial
          color={palette.shell}
          metalness={0.56}
          roughness={0.16}
          emissive={palette.glow}
          emissiveIntensity={0.045 * progress}
          transparent
          opacity={0.42 + progress * 0.58}
        />
      </RoundedBox>
      <mesh position={[0, 0, 0.041]}>
        <planeGeometry args={[1.5, 0.9]} />
        <meshBasicMaterial color={palette.border} transparent opacity={0.08 * progress} />
      </mesh>
      <mesh position={[0, 0, 0.058]}>
        <planeGeometry args={[1.42, 0.82]} />
        <meshBasicMaterial color={palette.panel} transparent opacity={0.92 * progress} />
      </mesh>
      <mesh position={[0, 0.27, 0.06]}>
        <planeGeometry args={[1.32, 0.22]} />
        <meshBasicMaterial color="#18293d" transparent opacity={0.55 * progress} />
      </mesh>
      <mesh position={[0, 0.41, 0.06]}>
        <boxGeometry args={[1.36, 0.045, 0.01]} />
        <meshBasicMaterial color={palette.border} transparent opacity={0.95 * progress} />
      </mesh>
      <mesh position={[0, -0.42, 0.06]}>
        <boxGeometry args={[1.36, 0.025, 0.01]} />
        <meshBasicMaterial color={palette.border} transparent opacity={0.35 * progress} />
      </mesh>
      <mesh position={[-0.49, 0.1, 0.065]}>
        <boxGeometry args={[0.24, 0.24, 0.01]} />
        <meshBasicMaterial color={palette.strip} transparent opacity={progress} />
      </mesh>
      <mesh position={[-0.49, 0.1, 0.075]}>
        <boxGeometry args={[0.12, 0.12, 0.01]} />
        <meshBasicMaterial color={palette.accent} transparent opacity={progress} />
      </mesh>
      <mesh position={[0.08, 0.17, 0.07]}>
        <boxGeometry args={[0.56, 0.05, 0.01]} />
        <meshBasicMaterial color={palette.text} transparent opacity={0.95 * progress} />
      </mesh>
      <mesh position={[0.14, 0.03, 0.07]}>
        <boxGeometry args={[0.7, 0.03, 0.01]} />
        <meshBasicMaterial color={palette.meta} transparent opacity={0.7 * progress} />
      </mesh>
      <mesh position={[0.08, -0.16, 0.07]}>
        <boxGeometry args={[0.82, 0.02, 0.01]} />
        <meshBasicMaterial color={palette.border} transparent opacity={0.28 * progress} />
      </mesh>
      <mesh position={[0.0, -0.25, 0.07]}>
        <boxGeometry args={[1.08, 0.18, 0.01]} />
        <meshBasicMaterial color={palette.panelMuted} transparent opacity={0.95 * progress} />
      </mesh>
      <mesh position={[-0.46, -0.25, 0.08]}>
        <boxGeometry args={[0.06, 0.06, 0.01]} />
        <meshBasicMaterial color={palette.glow} transparent opacity={progress} />
      </mesh>
      <mesh position={[0.47, 0.13, 0.07]}>
        <boxGeometry args={[0.14, 0.04, 0.01]} />
        <meshBasicMaterial color={palette.border} transparent opacity={progress} />
      </mesh>
      <mesh position={[0.51, 0.22, 0.07]}>
        <boxGeometry args={[0.09, 0.09, 0.01]} />
        <meshBasicMaterial color={palette.glow} transparent opacity={0.65 * progress} />
      </mesh>
      <mesh position={[-0.81, 0, 0.05]}>
        <boxGeometry args={[0.05, 0.13, 0.04]} />
        <meshBasicMaterial color={palette.glow} transparent opacity={0.6 * progress} />
      </mesh>
      <mesh position={[0.81, 0, 0.05]}>
        <boxGeometry args={[0.05, 0.13, 0.04]} />
        <meshBasicMaterial color={palette.glow} transparent opacity={0.6 * progress} />
      </mesh>
      {detailLevel === 'full' && (
        <>
          <mesh position={[0.14, -0.06, 0.07]}>
            <boxGeometry args={[0.62, 0.03, 0.01]} />
            <meshBasicMaterial color={palette.meta} transparent opacity={0.58 * progress} />
          </mesh>
          <mesh position={[0.14, -0.13, 0.07]}>
            <boxGeometry args={[0.46, 0.03, 0.01]} />
            <meshBasicMaterial color={palette.meta} transparent opacity={0.42 * progress} />
          </mesh>
          <mesh position={[0.56, -0.25, 0.08]}>
            <boxGeometry args={[0.08, 0.08, 0.01]} />
            <meshBasicMaterial color={palette.border} transparent opacity={progress} />
          </mesh>
        </>
      )}
      <Text
        position={[0.0, 0.12, 0.08]}
        fontSize={0.094}
        maxWidth={0.78}
        lineHeight={1.08}
        color={palette.text}
        anchorX="left"
        anchorY="middle"
        fillOpacity={progress}
      >
        {title}
      </Text>
      <Text
        position={[0.0, -0.01, 0.08]}
        fontSize={0.051}
        maxWidth={0.84}
        lineHeight={1.08}
        color={palette.meta}
        anchorX="left"
        anchorY="middle"
        fillOpacity={0.95 * progress}
      >
        {subtitle}
      </Text>
      <Text
        position={[0.02, -0.25, 0.08]}
        fontSize={0.045}
        maxWidth={0.84}
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
