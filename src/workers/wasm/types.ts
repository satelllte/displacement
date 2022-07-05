export enum WASMWorkerMessageType {
  ready = 'ready',
  render = 'render',
  renderProgress = 'renderProgress',
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
  rectAlphaMin: number,
  rectAlphaMax: number,
}

export type WASMWorkerRenderProgressMessage = {
  type: WASMWorkerMessageType.renderProgress
  percent: number
}

export type WASMWorkerRenderCompletedMessage = {
  type: WASMWorkerMessageType.renderCompleted
  pixels: Uint8ClampedArray
}

export type WASMWorkerMessage =
  | WASMWorkerReadyMessage
  | WASMWorkerRenderMessage
  | WASMWorkerRenderProgressMessage
  | WASMWorkerRenderCompletedMessage

export interface WASMWorker extends IWorker<WASMWorkerMessage> {}
