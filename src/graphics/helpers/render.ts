import { percentage } from '@/utils/percentage'
import { randomBool } from '@/utils/random'
import type { RenderOptions } from '../types'
import { renderMatrix, renderRect } from './helpers'

export const render = (
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
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
  const { width, height } = ctx.canvas

  ctx.fillStyle = `rgb(${backgroundBrightness}, ${backgroundBrightness}, ${backgroundBrightness})`
  ctx.fillRect(0, 0, width, height)

  let iteration = 0

  const rectWidthMin = Math.round(width / 24)
  const rectWidthMax = Math.round(width / 8)
  const rectHeightMin = Math.round(height / 24)
  const rectHeightMax = Math.round(height / 8)

  const matrixSpacing = Math.round(percentage(matrixSpacingPercent, Math.min(width, height)))
  const matrixTileSize = Math.round(percentage(matrixTileSizePercent, Math.min(width, height)))

  const draw = () => {
    const last = Math.min(iteration + iterationsPerFrame, iterations)
    
    while (iteration < last) {
      if (randomBool()) {
        renderRect(
          ctx,
          rectWidthMin,
          rectWidthMax,
          rectHeightMin,
          rectHeightMax,
          rectBrightnessMin,
          rectBrightnessMax,
          rectAlphaMin,
          rectAlphaMax,
        )
      } else {
        renderMatrix(
          ctx,
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
