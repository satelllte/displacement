import { render } from '../../helpers'
import { RendererWorkerMessageType, RendererWorkerRenderCompletedMessage } from './types'
import type {
  RendererWorkerMessage
} from './types'

declare const self: IDedicatedWorkerGlobalScope<RendererWorkerMessage>

let offscreenCanvas: OffscreenCanvas | null = null

const onCompleted = () => {
  const msg: RendererWorkerRenderCompletedMessage = {
    type: RendererWorkerMessageType.renderCompleted
  }
  self.postMessage(msg)
}

self.onmessage = (event) => {
  if (event.data.type === RendererWorkerMessageType.initialize) {
    const { canvas } = event.data
    offscreenCanvas = canvas
  }

  if (event.data.type === RendererWorkerMessageType.render) {
    const { options } = event.data

    if (!offscreenCanvas) {
      throw new Error('offscreenCanvas wasn\'t initialized')
    }

    const ctx = offscreenCanvas.getContext('2d')

    if (!ctx) {
      throw new Error('Cannot get 2d context of the offscreen canvas')
    }

    render(ctx, options, onCompleted)
  }
}
