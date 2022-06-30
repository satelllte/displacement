import {
  WASMWorker,
  MessageType,
  MessageReady,
  MessageRender,
} from './types'

(async() => {
  const wasm = await import('wasm/wasm_bg.wasm')

  const ctx = self as unknown as WASMWorker

  ctx.onmessage = (event) => {
    switch(event.data.type) {
      case MessageType.render:
        const { iterationsCount } = event.data
        console.info('MessageType.render | iterationsCount: ', iterationsCount)
        break
    }
  }

  ctx.postMessage({ type: MessageType.ready } as MessageReady)
})()

export {}
