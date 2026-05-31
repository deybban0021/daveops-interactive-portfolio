import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import HeroNodeLandscape from './HeroNodeLandscape'

function CameraParallax() {
  const { camera, pointer } = useThree()

  useFrame(() => {
    camera.position.x += ((pointer.x || 0) * 0.05 - camera.position.x) * 0.038
    camera.position.y += (0.04 + (pointer.y || 0) * 0.02 - camera.position.y) * 0.038
    camera.lookAt(0, 0, 0)
  })

  return null
}

function Scene() {
  return (
    <div className="scene-shell" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} shadows>
        <color attach="background" args={['#07111d']} />
        <fog attach="fog" args={['#07111d', 16, 28]} />
        <PerspectiveCamera makeDefault position={[0, 0.08, 11.4]} fov={25.8} />
        <ambientLight intensity={0.98} />
        <directionalLight position={[1.6, 3.4, 6.2]} intensity={0.48} color="#98e1ff" castShadow />
        <pointLight position={[-3.8, 1.8, 4]} intensity={0.08} color="#d8f6ff" />
        <pointLight position={[2.6, -0.4, 3.8]} intensity={0.12} color="#2ea6ff" />
        <pointLight position={[0.2, 1.6, 6.4]} intensity={0.08} color="#bcecff" />
        <CameraParallax />
        <HeroNodeLandscape />
      </Canvas>
    </div>
  )
}

export default Scene
