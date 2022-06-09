import { useContext, useEffect, useRef } from "react"
import { SizeContext } from "../../context/Size"

export const Canvas: React.FC<CanvasProps> = ({
  wasm
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const size = useContext(SizeContext)

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement

    canvas.width = size.width
    canvas.height = size.height

    const { width, height } = canvas
    const ctx2d = canvas.getContext('2d') as CanvasRenderingContext2D

  }, [size])

  return (
    <canvas ref={canvasRef} className='absolute max-h-full max-w-full bg-neutral-900' />
  )
}

interface CanvasProps {
  wasm: WASM
}
