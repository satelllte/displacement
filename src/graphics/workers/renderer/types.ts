import type { RenderOptions } from '../../types'

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
  options: RenderOptions,
}

export type RendererWorkerRenderCompletedMessage = {
  type: RendererWorkerMessageType.renderCompleted,
}

export type RendererWorkerMessage =
  | RendererWorkerInitializeMessage
  | RendererWorkerRenderMessage
  | RendererWorkerRenderCompletedMessage

export interface RendererWorker extends IWorker<RendererWorkerMessage> {}
