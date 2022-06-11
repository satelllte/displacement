import { useContext } from "react"
import { WASMContext } from "../../context/WASMContext"
import { Canvas } from "./Canvas"

export const CanvasSection: React.FC<CanvasSectionProps> = ({
  className
}) => {
  const { wasm } = useContext(WASMContext)
  return (
    <section id="canvas-section" className={`m-4 relative flex justify-center items-center ${className}`}>
      {!wasm ? null : <Canvas wasm={wasm}/>}
    </section>
  )
}

CanvasSection.defaultProps = {
  className: ''
}

interface CanvasSectionProps {
  className?: string
}
