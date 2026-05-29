import { Canvas } from '@react-three/fiber'
import { Float, OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei'
import AutomationDiagram from './AutomationDiagram'

function Scene() {
  return (
    <div className="scene-shell" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} shadows>
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 10, 22]} />
        <PerspectiveCamera makeDefault position={[0, 0.35, 9.2]} fov={36} />
        <ambientLight intensity={0.9} />
        <directionalLight position={[6, 8, 5]} intensity={1.35} color="#ffd36b" castShadow />
        <pointLight position={[-5, -3, 3]} intensity={0.8} color="#9a6f1d" />
        <pointLight position={[0, 4, 1]} intensity={0.35} color="#fff4d6" />
        <Stars radius={90} depth={34} count={1000} factor={3.5} fade speed={0.3} />
        <Float speed={1} rotationIntensity={0.08} floatIntensity={0.18}>
          <AutomationDiagram />
        </Float>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.18} />
      </Canvas>
    </div>
  )
}

export default Scene
