import React from 'react'
import { CanvasContext } from '../context/CanvasContext'
import { WASMWorkerContext } from '../context/WASMWorkerContext'
import { WASMWorkerMessageType } from '../workers/wasm/types'
import type { WASMWorkerRenderMessage } from '../workers/wasm/types'
import { Button } from './Button'

export const RenderAction = () => {
  const canvasRef = React.useContext(CanvasContext)
  const worker = React.useContext(WASMWorkerContext)

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
      }
    }
  }, [worker])

  const render = () => {
    if (!worker) {
      throw new Error('worker is not ready yet')
    }

    setRenderInProgress(true)

    const canvas = canvasRef.current as HTMLCanvasElement
    const { width, height } = canvas;

    const renderMessage: WASMWorkerRenderMessage = {
      type: WASMWorkerMessageType.render,
      width,
      height,
      iterationsCount: 50,
    }

    worker.postMessage(renderMessage)
  }

  return (
    <Button disabled={disabled} onClick={render}>
      Render
    </Button>
  )
}
