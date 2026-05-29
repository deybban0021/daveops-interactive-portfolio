import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import AutomationDiagram from './AutomationDiagram'

function CameraParallax() {
  const { camera, pointer } = useThree()

  useFrame(() => {
    camera.position.x += ((pointer.x || 0) * 0.22 - camera.position.x) * 0.04
    camera.position.y += (0.35 + (pointer.y || 0) * 0.12 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })

  return null
}

function Scene() {
  return (
    <div className="scene-shell" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} shadows>
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 12, 20]} />
        <PerspectiveCamera makeDefault position={[0, 0.35, 9.2]} fov={36} />
        <ambientLight intensity={0.92} />
        <directionalLight position={[5, 7, 6]} intensity={1.22} color="#ffd36b" castShadow />
        <pointLight position={[-4, 2, 4]} intensity={0.36} color="#fff1cb" />
        <pointLight position={[3, -2, 3]} intensity={0.28} color="#8f6a26" />
        <CameraParallax />
        <AutomationDiagram />
      </Canvas>
    </div>
  )
}

export default Scene
