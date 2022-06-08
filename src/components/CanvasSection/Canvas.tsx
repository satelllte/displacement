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

    const ctx2d = canvas.getContext('2d') as CanvasRenderingContext2D
    const imageData = ctx2d.getImageData(0, 0, canvas.width, canvas.height)
    console.info('imageData: ', imageData);

    // first render demo
    setTimeout(() => {
      const sum = wasm.add(12, 13)
      console.info('sum: ', sum)
      wasm.fill(ctx2d, canvas.width, canvas.height)
      console.info('filled')
    }, 1000)
  }, [size])

  return (
    <canvas ref={canvasRef} className='max-h-full max-w-full box-border border-2 border-dashed border-cyan-900' />
  )
}

interface CanvasProps {
  wasm: WASM
}
