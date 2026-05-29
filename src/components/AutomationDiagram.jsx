import { Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import FloatingCard from './FloatingCard'
import ConnectorLine from './ConnectorLine'

const workflowNodes = [
  {
    id: 'webhook',
    title: 'Webhook',
    subtitle: 'Inbound trigger',
    meta: 'POST /lead-intake',
    position: [-4.7, 0.95, 0.1],
    rotation: [0, 0, -0.03],
    tone: 'dark',
    scale: 0.72,
    floatPhase: 0.3,
  },
  {
    id: 'lead-capture',
    title: 'Lead Capture',
    subtitle: 'Form + landing page',
    meta: 'New lead • live',
    position: [-3.35, 0.95, 0.14],
    rotation: [0, 0, -0.02],
    tone: 'gold',
    scale: 0.92,
    floatPhase: 0.7,
  },
  {
    id: 'filter',
    title: 'Filter',
    subtitle: 'Qualification rule',
    meta: 'Score > 70',
    position: [-2.05, 0.95, 0.1],
    rotation: [0, 0, 0.02],
    tone: 'dark',
    scale: 0.72,
    floatPhase: 1.1,
  },
  {
    id: 'ghl-crm',
    title: 'GHL CRM',
    subtitle: 'Contact record sync',
    meta: 'Pipeline: Sales',
    position: [-0.78, 0.95, 0.14],
    rotation: [0, 0, 0.01],
    tone: 'gold',
    scale: 0.94,
    floatPhase: 1.6,
  },
  {
    id: 'daveops-hub',
    title: 'DaveOps Automation Hub',
    position: [0.92, 0.55, 0.18],
    rotation: [0, 0, -0.03],
    tone: 'hub',
    scale: 1.34,
    floatPhase: 2,
  },
  {
    id: 'router',
    title: 'Router',
    subtitle: 'Branch conditions',
    meta: '3 active paths',
    position: [2.65, 0.55, 0.12],
    rotation: [0, 0, 0.02],
    tone: 'dark',
    scale: 0.76,
    floatPhase: 2.4,
  },
  {
    id: 'ai-chat',
    title: 'AI Chat',
    subtitle: 'Response drafting',
    meta: 'Intent matched',
    position: [4.1, 1.62, 0.14],
    rotation: [0, 0, 0.03],
    tone: 'gold',
    scale: 0.88,
    floatPhase: 2.8,
  },
  {
    id: 'sms-email',
    title: 'SMS / Email',
    subtitle: 'Outbound follow-up',
    meta: 'Queued in 2 min',
    position: [4.1, 0.25, 0.14],
    rotation: [0, 0, -0.02],
    tone: 'dark',
    scale: 0.88,
    floatPhase: 3.2,
  },
  {
    id: 'calendar-booking',
    title: 'Calendar Booking',
    subtitle: 'Schedule conversion',
    meta: 'Next slot ready',
    position: [4.1, -1.1, 0.14],
    rotation: [0, 0, 0.02],
    tone: 'gold',
    scale: 0.9,
    floatPhase: 3.6,
  },
  {
    id: 'follow-up-logic',
    title: 'Follow-up Logic',
    subtitle: 'Delay + retry',
    meta: '3-step cadence',
    position: [5.55, 0.25, 0.1],
    rotation: [0, 0, 0.01],
    tone: 'dark',
    scale: 0.72,
    floatPhase: 4,
  },
  {
    id: 'tag-update',
    title: 'Tag Update',
    subtitle: 'Segment contact',
    meta: 'VIP nurture',
    position: [5.55, -1.1, 0.1],
    rotation: [0, 0, -0.02],
    tone: 'dark',
    scale: 0.72,
    floatPhase: 4.4,
  },
  {
    id: 'pipeline-update',
    title: 'Pipeline Update',
    subtitle: 'Stage transition',
    meta: 'Qualified lead',
    position: [5.55, 1.62, 0.1],
    rotation: [0, 0, 0.01],
    tone: 'dark',
    scale: 0.74,
    floatPhase: 4.8,
  },
  {
    id: 'n8n-backend',
    title: 'n8n Backend',
    subtitle: 'Workflow execution',
    meta: '8 nodes running',
    position: [1.15, -1.28, 0.14],
    rotation: [0, 0, 0.03],
    tone: 'dark',
    scale: 0.88,
    floatPhase: 5.2,
  },
  {
    id: 'dashboard-reporting',
    title: 'Dashboard Reporting',
    subtitle: 'Ops visibility',
    meta: 'CTR 34% ↑',
    position: [3.25, -2.38, 0.16],
    rotation: [0, 0, 0.03],
    tone: 'gold',
    scale: 0.98,
    floatPhase: 5.6,
  },
]

const workflowConnections = [
  { from: 'webhook', to: 'lead-capture', mid: [-4.02, 1.12, 0.1] },
  { from: 'lead-capture', to: 'filter', mid: [-2.7, 1.12, 0.1] },
  { from: 'filter', to: 'ghl-crm', mid: [-1.42, 1.12, 0.1] },
  { from: 'ghl-crm', to: 'daveops-hub', mid: [0.0, 1.05, 0.1] },
  { from: 'daveops-hub', to: 'router', mid: [1.92, 0.7, 0.1] },
  { from: 'router', to: 'ai-chat', mid: [3.34, 1.28, 0.1] },
  { from: 'router', to: 'sms-email', mid: [3.34, 0.44, 0.1] },
  { from: 'router', to: 'calendar-booking', mid: [3.34, -0.64, 0.1] },
  { from: 'ai-chat', to: 'pipeline-update', mid: [4.88, 1.86, 0.1] },
  { from: 'sms-email', to: 'follow-up-logic', mid: [4.84, 0.42, 0.1] },
  { from: 'calendar-booking', to: 'tag-update', mid: [4.82, -1.36, 0.1] },
  { from: 'daveops-hub', to: 'n8n-backend', mid: [1.08, -0.34, 0.1] },
  { from: 'n8n-backend', to: 'dashboard-reporting', mid: [2.2, -2.02, 0.1] },
]

function smoothStep(edge0, edge1, value) {
  const t = Math.min(Math.max((value - edge0) / (edge1 - edge0), 0), 1)
  return t * t * (3 - 2 * t)
}

function BoardCard({ progress }) {
  return (
    <group position={[0.4, 0.1, -0.02]} rotation={[0, 0, -0.03]}>
      <mesh position={[0.14, -0.12, -0.18]}>
        <planeGeometry args={[11.8, 5.9]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.14 * progress} />
      </mesh>
      <mesh position={[0, 0, -0.12]}>
        <boxGeometry args={[11.9, 5.8, 0.14]} />
        <meshStandardMaterial
          color="#111113"
          metalness={0.45}
          roughness={0.52}
          transparent
          opacity={0.4 + progress * 0.6}
        />
      </mesh>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[11.45, 5.35]} />
        <meshBasicMaterial color="#17171a" transparent opacity={0.92 * progress} />
      </mesh>
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[11.1, 5.02]} />
        <meshBasicMaterial color="#1b1b1f" transparent opacity={0.22 * progress} />
      </mesh>
      <mesh position={[-4.48, 2.1, 0]}>
        <boxGeometry args={[1.3, 0.08, 0.01]} />
        <meshBasicMaterial color="#4d3813" transparent opacity={progress} />
      </mesh>
      <mesh position={[-3.4, 2.1, 0]}>
        <boxGeometry args={[0.48, 0.08, 0.01]} />
        <meshBasicMaterial color="#e1bd69" transparent opacity={progress} />
      </mesh>
      <mesh position={[4.65, -2.02, 0]}>
        <boxGeometry args={[1.76, 0.08, 0.01]} />
        <meshBasicMaterial color="#2f2411" transparent opacity={0.7 * progress} />
      </mesh>
      <mesh position={[-5.0, 0.96, 0]}>
        <boxGeometry args={[0.72, 0.02, 0.01]} />
        <meshBasicMaterial color="#2f2a1b" transparent opacity={0.75 * progress} />
      </mesh>
      <mesh position={[-5.0, 0.65, 0]}>
        <boxGeometry args={[0.52, 0.02, 0.01]} />
        <meshBasicMaterial color="#242117" transparent opacity={0.55 * progress} />
      </mesh>
      <mesh position={[-3.9, 0.3, 0]}>
        <boxGeometry args={[0.92, 0.02, 0.01]} />
        <meshBasicMaterial color="#282318" transparent opacity={0.45 * progress} />
      </mesh>
      <mesh position={[1.0, -1.9, 0]}>
        <boxGeometry args={[1.12, 0.02, 0.01]} />
        <meshBasicMaterial color="#2d2619" transparent opacity={0.4 * progress} />
      </mesh>
    </group>
  )
}

function HubCard({ progress, position, rotation }) {
  return (
    <group
      position={position}
      rotation={rotation}
      scale={0.86 + progress * 0.14}
    >
      <mesh position={[0.16, -0.14, -0.12]}>
        <planeGeometry args={[2.98, 1.9]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.18 * progress} />
      </mesh>
      <mesh>
        <boxGeometry args={[3.12, 1.92, 0.22]} />
        <meshStandardMaterial
          color="#090909"
          metalness={0.88}
          roughness={0.22}
          emissive="#7a5819"
          emissiveIntensity={0.08 * progress}
          transparent
          opacity={0.42 + progress * 0.58}
        />
      </mesh>
      <mesh position={[0, 0, 0.12]}>
        <planeGeometry args={[2.72, 1.52]} />
        <meshBasicMaterial color="#131315" transparent opacity={0.96 * progress} />
      </mesh>
      <mesh position={[-0.8, 0.46, 0.13]}>
        <boxGeometry args={[0.86, 0.1, 0.01]} />
        <meshBasicMaterial color="#f5e7c5" transparent opacity={progress} />
      </mesh>
      <mesh position={[-0.5, 0.14, 0.13]}>
        <boxGeometry args={[1.42, 0.08, 0.01]} />
        <meshBasicMaterial color="#966d23" transparent opacity={progress} />
      </mesh>
      <mesh position={[0.7, 0.14, 0.13]}>
        <boxGeometry args={[0.5, 0.08, 0.01]} />
        <meshBasicMaterial color="#52401a" transparent opacity={progress} />
      </mesh>
      <mesh position={[-0.82, -0.34, 0.13]}>
        <boxGeometry args={[0.98, 0.56, 0.01]} />
        <meshBasicMaterial color="#1b1b1d" transparent opacity={progress} />
      </mesh>
      <mesh position={[0.56, -0.22, 0.13]}>
        <boxGeometry args={[1.16, 0.76, 0.01]} />
        <meshBasicMaterial color="#7b5b1d" transparent opacity={progress} />
      </mesh>
      <Text
        position={[-1.02, -0.5, 0.14]}
        fontSize={0.19}
        maxWidth={2.1}
        lineHeight={1.1}
        color="#f8edd6"
        anchorX="left"
        anchorY="middle"
        fillOpacity={progress}
      >
        DaveOps Automation Hub
      </Text>
      <Text
        position={[-1.02, -0.8, 0.14]}
        fontSize={0.1}
        maxWidth={2.2}
        lineHeight={1.15}
        color="#cfa654"
        anchorX="left"
        anchorY="middle"
        fillOpacity={progress}
      >
        CRM orchestration, AI logic, messaging, and reporting on one workflow canvas
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
  const nodeMap = useMemo(
    () => Object.fromEntries(workflowNodes.map((node) => [node.id, node])),
    [],
  )
  const { pointer } = useThree()

  useEffect(() => {
    const state = { value: progressRef.current }
    const tween = gsap.to(state, {
      value: scrollProgress,
      duration: 0.5,
      ease: 'power2.out',
      onUpdate: () => {
        progressRef.current = state.value
        setAnimatedProgress(state.value)
      },
    })

    return () => tween.kill()
  }, [scrollProgress])

  const hubProgress = smoothStep(0, 0.12, animatedProgress)

  useFrame(() => {
    if (boardRef.current) {
      boardRef.current.position.x += (pointer.x * 0.08 - boardRef.current.position.x) * 0.05
      boardRef.current.position.y += (pointer.y * 0.05 - boardRef.current.position.y) * 0.05
    }

    if (connectorsRef.current) {
      connectorsRef.current.position.x += (pointer.x * 0.16 - connectorsRef.current.position.x) * 0.06
      connectorsRef.current.position.y += (pointer.y * 0.1 - connectorsRef.current.position.y) * 0.06
    }

    if (nodesRef.current) {
      nodesRef.current.position.x += (pointer.x * 0.26 - nodesRef.current.position.x) * 0.07
      nodesRef.current.position.y += (pointer.y * 0.14 - nodesRef.current.position.y) * 0.07
    }
  })

  return (
    <group scale={0.8} rotation={[-0.94, 0, -0.18]} position={[0.15, -0.12, 0]}>
      <group ref={boardRef}>
        <BoardCard progress={hubProgress} />
      </group>
      <group ref={connectorsRef} position={[0, 0, 0.02]}>
        {workflowConnections.map((connection, index) => {
          const nodeProgress = smoothStep(
            0.12 + (index + 1) * 0.055,
            0.19 + (index + 1) * 0.055,
            animatedProgress,
          )

          return (
            <ConnectorLine
              key={`${connection.from}-${connection.to}`}
              from={nodeMap[connection.from].position}
              to={nodeMap[connection.to].position}
              mid={connection.mid}
              progress={nodeProgress}
            />
          )
        })}
      </group>

      <group ref={nodesRef} position={[0, 0, 0.08]}>
        {workflowNodes.map((node, index) => {
          const nodeProgress = smoothStep(
            0.06 + index * 0.06,
            0.16 + index * 0.06,
            animatedProgress,
          )

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
              detailLevel={index < 4 ? 'full' : 'compact'}
            />
          )
        })}
      </group>
    </group>
  )
}

export default AutomationDiagram
