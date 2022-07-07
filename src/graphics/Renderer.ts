import { OffscreenCanvasFeature } from '@/utils/feature-detection'
import { render } from './helpers/render'
import { RendererWorker, RendererWorkerRenderMessage, RendererWorkerMessageType } from './workers/renderer/types'

export class Renderer {
  private canvas: HTMLCanvasElement
  private width: number
  private height: number
  private offscreenSupported: boolean
  private ctx?: CanvasRenderingContext2D
  private offscreenCanvas?: OffscreenCanvas
  private rendererWorker?: RendererWorker

  constructor(
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
  ) {
    this.canvas = canvas
    this.width = width
    this.height = height
    this.offscreenSupported = OffscreenCanvasFeature.isSupported()
    
    if (this.offscreenSupported) {
      this.offscreenCanvas = this.canvas.transferControlToOffscreen()
      this.rendererWorker = new Worker(new URL('./workers/renderer', import.meta.url))
    } else {
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        throw new Error('Count not get 2d context for canvas')
      }
      this.ctx = ctx
    }
  }

  public startRender(
    iterations: number,
    backgroundBrightness: number,
    rectBrightnessMin: number,
    rectBrightnessMax: number,
    rectAlphaMin: number,
    rectAlphaMax: number,
    onComplete: () => void,
  ) {
    if (!this.offscreenSupported) {
      if (!this.ctx) {
        throw new Error('Context wasn\'t not set')
      }
      render(
        this.ctx,
        this.width,
        this.height,
        iterations,
        backgroundBrightness,
        rectBrightnessMin,
        rectBrightnessMax,
        rectAlphaMin,
        rectAlphaMax,
        onComplete,
      )
    } else {
      if (!this.offscreenCanvas) {
        throw new Error('OffscreenCanvas wasn\'t set')
      }
      if (!this.rendererWorker) {
        throw new Error('No RendererWorker instance exists')
      }

      this.rendererWorker.postMessage({
        type: RendererWorkerMessageType.render,
        canvas: this.offscreenCanvas,
        width: this.width,
        height: this.height,
        iterations,
        backgroundBrightness,
        rectBrightnessMin,
        rectBrightnessMax,
        rectAlphaMin,
        rectAlphaMax,
      } as RendererWorkerRenderMessage, [this.offscreenCanvas])

      this.rendererWorker.onmessage = (event) => {
        if (event.data.type === RendererWorkerMessageType.renderCompleted) {
          onComplete()
        }
      }
    }
  }
}
