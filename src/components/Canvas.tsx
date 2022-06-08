import { useContext, useEffect, useRef } from "react"
import { SizeContext } from "../context/Size"
import { WASMContext } from "../context/WASM"

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const size = useContext(SizeContext)

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement

    canvas.width = size.width
    canvas.height = size.height
  }, [size])

  return (
    <canvas ref={canvasRef} className='max-h-full max-w-full box-border border-2 border-dashed border-cyan-900' />
  )
}
