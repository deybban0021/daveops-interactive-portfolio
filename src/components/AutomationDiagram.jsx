import { Text } from '@react-three/drei'
import FloatingCard from './FloatingCard'
import ConnectorLine from './ConnectorLine'

const heroNodes = [
  {
    id: 'webhook',
    title: 'Webhook',
    subtitle: 'Inbound trigger',
    meta: 'POST /lead-intake',
    position: [-4.8, 0.62, 0.08],
    rotation: [0, 0, -0.02],
    tone: 'default',
    scale: 0.84,
    detailLevel: 'full',
  },
  {
    id: 'lead-capture',
    title: 'Lead Capture',
    subtitle: 'Form + landing page',
    meta: 'New lead live',
    position: [-3.0, 0.7, 0.12],
    rotation: [0, 0, -0.01],
    tone: 'accent',
    scale: 1,
    detailLevel: 'full',
  },
  {
    id: 'filter',
    title: 'Filter',
    subtitle: 'Qualification rule',
    meta: 'Score above 70',
    position: [-0.95, 0.68, 0.08],
    rotation: [0, 0, 0.015],
    tone: 'default',
    scale: 0.84,
    detailLevel: 'full',
  },
  {
    id: 'ghl-crm',
    title: 'GHL CRM',
    subtitle: 'Contact sync',
    meta: 'Pipeline updated',
    position: [1.55, 0.55, 0.12],
    rotation: [0, 0, 0.01],
    tone: 'accent',
    scale: 1.02,
    detailLevel: 'full',
  },
  {
    id: 'daveops-hub',
    title: 'DaveOps Automation Hub',
    subtitle: 'Decision engine',
    meta: 'Central orchestration',
    position: [4.55, 0.02, 0.16],
    rotation: [0, 0, -0.015],
    tone: 'hub',
    scale: 1.18,
  },
]

const heroConnections = [
  { from: [-4.8, 0.62, 0.08], to: [-3.0, 0.7, 0.12], mid: [-3.95, 0.82, 0.08] },
  { from: [-3.0, 0.7, 0.12], to: [-0.95, 0.68, 0.08], mid: [-1.98, 0.86, 0.08] },
  { from: [-0.95, 0.68, 0.08], to: [1.55, 0.55, 0.12], mid: [0.34, 0.85, 0.08] },
  { from: [1.55, 0.55, 0.12], to: [4.55, 0.02, 0.16], mid: [3.08, 0.62, 0.1] },
]

function BoardCard() {
  return (
    <group position={[0.45, -0.1, -0.06]} rotation={[0, 0, -0.015]}>
      <mesh position={[0.14, -0.12, -0.18]}>
        <planeGeometry args={[16.4, 6.4]} />
        <meshBasicMaterial color="#020712" transparent opacity={0.18} />
      </mesh>
      <mesh position={[0, 0, -0.12]}>
        <boxGeometry args={[16.6, 6.3, 0.14]} />
        <meshStandardMaterial color="#0b1320" metalness={0.42} roughness={0.48} opacity={0.98} transparent />
      </mesh>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[15.9, 5.76]} />
        <meshBasicMaterial color="#0f1928" transparent opacity={0.96} />
      </mesh>
      <mesh position={[-6.3, 1.96, 0]}>
        <boxGeometry args={[1.8, 0.08, 0.01]} />
        <meshBasicMaterial color="#1a3552" />
      </mesh>
      <mesh position={[-4.8, 1.96, 0]}>
        <boxGeometry args={[0.56, 0.08, 0.01]} />
        <meshBasicMaterial color="#4ccfff" />
      </mesh>
    </group>
  )
}

function HubCard({ node }) {
  return (
    <group position={node.position} rotation={node.rotation} scale={node.scale}>
      <mesh position={[0.18, -0.14, -0.12]}>
        <planeGeometry args={[3.2, 2.02]} />
        <meshBasicMaterial color="#020712" transparent opacity={0.24} />
      </mesh>
      <mesh>
        <boxGeometry args={[3.35, 2.1, 0.22]} />
        <meshStandardMaterial
          color="#0c1625"
          metalness={0.78}
          roughness={0.24}
          emissive="#3ec5ff"
          emissiveIntensity={0.06}
          transparent
          opacity={0.98}
        />
      </mesh>
      <mesh position={[0, 0, 0.12]}>
        <planeGeometry args={[2.94, 1.7]} />
        <meshBasicMaterial color="#132337" transparent opacity={0.98} />
      </mesh>
      <mesh position={[0, 0.48, 0.13]}>
        <boxGeometry args={[2.86, 0.05, 0.01]} />
        <meshBasicMaterial color="#43cbff" />
      </mesh>
      <mesh position={[-1.0, 0.16, 0.13]}>
        <boxGeometry args={[0.24, 0.24, 0.01]} />
        <meshBasicMaterial color="#17324d" />
      </mesh>
      <mesh position={[-1.0, 0.16, 0.14]}>
        <boxGeometry args={[0.12, 0.12, 0.01]} />
        <meshBasicMaterial color="#54d4ff" />
      </mesh>
      <mesh position={[-0.14, 0.18, 0.13]}>
        <boxGeometry args={[1.04, 0.06, 0.01]} />
        <meshBasicMaterial color="#eef7ff" />
      </mesh>
      <mesh position={[0.38, 0.03, 0.13]}>
        <boxGeometry args={[1.72, 0.04, 0.01]} />
        <meshBasicMaterial color="#8dcaf0" transparent opacity={0.75} />
      </mesh>
      <mesh position={[-0.9, -0.38, 0.13]}>
        <boxGeometry args={[1.1, 0.68, 0.01]} />
        <meshBasicMaterial color="#0f1d2d" />
      </mesh>
      <mesh position={[0.7, -0.26, 0.13]}>
        <boxGeometry args={[1.28, 0.84, 0.01]} />
        <meshBasicMaterial color="#10263a" />
      </mesh>
      <Text
        position={[-1.18, -0.5, 0.14]}
        fontSize={0.19}
        maxWidth={2.5}
        lineHeight={1.08}
        color="#f5fbff"
        anchorX="left"
        anchorY="middle"
      >
        {node.title}
      </Text>
      <Text
        position={[-1.18, -0.82, 0.14]}
        fontSize={0.097}
        maxWidth={2.5}
        lineHeight={1.12}
        color="#90c7ea"
        anchorX="left"
        anchorY="middle"
      >
        AI routing, CRM logic, messaging, and reporting across one workflow canvas
      </Text>
    </group>
  )
}

function AutomationDiagram() {
  return (
    <group scale={0.72} rotation={[-0.9, 0, -0.13]} position={[0.8, 0.02, 0]}>
      <BoardCard />
      <group position={[0, 0, 0.02]}>
        {heroConnections.map((connection, index) => (
          <ConnectorLine
            key={index}
            from={connection.from}
            to={connection.to}
            mid={connection.mid}
            progress={1}
          />
        ))}
      </group>
      <group position={[0, 0, 0.08]}>
        {heroNodes.map((node) =>
          node.tone === 'hub' ? (
            <HubCard key={node.id} node={node} />
          ) : (
            <FloatingCard
              key={node.id}
              title={node.title}
              subtitle={node.subtitle}
              meta={node.meta}
              position={node.position}
              tone={node.tone}
              rotation={node.rotation}
              scale={node.scale}
              progress={1}
              floatPhase={0}
              detailLevel={node.detailLevel}
            />
          ),
        )}
      </group>
    </group>
  )
}

export default AutomationDiagram
