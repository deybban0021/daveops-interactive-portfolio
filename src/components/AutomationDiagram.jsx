import { Text } from '@react-three/drei'
import { useEffect, useMemo, useState } from 'react'
import gsap from 'gsap'
import FloatingCard from './FloatingCard'
import ConnectorLine from './ConnectorLine'

const heroNodes = [
  {
    id: 'webhook',
    title: 'Webhook',
    subtitle: 'Inbound trigger',
    meta: 'POST /lead-intake',
    position: [-5.35, 0.94, 0.08],
    rotation: [0, 0, -0.02],
    tone: 'default',
    scale: 0.92,
    detailLevel: 'full',
  },
  {
    id: 'lead-capture',
    title: 'Lead Capture',
    subtitle: 'Form + landing page',
    meta: 'New lead live',
    position: [-3.2, 0.9, 0.12],
    rotation: [0, 0, -0.01],
    tone: 'accent',
    scale: 1.08,
    detailLevel: 'full',
  },
  {
    id: 'filter',
    title: 'Filter',
    subtitle: 'Qualification rule',
    meta: 'Score above 70',
    position: [-0.8, 0.86, 0.08],
    rotation: [0, 0, 0.015],
    tone: 'default',
    scale: 0.92,
    detailLevel: 'full',
  },
  {
    id: 'ghl-crm',
    title: 'GHL CRM',
    subtitle: 'Contact sync',
    meta: 'Pipeline updated',
    position: [2.0, 0.7, 0.12],
    rotation: [0, 0, 0.01],
    tone: 'accent',
    scale: 1.1,
    detailLevel: 'full',
  },
  {
    id: 'daveops-hub',
    title: 'DaveOps Automation Hub',
    subtitle: 'Decision engine',
    meta: 'Central orchestration',
    position: [5.55, 0.24, 0.16],
    rotation: [0, 0, -0.015],
    tone: 'hub',
    scale: 1.28,
  },
]

const heroConnections = [
  { from: [-5.35, 0.94, 0.08], to: [-3.2, 0.9, 0.12], mid: [-4.28, 1.18, 0.08] },
  { from: [-3.2, 0.9, 0.12], to: [-0.8, 0.86, 0.08], mid: [-2.02, 1.14, 0.08] },
  { from: [-0.8, 0.86, 0.08], to: [2.0, 0.7, 0.12], mid: [0.62, 1.05, 0.08] },
  { from: [2.0, 0.7, 0.12], to: [5.55, 0.24, 0.16], mid: [3.76, 0.96, 0.1] },
]

function BoardCard() {
  return (
    <group position={[0.6, 0.0, -0.06]} rotation={[0, 0, -0.012]}>
      <mesh position={[0.14, -0.12, -0.18]}>
        <planeGeometry args={[18.6, 7.6]} />
        <meshBasicMaterial color="#020712" transparent opacity={0.18} />
      </mesh>
      <mesh position={[0, 0, -0.12]}>
        <boxGeometry args={[18.8, 7.5, 0.14]} />
        <meshStandardMaterial color="#0b1320" metalness={0.42} roughness={0.48} opacity={0.98} transparent />
      </mesh>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[18.0, 6.84]} />
        <meshBasicMaterial color="#0f1928" transparent opacity={0.96} />
      </mesh>
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[17.4, 6.34]} />
        <meshBasicMaterial color="#132133" transparent opacity={0.18} />
      </mesh>
      <mesh position={[-7.35, 2.46, 0]}>
        <boxGeometry args={[2.0, 0.08, 0.01]} />
        <meshBasicMaterial color="#1a3552" />
      </mesh>
      <mesh position={[-5.72, 2.46, 0]}>
        <boxGeometry args={[0.62, 0.08, 0.01]} />
        <meshBasicMaterial color="#4ccfff" />
      </mesh>
      <mesh position={[-6.95, 1.52, 0]}>
        <boxGeometry args={[1.02, 0.02, 0.01]} />
        <meshBasicMaterial color="#16314b" transparent opacity={0.65} />
      </mesh>
      <mesh position={[-6.8, 1.18, 0]}>
        <boxGeometry args={[0.72, 0.02, 0.01]} />
        <meshBasicMaterial color="#13283f" transparent opacity={0.42} />
      </mesh>
    </group>
  )
}

function HubCard({ node }) {
  return (
    <group position={node.position} rotation={node.rotation} scale={node.scale}>
      <mesh position={[0.18, -0.14, -0.12]}>
        <planeGeometry args={[3.5, 2.2]} />
        <meshBasicMaterial color="#020712" transparent opacity={0.24} />
      </mesh>
      <mesh>
        <boxGeometry args={[3.62, 2.28, 0.22]} />
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
        <planeGeometry args={[3.22, 1.88]} />
        <meshBasicMaterial color="#132337" transparent opacity={0.98} />
      </mesh>
      <mesh position={[0, 0.58, 0.13]}>
        <boxGeometry args={[3.06, 0.05, 0.01]} />
        <meshBasicMaterial color="#43cbff" />
      </mesh>
      <mesh position={[-1.12, 0.18, 0.13]}>
        <boxGeometry args={[0.28, 0.28, 0.01]} />
        <meshBasicMaterial color="#17324d" />
      </mesh>
      <mesh position={[-1.12, 0.18, 0.14]}>
        <boxGeometry args={[0.12, 0.12, 0.01]} />
        <meshBasicMaterial color="#54d4ff" />
      </mesh>
      <mesh position={[0.0, 0.24, 0.13]}>
        <boxGeometry args={[1.28, 0.06, 0.01]} />
        <meshBasicMaterial color="#eef7ff" />
      </mesh>
      <mesh position={[0.22, 0.08, 0.13]}>
        <boxGeometry args={[1.92, 0.04, 0.01]} />
        <meshBasicMaterial color="#8dcaf0" transparent opacity={0.75} />
      </mesh>
      <mesh position={[-1.02, -0.38, 0.13]}>
        <boxGeometry args={[1.18, 0.76, 0.01]} />
        <meshBasicMaterial color="#0f1d2d" />
      </mesh>
      <mesh position={[0.82, -0.26, 0.13]}>
        <boxGeometry args={[1.42, 0.92, 0.01]} />
        <meshBasicMaterial color="#10263a" />
      </mesh>
      <mesh position={[0.82, -0.26, 0.14]}>
        <boxGeometry args={[0.72, 0.52, 0.01]} />
        <meshBasicMaterial color="#173a5a" transparent opacity={0.9} />
      </mesh>
      <mesh position={[1.48, -0.66, 0.12]}>
        <boxGeometry args={[0.08, 0.22, 0.04]} />
        <meshBasicMaterial color="#54d4ff" transparent opacity={0.72} />
      </mesh>
      <Text
        position={[-1.38, -0.56, 0.14]}
        fontSize={0.2}
        maxWidth={2.76}
        lineHeight={1.08}
        color="#f5fbff"
        anchorX="left"
        anchorY="middle"
      >
        {node.title}
      </Text>
      <Text
        position={[-1.38, -0.9, 0.14]}
        fontSize={0.1}
        maxWidth={2.78}
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
  const [intro, setIntro] = useState(() => ({
    nodes: heroNodes.map(() => 0),
    lines: heroConnections.map(() => 0),
  }))

  useEffect(() => {
    const state = {
      nodes: heroNodes.map(() => 0),
      lines: heroConnections.map(() => 0),
    }
    setIntro(state)

    const timeline = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onUpdate: () => {
        setIntro({
          nodes: [...state.nodes],
          lines: [...state.lines],
        })
      },
    })

    heroNodes.forEach((_, index) => {
      timeline.to(
        state.nodes,
        {
          [index]: 1,
          duration: index === 4 ? 0.34 : 0.26,
        },
        index === 0 ? 0.05 : '+=0.05',
      )

      if (index < heroConnections.length) {
        timeline.to(state.lines, {
          [index]: 1,
          duration: 0.22,
        })
      }
    })

    return () => timeline.kill()
  }, [])

  const nodeProgress = useMemo(() => intro.nodes, [intro.nodes])
  const lineProgress = useMemo(() => intro.lines, [intro.lines])

  return (
    <group scale={0.66} rotation={[-0.9, 0, -0.11]} position={[1.05, 0.18, 0]}>
      <BoardCard />
      <group position={[0, 0, 0.02]}>
        {heroConnections.map((connection, index) => (
          <ConnectorLine
            key={index}
            from={connection.from}
            to={connection.to}
            mid={connection.mid}
            progress={lineProgress[index]}
          />
        ))}
      </group>
      <group position={[0, 0, 0.08]}>
        {heroNodes.map((node, index) =>
          node.tone === 'hub' ? (
            <group
              key={node.id}
              scale={0.88 + nodeProgress[index] * 0.12}
              position={[0, 0, 0]}
            >
              <HubCard node={node} />
            </group>
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
              progress={nodeProgress[index]}
              floatPhase={index * 0.7}
              detailLevel={node.detailLevel}
            />
          ),
        )}
      </group>
    </group>
  )
}

export default AutomationDiagram
