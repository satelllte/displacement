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
    const imageDataRaw = ctx2d.getImageData(0, 0, width, height)
    console.info('[1] imageDataRaw: ', imageDataRaw)

    // first render demo
    const sum = wasm.add(12, 13)
    console.info('sum: ', sum)
    // wasm.fill(ctx2d, canvas.width, canvas.height)
    // console.info('filled')

    console.info('width: ', width)
    console.info('height: ', height)

    const byteSize = width * height * 4
    console.info('allocation byteSize: ', byteSize)
    console.info('[1] wasm.memory.buffer.byteLength: ', wasm.memory.buffer.byteLength)

    const pointer = wasm.alloc_2(byteSize)
    console.info('pointer: ', pointer)
    console.info('[2] wasm.memory.buffer.byteLength: ', wasm.memory.buffer.byteLength)

    const usub = new Uint8ClampedArray(wasm.memory.buffer, pointer, byteSize)
    console.info('[1] usub: ', usub)
    const imageData = new ImageData(usub, width, height)
    console.info('[1] imageData: ', imageData)

    wasm.fill(pointer, width, height)
    console.info('[2] usub: ', usub)
    console.info('[2] imageData: ', imageData)

    ctx2d.putImageData(imageData, 0, 0)
    
    // wasm.dealloc(pointer, byteSize);
    // console.info('wasm -> after: ', wasm)

    console.info('[2] imageDataRaw: ', imageDataRaw)

    console.info('dealloc ...')
    wasm.my_dealloc(pointer, byteSize)
    console.info('[3] wasm.memory.buffer.byteLength: ', wasm.memory.buffer.byteLength)
    console.info('[LAST] wasm: ', wasm)

    // SIZE CHANGE SCENARIO

    console.info('SIZE CHANGE SCENARIO')
    console.info('SIZE CHANGE SCENARIO')
    console.info('SIZE CHANGE SCENARIO')

    const width2 = 4096
    const height2 = 4096
    canvas.width = width2
    canvas.height = height2
    const byteSize2 = width2 * height2 * 4
    console.info('[BEFORE alloc] wasm.memory.buffer.byteLength: ', wasm.memory.buffer.byteLength)
    const pointer2 = wasm.alloc_2(byteSize2)
    console.info('[AFTER alloc] wasm.memory.buffer.byteLength: ', wasm.memory.buffer.byteLength)
    const usub2 = new Uint8ClampedArray(wasm.memory.buffer, pointer2, byteSize2)
    const imageData2 = new ImageData(usub2, width2, height2)
    wasm.fill(pointer2, width2, height2)
    ctx2d.putImageData(imageData2, 0, 0)

    console.info('DE-ALLOCATION')
    console.info('DE-ALLOCATION')
    console.info('DE-ALLOCATION')
    
    // CRASHES - find a way to fix
    // wasm.dealloc_2(pointer2, byteSize)
    console.info('[AFTER DE-ALLOC 1] wasm.memory.buffer.byteLength: ', wasm.memory.buffer.byteLength)
    // wasm.dealloc_2(pointer, byteSize2)
    console.info('[AFTER DE-ALLOC 2] wasm.memory.buffer.byteLength: ', wasm.memory.buffer.byteLength)


    // const pointer3 = wasm.my_alloc(byteSize2)
    // const pointer4 = wasm.my_alloc(byteSize2)
    // console.info('[AFTER alloc 3] wasm.memory.buffer.byteLength: ', wasm.memory.buffer.byteLength)

  }, [size])

  return (
    <canvas ref={canvasRef} className='absolute max-h-full max-w-full bg-neutral-900' />
  )
}

interface CanvasProps {
  wasm: WASM
}
