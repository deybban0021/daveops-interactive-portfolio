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
    position: [-3.85, 0.86, 0.08],
    rotation: [0, 0, -0.02],
    tone: 'default',
    scale: 1,
    detailLevel: 'full',
  },
  {
    id: 'lead-capture',
    title: 'Lead Capture',
    subtitle: 'Form + landing page',
    meta: 'New lead live',
    position: [-1.7, 0.82, 0.1],
    rotation: [0, 0, -0.01],
    tone: 'accent',
    scale: 1.1,
    detailLevel: 'full',
  },
  {
    id: 'filter',
    title: 'Filter',
    subtitle: 'Qualification rule',
    meta: 'Score above 70',
    position: [0.8, 0.78, 0.08],
    rotation: [0, 0, 0.01],
    tone: 'default',
    scale: 1,
    detailLevel: 'full',
  },
  {
    id: 'ghl-crm',
    title: 'GHL CRM',
    subtitle: 'Contact sync',
    meta: 'Pipeline updated',
    position: [3.2, 0.58, 0.12],
    rotation: [0, 0, 0.006],
    tone: 'accent',
    scale: 1.12,
    detailLevel: 'full',
  },
  {
    id: 'daveops-hub',
    title: 'DaveOps Automation Hub',
    subtitle: 'Decision engine',
    meta: 'Central orchestration',
    position: [5.95, 0.06, 0.14],
    rotation: [0, 0, -0.01],
    tone: 'hub',
    scale: 1.02,
  },
]

const heroConnections = [
  { from: [-3.85, 0.86, 0.08], to: [-1.7, 0.82, 0.1], mid: [-2.8, 1.0, 0.08] },
  { from: [-1.7, 0.82, 0.1], to: [0.8, 0.78, 0.08], mid: [-0.46, 0.98, 0.08] },
  { from: [0.8, 0.78, 0.08], to: [3.2, 0.58, 0.12], mid: [2.02, 0.96, 0.08] },
  { from: [3.2, 0.58, 0.12], to: [5.95, 0.06, 0.14], mid: [4.58, 0.78, 0.1] },
]

function BoardCard() {
  return (
    <group position={[2.2, -0.2, -0.04]} rotation={[0, 0, -0.002]}>
      <mesh position={[0.12, -0.08, -0.11]}>
        <planeGeometry args={[13.8, 4.95]} />
        <meshBasicMaterial color="#020712" transparent opacity={0.14} />
      </mesh>
      <RoundedBox position={[0, 0, -0.07]} args={[13.5, 4.72, 0.03]} radius={0.16} smoothness={6}>
        <meshStandardMaterial color="#0b1320" metalness={0.24} roughness={0.28} opacity={0.98} transparent />
      </RoundedBox>
      <mesh position={[0, 0, -0.002]}>
        <planeGeometry args={[12.94, 4.28]} />
        <meshBasicMaterial color="#0f1928" transparent opacity={0.96} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[12.56, 3.96]} />
        <meshBasicMaterial color="#142336" transparent opacity={0.22} />
      </mesh>
      <mesh position={[-4.5, 1.38, 0]}>
        <boxGeometry args={[1.52, 0.05, 0.01]} />
        <meshBasicMaterial color="#1a3552" transparent opacity={0.9} />
      </mesh>
      <mesh position={[-3.26, 1.38, 0]}>
        <boxGeometry args={[0.62, 0.05, 0.01]} />
        <meshBasicMaterial color="#4ccfff" />
      </mesh>
      <mesh position={[-4.34, 0.9, 0]}>
        <boxGeometry args={[0.94, 0.018, 0.01]} />
        <meshBasicMaterial color="#16314b" transparent opacity={0.65} />
      </mesh>
      <mesh position={[-4.25, 0.68, 0]}>
        <boxGeometry args={[0.7, 0.018, 0.01]} />
        <meshBasicMaterial color="#13283f" transparent opacity={0.46} />
      </mesh>
    </group>
  )
}

function HubCard({ node }) {
  return (
    <group position={node.position} rotation={node.rotation} scale={node.scale}>
      <mesh position={[0.16, -0.12, -0.08]}>
        <planeGeometry args={[2.92, 1.8]} />
        <meshBasicMaterial color="#020712" transparent opacity={0.16} />
      </mesh>
      <RoundedBox args={[2.88, 1.78, 0.022]} radius={0.16} smoothness={7}>
        <meshStandardMaterial
          color="#0c1625"
          metalness={0.32}
          roughness={0.16}
          emissive="#3ec5ff"
          emissiveIntensity={0.024}
          transparent
          opacity={0.98}
        />
      </RoundedBox>
      <mesh position={[0, 0, 0.012]}>
        <planeGeometry args={[2.76, 1.68]} />
        <meshBasicMaterial color="#43cbff" transparent opacity={0.08} />
      </mesh>
      <mesh position={[0, 0, 0.016]}>
        <planeGeometry args={[2.64, 1.52]} />
        <meshBasicMaterial color="#132337" transparent opacity={0.98} />
      </mesh>
      <mesh position={[0, 0.42, 0.018]}>
        <boxGeometry args={[2.52, 0.03, 0.008]} />
        <meshBasicMaterial color="#43cbff" />
      </mesh>
      <mesh position={[-0.86, 0.14, 0.02]}>
        <boxGeometry args={[0.24, 0.24, 0.008]} />
        <meshBasicMaterial color="#17324d" />
      </mesh>
      <mesh position={[-0.86, 0.14, 0.026]}>
        <boxGeometry args={[0.12, 0.12, 0.008]} />
        <meshBasicMaterial color="#54d4ff" />
      </mesh>
      <mesh position={[-0.06, 0.2, 0.022]}>
        <boxGeometry args={[1.08, 0.046, 0.008]} />
        <meshBasicMaterial color="#eef7ff" />
      </mesh>
      <mesh position={[0.12, 0.08, 0.022]}>
        <boxGeometry args={[1.5, 0.034, 0.008]} />
        <meshBasicMaterial color="#8dcaf0" transparent opacity={0.75} />
      </mesh>
      <mesh position={[0.02, -0.08, 0.022]}>
        <boxGeometry args={[2.08, 0.016, 0.008]} />
        <meshBasicMaterial color="#3c82b0" transparent opacity={0.24} />
      </mesh>
      <mesh position={[-0.76, -0.24, 0.02]}>
        <boxGeometry args={[0.88, 0.5, 0.008]} />
        <meshBasicMaterial color="#0f1d2d" />
      </mesh>
      <mesh position={[0.6, -0.18, 0.02]}>
        <boxGeometry args={[1.0, 0.64, 0.008]} />
        <meshBasicMaterial color="#10263a" />
      </mesh>
      <mesh position={[0.6, -0.18, 0.026]}>
        <boxGeometry args={[0.5, 0.34, 0.008]} />
        <meshBasicMaterial color="#173a5a" transparent opacity={0.9} />
      </mesh>
      <mesh position={[1.17, -0.34, 0.016]}>
        <boxGeometry args={[0.04, 0.11, 0.016]} />
        <meshBasicMaterial color="#54d4ff" transparent opacity={0.72} />
      </mesh>
      <Text
        position={[-0.98, -0.3, 0.032]}
        fontSize={0.18}
        maxWidth={2.14}
        lineHeight={1.08}
        color="#f5fbff"
        anchorX="left"
        anchorY="middle"
      >
        {node.title}
      </Text>
      <Text
        position={[-0.98, -0.54, 0.032]}
        fontSize={0.088}
        maxWidth={2.08}
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
    <group scale={0.97} rotation={[-0.34, 0, -0.012]} position={[2.9, 0.05, 0]}>
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
