import { useEffect, useMemo, useState } from 'react'
import gsap from 'gsap'
import { Text } from '@react-three/drei'
import FloatingCard from './FloatingCard'
import ConnectorLine from './ConnectorLine'

const automationCards = [
  {
    title: 'Lead Capture',
    position: [-3.35, 1.62, 0.14],
    anchor: [-1.72, 0.84, 0.08],
    mid: [-2.58, 1.52, 0.1],
    tone: 'gold',
    rotation: [0, 0, -0.08],
    floatPhase: 0.4,
  },
  {
    title: 'GHL CRM',
    position: [-3.2, -0.12, 0.16],
    anchor: [-1.76, -0.05, 0.08],
    mid: [-2.46, 0.18, 0.1],
    tone: 'dark',
    rotation: [0, 0, -0.03],
    floatPhase: 1.2,
  },
  {
    title: 'n8n Backend',
    position: [-1.15, -1.88, 0.15],
    anchor: [-0.52, -1.0, 0.08],
    mid: [-1.26, -1.45, 0.1],
    tone: 'dark',
    rotation: [0, 0, 0.04],
    floatPhase: 2.1,
  },
  {
    title: 'AI Chat',
    position: [0.82, 2.02, 0.12],
    anchor: [0.45, 1.0, 0.08],
    mid: [0.98, 1.55, 0.1],
    tone: 'gold',
    rotation: [0, 0, 0.03],
    floatPhase: 2.8,
  },
  {
    title: 'Calendar Booking',
    position: [3.24, 1.24, 0.16],
    anchor: [1.72, 0.62, 0.08],
    mid: [2.55, 1.18, 0.1],
    tone: 'dark',
    rotation: [0, 0, 0.05],
    floatPhase: 3.6,
  },
  {
    title: 'SMS / Email',
    position: [3.36, -0.38, 0.16],
    anchor: [1.84, -0.12, 0.08],
    mid: [2.62, -0.08, 0.1],
    tone: 'gold',
    rotation: [0, 0, -0.04],
    floatPhase: 4.4,
  },
  {
    title: 'Dashboard Reporting',
    position: [1.9, -1.94, 0.18],
    anchor: [0.72, -1.02, 0.08],
    mid: [1.52, -1.48, 0.1],
    tone: 'dark',
    rotation: [0, 0, 0.03],
    scale: 1.04,
    floatPhase: 5.1,
  },
]

function HubCard({ progress = 1 }) {
  return (
    <group rotation={[0, 0, -0.08]} scale={0.82 + progress * 0.18}>
      <mesh position={[0.15, -0.15, -0.16]}>
        <planeGeometry args={[8.4, 5.6]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.16 * progress} />
      </mesh>
      <mesh position={[0, 0, -0.12]}>
        <boxGeometry args={[8.5, 5.55, 0.16]} />
        <meshStandardMaterial
          color="#0b0b0c"
          metalness={0.58}
          roughness={0.52}
          transparent
          opacity={0.45 + progress * 0.55}
        />
      </mesh>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[8.1, 5.2]} />
        <meshBasicMaterial color="#111112" transparent opacity={0.92 * progress} />
      </mesh>
      <mesh position={[0.12, 0.05, -0.01]}>
        <planeGeometry args={[7.45, 4.65]} />
        <meshBasicMaterial color="#131315" transparent opacity={0.55 * progress} />
      </mesh>
      <mesh position={[-2.5, 1.54, 0.01]}>
        <boxGeometry args={[1.46, 0.08, 0.01]} />
        <meshBasicMaterial color="#443112" transparent opacity={0.95 * progress} />
      </mesh>
      <mesh position={[2.62, -1.52, 0.01]}>
        <boxGeometry args={[1.62, 0.08, 0.01]} />
        <meshBasicMaterial color="#332811" transparent opacity={0.8 * progress} />
      </mesh>
      <mesh position={[0, 0, 0.11]}>
        <boxGeometry args={[3.82, 2.28, 0.22]} />
        <meshStandardMaterial
          color="#090909"
          metalness={0.88}
          roughness={0.22}
          transparent
          opacity={0.4 + progress * 0.6}
        />
      </mesh>
      <mesh position={[0, 0, 0.23]}>
        <planeGeometry args={[3.32, 1.78]} />
        <meshBasicMaterial color="#121214" transparent opacity={0.96 * progress} />
      </mesh>
      <mesh position={[-0.94, 0.55, 0.24]}>
        <boxGeometry args={[1.28, 0.12, 0.01]} />
        <meshBasicMaterial color="#f5e9d0" transparent opacity={progress} />
      </mesh>
      <mesh position={[-0.52, 0.18, 0.24]}>
        <boxGeometry args={[1.92, 0.08, 0.01]} />
        <meshBasicMaterial color="#916822" transparent opacity={progress} />
      </mesh>
      <mesh position={[0.85, 0.18, 0.24]}>
        <boxGeometry args={[0.72, 0.08, 0.01]} />
        <meshBasicMaterial color="#4b3814" transparent opacity={progress} />
      </mesh>
      <mesh position={[-1.02, -0.34, 0.24]}>
        <boxGeometry args={[1.18, 0.66, 0.01]} />
        <meshBasicMaterial color="#1b1b1d" transparent opacity={progress} />
      </mesh>
      <mesh position={[0.72, -0.22, 0.24]}>
        <boxGeometry args={[1.34, 0.82, 0.01]} />
        <meshBasicMaterial color="#7e5b1b" transparent opacity={progress} />
      </mesh>
      <mesh position={[1.18, 0.64, 0.24]}>
        <boxGeometry args={[0.46, 0.1, 0.01]} />
        <meshBasicMaterial color="#e1bc67" transparent opacity={progress} />
      </mesh>
      <Text
        position={[-1.14, -0.52, 0.25]}
        fontSize={0.23}
        maxWidth={2.8}
        lineHeight={1.1}
        color="#f8edd6"
        anchorX="left"
        anchorY="middle"
        fillOpacity={progress}
      >
        DaveOps Automation Hub
      </Text>
      <Text
        position={[-1.14, -0.86, 0.25]}
        fontSize={0.13}
        maxWidth={2.8}
        lineHeight={1.1}
        color="#cfa654"
        anchorX="left"
        anchorY="middle"
        fillOpacity={progress}
      >
        GoHighLevel, AI, routing, messaging, and reporting in one workflow board
      </Text>
      <mesh position={[0.15, -0.02, 0.2]}>
        <planeGeometry args={[3.98, 2.46]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.06 * progress} />
      </mesh>
    </group>
  )
}

function AutomationDiagram() {
  const [tick, setTick] = useState(0)
  const animationState = useMemo(
    () => ({
      hub: 0,
      nodes: automationCards.map(() => ({ card: 0, line: 0 })),
    }),
    [],
  )

  useEffect(() => {
    const timeline = gsap.timeline()
    const refresh = () => setTick((value) => value + 1)

    timeline.to(animationState, {
      hub: 1,
      duration: 0.55,
      ease: 'power2.out',
      onUpdate: refresh,
    })

    animationState.nodes.forEach((nodeState) => {
      timeline.to(
        nodeState,
        {
          card: 1,
          duration: 0.38,
          ease: 'back.out(1.55)',
          onUpdate: refresh,
        },
        '+=0.03',
      )
      timeline.to(nodeState, {
        line: 1,
        duration: 0.26,
        ease: 'power2.out',
        onUpdate: refresh,
      })
    })

    return () => timeline.kill()
  }, [animationState])

  void tick

  return (
    <group scale={0.98} rotation={[-0.96, 0, -0.2]} position={[0.1, -0.05, 0]}>
      <HubCard progress={animationState.hub} />
      {automationCards.map((node, index) => (
        <group key={node.title}>
          <ConnectorLine
            from={node.anchor}
            to={node.position}
            mid={node.mid}
            progress={animationState.nodes[index].line}
          />
          <FloatingCard
            title={node.title}
            position={node.position}
            tone={node.tone}
            rotation={node.rotation}
            scale={node.scale}
            progress={animationState.nodes[index].card}
            floatPhase={node.floatPhase}
          />
        </group>
      ))}
    </group>
  )
}

export default AutomationDiagram
