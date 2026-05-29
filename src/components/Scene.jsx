import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import AutomationDiagram from './AutomationDiagram'

function CameraParallax() {
  const { camera, pointer } = useThree()

  useFrame(() => {
    camera.position.x += ((pointer.x || 0) * 0.04 - camera.position.x) * 0.04
    camera.position.y += (0.03 + (pointer.y || 0) * 0.02 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })

  return null
}

function Scene() {
  return (
    <div className="scene-shell" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} shadows>
        <color attach="background" args={['#07111d']} />
        <fog attach="fog" args={['#07111d', 13.5, 20]} />
        <PerspectiveCamera makeDefault position={[0.08, 0.03, 7.5]} fov={18.8} />
        <ambientLight intensity={1.18} />
        <directionalLight position={[2.8, 3.8, 6.4]} intensity={0.74} color="#8fdcff" castShadow />
        <pointLight position={[-3.2, 1.6, 4]} intensity={0.08} color="#d8f6ff" />
        <pointLight position={[2.8, -0.6, 3.4]} intensity={0.14} color="#2ea6ff" />
        <pointLight position={[0.2, 1.2, 6.2]} intensity={0.1} color="#bcecff" />
        <CameraParallax />
        <AutomationDiagram />
      </Canvas>
    </div>
  )
}

export default Scene
