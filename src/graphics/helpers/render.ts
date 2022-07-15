import { percentage } from '@/utils/percentage'
import { randomBool } from '@/utils/random'
import type { RenderOptions } from '../types'
import { renderMatrix, renderRect } from './helpers'

export const render = (
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  width: number,
  height: number,
  {
    iterations,
    iterationsPerFrame = 50,
    backgroundBrightness,
    rectBrightnessMin,
    rectBrightnessMax,
    rectAlphaMin,
    rectAlphaMax,
    matrixBrightnessMin,
    matrixBrightnessMax,
    matrixAlphaMin,
    matrixAlphaMax,
    matrixColsMin,
    matrixColsMax,
    matrixRowsMin,
    matrixRowsMax,
    matrixSpacingPercent,
    matrixTileSizePercent,
  }: RenderOptions,
  onComplete: () => void,
) => {
  ctx.fillStyle = `rgb(${backgroundBrightness}, ${backgroundBrightness}, ${backgroundBrightness})`
  ctx.fillRect(0, 0, width, height)

  let iteration = 0

  const rectMinWidth = Math.round(width / 24)
  const rectMaxWidth = Math.round(width / 8)
  const rectMinHeight = Math.round(height / 24)
  const rectMaxHeight = Math.round(height / 8)

  const matrixSpacing = Math.round(percentage(matrixSpacingPercent, Math.min(width, height)))
  const matrixTileSize = Math.round(percentage(matrixTileSizePercent, Math.min(width, height)))

  const draw = () => {
    const last = Math.min(iteration + iterationsPerFrame, iterations)
    
    while (iteration < last) {
      if (randomBool()) {
        renderRect(
          ctx,
          width,
          height,
          rectMinWidth,
          rectMaxWidth,
          rectMinHeight,
          rectMaxHeight,
          rectBrightnessMin,
          rectBrightnessMax,
          rectAlphaMin,
          rectAlphaMax,
        )
      } else {
        renderMatrix(
          ctx,
          width,
          height,
          matrixSpacing,
          matrixTileSize,
          matrixBrightnessMin,
          matrixBrightnessMax,
          matrixAlphaMin,
          matrixAlphaMax,
          matrixColsMin,
          matrixColsMax,
          matrixRowsMin,
          matrixRowsMax,
        )
      }
      iteration++
    }
    
    if (iteration < iterations) {
      requestAnimationFrame(draw)
      return
    }

    onComplete()
  }

  requestAnimationFrame(draw)
}
