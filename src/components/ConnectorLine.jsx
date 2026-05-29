import { Line } from '@react-three/drei'

function ConnectorLine({ from, to }) {
  return (
    <Line
      points={[from, to]}
      color="#d6a647"
      lineWidth={1.2}
      transparent
      opacity={0.78}
    />
  )
}

export default ConnectorLine
