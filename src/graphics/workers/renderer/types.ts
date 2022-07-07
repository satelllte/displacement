export enum RendererWorkerMessageType {
  render = 'render',
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

export type RendererWorkerMessage =
  | RendererWorkerRenderMessage

export interface RendererWorker extends IWorker<RendererWorkerMessage> {}
