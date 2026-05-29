import { RoundedBox, Text } from '@react-three/drei'
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
    position: [-3.35, 0.7, 0.06],
    rotation: [0, 0, -0.02],
    tone: 'default',
    scale: 0.68,
    detailLevel: 'full',
  },
  {
    id: 'lead-capture',
    title: 'Lead Capture',
    subtitle: 'Form + landing page',
    meta: 'New lead live',
    position: [-1.72, 0.67, 0.08],
    rotation: [0, 0, -0.01],
    tone: 'accent',
    scale: 0.76,
    detailLevel: 'full',
  },
  {
    id: 'filter',
    title: 'Filter',
    subtitle: 'Qualification rule',
    meta: 'Score above 70',
    position: [0.18, 0.63, 0.06],
    rotation: [0, 0, 0.01],
    tone: 'default',
    scale: 0.68,
    detailLevel: 'full',
  },
  {
    id: 'ghl-crm',
    title: 'GHL CRM',
    subtitle: 'Contact sync',
    meta: 'Pipeline updated',
    position: [2.1, 0.52, 0.08],
    rotation: [0, 0, 0.006],
    tone: 'accent',
    scale: 0.76,
    detailLevel: 'full',
  },
  {
    id: 'daveops-hub',
    title: 'DaveOps Automation Hub',
    subtitle: 'Decision engine',
    meta: 'Central orchestration',
    position: [4.4, 0.1, 0.1],
    rotation: [0, 0, -0.01],
    tone: 'hub',
    scale: 0.82,
  },
]

const heroConnections = [
  { from: [-3.35, 0.7, 0.06], to: [-1.72, 0.67, 0.08], mid: [-2.56, 0.8, 0.06] },
  { from: [-1.72, 0.67, 0.08], to: [0.18, 0.63, 0.06], mid: [-0.76, 0.77, 0.06] },
  { from: [0.18, 0.63, 0.06], to: [2.1, 0.52, 0.08], mid: [1.12, 0.73, 0.06] },
  { from: [2.1, 0.52, 0.08], to: [4.4, 0.1, 0.1], mid: [3.28, 0.64, 0.08] },
]

function BoardCard() {
  return (
    <group position={[2.15, -0.18, -0.03]} rotation={[0, 0, -0.002]}>
      <mesh position={[0.08, -0.04, -0.08]}>
        <planeGeometry args={[10.8, 4.2]} />
        <meshBasicMaterial color="#020712" transparent opacity={0.14} />
      </mesh>
      <RoundedBox position={[0, 0, -0.05]} args={[10.5, 3.98, 0.02]} radius={0.16} smoothness={6}>
        <meshStandardMaterial color="#0b1320" metalness={0.22} roughness={0.3} opacity={0.98} transparent />
      </RoundedBox>
      <mesh position={[0, 0, -0.002]}>
        <planeGeometry args={[10.02, 3.58]} />
        <meshBasicMaterial color="#0f1928" transparent opacity={0.96} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[9.62, 3.28]} />
        <meshBasicMaterial color="#142336" transparent opacity={0.2} />
      </mesh>
      <mesh position={[-3.72, 1.13, 0]}>
        <boxGeometry args={[1.22, 0.04, 0.01]} />
        <meshBasicMaterial color="#1a3552" transparent opacity={0.84} />
      </mesh>
      <mesh position={[-2.72, 1.13, 0]}>
        <boxGeometry args={[0.48, 0.04, 0.01]} />
        <meshBasicMaterial color="#4ccfff" />
      </mesh>
      <mesh position={[-3.58, 0.76, 0]}>
        <boxGeometry args={[0.72, 0.016, 0.01]} />
        <meshBasicMaterial color="#16314b" transparent opacity={0.65} />
      </mesh>
      <mesh position={[-3.5, 0.56, 0]}>
        <boxGeometry args={[0.52, 0.016, 0.01]} />
        <meshBasicMaterial color="#13283f" transparent opacity={0.46} />
      </mesh>
      <group position={[0, 0, 0.001]}>
        {[-3.8, -2.2, -0.6, 1.0, 2.6].map((x) => (
          <mesh key={`v-${x}`} position={[x, 0, 0]}>
            <planeGeometry args={[0.018, 3.14]} />
            <meshBasicMaterial color="#1f3450" transparent opacity={0.18} />
          </mesh>
        ))}
        {[-1.12, -0.38, 0.36, 1.1].map((y) => (
          <mesh key={`h-${y}`} position={[0, y, 0]}>
            <planeGeometry args={[9.34, 0.016]} />
            <meshBasicMaterial color="#1f3450" transparent opacity={0.14} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

function HubCard({ node }) {
  return (
    <group position={node.position} rotation={node.rotation} scale={node.scale}>
      <mesh position={[0.12, -0.08, -0.06]}>
        <planeGeometry args={[2.38, 1.46]} />
        <meshBasicMaterial color="#020712" transparent opacity={0.14} />
      </mesh>
      <RoundedBox args={[2.42, 1.48, 0.012]} radius={0.14} smoothness={8}>
        <meshStandardMaterial
          color="#0c1625"
          metalness={0.24}
          roughness={0.18}
          emissive="#3ec5ff"
          emissiveIntensity={0.018}
          transparent
          opacity={0.98}
        />
      </RoundedBox>
      <mesh position={[0, 0, 0.012]}>
        <planeGeometry args={[2.28, 1.36]} />
        <meshBasicMaterial color="#43cbff" transparent opacity={0.06} />
      </mesh>
      <mesh position={[0, 0, 0.016]}>
        <planeGeometry args={[2.2, 1.28]} />
        <meshBasicMaterial color="#132337" transparent opacity={0.98} />
      </mesh>
      <mesh position={[0, 0.34, 0.018]}>
        <boxGeometry args={[2.08, 0.022, 0.006]} />
        <meshBasicMaterial color="#43cbff" />
      </mesh>
      <mesh position={[-0.7, 0.12, 0.02]}>
        <boxGeometry args={[0.18, 0.18, 0.006]} />
        <meshBasicMaterial color="#17324d" />
      </mesh>
      <mesh position={[-0.7, 0.12, 0.026]}>
        <boxGeometry args={[0.08, 0.08, 0.006]} />
        <meshBasicMaterial color="#54d4ff" />
      </mesh>
      <mesh position={[-0.02, 0.16, 0.022]}>
        <boxGeometry args={[0.88, 0.034, 0.006]} />
        <meshBasicMaterial color="#eef7ff" />
      </mesh>
      <mesh position={[0.08, 0.06, 0.022]}>
        <boxGeometry args={[1.12, 0.026, 0.006]} />
        <meshBasicMaterial color="#8dcaf0" transparent opacity={0.75} />
      </mesh>
      <mesh position={[0.02, -0.05, 0.022]}>
        <boxGeometry args={[1.78, 0.012, 0.006]} />
        <meshBasicMaterial color="#3c82b0" transparent opacity={0.24} />
      </mesh>
      <mesh position={[-0.64, -0.18, 0.02]}>
        <boxGeometry args={[0.68, 0.36, 0.006]} />
        <meshBasicMaterial color="#0f1d2d" />
      </mesh>
      <mesh position={[0.48, -0.14, 0.02]}>
        <boxGeometry args={[0.78, 0.46, 0.006]} />
        <meshBasicMaterial color="#10263a" />
      </mesh>
      <mesh position={[0.48, -0.14, 0.026]}>
        <boxGeometry args={[0.38, 0.22, 0.006]} />
        <meshBasicMaterial color="#173a5a" transparent opacity={0.9} />
      </mesh>
      <mesh position={[0.98, -0.26, 0.014]}>
        <boxGeometry args={[0.03, 0.08, 0.01]} />
        <meshBasicMaterial color="#54d4ff" transparent opacity={0.72} />
      </mesh>
      <Text
        position={[-0.82, -0.22, 0.03]}
        fontSize={0.13}
        maxWidth={1.76}
        lineHeight={1.08}
        color="#f5fbff"
        anchorX="left"
        anchorY="middle"
      >
        {node.title}
      </Text>
      <Text
        position={[-0.82, -0.4, 0.03]}
        fontSize={0.064}
        maxWidth={1.74}
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
    <group scale={0.78} rotation={[-0.2, 0, -0.008]} position={[3.9, -0.4, 0]}>
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
