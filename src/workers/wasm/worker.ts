import { randomInt } from '@/utils/random'
import { randRectPosition } from './utils/randRectPosition'
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
          const brightness = randomInt(rectBrightnessMin, rectBrightnessMax)
          const { x0, y0, x1, y1 } = randRectPosition(width, height)
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
