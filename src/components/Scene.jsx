import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import HeroNodeLandscape from './HeroNodeLandscape'

function CameraParallax() {
  const { camera, pointer } = useThree()

  useFrame(() => {
    camera.position.x += ((pointer.x || 0) * 0.035 - camera.position.x) * 0.03
    camera.position.y += (0.02 + (pointer.y || 0) * 0.018 - camera.position.y) * 0.03
    camera.lookAt(0, 0, 0)
  })

  return null
}

function Scene() {
  return (
    <div className="scene-shell" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} shadows>
        <color attach="background" args={['#07111d']} />
        <fog attach="fog" args={['#07111d', 15, 26]} />
        <PerspectiveCamera makeDefault position={[0, 0.02, 10.8]} fov={24.2} />
        <ambientLight intensity={0.94} />
        <directionalLight position={[1.8, 2.8, 6.2]} intensity={0.42} color="#a9e7ff" castShadow />
        <pointLight position={[-3.2, 1.2, 3.8]} intensity={0.06} color="#d8f6ff" />
        <pointLight position={[2.1, -0.2, 3.8]} intensity={0.12} color="#39bfff" />
        <pointLight position={[0.4, 1.1, 5.6]} intensity={0.1} color="#bcecff" />
        <CameraParallax />
        <HeroNodeLandscape />
      </Canvas>
    </div>
  )
}

export default Scene
