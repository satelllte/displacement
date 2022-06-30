export enum MessageType {
  ready,
  render,
  renderCompleted,
}

export type MessageReady = {
  type: MessageType.ready
}

export type MessageRender = {
  type: MessageType.render
  width: number,
  height: number,
  iterationsCount: number
}

export type MessageRenderCompleted = {
  type: MessageType.renderCompleted
  pixels: Uint8ClampedArray
}

export type Message =
  | MessageReady
  | MessageRender
  | MessageRenderCompleted

export interface WASMWorker extends Worker {
  onmessage: ((ev: MessageEvent<Message>) => void) | null
  postMessage(message: Message, transfer: Transferable[]): void
  postMessage(message: Message, options?: StructuredSerializeOptions): void
}
