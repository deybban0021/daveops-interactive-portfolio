import { QuadraticBezierLine } from '@react-three/drei'

function ConnectorLine({ from, to, mid }) {
  return (
    <QuadraticBezierLine
      start={from}
      end={to}
      mid={mid}
      color="#d6a647"
      lineWidth={1.4}
      transparent
      opacity={0.82}
    />
  )
}

export default ConnectorLine
