import { RoundedBox, Text } from '@react-three/drei'
import { useEffect, useMemo, useState } from 'react'
import gsap from 'gsap'
import FloatingCard from './FloatingCard'
import ConnectorLine from './ConnectorLine'

const heroNodes = [
  {
    id: 'webhook',
    title: 'Lead Flow',
    subtitle: 'Capture + routing',
    meta: 'Forms, funnels, handoff',
    position: [-1.78, 0.24, 0.04],
    rotation: [0, 0, -0.012],
    tone: 'default',
    scale: 0.66,
    detailLevel: 'full',
  },
  {
    id: 'lead-capture',
    title: 'GHL Systems',
    subtitle: 'Pipelines + automation',
    meta: 'CRM, calendars, workflows',
    position: [-0.62, 0.28, 0.05],
    rotation: [0, 0, -0.006],
    tone: 'accent',
    scale: 0.7,
    detailLevel: 'full',
  },
  {
    id: 'filter',
    title: 'n8n Logic',
    subtitle: 'Webhook orchestration',
    meta: 'Backend actions + sync',
    position: [0.34, 0.24, 0.04],
    rotation: [0, 0, 0.008],
    tone: 'default',
    scale: 0.66,
    detailLevel: 'full',
  },
  {
    id: 'ghl-crm',
    title: 'AI Layer',
    subtitle: 'Assistants + prompts',
    meta: 'Chat, support, decisions',
    position: [1.32, 0.14, 0.05],
    rotation: [0, 0, 0.004],
    tone: 'accent',
    scale: 0.7,
    detailLevel: 'full',
  },
  {
    id: 'daveops-hub',
    title: 'Reporting',
    subtitle: 'Dashboards + insights',
    meta: 'Tracking, stats, visibility',
    position: [2.38, 0.02, 0.06],
    rotation: [0, 0, -0.004],
    tone: 'hub',
    scale: 0.72,
  },
]

const heroConnections = [
  { from: [-1.78, 0.24, 0.04], to: [-0.62, 0.28, 0.05], mid: [-1.18, 0.36, 0.04] },
  { from: [-0.62, 0.28, 0.05], to: [0.34, 0.24, 0.04], mid: [-0.14, 0.36, 0.04] },
  { from: [0.34, 0.24, 0.04], to: [1.32, 0.14, 0.05], mid: [0.82, 0.32, 0.04] },
  { from: [1.32, 0.14, 0.05], to: [2.38, 0.02, 0.06], mid: [1.86, 0.2, 0.05] },
]

function CanvasPlane() {
  return (
    <group position={[0.44, -0.02, -0.04]} rotation={[0, 0, -0.002]}>
      <mesh position={[0.04, -0.02, -0.03]}>
        <planeGeometry args={[6.2, 2.12]} />
        <meshBasicMaterial color="#07111d" transparent opacity={0.07} />
      </mesh>
      <RoundedBox position={[0, 0, -0.02]} args={[6.0, 1.96, 0.004]} radius={0.12} smoothness={6}>
        <meshStandardMaterial
          color="#0c1726"
          metalness={0.1}
          roughness={0.48}
          opacity={0.32}
          transparent
        />
      </RoundedBox>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[5.78, 1.72]} />
        <meshBasicMaterial color="#0f1a2a" transparent opacity={0.1} />
      </mesh>
      <group position={[0, 0, 0.001]}>
        {[-2.0, -0.8, 0.4, 1.6].map((x) => (
          <mesh key={`v-${x}`} position={[x, 0, 0]}>
            <planeGeometry args={[0.008, 1.4]} />
            <meshBasicMaterial color="#25415f" transparent opacity={0.08} />
          </mesh>
        ))}
        {[-0.44, 0.0, 0.44].map((y) => (
          <mesh key={`h-${y}`} position={[0, y, 0]}>
            <planeGeometry args={[5.2, 0.008]} />
            <meshBasicMaterial color="#25415f" transparent opacity={0.06} />
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
      <RoundedBox args={[2.42, 1.48, 0.008]} radius={0.14} smoothness={8}>
        <meshStandardMaterial
          color="#0c1625"
          metalness={0.18}
          roughness={0.22}
          emissive="#3ec5ff"
          emissiveIntensity={0.014}
          transparent
          opacity={0.92}
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
        Dashboards, lead tracking, and connected visibility across your operations
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
    <group scale={0.58} rotation={[-0.08, 0, -0.006]} position={[1.72, -0.02, 0]}>
      <CanvasPlane />
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
