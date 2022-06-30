import React from 'react'
import { useRecoilCallback } from 'recoil'
import { iterationsState } from '../state'
import { CanvasContext } from '../context/CanvasContext'
import { WASMContext } from '../context/WASMContext'
import { WASMWorkerMessageType } from '../workers/wasm/types'
import type { WASMWorkerRenderMessage } from '../workers/wasm/types'
import { Button } from './Button'

export const RenderAction = () => {
  const canvasRef = React.useContext(CanvasContext)
  const worker = React.useContext(WASMContext)

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
  }, [worker, canvasRef])

  const render = useRecoilCallback(({ snapshot }) => async () => {
    if (!worker) {
      throw new Error('worker is not ready yet')
    }
    
    setRenderInProgress(true)
    
    const iterations = await snapshot.getPromise(iterationsState)

    const canvas = canvasRef.current as HTMLCanvasElement
    const { width, height } = canvas

    const renderMessage: WASMWorkerRenderMessage = {
      type: WASMWorkerMessageType.render,
      width,
      height,
      iterations,
    }

    worker.postMessage(renderMessage)
  }, [worker, canvasRef])

  return (
    <Button disabled={disabled} onClick={render}>
      Render
    </Button>
  )
}
