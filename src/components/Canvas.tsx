import { useRef, useEffect } from 'react'
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../constants'

interface CanvasProps {
  wasm: WASM
}

export const Canvas: React.FC<CanvasProps> = ({
  wasm
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  /**
   * WASM calls demo
   */
  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement

    const width = DEFAULT_WIDTH
    const height = DEFAULT_HEIGHT
    
    canvas.width = width
    canvas.height = height

    const ctx2d = canvas.getContext('2d') as CanvasRenderingContext2D
    const imageData = ctx2d.getImageData(0, 0, width, height)
    
    const ptr = wasm.getBufferPointer()
    const pixels = new Uint8ClampedArray(wasm.memory.buffer, ptr, width * height * 4)

    let g = 0x00

    const draw = () => {
      wasm.fillColor(0x11, g, 0x55, width, height)
      
      imageData.data.set(pixels)
      ctx2d.putImageData(imageData, 0, 0)

      g++
      if (g <= 0x77) {
        requestAnimationFrame(draw)
      }
    }

    setTimeout(draw, 3000)
  }, [wasm])

  return (
    <canvas ref={canvasRef} className='drop-shadow-xl absolute max-h-full max-w-full bg-neutral-900' />
  )
}
