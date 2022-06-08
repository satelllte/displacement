import { useContext, useEffect, useRef } from "react"
import { WASMContext } from "../context/WASM"

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement

    const { width, height } = canvas.getBoundingClientRect()

    canvas.width = width
    canvas.height = height

    const resizeObserver = new ResizeObserver(entries => {
      const entry = entries[0]
      const { width, height } = entry.contentRect

      canvas.width = width
      canvas.height = height
    })

    resizeObserver.observe(canvas)

    return () => resizeObserver.disconnect()
  }, [])

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
  )
}
