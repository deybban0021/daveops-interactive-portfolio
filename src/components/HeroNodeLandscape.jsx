import { Line, RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import * as THREE from 'three'

const nodes = [
  {
    id: 'ingest',
    position: [-2.9, -0.48, -0.08],
    size: [0.74, 0.74, 0.12],
    tone: 'muted',
    delay: 0,
  },
  {
    id: 'core',
    position: [-1.42, -0.1, 0.04],
    size: [1.2, 1.04, 0.16],
    tone: 'accent',
    delay: 0.08,
  },
  {
    id: 'branch-top',
    position: [0.2, -0.46, 0.08],
    size: [0.92, 0.78, 0.12],
    tone: 'muted',
    delay: 0.16,
  },
  {
    id: 'branch-mid',
    position: [0.2, 0.42, -0.02],
    size: [0.92, 0.78, 0.12],
    tone: 'muted',
    delay: 0.22,
  },
  {
    id: 'stack',
    position: [1.74, 0.08, 0.08],
    size: [1.12, 0.98, 0.16],
    tone: 'accent',
    delay: 0.3,
  },
  {
    id: 'report',
    position: [3.35, 0.34, -0.02],
    size: [1.62, 1.34, 0.18],
    tone: 'hero',
    delay: 0.38,
  },
]

const wires = [
  {
    from: [-2.48, -0.48, -0.06],
    mid: [-2.04, -0.34, 0.02],
    to: [-1.98, -0.1, 0.04],
  },
  {
    from: [-0.84, 0.04, 0.04],
    mid: [-0.2, 0.36, 0.08],
    to: [-0.26, 0.42, -0.02],
  },
  {
    from: [-0.82, -0.14, 0.04],
    mid: [-0.16, -0.42, 0.08],
    to: [-0.26, -0.46, 0.08],
  },
  {
    from: [0.66, 0.42, -0.02],
    mid: [1.02, 0.3, 0.04],
    to: [1.18, 0.18, 0.08],
  },
  {
    from: [0.66, -0.46, 0.08],
    mid: [1.08, -0.16, 0.08],
    to: [1.18, -0.02, 0.08],
  },
  {
    from: [2.3, 0.08, 0.08],
    mid: [2.82, 0.18, 0.06],
    to: [2.56, 0.34, -0.02],
  },
]

function buildCurvePoints(from, mid, to, progress) {
  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(...from),
    new THREE.Vector3(...mid),
    new THREE.Vector3(...to),
  )
  const segments = 40
  const safeProgress = Math.max(0.001, progress)
  const raw = curve.getPoints(segments).map((point) => point.toArray())
  const activeCount = Math.max(2, Math.ceil(segments * safeProgress) + 1)
  const points = raw.slice(0, activeCount)
  points[points.length - 1] = curve.getPoint(safeProgress).toArray()

  return {
    points,
    pulse: curve.getPoint(Math.max(0.03, progress * 0.88)).toArray(),
  }
}

function NodeBlock({ node, progress }) {
  const ref = useRef(null)
  const palette =
    node.tone === 'hero'
      ? {
          shell: '#08131f',
          face: '#0d1b2b',
          glow: '#43c8ff',
          border: '#8be7ff',
        }
      : node.tone === 'accent'
        ? {
            shell: '#09131f',
            face: '#0b1827',
            glow: '#35c0ff',
            border: '#65d6ff',
          }
        : {
            shell: '#0a1018',
            face: '#0b1522',
            glow: '#2599d9',
            border: '#4eb6e6',
          }

  useFrame((state) => {
    if (!ref.current) {
      return
    }

    const hover = Math.sin(state.clock.elapsedTime * 0.42 + node.delay * 7) * 0.06
    ref.current.position.y = node.position[1] + hover
    ref.current.rotation.z = node.rotationZ + Math.sin(state.clock.elapsedTime * 0.22 + node.delay) * 0.012
  })

  const opacity = progress * (node.tone === 'muted' ? 0.6 : 0.84)

  return (
    <group
      ref={ref}
      position={node.position}
      scale={0.84 + progress * 0.16}
      rotation={[0, 0, node.tone === 'hero' ? -0.03 : node.tone === 'accent' ? -0.016 : 0.02]}
    >
      <mesh position={[0.14, -0.12, -0.16]}>
        <planeGeometry args={[node.size[0] + 0.22, node.size[1] + 0.16]} />
        <meshBasicMaterial color="#020712" transparent opacity={0.09 * progress} />
      </mesh>
      <RoundedBox args={node.size} radius={0.13} smoothness={8}>
        <meshStandardMaterial
          color={palette.shell}
          metalness={0.26}
          roughness={0.2}
          emissive={palette.glow}
          emissiveIntensity={0.015 * progress}
          transparent
          opacity={opacity}
        />
      </RoundedBox>
      <mesh position={[0, 0, node.size[2] * 0.5 + 0.008]}>
        <planeGeometry args={[node.size[0] - 0.1, node.size[1] - 0.1]} />
        <meshBasicMaterial color={palette.face} transparent opacity={0.76 * progress} />
      </mesh>
      <mesh position={[0, node.size[1] * 0.34, node.size[2] * 0.5 + 0.014]}>
        <boxGeometry args={[node.size[0] - 0.12, 0.035, 0.01]} />
        <meshBasicMaterial color={palette.border} transparent opacity={0.78 * progress} />
      </mesh>
      <mesh position={[-node.size[0] * 0.22, 0.02, node.size[2] * 0.5 + 0.018]}>
        <boxGeometry args={[0.11, 0.11, 0.01]} />
        <meshBasicMaterial color={palette.glow} transparent opacity={0.62 * progress} />
      </mesh>
      <mesh position={[node.size[0] * 0.14, 0.1, node.size[2] * 0.5 + 0.018]}>
        <boxGeometry args={[node.size[0] * 0.38, 0.03, 0.01]} />
        <meshBasicMaterial color="#ddecf6" transparent opacity={0.42 * progress} />
      </mesh>
      <mesh position={[node.size[0] * 0.12, -0.02, node.size[2] * 0.5 + 0.018]}>
        <boxGeometry args={[node.size[0] * 0.44, 0.022, 0.01]} />
        <meshBasicMaterial color="#79b9de" transparent opacity={0.3 * progress} />
      </mesh>
      <mesh position={[node.size[0] * 0.18, -0.16, node.size[2] * 0.5 + 0.018]}>
        <boxGeometry args={[node.size[0] * 0.56, 0.014, 0.01]} />
        <meshBasicMaterial color="#1f4c70" transparent opacity={0.18 * progress} />
      </mesh>
      <mesh position={[-node.size[0] * 0.52, 0, node.size[2] * 0.5]}>
        <boxGeometry args={[0.03, 0.12, 0.05]} />
        <meshBasicMaterial color={palette.glow} transparent opacity={0.44 * progress} />
      </mesh>
      <mesh position={[node.size[0] * 0.52, 0, node.size[2] * 0.5]}>
        <boxGeometry args={[0.03, 0.12, 0.05]} />
        <meshBasicMaterial color={palette.glow} transparent opacity={0.44 * progress} />
      </mesh>
    </group>
  )
}

function Wire({ wire, progress, opacityMultiplier = 1, pulseOffset = 0 }) {
  const { points, pulse } = useMemo(
    () => buildCurvePoints(wire.from, wire.mid, wire.to, progress),
    [wire.from, wire.mid, wire.to, progress],
  )

  const pulseRef = useRef(null)

  useFrame((state) => {
    if (!pulseRef.current) {
      return
    }

    const shimmer = (Math.sin(state.clock.elapsedTime * 1.4 + pulseOffset) + 1) * 0.5
    pulseRef.current.scale.setScalar(0.65 + shimmer * 0.26)
  })

  return (
    <group>
      <Line
        points={points}
        color="#8ce8ff"
        lineWidth={1.8}
        transparent
        opacity={0.08 * progress * opacityMultiplier}
      />
      <Line
        points={points}
        color="#39bfff"
        lineWidth={0.96}
        transparent
        opacity={0.5 * progress * opacityMultiplier}
      />
      <mesh ref={pulseRef} position={pulse}>
        <sphereGeometry args={[0.038, 10, 10]} />
        <meshBasicMaterial color="#86e8ff" transparent opacity={0.46 * progress * opacityMultiplier} />
      </mesh>
    </group>
  )
}

function DotField() {
  const positions = useMemo(() => {
    const points = []
    for (let x = -7; x <= 7; x += 0.58) {
      for (let y = -3.4; y <= 3.4; y += 0.58) {
        points.push([x, y, -1.2 + Math.sin(x * 0.3 + y * 0.24) * 0.06])
      }
    }
    return points
  }, [])

  return (
    <group>
      {positions.map((point, index) => (
        <mesh key={index} position={point}>
          <circleGeometry args={[0.01, 8]} />
          <meshBasicMaterial color="#1f6ba4" transparent opacity={0.24} />
        </mesh>
      ))}
    </group>
  )
}

function HeroNodeLandscape() {
  const [intro, setIntro] = useState(() => ({
    nodes: nodes.map(() => 0),
    wires: wires.map(() => 0),
  }))
  const clusterRef = useRef(null)
  const backdropRef = useRef(null)

  useEffect(() => {
    const state = {
      nodes: nodes.map(() => 0),
      wires: wires.map(() => 0),
    }
    setIntro(state)

    const timeline = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onUpdate: () => {
        setIntro({
          nodes: [...state.nodes],
          wires: [...state.wires],
        })
      },
    })

    nodes.forEach((_, index) => {
      timeline.to(
        state.nodes,
        {
          [index]: 1,
          duration: index === nodes.length - 1 ? 0.38 : 0.28,
        },
        index === 0 ? 0.04 : '+=0.06',
      )

      if (index < wires.length) {
        timeline.to(state.wires, {
          [index]: 1,
          duration: 0.3,
          ease: 'power3.out',
        })
      }
    })

    return () => timeline.kill()
  }, [])

  useFrame((state) => {
    if (clusterRef.current) {
      clusterRef.current.position.y = -0.18 + Math.sin(state.clock.elapsedTime * 0.28) * 0.06
      clusterRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.12) * 0.012
    }

    if (backdropRef.current) {
      backdropRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.004
    }
  })

  return (
    <group>
      <group ref={backdropRef} position={[0.32, -0.2, -2.4]}>
        <DotField />
        <mesh position={[-0.4, -0.2, -0.2]}>
          <planeGeometry args={[14.4, 6.8]} />
          <meshBasicMaterial color="#07111d" transparent opacity={0.06} />
        </mesh>
        <mesh position={[2.6, -1.4, -0.06]}>
          <planeGeometry args={[5.2, 1.2]} />
          <meshBasicMaterial color="#0a1523" transparent opacity={0.18} />
        </mesh>
        <mesh position={[-1.8, -1.62, -0.04]}>
          <planeGeometry args={[4.4, 1.1]} />
          <meshBasicMaterial color="#0b1626" transparent opacity={0.14} />
        </mesh>
        <mesh position={[0.2, 1.34, -0.04]}>
          <planeGeometry args={[6.2, 1.6]} />
          <meshBasicMaterial color="#0f2135" transparent opacity={0.08} />
        </mesh>
      </group>

      <group ref={clusterRef} position={[0.86, -0.18, 0]}>
        {wires.map((wire, index) => (
          <Wire
            key={`wire-${index}`}
            wire={wire}
            progress={intro.wires[index]}
            opacityMultiplier={index === wires.length - 1 ? 0.9 : 0.72}
            pulseOffset={index * 0.5}
          />
        ))}

        {nodes.map((node, index) => (
          <NodeBlock key={node.id} node={node} progress={intro.nodes[index]} />
        ))}
      </group>
    </group>
  )
}

export default HeroNodeLandscape
