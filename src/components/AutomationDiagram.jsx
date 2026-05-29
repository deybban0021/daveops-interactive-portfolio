import { Text } from '@react-three/drei'
import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import FloatingCard from './FloatingCard'
import ConnectorLine from './ConnectorLine'

const workflowNodes = [
  {
    id: 'webhook',
    title: 'Webhook',
    position: [-4.7, 0.95, 0.1],
    rotation: [0, 0, -0.03],
    tone: 'dark',
    scale: 0.72,
    floatPhase: 0.3,
  },
  {
    id: 'lead-capture',
    title: 'Lead Capture',
    position: [-3.35, 0.95, 0.14],
    rotation: [0, 0, -0.02],
    tone: 'gold',
    scale: 0.92,
    floatPhase: 0.7,
  },
  {
    id: 'filter',
    title: 'Filter',
    position: [-2.05, 0.95, 0.1],
    rotation: [0, 0, 0.02],
    tone: 'dark',
    scale: 0.72,
    floatPhase: 1.1,
  },
  {
    id: 'ghl-crm',
    title: 'GHL CRM',
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
    position: [2.65, 0.55, 0.12],
    rotation: [0, 0, 0.02],
    tone: 'dark',
    scale: 0.76,
    floatPhase: 2.4,
  },
  {
    id: 'ai-chat',
    title: 'AI Chat',
    position: [4.1, 1.62, 0.14],
    rotation: [0, 0, 0.03],
    tone: 'gold',
    scale: 0.88,
    floatPhase: 2.8,
  },
  {
    id: 'sms-email',
    title: 'SMS / Email',
    position: [4.1, 0.25, 0.14],
    rotation: [0, 0, -0.02],
    tone: 'dark',
    scale: 0.88,
    floatPhase: 3.2,
  },
  {
    id: 'calendar-booking',
    title: 'Calendar Booking',
    position: [4.1, -1.1, 0.14],
    rotation: [0, 0, 0.02],
    tone: 'gold',
    scale: 0.9,
    floatPhase: 3.6,
  },
  {
    id: 'follow-up-logic',
    title: 'Follow-up Logic',
    position: [5.55, 0.25, 0.1],
    rotation: [0, 0, 0.01],
    tone: 'dark',
    scale: 0.72,
    floatPhase: 4,
  },
  {
    id: 'tag-update',
    title: 'Tag Update',
    position: [5.55, -1.1, 0.1],
    rotation: [0, 0, -0.02],
    tone: 'dark',
    scale: 0.72,
    floatPhase: 4.4,
  },
  {
    id: 'pipeline-update',
    title: 'Pipeline Update',
    position: [5.55, 1.62, 0.1],
    rotation: [0, 0, 0.01],
    tone: 'dark',
    scale: 0.74,
    floatPhase: 4.8,
  },
  {
    id: 'n8n-backend',
    title: 'n8n Backend',
    position: [1.15, -1.28, 0.14],
    rotation: [0, 0, 0.03],
    tone: 'dark',
    scale: 0.88,
    floatPhase: 5.2,
  },
  {
    id: 'dashboard-reporting',
    title: 'Dashboard Reporting',
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
          color="#0b0b0c"
          metalness={0.45}
          roughness={0.6}
          transparent
          opacity={0.4 + progress * 0.6}
        />
      </mesh>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[11.45, 5.35]} />
        <meshBasicMaterial color="#121214" transparent opacity={0.9 * progress} />
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
  const nodeMap = useMemo(
    () => Object.fromEntries(workflowNodes.map((node) => [node.id, node])),
    [],
  )

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

  return (
    <group scale={0.8} rotation={[-0.94, 0, -0.18]} position={[0.15, -0.12, 0]}>
      <BoardCard progress={hubProgress} />
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
            position={node.position}
            tone={node.tone}
            rotation={node.rotation}
            scale={node.scale}
            progress={nodeProgress}
            floatPhase={node.floatPhase}
          />
        )
      })}
    </group>
  )
}

export default AutomationDiagram
