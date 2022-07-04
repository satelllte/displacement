import { randomInt } from '../../utils/random'
import { WASMWorkerMessageType } from './types'
import type {
  WASMWorkerMessage,
  WASMWorkerReadyMessage,
  WASMWorkerRenderCompletedMessage,
} from './types'

declare var self: IDedicatedWorkerGlobalScope<WASMWorkerMessage>

(async() => {
  const wasm = await import('wasm/wasm_bg.wasm')

  const pointer = wasm.getBufferPointer()
  const buffer = wasm.memory.buffer

  self.onmessage = (event) => {
    switch(event.data.type) {
      case WASMWorkerMessageType.render:
        const {
          width,
          height,
          iterations,
          backgroundBrightness,
          rectBrightnessMin,
          rectBrightnessMax,
        } = event.data

        const pixels = new Uint8ClampedArray(buffer, pointer, width * height * 4)

        wasm.fill(
          backgroundBrightness,
          backgroundBrightness,
          backgroundBrightness,
          width,
          height,
        )

        for (let i = 0; i < iterations; i++) {
          const x0 = randomInt(0, width - 1)
          const y0 = randomInt(0, height - 1)
          const x1 = Math.min(x0 + randomInt(100, 750), width - 1)
          const y1 = Math.min(y0 + randomInt(100, 750), height - 1)
          const brightness = randomInt(rectBrightnessMin, rectBrightnessMax)
          wasm.fillRect(
            brightness,
            brightness,
            brightness,
            x0,
            y0,
            x1,
            y1,
            width,
          )
        }

        const renderCompletedMessage: WASMWorkerRenderCompletedMessage = {
          type: WASMWorkerMessageType.renderCompleted,
          pixels,
        }

        self.postMessage(renderCompletedMessage)

        break
    }
  }

  const readyMessage: WASMWorkerReadyMessage = {
    type: WASMWorkerMessageType.ready
  }

  self.postMessage(readyMessage)
})()
