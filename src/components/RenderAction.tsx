import React from 'react'
import { WASMWorkerContext } from '../context/WASMWorkerContext'
import { MessageRender, MessageType } from '../workers/wasm/types'
import { Button } from './Button'

export const RenderAction = () => {
  const worker = React.useContext(WASMWorkerContext)

  const disabled = !worker

  const render = () => {
    if (!worker) {
      throw new Error('worker is not ready yet')
    }

    const renderMessage: MessageRender = {
      type: MessageType.render,
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
