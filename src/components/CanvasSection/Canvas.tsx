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
        fetch('/out.wasm'),
        imports
      )
      
      console.log('wasmSource: ', wasmSource)

      const { instance } = wasmSource

      // @ts-ignore
      const ptr = instance.exports.create_buffer(width, height)

      // @ts-ignore
      const resultView = new Uint8ClampedArray(instance.exports.memory.buffer, ptr, width * height * 4)

      const draw = () => {
        console.info('---------- before ------')
        console.info('resultView[0]: ', resultView[0])
        console.info('resultView[4]: ', resultView[4])

        // @ts-ignore
        instance.exports.fill(ptr, width, height)
        
        console.info('---------- after fill 1 ------')
        console.info('resultView[0]: ', resultView[0])
        console.info('resultView[4]: ', resultView[4])
        
        // @ts-ignore
        instance.exports.fill(ptr, width, height)

        console.info('---------- after fill 2 ------')
        console.info('resultView[0]: ', resultView[0])
        console.info('resultView[4]: ', resultView[0])
        
        // TO BE USED ON CANVAS RESIZE OR DESTROY
        // @ts-ignore
        // instance.exports.destroy_buffer(ptr, width, height)

        imageData.data.set(resultView)

        ctx2d.putImageData(imageData, 0, 0)

        // requestAnimationFrame(draw)
      }

      draw()

      const drawJs = () => {
        const data = imageData.data
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.floor(Math.random() * 256)
          data[i + 1] = 0x33 
          data[i + 2] = 0xaa
          data[i + 3] = 0xff
        }
        ctx2d.putImageData(imageData, 0, 0)

        // requestAnimationFrame(drawJs)
      }

      // drawJs()
    })()

  }, [size])

  return (
    <canvas ref={canvasRef} className='absolute max-h-full max-w-full bg-neutral-900' />
  )
}

interface CanvasProps {
  wasm: WASM
}
