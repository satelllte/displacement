import { percentage } from "@/utils/percentage"
import { randomBool, randomInt } from "@/utils/random"
import type { RenderOptions } from "../types"

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
  }: RenderOptions,
  onComplete: () => void,
) => {
  ctx.fillStyle = `rgb(${backgroundBrightness}, ${backgroundBrightness}, ${backgroundBrightness})`
  ctx.fillRect(0, 0, width, height)

  let iteration = 0

  const minRectWidth = Math.round(width / 24)
  const maxRectWidth = Math.round(width / 8)
  const minRectHeight = Math.round(height / 24)
  const maxRectHeight = Math.round(height / 8)

  const draw = () => {
    const last = Math.min(iteration + iterationsPerFrame, iterations)
    
    while (iteration < last) {
      if (randomBool()) {
        // rect
        const brightness = randomInt(rectBrightnessMin, rectBrightnessMax)
        const alpha = randomInt(rectAlphaMin, rectAlphaMax) / 0xFF
        const rectWidth = randomInt(minRectWidth, maxRectWidth)
        const rectHeight = randomInt(minRectHeight, maxRectHeight)
        ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${alpha})`
        ctx.fillRect(
          randomInt(0, width - rectWidth - 1),
          randomInt(0, height - rectHeight - 1),
          rectWidth,
          rectHeight,
        )
      } else {
        // matrix
        const brightness = randomInt(matrixBrightnessMin, matrixBrightnessMax)
        const alpha = randomInt(matrixAlphaMin, matrixAlphaMax) / 0xFF
        const cols = randomInt(matrixColsMin, matrixColsMax)
        const rows = randomInt(matrixRowsMin, matrixRowsMax)
        const spacing = Math.round(percentage(matrixSpacingPercent, Math.min(width, height)))
        const tileSize = Math.round(width / 64) // hardcoded for now
        const matrixWidth = cols * tileSize + spacing * (cols - 1)
        const matrixHeight = rows * tileSize + spacing * (rows - 1)
        const x0 = randomInt(0, width - matrixWidth - 1)
        const y0 = randomInt(0, height - matrixHeight - 1)
        ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${alpha})`
        let x = x0
        let y = y0
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            ctx.fillRect(x, y, tileSize, tileSize)
            y += tileSize + spacing
          }
          x += tileSize + spacing
          y = y0
        }
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
