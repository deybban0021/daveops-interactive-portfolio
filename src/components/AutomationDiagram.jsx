import FloatingCard from './FloatingCard'
import ConnectorLine from './ConnectorLine'

const orbitNodes = [
  { title: 'Lead Capture', position: [-2.7, 1.45, -0.8], tone: 'dark' },
  { title: 'Follow-Up', position: [2.6, 1.2, 0.2], tone: 'gold' },
  { title: 'Pipeline', position: [-2.4, -1.65, 0.6], tone: 'gold' },
  { title: 'Reporting', position: [2.2, -1.5, -0.5], tone: 'dark' },
]

function HubCard() {
  return (
    <group>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.7, 1.6, 0.35]} />
        <meshStandardMaterial color="#111111" metalness={0.85} roughness={0.18} />
      </mesh>
      <mesh position={[0, 0, 0.19]}>
        <planeGeometry args={[2.35, 1.25]} />
        <meshStandardMaterial color="#1a1a1a" emissive="#735113" emissiveIntensity={0.25} />
      </mesh>
      <mesh position={[0, 0, 0.2]}>
        <ringGeometry args={[0.26, 0.42, 40]} />
        <meshBasicMaterial color="#ffd36b" />
      </mesh>
      <mesh position={[-0.72, 0.38, 0.2]}>
        <boxGeometry args={[0.5, 0.12, 0.02]} />
        <meshBasicMaterial color="#f8e8bf" />
      </mesh>
      <mesh position={[-0.54, 0.08, 0.2]}>
        <boxGeometry args={[0.86, 0.08, 0.02]} />
        <meshBasicMaterial color="#c59f47" />
      </mesh>
      <mesh position={[0.56, -0.18, 0.2]}>
        <boxGeometry args={[0.6, 0.36, 0.02]} />
        <meshBasicMaterial color="#8d691f" />
      </mesh>
      <mesh position={[-0.66, -0.34, 0.2]}>
        <boxGeometry args={[0.72, 0.18, 0.02]} />
        <meshBasicMaterial color="#5a4720" />
      </mesh>
    </group>
  )
}

function AutomationDiagram() {
  return (
    <group scale={1.12} rotation={[-0.16, 0.28, 0.02]}>
      <HubCard />
      {orbitNodes.map((node) => (
        <group key={node.title}>
          <ConnectorLine from={[0, 0, 0]} to={node.position} />
          <FloatingCard title={node.title} position={node.position} tone={node.tone} />
        </group>
      ))}
    </group>
  )
}

export default AutomationDiagram
