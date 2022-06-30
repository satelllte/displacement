import React from 'react'
import { CanvasContext } from '../context/CanvasContext'
import { WASMWorkerContext } from '../context/WASMWorkerContext'
import { MessageType } from '../workers/wasm/types'
import type { MessageRender } from '../workers/wasm/types'
import { Button } from './Button'

export const RenderAction = () => {
  const canvasRef = React.useContext(CanvasContext)
  const worker = React.useContext(WASMWorkerContext)

  const ctx2dRef = React.useRef<CanvasRenderingContext2D>()
  const imageDataRef = React.useRef<ImageData>()

  const [renderInProgress, setRenderInProgress] = React.useState<boolean>(false)

  const disabled = !worker || renderInProgress // TODO: add a separate "loading" state to the button

  React.useEffect(() => {
    if (!worker) {
      return
    }

    worker.onmessage = (event) => {
      switch (event.data.type) {
        case MessageType.renderCompleted:
          const { pixels } = event.data

          if (!ctx2dRef.current) {
            throw new Error('"ctx2dRef" value is not set at render request')
          }

          if (!imageDataRef.current) {
            throw new Error('"imageDataRef" value is not set at render request')
          }

          imageDataRef.current.data.set(pixels)
          ctx2dRef.current.putImageData(imageDataRef.current, 0, 0)

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
    const { width, height } = canvas
    ctx2dRef.current = canvas.getContext('2d') as CanvasRenderingContext2D
    imageDataRef.current = ctx2dRef.current.getImageData(0, 0, width, height)

    const renderMessage: MessageRender = {
      type: MessageType.render,
      imageData: imageDataRef.current,
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
