import { Text } from '@react-three/drei'
import FloatingCard from './FloatingCard'
import ConnectorLine from './ConnectorLine'

const automationCards = [
  {
    title: 'Lead Capture',
    position: [-3.15, 1.15, 0.2],
    anchor: [-1.55, 0.55, 0.08],
    mid: [-2.3, 1.35, 0.2],
    tone: 'gold',
    rotation: [0, 0, -0.12],
  },
  {
    title: 'GHL CRM',
    position: [-2.55, -1.38, 0.28],
    anchor: [-1.35, -0.48, 0.08],
    mid: [-2.05, -1.12, 0.22],
    tone: 'dark',
    rotation: [0, 0, 0.08],
  },
  {
    title: 'n8n Backend',
    position: [0.1, 2.35, -0.05],
    anchor: [0.15, 1.0, 0.08],
    mid: [0.55, 1.8, 0.14],
    tone: 'dark',
    rotation: [0, 0, 0.02],
  },
  {
    title: 'AI Chat',
    position: [2.95, 1.45, -0.02],
    anchor: [1.5, 0.42, 0.08],
    mid: [2.25, 1.28, 0.15],
    tone: 'gold',
    rotation: [0, 0, 0.08],
  },
  {
    title: 'Calendar Booking',
    position: [3.25, -0.15, 0.12],
    anchor: [1.62, -0.05, 0.08],
    mid: [2.48, 0.16, 0.14],
    tone: 'dark',
    rotation: [0, 0, 0.02],
  },
  {
    title: 'SMS / Email',
    position: [2.25, -1.92, 0.2],
    anchor: [1.25, -0.82, 0.08],
    mid: [1.92, -1.52, 0.16],
    tone: 'gold',
    rotation: [0, 0, -0.08],
  },
  {
    title: 'Dashboard Reporting',
    position: [-0.2, -2.48, 0.26],
    anchor: [-0.15, -0.96, 0.08],
    mid: [-0.62, -1.95, 0.18],
    tone: 'dark',
    rotation: [0, 0, 0.02],
    scale: 1.04,
  },
]

function HubCard() {
  return (
    <group rotation={[0, 0, -0.12]}>
      <mesh position={[0.18, -0.22, -0.18]}>
        <planeGeometry args={[4.3, 2.9]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.2} />
      </mesh>
      <mesh position={[-1.55, 0.86, -0.18]}>
        <boxGeometry args={[1.2, 0.7, 0.09]} />
        <meshStandardMaterial color="#161616" metalness={0.72} roughness={0.36} />
      </mesh>
      <mesh position={[1.55, -0.76, -0.16]}>
        <boxGeometry args={[1.2, 0.7, 0.09]} />
        <meshStandardMaterial color="#181818" metalness={0.72} roughness={0.36} />
      </mesh>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3.5, 2.2, 0.3]} />
        <meshStandardMaterial color="#090909" metalness={0.92} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.16]}>
        <planeGeometry args={[3.0, 1.72]} />
        <meshStandardMaterial color="#101010" emissive="#735113" emissiveIntensity={0.22} />
      </mesh>
      <mesh position={[-0.78, 0.62, 0.17]}>
        <boxGeometry args={[1.18, 0.12, 0.02]} />
        <meshBasicMaterial color="#f4e5c2" />
      </mesh>
      <mesh position={[-0.58, 0.28, 0.17]}>
        <boxGeometry args={[1.56, 0.08, 0.02]} />
        <meshBasicMaterial color="#8d691f" />
      </mesh>
      <mesh position={[0.7, 0.28, 0.17]}>
        <boxGeometry args={[0.58, 0.08, 0.02]} />
        <meshBasicMaterial color="#4a391b" />
      </mesh>
      <mesh position={[-0.8, -0.28, 0.17]}>
        <boxGeometry args={[1.0, 0.56, 0.02]} />
        <meshBasicMaterial color="#1c1c1c" />
      </mesh>
      <mesh position={[0.55, -0.2, 0.17]}>
        <boxGeometry args={[1.16, 0.72, 0.02]} />
        <meshBasicMaterial color="#7f5e1d" />
      </mesh>
      <mesh position={[0.55, -0.2, 0.18]}>
        <ringGeometry args={[0.28, 0.42, 40]} />
        <meshBasicMaterial color="#ffd36b" />
      </mesh>
      <mesh position={[1.18, 0.64, 0.17]}>
        <boxGeometry args={[0.42, 0.1, 0.02]} />
        <meshBasicMaterial color="#e1bc67" />
      </mesh>
      <Text
        position={[-0.35, -0.58, 0.18]}
        fontSize={0.22}
        maxWidth={2.15}
        lineHeight={1.1}
        color="#f8edd6"
        anchorX="left"
        anchorY="middle"
      >
        DaveOps
      </Text>
      <Text
        position={[-0.35, -0.9, 0.18]}
        fontSize={0.14}
        maxWidth={2.2}
        lineHeight={1.1}
        color="#cfa654"
        anchorX="left"
        anchorY="middle"
      >
        Automation Control Layer
      </Text>
      <mesh position={[0.05, 0.0, 0.14]}>
        <boxGeometry args={[3.72, 2.38, 0.01]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.05} />
      </mesh>
    </group>
  )
}

function AutomationDiagram() {
  return (
    <group scale={1.02} rotation={[-0.72, 0.1, -0.46]} position={[0.15, 0.25, 0]}>
      <HubCard />
      {automationCards.map((node) => (
        <group key={node.title}>
          <ConnectorLine from={node.anchor} to={node.position} mid={node.mid} />
          <FloatingCard
            title={node.title}
            position={node.position}
            tone={node.tone}
            rotation={node.rotation}
            scale={node.scale}
          />
        </group>
      ))}
    </group>
  )
}

export default AutomationDiagram
