import { RendererWorkerMessageType } from './types'
import type {
  RendererWorkerMessage
} from './types'

declare const self: IDedicatedWorkerGlobalScope<RendererWorkerMessage>

self.onmessage = (event) => {
  switch(event.data.type) {
    case RendererWorkerMessageType.render:
      const {
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

      break
    }
}
