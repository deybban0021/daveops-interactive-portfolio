import { RoundedBox, Text } from '@react-three/drei'
import { useEffect, useMemo, useState } from 'react'
import gsap from 'gsap'
import FloatingCard from './FloatingCard'
import ConnectorLine from './ConnectorLine'

const REGULAR_PORT_OFFSET = 0.685
const HUB_INPUT_OFFSET = 1.06
const HUB_OUTPUT_OFFSET = 1.02

const heroNodes = [
  {
    id: 'webhook',
    title: 'Lead Flow',
    subtitle: 'Capture + routing',
    meta: 'Forms, funnels, handoff',
    position: [-2.75, -0.78, -0.02],
    rotation: [0, 0, -0.08],
    tone: 'default',
    scale: 0.94,
    detailLevel: 'ambient',
    emphasis: 0.22,
  },
  {
    id: 'lead-capture',
    title: 'GHL Systems',
    subtitle: 'Pipelines + automation',
    meta: 'CRM, calendars, workflows',
    position: [-1.15, 0.22, 0.02],
    rotation: [0, 0, -0.03],
    tone: 'accent',
    scale: 1.06,
    detailLevel: 'ambient',
    emphasis: 0.3,
  },
  {
    id: 'filter',
    title: 'n8n Logic',
    subtitle: 'Webhook orchestration',
    meta: 'Backend actions + sync',
    position: [0.15, 0.88, 0.01],
    rotation: [0, 0, 0.015],
    tone: 'default',
    scale: 0.82,
    detailLevel: 'ambient',
    emphasis: 0.26,
  },
  {
    id: 'ghl-crm',
    title: 'AI Layer',
    subtitle: 'Assistants + prompts',
    meta: 'Chat, support, decisions',
    position: [1.55, 0.18, 0.02],
    rotation: [0, 0, 0.025],
    tone: 'accent',
    scale: 0.98,
    detailLevel: 'ambient',
    emphasis: 0.28,
  },
  {
    id: 'daveops-hub',
    title: 'Reporting',
    subtitle: 'Dashboards + insights',
    meta: 'Tracking, stats, visibility',
    position: [3.05, -0.58, 0.02],
    rotation: [0, 0, -0.035],
    tone: 'hub',
    scale: 1.2,
    emphasis: 0.34,
  },
]

function getInputPort(node) {
  const offset = node.tone === 'hub' ? HUB_INPUT_OFFSET : REGULAR_PORT_OFFSET
  return [node.position[0] - offset * node.scale, node.position[1], node.position[2]]
}

function getOutputPort(node) {
  const offset = node.tone === 'hub' ? HUB_OUTPUT_OFFSET : REGULAR_PORT_OFFSET
  return [node.position[0] + offset * node.scale, node.position[1], node.position[2]]
}

const heroConnections = heroNodes.slice(0, -1).map((node, index) => {
  const nextNode = heroNodes[index + 1]
  const from = getOutputPort(node)
  const to = getInputPort(nextNode)
  const span = to[0] - from[0]

  return {
    from,
    to,
    mid: [
      from[0] + span * 0.5,
      Math.max(from[1], to[1]) + (index === 1 ? 0.42 : 0.24),
      (from[2] + to[2]) / 2,
    ],
  }
})

function BackgroundField() {
  return (
    <group position={[0.22, -0.06, -0.18]} rotation={[0, 0, -0.001]}>
      <mesh position={[0.2, -0.08, -0.04]}>
        <planeGeometry args={[13.2, 5.6]} />
        <meshBasicMaterial color="#07111d" transparent opacity={0.015} />
      </mesh>
      <mesh position={[-0.2, -0.72, -0.03]}>
        <planeGeometry args={[8.8, 2.6]} />
        <meshBasicMaterial color="#0b1421" transparent opacity={0.08} />
      </mesh>
      <mesh position={[-1.6, -0.24, -0.02]}>
        <planeGeometry args={[3.4, 1.82]} />
        <meshBasicMaterial color="#122133" transparent opacity={0.05} />
      </mesh>
      <mesh position={[0.85, 0.48, -0.02]}>
        <planeGeometry args={[4.8, 2.4]} />
        <meshBasicMaterial color="#122133" transparent opacity={0.045} />
      </mesh>
      <mesh position={[3.1, -0.38, -0.01]}>
        <planeGeometry args={[3.8, 1.64]} />
        <meshBasicMaterial color="#16304b" transparent opacity={0.05} />
      </mesh>
      <group position={[0.24, 0.1, 0.001]}>
        {[-4.0, -2.4, -0.8, 1.0, 2.8, 4.3].map((x) => (
          <mesh key={`v-${x}`} position={[x, 0, 0]}>
            <planeGeometry args={[0.005, 3.0]} />
            <meshBasicMaterial color="#25415f" transparent opacity={0.028} />
          </mesh>
        ))}
        {[-1.0, -0.34, 0.32, 1.0].map((y) => (
          <mesh key={`h-${y}`} position={[0, y, 0]}>
            <planeGeometry args={[10.6, 0.005]} />
            <meshBasicMaterial color="#25415f" transparent opacity={0.026} />
          </mesh>
        ))}
      </group>
      <mesh position={[-2.92, 1.18, -0.01]}>
        <boxGeometry args={[1.34, 0.016, 0.004]} />
        <meshBasicMaterial color="#2a5f8d" transparent opacity={0.12} />
      </mesh>
      <mesh position={[-2.3, 1.18, 0]}>
        <boxGeometry args={[0.44, 0.016, 0.004]} />
        <meshBasicMaterial color="#7fe6ff" transparent opacity={0.28} />
      </mesh>
      <mesh position={[4.0, -1.02, -0.01]}>
        <boxGeometry args={[1.82, 0.012, 0.004]} />
        <meshBasicMaterial color="#214666" transparent opacity={0.1} />
      </mesh>
    </group>
  )
}

function HubCard({ node }) {
  return (
    <group position={node.position} rotation={node.rotation} scale={node.scale}>
      <mesh position={[0.12, -0.08, -0.06]}>
        <planeGeometry args={[2.38, 1.46]} />
        <meshBasicMaterial color="#020712" transparent opacity={0.08 * node.emphasis} />
      </mesh>
      <RoundedBox args={[2.42, 1.48, 0.008]} radius={0.14} smoothness={8}>
        <meshStandardMaterial
          color="#0c1625"
          metalness={0.18}
          roughness={0.22}
          emissive="#3ec5ff"
          emissiveIntensity={0.01 * node.emphasis}
          transparent
          opacity={0.46 * node.emphasis}
        />
      </RoundedBox>
      <mesh position={[0, 0, 0.012]}>
        <planeGeometry args={[2.28, 1.36]} />
        <meshBasicMaterial color="#43cbff" transparent opacity={0.04 * node.emphasis} />
      </mesh>
      <mesh position={[0, 0, 0.016]}>
        <planeGeometry args={[2.2, 1.28]} />
        <meshBasicMaterial color="#132337" transparent opacity={0.56 * node.emphasis} />
      </mesh>
      <mesh position={[0, 0.34, 0.018]}>
        <boxGeometry args={[2.08, 0.022, 0.006]} />
        <meshBasicMaterial color="#43cbff" transparent opacity={0.72 * node.emphasis} />
      </mesh>
      <mesh position={[-0.7, 0.12, 0.02]}>
        <boxGeometry args={[0.18, 0.18, 0.006]} />
        <meshBasicMaterial color="#17324d" transparent opacity={0.88 * node.emphasis} />
      </mesh>
      <mesh position={[-0.7, 0.12, 0.026]}>
        <boxGeometry args={[0.08, 0.08, 0.006]} />
        <meshBasicMaterial color="#54d4ff" transparent opacity={0.9 * node.emphasis} />
      </mesh>
      <mesh position={[-0.02, 0.16, 0.022]}>
        <boxGeometry args={[0.88, 0.034, 0.006]} />
        <meshBasicMaterial color="#eef7ff" transparent opacity={0.84 * node.emphasis} />
      </mesh>
      <mesh position={[0.08, 0.06, 0.022]}>
        <boxGeometry args={[1.12, 0.026, 0.006]} />
        <meshBasicMaterial color="#8dcaf0" transparent opacity={0.56 * node.emphasis} />
      </mesh>
      <mesh position={[0.02, -0.05, 0.022]}>
        <boxGeometry args={[1.78, 0.012, 0.006]} />
        <meshBasicMaterial color="#3c82b0" transparent opacity={0.16 * node.emphasis} />
      </mesh>
      <mesh position={[-0.64, -0.18, 0.02]}>
        <boxGeometry args={[0.68, 0.36, 0.006]} />
        <meshBasicMaterial color="#0f1d2d" transparent opacity={0.72 * node.emphasis} />
      </mesh>
      <mesh position={[0.48, -0.14, 0.02]}>
        <boxGeometry args={[0.78, 0.46, 0.006]} />
        <meshBasicMaterial color="#10263a" transparent opacity={0.68 * node.emphasis} />
      </mesh>
      <mesh position={[0.48, -0.14, 0.026]}>
        <boxGeometry args={[0.38, 0.22, 0.006]} />
        <meshBasicMaterial color="#173a5a" transparent opacity={0.56 * node.emphasis} />
      </mesh>
      <mesh position={[0.98, -0.26, 0.014]}>
        <boxGeometry args={[0.03, 0.08, 0.01]} />
        <meshBasicMaterial color="#54d4ff" transparent opacity={0.48 * node.emphasis} />
      </mesh>
      <Text
        position={[-0.82, -0.22, 0.03]}
        fontSize={0.13}
        maxWidth={1.76}
        lineHeight={1.08}
        color="#f5fbff"
        anchorX="left"
        anchorY="middle"
        fillOpacity={0.9 * node.emphasis}
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
        fillOpacity={0.7 * node.emphasis}
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
    <group scale={1.18} rotation={[-0.05, 0, -0.006]} position={[0.62, -0.06, 0]}>
      <BackgroundField />
      <group position={[0, 0, 0.02]}>
        {heroConnections.map((connection, index) => (
          <ConnectorLine
            key={index}
            from={connection.from}
            to={connection.to}
            mid={connection.mid}
            progress={lineProgress[index]}
            opacityMultiplier={index >= 2 ? 0.7 : 0.45}
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
              emphasis={node.emphasis}
            />
          ),
        )}
      </group>
    </group>
  )
}

export default AutomationDiagram
