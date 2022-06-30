import { randomInt } from '../../utils/random'
import { MessageType } from './types'
import type {
  WASMWorker,
  MessageReady,
  MessageRenderCompleted,
} from './types'

(async() => {
  const wasm = await import('wasm/wasm_bg.wasm')

  const pointer = wasm.getBufferPointer()
  const buffer = wasm.memory.buffer

  const ctx = self as unknown as WASMWorker

  ctx.onmessage = (event) => {
    switch(event.data.type) {
      case MessageType.render:
        const { iterationsCount, width, height } = event.data
        const pixels = new Uint8ClampedArray(buffer, pointer, width * height * 4)

        wasm.fillColor(
          randomInt(0x00, 0x99),
          randomInt(0x00, 0x99),
          randomInt(0x00, 0x99),
          width,
          height,
        )

        for (let i = 0; i < iterationsCount; i++) {
          const x0 = randomInt(0, width - 1)
          const y0 = randomInt(0, height - 1)
          const x1 = Math.min(x0 + randomInt(10, 100), width - 1)
          const y1 = Math.min(y0 + randomInt(10, 100), height - 1)
          wasm.fillRect(
            randomInt(0x00, 0x99),
            randomInt(0x00, 0x99),
            randomInt(0x00, 0x99),
            x0,
            y0,
            x1,
            y1,
            width,
          )
        }

        const renderCompletedMessage: MessageRenderCompleted = {
          type: MessageType.renderCompleted,
          pixels,
        }

        ctx.postMessage(renderCompletedMessage)

        break
    }
  }

  const readyMessage: MessageReady = {
    type: MessageType.ready
  }

  ctx.postMessage(readyMessage)
})()
