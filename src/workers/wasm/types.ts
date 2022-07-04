export enum WASMWorkerMessageType {
  ready = 'ready',
  render = 'render',
  renderCompleted = 'renderCompleted',
}

export type WASMWorkerReadyMessage = {
  type: WASMWorkerMessageType.ready
}

export type WASMWorkerRenderMessage = {
  type: WASMWorkerMessageType.render
  width: number,
  height: number,
  iterations: number,
  backgroundBrightness: number,
  rectBrightnessMin: number,
  rectBrightnessMax: number,
}

export type WASMWorkerRenderCompletedMessage = {
  type: WASMWorkerMessageType.renderCompleted
  pixels: Uint8ClampedArray
}

export type WASMWorkerMessage =
  | WASMWorkerReadyMessage
  | WASMWorkerRenderMessage
  | WASMWorkerRenderCompletedMessage

export interface WASMWorker extends IWorker<WASMWorkerMessage> {}
