import { randomInt } from '@/utils/random'
import { randRectPosition } from './utils/randRectPosition'
import { WASMWorkerMessageType, WASMWorkerRenderProgressMessage } from './types'
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
          rectAlphaMin,
          rectAlphaMax,
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
          const alpha = randomInt(rectAlphaMin, rectAlphaMax)
          const { x0, y0, x1, y1 } = randRectPosition(width, height)
          wasm.fillRect(
            brightness,
            brightness,
            brightness,
            alpha,
            x0,
            y0,
            x1,
            y1,
            width,
          )
          
          const renderProgressMessage: WASMWorkerRenderProgressMessage = {
            type: WASMWorkerMessageType.renderProgress,
            percent: (i / iterations) * 100,
          }

          self.postMessage(renderProgressMessage)
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
