import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import AutomationDiagram from './AutomationDiagram'

function CameraParallax() {
  const { camera, pointer } = useThree()

  useFrame(() => {
    camera.position.x += ((pointer.x || 0) * 0.03 - camera.position.x) * 0.04
    camera.position.y += (0.01 + (pointer.y || 0) * 0.015 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })

  return null
}

function Scene() {
  return (
    <div className="scene-shell" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} shadows>
        <color attach="background" args={['#07111d']} />
        <fog attach="fog" args={['#07111d', 15.5, 24]} />
        <PerspectiveCamera makeDefault position={[0.02, 0.04, 10.6]} fov={24.6} />
        <ambientLight intensity={1.02} />
        <directionalLight position={[1.8, 2.8, 6.4]} intensity={0.42} color="#8fdcff" castShadow />
        <pointLight position={[-3.2, 1.6, 4]} intensity={0.04} color="#d8f6ff" />
        <pointLight position={[2.8, -0.6, 3.4]} intensity={0.08} color="#2ea6ff" />
        <pointLight position={[0.2, 1.2, 6.2]} intensity={0.05} color="#bcecff" />
        <CameraParallax />
        <AutomationDiagram />
      </Canvas>
    </div>
  )
}

export default Scene
