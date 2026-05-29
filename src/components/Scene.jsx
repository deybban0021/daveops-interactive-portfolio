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
        <fog attach="fog" args={['#07111d', 15, 23]} />
        <PerspectiveCamera makeDefault position={[0.02, 0.02, 9.8]} fov={23.1} />
        <ambientLight intensity={1.08} />
        <directionalLight position={[2.4, 3.2, 6.4]} intensity={0.52} color="#8fdcff" castShadow />
        <pointLight position={[-3.2, 1.6, 4]} intensity={0.05} color="#d8f6ff" />
        <pointLight position={[2.8, -0.6, 3.4]} intensity={0.09} color="#2ea6ff" />
        <pointLight position={[0.2, 1.2, 6.2]} intensity={0.07} color="#bcecff" />
        <CameraParallax />
        <AutomationDiagram />
      </Canvas>
    </div>
  )
}

export default Scene
