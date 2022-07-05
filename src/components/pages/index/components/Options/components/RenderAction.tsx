import React from 'react'
import { useRecoilCallback } from 'recoil'
import { GraphicsManager } from '@/graphics'
import {
  iterationsState,
  backgroundBrightnessState,
  rectBrightnessMinState,
  rectBrightnessMaxState,
  rectAlphaMinState,
  rectAlphaMaxState,
} from '@/state'
import { CanvasContext } from '@/context/CanvasContext'
import { WASMContext } from '@/context/WASMContext'
import { WASMWorkerMessageType } from '@/workers/wasm/types'
import type { WASMWorkerRenderMessage } from '@/workers/wasm/types'
import { Button } from '@/components/ui/Button'

export const RenderAction = () => {
  const canvasRef = React.useContext(CanvasContext)
  const worker = React.useContext(WASMContext)

  const graphicsManagerRef = React.useRef<GraphicsManager>()

  const [renderInProgress, setRenderInProgress] = React.useState<boolean>(false)

  const disabled = !worker || renderInProgress

  React.useEffect(() => {
    if (!worker) {
      return
    }

    worker.onmessage = (event) => {
      switch (event.data.type) {
        case WASMWorkerMessageType.renderCompleted:
          const { pixels } = event.data

          const canvas = canvasRef.current as HTMLCanvasElement
          const context2d = canvas.getContext('2d') as CanvasRenderingContext2D
          const { width, height } = canvas

          const imageData = new ImageData(pixels, width, height)
          context2d.putImageData(imageData, 0, 0)

          setRenderInProgress(false)

          break
        
        case WASMWorkerMessageType.renderProgress:
          const { percent } = event.data

          console.info(`render | progress: ${percent}%`)

          break
      }
    }
  }, [worker, canvasRef])

  const render = useRecoilCallback(({ snapshot }) => async () => {
    if (!worker) {
      throw new Error('worker is not ready yet')
    }
    
    setRenderInProgress(true)
    
    const iterations = await snapshot.getPromise(iterationsState)
    const backgroundBrightness = await snapshot.getPromise(backgroundBrightnessState)
    const rectBrightnessMin = await snapshot.getPromise(rectBrightnessMinState)
    const rectBrightnessMax = await snapshot.getPromise(rectBrightnessMaxState)
    const rectAlphaMin = await snapshot.getPromise(rectAlphaMinState)
    const rectAlphaMax = await snapshot.getPromise(rectAlphaMaxState)

    const canvas = canvasRef.current as HTMLCanvasElement
    const { width, height } = canvas

    const renderMessage: WASMWorkerRenderMessage = {
      type: WASMWorkerMessageType.render,
      width,
      height,
      iterations,
      backgroundBrightness,
      rectBrightnessMin,
      rectBrightnessMax,
      rectAlphaMin,
      rectAlphaMax,
    }

    worker.postMessage(renderMessage)
  }, [worker, canvasRef])

  React.useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement

    const { width, height } = canvas

    const ctx = canvas.getContext('webgl2', { powerPreference: 'high-performance' } as WebGLContextAttributes)

    if (!ctx) {
      throw new Error('WebGL2 is not supported')
    }

    graphicsManagerRef.current = new GraphicsManager(ctx, width, height)
  }, [canvasRef])

  const renderShader = async () => {
    if (!graphicsManagerRef.current) {
      return
    }

    setRenderInProgress(true)

    await graphicsManagerRef.current.draw()

    setRenderInProgress(false)
  }

  return (
    <Button disabled={disabled} onClick={renderShader}>
      Render
    </Button>
  )
}
