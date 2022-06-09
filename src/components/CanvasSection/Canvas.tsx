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

    ;(async() => {
      const imports: WebAssembly.Imports = {
        env: {
          // @ts-ignore
          emscripten_notify_memory_growth: () => {
            console.info('emscripten_notify_memory_growth')
          }
        },
      }

      console.log('imports: ', imports)

      const wasmSource = await WebAssembly.instantiateStreaming(
        fetch('/e.out.wasm'),
        imports
      )
      
      console.log('wasmSource: ', wasmSource)

      const { instance } = wasmSource

      const draw = () => {
        // @ts-ignore
        const ptr = instance.exports.create_buffer(width, height)
        
        // @ts-ignore
        instance.exports.fill(ptr, width, height)
        
        // @ts-ignore
        const resultView = new Uint8ClampedArray(instance.exports.memory.buffer, ptr, width * height * 4)
        
        // @ts-ignore
        instance.exports.destroy_buffer(p, width, height)

        imageData.data.set(resultView)

        ctx2d.putImageData(imageData, 0, 0)

        // requestAnimationFrame(draw)
      }

      draw()
    })()

  }, [size])

  return (
    <canvas ref={canvasRef} className='absolute max-h-full max-w-full bg-neutral-900' />
  )
}

interface CanvasProps {
  wasm: WASM
}
