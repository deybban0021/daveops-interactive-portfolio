import { Text } from '@react-three/drei'

function FloatingCard({ title, position, tone = 'dark', rotation = [0, 0, 0], scale = 1 }) {
  const palette =
    tone === 'gold'
      ? {
          card: '#4d3710',
          panel: '#f2cb74',
          glow: '#ffd36b',
          text: '#16120a',
          accent: '#8f6926',
        }
      : {
          card: '#0f0f10',
          panel: '#171719',
          glow: '#a87b27',
          text: '#f7ead0',
          accent: '#cfa654',
        }

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh position={[0.12, -0.12, -0.12]}>
        <planeGeometry args={[1.18, 0.68]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.22} />
      </mesh>
      <mesh>
        <boxGeometry args={[1.34, 0.82, 0.16]} />
        <meshStandardMaterial
          color={palette.card}
          metalness={0.82}
          roughness={0.28}
          emissive={palette.glow}
          emissiveIntensity={0.08}
        />
      </mesh>
      <mesh position={[0, 0, 0.09]}>
        <planeGeometry args={[1.08, 0.56]} />
        <meshBasicMaterial color={palette.panel} />
      </mesh>
      <mesh position={[-0.3, 0.14, 0.1]}>
        <boxGeometry args={[0.16, 0.16, 0.01]} />
        <meshBasicMaterial color={palette.accent} />
      </mesh>
      <mesh position={[0.1, 0.14, 0.1]}>
        <boxGeometry args={[0.42, 0.05, 0.01]} />
        <meshBasicMaterial color={tone === 'gold' ? '#2b2212' : '#e6cf9f'} />
      </mesh>
      <mesh position={[-0.04, -0.13, 0.1]}>
        <boxGeometry args={[0.62, 0.06, 0.01]} />
        <meshBasicMaterial color={tone === 'gold' ? '#59431b' : '#937133'} />
      </mesh>
      <Text
        position={[0.08, -0.03, 0.1]}
        fontSize={0.1}
        maxWidth={0.72}
        lineHeight={1.15}
        color={palette.text}
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>
      <mesh position={[0.52, -0.2, 0.1]}>
        <boxGeometry args={[0.12, 0.12, 0.01]} />
        <meshBasicMaterial color={palette.glow} />
      </mesh>
    </group>
  )
}

export default FloatingCard
