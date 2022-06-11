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
    const imageData = ctx2d.getImageData(0, 0, width, height)
    
    const ptr = wasm.getBufferPointer()
    const pixels = new Uint8ClampedArray(wasm.memory.buffer, ptr, width * height * 4)

    let r = 0x00

    const draw = () => {
      wasm.fillColor(r, 0x77, 0x77, width, height)
      
      imageData.data.set(pixels)
      ctx2d.putImageData(imageData, 0, 0)

      r++
      if (r <= 0xff) {
        requestAnimationFrame(draw)
      }
    }

    draw()
  }, [size])

  return (
    <canvas ref={canvasRef} className='absolute max-h-full max-w-full bg-neutral-900' />
  )
}

interface CanvasProps {
  wasm: WASM
}
