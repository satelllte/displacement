import { randomInt } from "@/utils/random"

export const render = (
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  width: number,
  height: number,
  iterations: number,
  backgroundBrightness: number,
  rectBrightnessMin: number,
  rectBrightnessMax: number,
  rectAlphaMin: number,
  rectAlphaMax: number,
  onComplete: () => void,
) => {
  ctx.fillStyle = `rgb(${backgroundBrightness}, ${backgroundBrightness}, ${backgroundBrightness})`
  ctx.fillRect(0, 0, width, height)

  let iteration = 0
  const frameIterations = 50

  const maxWidth = Math.round(width / 8)
  const maxHeight = Math.round(height / 8)

  const draw = () => {
    const last = Math.min(iteration + frameIterations, iterations)
    
    while (iteration < last) {
      const brightness = randomInt(rectBrightnessMin, rectBrightnessMax)
      const alpha = randomInt(rectAlphaMin, rectAlphaMax) / 0xFF
      ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${alpha})`
      ctx.fillRect(
        randomInt(0, width - 1),
        randomInt(0, height - 1),
        randomInt(-maxWidth, maxWidth),
        randomInt(-maxHeight, maxHeight),
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
