import { Canvas } from '@react-three/fiber'
import { Float, OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei'
import AutomationDiagram from './AutomationDiagram'

function Scene() {
  return (
    <div className="scene-shell" aria-hidden="true">
      <Canvas dpr={[1, 1.5]}>
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 8, 18]} />
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={42} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 3]} intensity={1.2} color="#ffd36b" />
        <pointLight position={[-5, -3, 2]} intensity={0.7} color="#b88a2d" />
        <Stars radius={80} depth={30} count={1200} factor={4} fade speed={0.4} />
        <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.25}>
          <AutomationDiagram />
        </Float>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} />
      </Canvas>
    </div>
  )
}

export default Scene
