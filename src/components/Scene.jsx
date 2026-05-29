import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import AutomationDiagram from './AutomationDiagram'

function CameraParallax() {
  const { camera, pointer } = useThree()

  useFrame(() => {
    camera.position.x += ((pointer.x || 0) * 0.07 - camera.position.x) * 0.04
    camera.position.y += (0.1 + (pointer.y || 0) * 0.04 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })

  return null
}

function Scene() {
  return (
    <div className="scene-shell" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} shadows>
        <color attach="background" args={['#07111d']} />
        <fog attach="fog" args={['#07111d', 11.5, 18]} />
        <PerspectiveCamera makeDefault position={[0.06, 0.08, 7.3]} fov={23.5} />
        <ambientLight intensity={1.16} />
        <directionalLight position={[3.8, 5, 6.4]} intensity={0.9} color="#88dcff" castShadow />
        <pointLight position={[-4.2, 2.2, 4.2]} intensity={0.16} color="#d8f6ff" />
        <pointLight position={[3.4, -1.5, 3.8]} intensity={0.18} color="#2ea6ff" />
        <pointLight position={[0.4, 1.5, 6.2]} intensity={0.16} color="#bcecff" />
        <CameraParallax />
        <AutomationDiagram />
      </Canvas>
    </div>
  )
}

export default Scene
