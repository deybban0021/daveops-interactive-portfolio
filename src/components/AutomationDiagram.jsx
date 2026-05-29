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
    position: [-5.0, 0.86, 0.08],
    rotation: [0, 0, -0.02],
    tone: 'default',
    scale: 0.94,
    detailLevel: 'full',
  },
  {
    id: 'lead-capture',
    title: 'Lead Capture',
    subtitle: 'Form + landing page',
    meta: 'New lead live',
    position: [-2.95, 0.82, 0.12],
    rotation: [0, 0, -0.01],
    tone: 'accent',
    scale: 1.06,
    detailLevel: 'full',
  },
  {
    id: 'filter',
    title: 'Filter',
    subtitle: 'Qualification rule',
    meta: 'Score above 70',
    position: [-0.5, 0.8, 0.08],
    rotation: [0, 0, 0.015],
    tone: 'default',
    scale: 0.94,
    detailLevel: 'full',
  },
  {
    id: 'ghl-crm',
    title: 'GHL CRM',
    subtitle: 'Contact sync',
    meta: 'Pipeline updated',
    position: [1.8, 0.64, 0.12],
    rotation: [0, 0, 0.01],
    tone: 'accent',
    scale: 1.08,
    detailLevel: 'full',
  },
  {
    id: 'daveops-hub',
    title: 'DaveOps Automation Hub',
    subtitle: 'Decision engine',
    meta: 'Central orchestration',
    position: [4.9, 0.08, 0.16],
    rotation: [0, 0, -0.015],
    tone: 'hub',
    scale: 1.08,
  },
]

const heroConnections = [
  { from: [-5.0, 0.86, 0.08], to: [-2.95, 0.82, 0.12], mid: [-3.98, 1.06, 0.08] },
  { from: [-2.95, 0.82, 0.12], to: [-0.5, 0.8, 0.08], mid: [-1.74, 1.03, 0.08] },
  { from: [-0.5, 0.8, 0.08], to: [1.8, 0.64, 0.12], mid: [0.7, 0.98, 0.08] },
  { from: [1.8, 0.64, 0.12], to: [4.9, 0.08, 0.16], mid: [3.28, 0.9, 0.1] },
]

function BoardCard() {
  return (
    <group position={[0.4, -0.08, -0.06]} rotation={[0, 0, -0.008]}>
      <mesh position={[0.14, -0.12, -0.18]}>
        <planeGeometry args={[17.6, 6.8]} />
        <meshBasicMaterial color="#020712" transparent opacity={0.18} />
      </mesh>
      <mesh position={[0, 0, -0.12]}>
        <boxGeometry args={[17.8, 6.7, 0.14]} />
        <meshStandardMaterial color="#0b1320" metalness={0.42} roughness={0.48} opacity={0.98} transparent />
      </mesh>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[17.0, 6.06]} />
        <meshBasicMaterial color="#0f1928" transparent opacity={0.96} />
      </mesh>
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[16.45, 5.66]} />
        <meshBasicMaterial color="#132133" transparent opacity={0.18} />
      </mesh>
      <mesh position={[-6.8, 2.08, 0]}>
        <boxGeometry args={[1.86, 0.08, 0.01]} />
        <meshBasicMaterial color="#1a3552" />
      </mesh>
      <mesh position={[-5.3, 2.08, 0]}>
        <boxGeometry args={[0.6, 0.08, 0.01]} />
        <meshBasicMaterial color="#4ccfff" />
      </mesh>
      <mesh position={[-6.36, 1.36, 0]}>
        <boxGeometry args={[0.92, 0.02, 0.01]} />
        <meshBasicMaterial color="#16314b" transparent opacity={0.65} />
      </mesh>
      <mesh position={[-6.22, 1.05, 0]}>
        <boxGeometry args={[0.66, 0.02, 0.01]} />
        <meshBasicMaterial color="#13283f" transparent opacity={0.42} />
      </mesh>
    </group>
  )
}

function HubCard({ node }) {
  return (
    <group position={node.position} rotation={node.rotation} scale={node.scale}>
      <mesh position={[0.18, -0.14, -0.12]}>
        <planeGeometry args={[3.15, 2.0]} />
        <meshBasicMaterial color="#020712" transparent opacity={0.24} />
      </mesh>
      <mesh>
        <boxGeometry args={[3.3, 2.08, 0.22]} />
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
        <planeGeometry args={[2.92, 1.68]} />
        <meshBasicMaterial color="#132337" transparent opacity={0.98} />
      </mesh>
      <mesh position={[0, 0.5, 0.13]}>
        <boxGeometry args={[2.78, 0.05, 0.01]} />
        <meshBasicMaterial color="#43cbff" />
      </mesh>
      <mesh position={[-1.0, 0.14, 0.13]}>
        <boxGeometry args={[0.24, 0.24, 0.01]} />
        <meshBasicMaterial color="#17324d" />
      </mesh>
      <mesh position={[-1.0, 0.14, 0.14]}>
        <boxGeometry args={[0.12, 0.12, 0.01]} />
        <meshBasicMaterial color="#54d4ff" />
      </mesh>
      <mesh position={[-0.08, 0.18, 0.13]}>
        <boxGeometry args={[1.1, 0.06, 0.01]} />
        <meshBasicMaterial color="#eef7ff" />
      </mesh>
      <mesh position={[0.16, 0.02, 0.13]}>
        <boxGeometry args={[1.62, 0.04, 0.01]} />
        <meshBasicMaterial color="#8dcaf0" transparent opacity={0.75} />
      </mesh>
      <mesh position={[-0.92, -0.34, 0.13]}>
        <boxGeometry args={[1.02, 0.68, 0.01]} />
        <meshBasicMaterial color="#0f1d2d" />
      </mesh>
      <mesh position={[0.72, -0.22, 0.13]}>
        <boxGeometry args={[1.22, 0.82, 0.01]} />
        <meshBasicMaterial color="#10263a" />
      </mesh>
      <mesh position={[0.72, -0.22, 0.14]}>
        <boxGeometry args={[0.62, 0.44, 0.01]} />
        <meshBasicMaterial color="#173a5a" transparent opacity={0.9} />
      </mesh>
      <mesh position={[1.34, -0.54, 0.12]}>
        <boxGeometry args={[0.08, 0.2, 0.04]} />
        <meshBasicMaterial color="#54d4ff" transparent opacity={0.72} />
      </mesh>
      <Text
        position={[-1.22, -0.48, 0.14]}
        fontSize={0.182}
        maxWidth={2.42}
        lineHeight={1.08}
        color="#f5fbff"
        anchorX="left"
        anchorY="middle"
      >
        {node.title}
      </Text>
      <Text
        position={[-1.22, -0.78, 0.14]}
        fontSize={0.09}
        maxWidth={2.36}
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
    <group scale={0.74} rotation={[-0.78, 0, -0.08]} position={[0.55, 0.02, 0]}>
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
