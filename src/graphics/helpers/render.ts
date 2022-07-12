import { randomInt } from "@/utils/random"
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
