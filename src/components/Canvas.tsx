import { useRef, useEffect } from 'react'
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../constants'

interface CanvasProps {
  wasm: WASM
}

export const Canvas: React.FC<CanvasProps> = ({
  wasm
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement

    canvas.width = DEFAULT_WIDTH
    canvas.height = DEFAULT_HEIGHT

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
  }, [wasm])

  return (
    <canvas ref={canvasRef} className='absolute max-h-full max-w-full bg-neutral-900' />
  )
}
