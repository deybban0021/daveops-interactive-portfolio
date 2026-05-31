import SplineScene from './SplineScene'

function Scene() {
  return (
    <div className="scene-shell" aria-hidden="true">
      <div className="scene-backdrop" />
      <div className="hero-artwork-stage">
        <SplineScene />
      </div>
    </div>
  )
}

export default Scene
