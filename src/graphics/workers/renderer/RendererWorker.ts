import { RendererWorkerMessageType, RendererWorkerRenderCompletedMessage } from './types'
import type {
  RendererWorkerMessage
} from './types'
import { render } from '../../helpers/render'

declare const self: IDedicatedWorkerGlobalScope<RendererWorkerMessage>

const onCompleted = () => {
  const msg: RendererWorkerRenderCompletedMessage = {
    type: RendererWorkerMessageType.renderCompleted
  }
  self.postMessage(msg)
}

self.onmessage = (event) => {
  switch(event.data.type) {
    case RendererWorkerMessageType.render:
      const {
        canvas,
        width,
        height,
        iterations,
        backgroundBrightness,
        rectBrightnessMin,
        rectBrightnessMax,
        rectAlphaMin,
        rectAlphaMax,
      } = event.data

      console.info('worker -> render call')

      const ctx = canvas.getContext('2d')

      if (!ctx) {
        throw new Error('Cannot get 2d context of the offscreen canvas')
      }

      render(
        ctx,
        width,
        height,
        iterations,
        backgroundBrightness,
        rectBrightnessMin,
        rectBrightnessMax,
        rectAlphaMin,
        rectAlphaMax,
        onCompleted,
      )

      break
    }
}
