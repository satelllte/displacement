import { OffscreenCanvasFeature } from '@/utils/feature-detection'
import { render } from './helpers'
import type { RenderOptions } from './types'
import {
  RendererWorker,
  RendererWorkerInitializeMessage,
  RendererWorkerRenderMessage,
  RendererWorkerMessageType,
} from './workers/renderer/types'

export class Renderer {
  private ready: boolean = false
  private canvas: HTMLCanvasElement
  private offscreenSupported: boolean
  private ctx?: CanvasRenderingContext2D
  private offscreenCanvas?: OffscreenCanvas
  private rendererWorker?: RendererWorker

  constructor(
    canvas: HTMLCanvasElement,
    onReady: (renderer: Renderer) => void,
  ) {
    this.canvas = canvas
    this.offscreenSupported = OffscreenCanvasFeature.isSupported()

    this.init(onReady)
  }

  private async init(
    onReady: (renderer: Renderer) => void,
  ) {
    if (this.offscreenSupported) {
      this.offscreenCanvas = this.canvas.transferControlToOffscreen()
      this.rendererWorker = await new Worker(new URL('./workers/renderer', import.meta.url))
      
      const msg: RendererWorkerInitializeMessage = {
        type: RendererWorkerMessageType.initialize,
        canvas: this.offscreenCanvas
      }
      
      this.rendererWorker.postMessage(msg, [this.offscreenCanvas])
    } else {
      const ctx = this.canvas.getContext('2d')
      if (!ctx) {
        throw new Error('Count not get 2d context for canvas')
      }
      this.ctx = ctx
    }
    
    this.ready = true
    onReady(this)
  }

  public startRender(
    options: RenderOptions,
    onComplete: () => void,
  ) {
    if (!this.ready) {
      throw new Error('Renderer is not ready yet')
    }

    if (!this.offscreenSupported) {
      if (!this.ctx) {
        throw new Error('Context wasn\'t not set')
      }
      render(this.ctx, options, onComplete)
    } else {
      if (!this.offscreenCanvas) {
        throw new Error('OffscreenCanvas wasn\'t set')
      }
      if (!this.rendererWorker) {
        throw new Error('No RendererWorker instance exists')
      }

      const msg: RendererWorkerRenderMessage = {
        type: RendererWorkerMessageType.render,
        options,
      }

      this.rendererWorker.postMessage(msg)

      this.rendererWorker.onmessage = (event) => {
        if (event.data.type === RendererWorkerMessageType.renderCompleted) {
          onComplete()
        }
      }
    }
  }
}
