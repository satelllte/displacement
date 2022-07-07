export enum RendererWorkerMessageType {
  initialize = 'initialize',
  render = 'render',
  renderCompleted = 'renderCompleted',
}

export type RendererWorkerInitializeMessage = {
  type: RendererWorkerMessageType.initialize,
  canvas: OffscreenCanvas,
}

export type RendererWorkerRenderMessage = {
  type: RendererWorkerMessageType.render
  width: number,
  height: number,
  iterations: number,
  backgroundBrightness: number,
  rectBrightnessMin: number,
  rectBrightnessMax: number,
  rectAlphaMin: number,
  rectAlphaMax: number,
}

export type RendererWorkerRenderCompletedMessage = {
  type: RendererWorkerMessageType.renderCompleted,
}

export type RendererWorkerMessage =
  | RendererWorkerInitializeMessage
  | RendererWorkerRenderMessage
  | RendererWorkerRenderCompletedMessage

export interface RendererWorker extends IWorker<RendererWorkerMessage> {}
