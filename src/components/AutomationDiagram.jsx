import { Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import FloatingCard from './FloatingCard'
import ConnectorLine from './ConnectorLine'

const stageThresholds = [0, 0.18, 0.34, 0.5, 0.66, 0.82, 0.92]
const stageCameraOffsets = [1.2, 0.4, -1.6, -3.2, -4.9, -6.8, -8.5]

const workflowNodes = [
  {
    id: 'webhook',
    title: 'Webhook',
    subtitle: 'Inbound trigger',
    meta: 'POST /lead-intake',
    position: [-5.1, 0.7, 0.1],
    rotation: [0, 0, -0.02],
    tone: 'default',
    scale: 0.84,
    floatPhase: 0.2,
    stage: 0,
    order: 0,
    detailLevel: 'full',
  },
  {
    id: 'lead-capture',
    title: 'Lead Capture',
    subtitle: 'Form + landing page',
    meta: 'New lead live',
    position: [-3.35, 0.78, 0.12],
    rotation: [0, 0, -0.01],
    tone: 'accent',
    scale: 1.02,
    floatPhase: 0.6,
    stage: 0,
    order: 1,
    detailLevel: 'full',
  },
  {
    id: 'filter',
    title: 'Filter',
    subtitle: 'Qualification rule',
    meta: 'Score above 70',
    position: [-1.45, 0.78, 0.1],
    rotation: [0, 0, 0.02],
    tone: 'default',
    scale: 0.84,
    floatPhase: 1,
    stage: 0,
    order: 2,
    detailLevel: 'full',
  },
  {
    id: 'ghl-crm',
    title: 'GHL CRM',
    subtitle: 'Contact sync',
    meta: 'Pipeline updated',
    position: [0.95, 0.62, 0.12],
    rotation: [0, 0, 0.01],
    tone: 'accent',
    scale: 1.05,
    floatPhase: 1.5,
    stage: 0,
    order: 3,
    detailLevel: 'full',
  },
  {
    id: 'daveops-hub',
    title: 'DaveOps Automation Hub',
    subtitle: 'Decision engine',
    meta: 'Central orchestration',
    position: [3.8, 0.08, 0.18],
    rotation: [0, 0, -0.02],
    tone: 'hub',
    scale: 1.26,
    floatPhase: 2,
    stage: 0,
    order: 4,
  },
  {
    id: 'pipelines',
    title: 'Pipelines',
    subtitle: 'Sales stages',
    meta: 'Lead progress',
    position: [1.55, 2.05, 0.1],
    rotation: [0, 0, 0.01],
    tone: 'default',
    scale: 0.8,
    floatPhase: 2.4,
    stage: 1,
    order: 0,
    detailLevel: 'compact',
  },
  {
    id: 'workflows',
    title: 'Workflows',
    subtitle: 'Trigger actions',
    meta: '7 active flows',
    position: [2.55, 1.35, 0.1],
    rotation: [0, 0, -0.01],
    tone: 'accent',
    scale: 0.86,
    floatPhase: 2.8,
    stage: 1,
    order: 1,
    detailLevel: 'compact',
  },
  {
    id: 'forms-surveys',
    title: 'Forms / Surveys',
    subtitle: 'Lead capture',
    meta: 'Multi-step intake',
    position: [1.62, -0.92, 0.1],
    rotation: [0, 0, 0.01],
    tone: 'default',
    scale: 0.82,
    floatPhase: 3.1,
    stage: 1,
    order: 2,
    detailLevel: 'compact',
  },
  {
    id: 'calendars',
    title: 'Calendars',
    subtitle: 'Booking logic',
    meta: 'Availability sync',
    position: [2.62, -1.62, 0.1],
    rotation: [0, 0, -0.01],
    tone: 'accent',
    scale: 0.84,
    floatPhase: 3.4,
    stage: 1,
    order: 3,
    detailLevel: 'compact',
  },
  {
    id: 'opportunities',
    title: 'Opportunities',
    subtitle: 'Pipeline view',
    meta: 'Stage tracking',
    position: [0.95, -2.08, 0.1],
    rotation: [0, 0, 0.01],
    tone: 'default',
    scale: 0.8,
    floatPhase: 3.7,
    stage: 1,
    order: 4,
    detailLevel: 'compact',
  },
  {
    id: 'router',
    title: 'Router',
    subtitle: 'Path selection',
    meta: 'Branch conditions',
    position: [6.65, 0.18, 0.1],
    rotation: [0, 0, 0.01],
    tone: 'default',
    scale: 0.84,
    floatPhase: 4,
    stage: 2,
    order: 0,
    detailLevel: 'compact',
  },
  {
    id: 'n8n-backend',
    title: 'n8n Backend',
    subtitle: 'Workflow execution',
    meta: '8 nodes running',
    position: [8.85, -0.58, 0.12],
    rotation: [0, 0, 0.02],
    tone: 'accent',
    scale: 0.94,
    floatPhase: 4.3,
    stage: 2,
    order: 1,
    detailLevel: 'compact',
  },
  {
    id: 'webhook-logic',
    title: 'Webhook Logic',
    subtitle: 'Payload parsing',
    meta: 'Mapped fields',
    position: [8.3, 1.38, 0.1],
    rotation: [0, 0, -0.01],
    tone: 'default',
    scale: 0.82,
    floatPhase: 4.6,
    stage: 2,
    order: 2,
    detailLevel: 'compact',
  },
  {
    id: 'follow-up-logic',
    title: 'Follow-up Logic',
    subtitle: 'Delay + retry',
    meta: '3-step cadence',
    position: [11.0, -0.58, 0.1],
    rotation: [0, 0, 0.01],
    tone: 'default',
    scale: 0.82,
    floatPhase: 4.9,
    stage: 2,
    order: 3,
    detailLevel: 'compact',
  },
  {
    id: 'tag-update',
    title: 'Tag Update',
    subtitle: 'Segmentation',
    meta: 'CRM labels synced',
    position: [11.35, 0.9, 0.1],
    rotation: [0, 0, -0.01],
    tone: 'default',
    scale: 0.78,
    floatPhase: 5.1,
    stage: 2,
    order: 4,
    detailLevel: 'compact',
  },
  {
    id: 'ai-chat',
    title: 'AI Chat',
    subtitle: 'Response drafting',
    meta: 'Intent matched',
    position: [12.75, 2.05, 0.12],
    rotation: [0, 0, 0.01],
    tone: 'accent',
    scale: 0.92,
    floatPhase: 5.4,
    stage: 3,
    order: 0,
    detailLevel: 'compact',
  },
  {
    id: 'openai-api',
    title: 'OpenAI API',
    subtitle: 'Model connection',
    meta: 'Prompt routing',
    position: [15.0, 2.45, 0.1],
    rotation: [0, 0, -0.01],
    tone: 'default',
    scale: 0.8,
    floatPhase: 5.7,
    stage: 3,
    order: 1,
    detailLevel: 'compact',
  },
  {
    id: 'google-chat-ai',
    title: 'Google Chat AI',
    subtitle: 'Team messaging',
    meta: 'Ops alerts',
    position: [15.15, 1.0, 0.1],
    rotation: [0, 0, 0.01],
    tone: 'default',
    scale: 0.8,
    floatPhase: 6,
    stage: 3,
    order: 2,
    detailLevel: 'compact',
  },
  {
    id: 'conversation-assistant',
    title: 'Conversation Assistant',
    subtitle: 'Support context',
    meta: 'Reply suggestions',
    position: [17.25, 1.72, 0.1],
    rotation: [0, 0, -0.01],
    tone: 'default',
    scale: 0.78,
    floatPhase: 6.3,
    stage: 3,
    order: 3,
    detailLevel: 'compact',
  },
  {
    id: 'sms-email',
    title: 'SMS / Email',
    subtitle: 'Outbound follow-up',
    meta: 'Queued in 2 min',
    position: [13.72, -0.65, 0.12],
    rotation: [0, 0, 0.01],
    tone: 'accent',
    scale: 0.9,
    floatPhase: 6.6,
    stage: 3,
    order: 4,
    detailLevel: 'compact',
  },
  {
    id: 'dashboard-reporting',
    title: 'Dashboard Reporting',
    subtitle: 'Ops visibility',
    meta: 'Custom frontend',
    position: [12.35, -2.68, 0.12],
    rotation: [0, 0, 0.01],
    tone: 'accent',
    scale: 0.96,
    floatPhase: 6.9,
    stage: 4,
    order: 0,
    detailLevel: 'compact',
  },
  {
    id: 'lead-tracking',
    title: 'Lead Tracking',
    subtitle: 'CRM metrics',
    meta: 'Source attribution',
    position: [14.75, -2.18, 0.1],
    rotation: [0, 0, -0.01],
    tone: 'default',
    scale: 0.8,
    floatPhase: 7.2,
    stage: 4,
    order: 1,
    detailLevel: 'compact',
  },
  {
    id: 'monthly-stats',
    title: 'Monthly Stats',
    subtitle: 'Reporting snapshots',
    meta: 'Client review ready',
    position: [17.0, -2.95, 0.1],
    rotation: [0, 0, 0.01],
    tone: 'default',
    scale: 0.8,
    floatPhase: 7.5,
    stage: 4,
    order: 2,
    detailLevel: 'compact',
  },
  {
    id: 'pipeline-update',
    title: 'Pipeline Update',
    subtitle: 'Stage transition',
    meta: 'Qualified lead',
    position: [14.35, -0.98, 0.1],
    rotation: [0, 0, 0.01],
    tone: 'default',
    scale: 0.8,
    floatPhase: 7.8,
    stage: 4,
    order: 3,
    detailLevel: 'compact',
  },
  {
    id: 'client-dashboard',
    title: 'Client Dashboard',
    subtitle: 'Front-end layer',
    meta: 'Live reporting',
    position: [17.25, -1.52, 0.1],
    rotation: [0, 0, -0.01],
    tone: 'accent',
    scale: 0.9,
    floatPhase: 8.1,
    stage: 4,
    order: 4,
    detailLevel: 'compact',
  },
  {
    id: 'property-strats',
    title: 'Property Strats',
    subtitle: 'GHL + n8n + reporting',
    meta: 'Lead handling system',
    position: [18.7, 1.6, 0.14],
    rotation: [0, 0, 0.01],
    tone: 'accent',
    scale: 1.06,
    floatPhase: 8.4,
    stage: 5,
    order: 0,
    detailLevel: 'full',
  },
  {
    id: 'legacy-link',
    title: 'The Legacy Link',
    subtitle: 'Funnels + reminders',
    meta: 'Webinar operations',
    position: [19.2, -0.1, 0.14],
    rotation: [0, 0, -0.01],
    tone: 'default',
    scale: 1.02,
    floatPhase: 8.7,
    stage: 5,
    order: 1,
    detailLevel: 'full',
  },
  {
    id: 'kimble-wealth-a2p',
    title: 'Kimble Wealth A2P',
    subtitle: 'Compliance structure',
    meta: 'SMS campaign support',
    position: [19.0, -1.85, 0.14],
    rotation: [0, 0, 0.01],
    tone: 'default',
    scale: 1.02,
    floatPhase: 9,
    stage: 5,
    order: 2,
    detailLevel: 'full',
  },
  {
    id: 'custom-ghl-dashboard',
    title: 'Custom GHL Dashboard',
    subtitle: 'AI frontend + n8n backend',
    meta: 'Monthly performance',
    position: [21.35, -3.05, 0.14],
    rotation: [0, 0, -0.01],
    tone: 'accent',
    scale: 1.08,
    floatPhase: 9.3,
    stage: 5,
    order: 3,
    detailLevel: 'full',
  },
  {
    id: 'build-your-system',
    title: 'Build Your System',
    subtitle: 'Next workflow node',
    meta: 'Ready when you are',
    position: [24.25, -0.52, 0.18],
    rotation: [0, 0, 0],
    tone: 'accent',
    scale: 1.18,
    floatPhase: 9.8,
    stage: 6,
    order: 0,
    detailLevel: 'full',
  },
]

const workflowConnections = [
  { from: 'webhook', to: 'lead-capture', mid: [-4.2, 0.95, 0.1], stage: 0, order: 0 },
  { from: 'lead-capture', to: 'filter', mid: [-2.4, 0.98, 0.1], stage: 0, order: 1 },
  { from: 'filter', to: 'ghl-crm', mid: [-0.2, 0.98, 0.1], stage: 0, order: 2 },
  { from: 'ghl-crm', to: 'daveops-hub', mid: [2.2, 0.75, 0.1], stage: 0, order: 3 },
  { from: 'ghl-crm', to: 'pipelines', mid: [1.2, 1.5, 0.1], stage: 1, order: 0 },
  { from: 'ghl-crm', to: 'workflows', mid: [1.95, 1.02, 0.1], stage: 1, order: 1 },
  { from: 'ghl-crm', to: 'forms-surveys', mid: [1.1, -0.18, 0.1], stage: 1, order: 2 },
  { from: 'ghl-crm', to: 'calendars', mid: [1.75, -0.82, 0.1], stage: 1, order: 3 },
  { from: 'ghl-crm', to: 'opportunities', mid: [0.72, -1.18, 0.1], stage: 1, order: 4 },
  { from: 'daveops-hub', to: 'router', mid: [5.1, 0.34, 0.1], stage: 2, order: 0 },
  { from: 'daveops-hub', to: 'n8n-backend', mid: [6.1, -0.55, 0.1], stage: 2, order: 1 },
  { from: 'router', to: 'webhook-logic', mid: [7.5, 0.98, 0.1], stage: 2, order: 2 },
  { from: 'n8n-backend', to: 'follow-up-logic', mid: [10.0, -0.26, 0.1], stage: 2, order: 3 },
  { from: 'router', to: 'tag-update', mid: [9.5, 0.82, 0.1], stage: 2, order: 4 },
  { from: 'router', to: 'ai-chat', mid: [10.0, 1.52, 0.1], stage: 3, order: 0 },
  { from: 'ai-chat', to: 'openai-api', mid: [13.86, 2.54, 0.1], stage: 3, order: 1 },
  { from: 'ai-chat', to: 'google-chat-ai', mid: [13.88, 1.34, 0.1], stage: 3, order: 2 },
  { from: 'google-chat-ai', to: 'conversation-assistant', mid: [16.18, 1.64, 0.1], stage: 3, order: 3 },
  { from: 'follow-up-logic', to: 'sms-email', mid: [12.1, -0.46, 0.1], stage: 3, order: 4 },
  { from: 'n8n-backend', to: 'dashboard-reporting', mid: [10.72, -1.9, 0.1], stage: 4, order: 0 },
  { from: 'dashboard-reporting', to: 'lead-tracking', mid: [13.52, -2.1, 0.1], stage: 4, order: 1 },
  { from: 'lead-tracking', to: 'monthly-stats', mid: [15.98, -2.86, 0.1], stage: 4, order: 2 },
  { from: 'dashboard-reporting', to: 'pipeline-update', mid: [13.32, -1.62, 0.1], stage: 4, order: 3 },
  { from: 'pipeline-update', to: 'client-dashboard', mid: [15.88, -1.34, 0.1], stage: 4, order: 4 },
  { from: 'client-dashboard', to: 'property-strats', mid: [18.15, 0.5, 0.1], stage: 5, order: 0 },
  { from: 'client-dashboard', to: 'legacy-link', mid: [18.28, -0.78, 0.1], stage: 5, order: 1 },
  { from: 'dashboard-reporting', to: 'kimble-wealth-a2p', mid: [15.75, -2.44, 0.1], stage: 5, order: 2 },
  { from: 'lead-tracking', to: 'custom-ghl-dashboard', mid: [18.22, -2.98, 0.1], stage: 5, order: 3 },
  { from: 'custom-ghl-dashboard', to: 'build-your-system', mid: [22.85, -1.88, 0.1], stage: 6, order: 0 },
]

function stageReveal(stage, activeStage, order, scrollProgress) {
  const base = stage <= activeStage ? 1 : 0
  if (base === 0) {
    return 0
  }

  const stageWindowStart = stageThresholds[Math.min(stage, stageThresholds.length - 1)]
  const stageWindowEnd = Math.min(stageWindowStart + 0.16, 1)
  const scrollFactor = stage === 0 ? 1 : smoothStep(stageWindowStart, stageWindowEnd, scrollProgress)
  const orderedFactor = smoothStep(0, 0.22, scrollFactor - order * 0.025)

  return orderedFactor
}

function BoardCard({ progress, activeStage }) {
  return (
    <group position={[9.8, -0.05, -0.06]} rotation={[0, 0, -0.018]}>
      <mesh position={[0.18, -0.12, -0.18]}>
        <planeGeometry args={[31.8, 10.8]} />
        <meshBasicMaterial color="#020712" transparent opacity={0.18 * progress} />
      </mesh>
      <mesh position={[0, 0, -0.12]}>
        <boxGeometry args={[32, 10.7, 0.14]} />
        <meshStandardMaterial
          color="#0b1320"
          metalness={0.42}
          roughness={0.48}
          transparent
          opacity={0.46 + progress * 0.54}
        />
      </mesh>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[31.2, 9.96]} />
        <meshBasicMaterial color="#0f1928" transparent opacity={0.94 * progress} />
      </mesh>
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[30.5, 9.4]} />
        <meshBasicMaterial color="#132032" transparent opacity={0.24 * progress} />
      </mesh>
      <mesh position={[-12.45, 3.54, 0]}>
        <boxGeometry args={[1.8, 0.08, 0.01]} />
        <meshBasicMaterial color="#1a3552" transparent opacity={progress} />
      </mesh>
      <mesh position={[-10.95, 3.54, 0]}>
        <boxGeometry args={[0.56, 0.08, 0.01]} />
        <meshBasicMaterial color="#4ccfff" transparent opacity={progress} />
      </mesh>
      <mesh position={[11.8, -3.8, 0]}>
        <boxGeometry args={[2.2, 0.08, 0.01]} />
        <meshBasicMaterial color="#13324f" transparent opacity={(0.45 + activeStage * 0.07) * progress} />
      </mesh>
      <mesh position={[-11.7, 1.1, 0]}>
        <boxGeometry args={[0.92, 0.02, 0.01]} />
        <meshBasicMaterial color="#183049" transparent opacity={0.7 * progress} />
      </mesh>
      <mesh position={[-11.6, 0.76, 0]}>
        <boxGeometry args={[0.64, 0.02, 0.01]} />
        <meshBasicMaterial color="#11263b" transparent opacity={0.52 * progress} />
      </mesh>
      <mesh position={[3.0, -2.95, 0]}>
        <boxGeometry args={[1.36, 0.02, 0.01]} />
        <meshBasicMaterial color="#152a40" transparent opacity={0.35 * progress} />
      </mesh>
    </group>
  )
}

function HubCard({ progress, position, rotation }) {
  return (
    <group position={position} rotation={rotation} scale={0.88 + progress * 0.12}>
      <mesh position={[0.18, -0.14, -0.12]}>
        <planeGeometry args={[3.3, 2.08]} />
        <meshBasicMaterial color="#020712" transparent opacity={0.24 * progress} />
      </mesh>
      <mesh>
        <boxGeometry args={[3.45, 2.14, 0.22]} />
        <meshStandardMaterial
          color="#0c1625"
          metalness={0.78}
          roughness={0.24}
          emissive="#3ec5ff"
          emissiveIntensity={0.06 * progress}
          transparent
          opacity={0.45 + progress * 0.55}
        />
      </mesh>
      <mesh position={[0, 0, 0.12]}>
        <planeGeometry args={[3.04, 1.72]} />
        <meshBasicMaterial color="#132337" transparent opacity={0.97 * progress} />
      </mesh>
      <mesh position={[0, 0.48, 0.13]}>
        <boxGeometry args={[2.96, 0.05, 0.01]} />
        <meshBasicMaterial color="#43cbff" transparent opacity={0.92 * progress} />
      </mesh>
      <mesh position={[-1.05, 0.16, 0.13]}>
        <boxGeometry args={[0.26, 0.26, 0.01]} />
        <meshBasicMaterial color="#17324d" transparent opacity={progress} />
      </mesh>
      <mesh position={[-1.05, 0.16, 0.14]}>
        <boxGeometry args={[0.12, 0.12, 0.01]} />
        <meshBasicMaterial color="#54d4ff" transparent opacity={progress} />
      </mesh>
      <mesh position={[-0.16, 0.18, 0.13]}>
        <boxGeometry args={[1.12, 0.06, 0.01]} />
        <meshBasicMaterial color="#eef7ff" transparent opacity={progress} />
      </mesh>
      <mesh position={[0.38, 0.03, 0.13]}>
        <boxGeometry args={[1.76, 0.04, 0.01]} />
        <meshBasicMaterial color="#8dcaf0" transparent opacity={0.72 * progress} />
      </mesh>
      <mesh position={[-0.9, -0.38, 0.13]}>
        <boxGeometry args={[1.12, 0.7, 0.01]} />
        <meshBasicMaterial color="#0f1d2d" transparent opacity={progress} />
      </mesh>
      <mesh position={[0.68, -0.26, 0.13]}>
        <boxGeometry args={[1.3, 0.86, 0.01]} />
        <meshBasicMaterial color="#10263a" transparent opacity={progress} />
      </mesh>
      <mesh position={[0.92, -0.26, 0.14]}>
        <boxGeometry args={[0.66, 0.46, 0.01]} />
        <meshBasicMaterial color="#174269" transparent opacity={0.95 * progress} />
      </mesh>
      <Text
        position={[-1.22, -0.5, 0.14]}
        fontSize={0.19}
        maxWidth={2.5}
        lineHeight={1.08}
        color="#f5fbff"
        anchorX="left"
        anchorY="middle"
        fillOpacity={progress}
      >
        DaveOps Automation Hub
      </Text>
      <Text
        position={[-1.22, -0.82, 0.14]}
        fontSize={0.097}
        maxWidth={2.5}
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

function AutomationDiagram({ scrollProgress = 0, activeStage = 0 }) {
  const [animatedScroll, setAnimatedScroll] = useState(0)
  const [animatedStage, setAnimatedStage] = useState(0)
  const progressRef = useRef(0)
  const stageRef = useRef(0)
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
        setAnimatedScroll(state.value)
      },
    })

    return () => tween.kill()
  }, [scrollProgress])

  useEffect(() => {
    const state = { value: stageRef.current }
    const tween = gsap.to(state, {
      value: activeStage,
      duration: 0.55,
      ease: 'power2.out',
      onUpdate: () => {
        stageRef.current = state.value
        setAnimatedStage(state.value)
      },
    })

    return () => tween.kill()
  }, [activeStage])

  useFrame(() => {
    const stageIndex = Math.round(animatedStage)

    if (rootRef.current) {
      rootRef.current.position.x += (stageCameraOffsets[stageIndex] - rootRef.current.position.x) * 0.045
      rootRef.current.position.y += ((-0.02 - stageIndex * 0.04) - rootRef.current.position.y) * 0.045
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
      nodesRef.current.position.x += (pointer.x * 0.24 - nodesRef.current.position.x) * 0.07
      nodesRef.current.position.y += (pointer.y * 0.12 - nodesRef.current.position.y) * 0.07
    }
  })

  return (
    <group ref={rootRef} scale={0.52} rotation={[-0.9, 0, -0.14]} position={[1.2, -0.02, 0]}>
      <group ref={boardRef}>
        <BoardCard progress={1} activeStage={Math.round(animatedStage)} />
      </group>
      <group ref={connectorsRef} position={[0, 0, 0.02]}>
        {workflowConnections.map((connection) => (
          <ConnectorLine
            key={`${connection.from}-${connection.to}`}
            from={nodeMap[connection.from].position}
            to={nodeMap[connection.to].position}
            mid={connection.mid}
            progress={stageReveal(connection.stage, Math.round(animatedStage), connection.order, animatedScroll)}
          />
        ))}
      </group>
      <group ref={nodesRef} position={[0, 0, 0.08]}>
        {workflowNodes.map((node) => {
          const nodeProgress = stageReveal(
            node.stage,
            Math.round(animatedStage),
            node.order,
            animatedScroll,
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
              detailLevel={node.detailLevel}
            />
          )
        })}
      </group>
    </group>
  )
}

export default AutomationDiagram
