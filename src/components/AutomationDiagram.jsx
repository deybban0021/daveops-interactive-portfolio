import { Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import FloatingCard from './FloatingCard'
import ConnectorLine from './ConnectorLine'

const stageThresholds = [0, 0.24, 0.44, 0.64, 0.82]

const workflowNodes = [
  {
    id: 'webhook',
    title: 'Webhook',
    subtitle: 'Inbound trigger',
    meta: 'POST /lead-intake',
    position: [-4.8, 0.78, 0.1],
    rotation: [0, 0, -0.02],
    tone: 'default',
    scale: 0.8,
    floatPhase: 0.2,
    stage: 0,
    detailLevel: 'full',
  },
  {
    id: 'lead-capture',
    title: 'Lead Capture',
    subtitle: 'Form + landing page',
    meta: 'New lead - live',
    position: [-3.15, 0.84, 0.13],
    rotation: [0, 0, -0.02],
    tone: 'accent',
    scale: 1.02,
    floatPhase: 0.7,
    stage: 0,
    detailLevel: 'full',
  },
  {
    id: 'filter',
    title: 'Filter',
    subtitle: 'Qualification rule',
    meta: 'Score above 70',
    position: [-1.4, 0.82, 0.1],
    rotation: [0, 0, 0.02],
    tone: 'default',
    scale: 0.8,
    floatPhase: 1.1,
    stage: 0,
    detailLevel: 'full',
  },
  {
    id: 'ghl-crm',
    title: 'GHL CRM',
    subtitle: 'Contact sync',
    meta: 'Pipeline updated',
    position: [0.7, 0.66, 0.14],
    rotation: [0, 0, 0.01],
    tone: 'accent',
    scale: 1.02,
    floatPhase: 1.6,
    stage: 0,
    detailLevel: 'full',
  },
  {
    id: 'daveops-hub',
    title: 'DaveOps Automation Hub',
    subtitle: 'Decision engine',
    meta: 'Central orchestration',
    position: [3.2, 0.2, 0.18],
    rotation: [0, 0, -0.02],
    tone: 'hub',
    scale: 1.24,
    floatPhase: 2,
    stage: 0,
  },
  {
    id: 'router',
    title: 'Router',
    subtitle: 'Path selection',
    meta: '2 active routes',
    position: [5.85, 0.58, 0.12],
    rotation: [0, 0, 0.01],
    tone: 'default',
    scale: 0.82,
    floatPhase: 2.4,
    stage: 1,
    detailLevel: 'compact',
  },
  {
    id: 'n8n-backend',
    title: 'n8n Backend',
    subtitle: 'Workflow execution',
    meta: '8 nodes running',
    position: [5.55, -1.42, 0.13],
    rotation: [0, 0, 0.03],
    tone: 'default',
    scale: 0.92,
    floatPhase: 2.8,
    stage: 1,
    detailLevel: 'compact',
  },
  {
    id: 'follow-up-logic',
    title: 'Follow-up Logic',
    subtitle: 'Delay + retry',
    meta: '3-step cadence',
    position: [8.4, -1.46, 0.1],
    rotation: [0, 0, 0.01],
    tone: 'default',
    scale: 0.8,
    floatPhase: 3.2,
    stage: 1,
    detailLevel: 'compact',
  },
  {
    id: 'ai-chat',
    title: 'AI Chat',
    subtitle: 'Response drafting',
    meta: 'Intent matched',
    position: [8.8, 1.85, 0.14],
    rotation: [0, 0, 0.02],
    tone: 'accent',
    scale: 0.94,
    floatPhase: 3.7,
    stage: 2,
    detailLevel: 'compact',
  },
  {
    id: 'sms-email',
    title: 'SMS / Email',
    subtitle: 'Outbound follow-up',
    meta: 'Queued in 2 min',
    position: [11.1, -1.46, 0.14],
    rotation: [0, 0, -0.01],
    tone: 'accent',
    scale: 0.92,
    floatPhase: 4.1,
    stage: 2,
    detailLevel: 'compact',
  },
  {
    id: 'calendar-booking',
    title: 'Calendar Booking',
    subtitle: 'Schedule conversion',
    meta: 'Slot found',
    position: [13.55, -2.05, 0.14],
    rotation: [0, 0, 0.02],
    tone: 'accent',
    scale: 0.94,
    floatPhase: 4.5,
    stage: 3,
    detailLevel: 'compact',
  },
  {
    id: 'pipeline-update',
    title: 'Pipeline Update',
    subtitle: 'Stage transition',
    meta: 'Qualified lead',
    position: [11.3, 1.85, 0.1],
    rotation: [0, 0, 0.01],
    tone: 'default',
    scale: 0.8,
    floatPhase: 4.9,
    stage: 3,
    detailLevel: 'compact',
  },
  {
    id: 'dashboard-reporting',
    title: 'Dashboard Reporting',
    subtitle: 'Ops visibility',
    meta: 'CTR 34% up',
    position: [9.25, -3.08, 0.14],
    rotation: [0, 0, 0.03],
    tone: 'accent',
    scale: 0.98,
    floatPhase: 5.3,
    stage: 4,
    detailLevel: 'compact',
  },
  {
    id: 'tag-update',
    title: 'Tag Update',
    subtitle: 'Segment contact',
    meta: 'VIP nurture',
    position: [15.85, -2.05, 0.1],
    rotation: [0, 0, -0.02],
    tone: 'default',
    scale: 0.78,
    floatPhase: 5.7,
    stage: 4,
    detailLevel: 'compact',
  },
]

const workflowConnections = [
  { from: 'webhook', to: 'lead-capture', mid: [-3.98, 0.95, 0.1], stage: 0 },
  { from: 'lead-capture', to: 'filter', mid: [-2.28, 1.0, 0.1], stage: 0 },
  { from: 'filter', to: 'ghl-crm', mid: [-0.3, 0.98, 0.1], stage: 0 },
  { from: 'ghl-crm', to: 'daveops-hub', mid: [1.95, 0.78, 0.1], stage: 0 },
  { from: 'daveops-hub', to: 'router', mid: [4.55, 0.55, 0.1], stage: 1 },
  { from: 'daveops-hub', to: 'n8n-backend', mid: [4.42, -0.72, 0.1], stage: 1 },
  { from: 'n8n-backend', to: 'follow-up-logic', mid: [7.05, -1.08, 0.1], stage: 1 },
  { from: 'router', to: 'ai-chat', mid: [7.3, 1.45, 0.1], stage: 2 },
  { from: 'follow-up-logic', to: 'sms-email', mid: [9.78, -1.1, 0.1], stage: 2 },
  { from: 'sms-email', to: 'calendar-booking', mid: [12.3, -1.82, 0.1], stage: 3 },
  { from: 'ai-chat', to: 'pipeline-update', mid: [10.02, 2.1, 0.1], stage: 3 },
  { from: 'n8n-backend', to: 'dashboard-reporting', mid: [7.18, -2.72, 0.1], stage: 4 },
  { from: 'calendar-booking', to: 'tag-update', mid: [14.68, -2.18, 0.1], stage: 4 },
]

function smoothStep(edge0, edge1, value) {
  const t = Math.min(Math.max((value - edge0) / (edge1 - edge0), 0), 1)
  return t * t * (3 - 2 * t)
}

function stageReveal(stage, scrollProgress, order = 0) {
  if (stage === 0) {
    return 1
  }

  const start = stageThresholds[stage]
  return smoothStep(start + order * 0.02, start + 0.12 + order * 0.02, scrollProgress)
}

function BoardCard({ progress }) {
  return (
    <group position={[4.95, -0.02, -0.06]} rotation={[0, 0, -0.02]}>
      <mesh position={[0.18, -0.12, -0.18]}>
        <planeGeometry args={[24.8, 8.9]} />
        <meshBasicMaterial color="#020712" transparent opacity={0.18 * progress} />
      </mesh>
      <mesh position={[0, 0, -0.12]}>
        <boxGeometry args={[25, 8.8, 0.14]} />
        <meshStandardMaterial
          color="#0b1320"
          metalness={0.42}
          roughness={0.48}
          transparent
          opacity={0.44 + progress * 0.56}
        />
      </mesh>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[24.35, 8.16]} />
        <meshBasicMaterial color="#0f1928" transparent opacity={0.94 * progress} />
      </mesh>
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[23.8, 7.68]} />
        <meshBasicMaterial color="#132032" transparent opacity={0.24 * progress} />
      </mesh>
      <mesh position={[-8.8, 2.92, 0]}>
        <boxGeometry args={[1.78, 0.08, 0.01]} />
        <meshBasicMaterial color="#1c3554" transparent opacity={progress} />
      </mesh>
      <mesh position={[-7.3, 2.92, 0]}>
        <boxGeometry args={[0.56, 0.08, 0.01]} />
        <meshBasicMaterial color="#4ccfff" transparent opacity={progress} />
      </mesh>
      <mesh position={[10.0, -3.24, 0]}>
        <boxGeometry args={[2.44, 0.08, 0.01]} />
        <meshBasicMaterial color="#16314b" transparent opacity={0.7 * progress} />
      </mesh>
      <mesh position={[-8.95, 0.82, 0]}>
        <boxGeometry args={[0.92, 0.02, 0.01]} />
        <meshBasicMaterial color="#183049" transparent opacity={0.7 * progress} />
      </mesh>
      <mesh position={[-8.85, 0.5, 0]}>
        <boxGeometry args={[0.64, 0.02, 0.01]} />
        <meshBasicMaterial color="#11263b" transparent opacity={0.52 * progress} />
      </mesh>
      <mesh position={[2.2, -2.58, 0]}>
        <boxGeometry args={[1.34, 0.02, 0.01]} />
        <meshBasicMaterial color="#152a40" transparent opacity={0.35 * progress} />
      </mesh>
    </group>
  )
}

function HubCard({ progress, position, rotation }) {
  return (
    <group position={position} rotation={rotation} scale={0.88 + progress * 0.12}>
      <mesh position={[0.18, -0.14, -0.12]}>
        <planeGeometry args={[3.25, 2.02]} />
        <meshBasicMaterial color="#020712" transparent opacity={0.24 * progress} />
      </mesh>
      <mesh>
        <boxGeometry args={[3.38, 2.08, 0.22]} />
        <meshStandardMaterial
          color="#0c1625"
          metalness={0.78}
          roughness={0.24}
          emissive="#3ec5ff"
          emissiveIntensity={0.05 * progress}
          transparent
          opacity={0.45 + progress * 0.55}
        />
      </mesh>
      <mesh position={[0, 0, 0.12]}>
        <planeGeometry args={[2.98, 1.68]} />
        <meshBasicMaterial color="#132337" transparent opacity={0.97 * progress} />
      </mesh>
      <mesh position={[0, 0.46, 0.13]}>
        <boxGeometry args={[2.9, 0.05, 0.01]} />
        <meshBasicMaterial color="#43cbff" transparent opacity={0.92 * progress} />
      </mesh>
      <mesh position={[-1.0, 0.16, 0.13]}>
        <boxGeometry args={[0.24, 0.24, 0.01]} />
        <meshBasicMaterial color="#17324d" transparent opacity={progress} />
      </mesh>
      <mesh position={[-1.0, 0.16, 0.14]}>
        <boxGeometry args={[0.12, 0.12, 0.01]} />
        <meshBasicMaterial color="#54d4ff" transparent opacity={progress} />
      </mesh>
      <mesh position={[-0.18, 0.18, 0.13]}>
        <boxGeometry args={[1.0, 0.06, 0.01]} />
        <meshBasicMaterial color="#eef7ff" transparent opacity={progress} />
      </mesh>
      <mesh position={[0.36, 0.03, 0.13]}>
        <boxGeometry args={[1.66, 0.04, 0.01]} />
        <meshBasicMaterial color="#8dcaf0" transparent opacity={0.72 * progress} />
      </mesh>
      <mesh position={[-0.84, -0.38, 0.13]}>
        <boxGeometry args={[1.08, 0.66, 0.01]} />
        <meshBasicMaterial color="#0f1d2d" transparent opacity={progress} />
      </mesh>
      <mesh position={[0.64, -0.26, 0.13]}>
        <boxGeometry args={[1.24, 0.82, 0.01]} />
        <meshBasicMaterial color="#10263a" transparent opacity={progress} />
      </mesh>
      <mesh position={[0.88, -0.26, 0.14]}>
        <boxGeometry args={[0.62, 0.42, 0.01]} />
        <meshBasicMaterial color="#174269" transparent opacity={0.95 * progress} />
      </mesh>
      <Text
        position={[-1.18, -0.5, 0.14]}
        fontSize={0.19}
        maxWidth={2.4}
        lineHeight={1.08}
        color="#f5fbff"
        anchorX="left"
        anchorY="middle"
        fillOpacity={progress}
      >
        DaveOps Automation Hub
      </Text>
      <Text
        position={[-1.18, -0.82, 0.14]}
        fontSize={0.097}
        maxWidth={2.45}
        lineHeight={1.12}
        color="#90c7ea"
        anchorX="left"
        anchorY="middle"
        fillOpacity={progress}
      >
        AI routing, CRM logic, messaging, and reporting across one workflow canvas
      </Text>
    </group>
  )
}

function AutomationDiagram({ scrollProgress = 0 }) {
  const [animatedProgress, setAnimatedProgress] = useState(0)
  const progressRef = useRef(0)
  const boardRef = useRef(null)
  const connectorsRef = useRef(null)
  const nodesRef = useRef(null)
  const rootRef = useRef(null)
  const nodeMap = useMemo(
    () => Object.fromEntries(workflowNodes.map((node) => [node.id, node])),
    [],
  )
  const { pointer } = useThree()

  useEffect(() => {
    const state = { value: progressRef.current }
    const tween = gsap.to(state, {
      value: scrollProgress,
      duration: 0.45,
      ease: 'power2.out',
      onUpdate: () => {
        progressRef.current = state.value
        setAnimatedProgress(state.value)
      },
    })

    return () => tween.kill()
  }, [scrollProgress])

  useFrame(() => {
    if (rootRef.current) {
      const targetX = 1.15 - animatedProgress * 5.1
      rootRef.current.position.x += (targetX - rootRef.current.position.x) * 0.045
      rootRef.current.position.y += ((-0.08 - animatedProgress * 0.16) - rootRef.current.position.y) * 0.045
    }

    if (boardRef.current) {
      boardRef.current.position.x += (pointer.x * 0.08 - boardRef.current.position.x) * 0.05
      boardRef.current.position.y += (pointer.y * 0.04 - boardRef.current.position.y) * 0.05
    }

    if (connectorsRef.current) {
      connectorsRef.current.position.x += (pointer.x * 0.16 - connectorsRef.current.position.x) * 0.06
      connectorsRef.current.position.y += (pointer.y * 0.08 - connectorsRef.current.position.y) * 0.06
    }

    if (nodesRef.current) {
      nodesRef.current.position.x += (pointer.x * 0.26 - nodesRef.current.position.x) * 0.07
      nodesRef.current.position.y += (pointer.y * 0.12 - nodesRef.current.position.y) * 0.07
    }
  })

  return (
    <group ref={rootRef} scale={0.59} rotation={[-0.92, 0, -0.16]} position={[1.15, -0.08, 0]}>
      <group ref={boardRef}>
        <BoardCard progress={1} />
      </group>
      <group ref={connectorsRef} position={[0, 0, 0.02]}>
        {workflowConnections.map((connection, index) => {
          const connectionProgress = stageReveal(connection.stage, animatedProgress, index % 3)
          return (
            <ConnectorLine
              key={`${connection.from}-${connection.to}`}
              from={nodeMap[connection.from].position}
              to={nodeMap[connection.to].position}
              mid={connection.mid}
              progress={connectionProgress}
            />
          )
        })}
      </group>
      <group ref={nodesRef} position={[0, 0, 0.08]}>
        {workflowNodes.map((node, index) => {
          const nodeProgress = stageReveal(node.stage, animatedProgress, index % 2)

          if (node.tone === 'hub') {
            return (
              <HubCard
                key={node.id}
                progress={nodeProgress}
                position={node.position}
                rotation={node.rotation}
              />
            )
          }

          return (
            <FloatingCard
              key={node.id}
              title={node.title}
              subtitle={node.subtitle}
              meta={node.meta}
              position={node.position}
              tone={node.tone}
              rotation={node.rotation}
              scale={node.scale}
              progress={nodeProgress}
              floatPhase={node.floatPhase}
              detailLevel={node.detailLevel}
            />
          )
        })}
      </group>
    </group>
  )
}

export default AutomationDiagram
