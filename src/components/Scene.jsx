import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import AutomationDiagram from './AutomationDiagram'

function CameraParallax() {
  const { camera, pointer } = useThree()

  useFrame(() => {
    camera.position.x += ((pointer.x || 0) * 0.1 - camera.position.x) * 0.04
    camera.position.y += (0.22 + (pointer.y || 0) * 0.06 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })

  return null
}

function Scene() {
  return (
    <div className="scene-shell" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} shadows>
        <color attach="background" args={['#07111d']} />
        <fog attach="fog" args={['#07111d', 11, 18]} />
        <PerspectiveCamera makeDefault position={[0.12, 0.18, 7.15]} fov={27.5} />
        <ambientLight intensity={1.08} />
        <directionalLight position={[4, 5.5, 6]} intensity={1.02} color="#6cd4ff" castShadow />
        <pointLight position={[-4, 2, 4]} intensity={0.26} color="#d8f6ff" />
        <pointLight position={[3, -2, 3]} intensity={0.22} color="#2ea6ff" />
        <pointLight position={[0, 1.5, 6]} intensity={0.24} color="#bcecff" />
        <CameraParallax />
        <AutomationDiagram />
      </Canvas>
    </div>
  )
}

export default Scene
