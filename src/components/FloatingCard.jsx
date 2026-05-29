function FloatingCard({ title, position, tone = 'dark' }) {
  const palette =
    tone === 'gold'
      ? {
          card: '#8d691f',
          panel: '#d5ae57',
          glow: '#ffd36b',
        }
      : {
          card: '#101010',
          panel: '#2a2a2a',
          glow: '#9f7c2b',
        }

  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[1.25, 0.74, 0.2]} />
        <meshStandardMaterial
          color={palette.card}
          metalness={0.72}
          roughness={0.26}
          emissive={palette.glow}
          emissiveIntensity={0.1}
        />
      </mesh>
      <mesh position={[0, 0, 0.11]}>
        <planeGeometry args={[1.02, 0.5]} />
        <meshBasicMaterial color={palette.panel} />
      </mesh>
      <mesh position={[0, -0.16, 0.12]}>
        <boxGeometry args={[0.58, 0.06, 0.01]} />
        <meshBasicMaterial color="#f7eed7" />
      </mesh>
      <mesh position={[0, 0.12, 0.12]}>
        <boxGeometry args={[0.36, 0.06, 0.01]} />
        <meshBasicMaterial color="#1f1a0f" />
      </mesh>
    </group>
  )
}

export default FloatingCard
