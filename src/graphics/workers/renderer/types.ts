export enum RendererWorkerMessageType {
  render = 'render',
  renderCompleted = 'renderCompleted',
}

export type RendererWorkerRenderMessage = {
  type: RendererWorkerMessageType.render
  canvas: OffscreenCanvas,
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
  | RendererWorkerRenderMessage
  | RendererWorkerRenderCompletedMessage

export interface RendererWorker extends IWorker<RendererWorkerMessage> {}
