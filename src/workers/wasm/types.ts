export enum MessageType {
  ready,
  render,
}

export type MessageReady = {
  type: MessageType.ready
}

export type MessageRender = {
  type: MessageType.render
  iterationsCount: number
}

export type Message =
  | MessageReady
  | MessageRender

export interface WASMWorker extends Worker {
  onmessage: ((ev: MessageEvent<Message>) => void) | null
  postMessage(message: Message, transfer: Transferable[]): void
  postMessage(message: Message, options?: StructuredSerializeOptions): void
}
