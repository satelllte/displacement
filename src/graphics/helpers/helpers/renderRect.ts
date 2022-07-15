import { randomInt } from '@/utils/random'

export const renderRect = (
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  minWidth: number,
  maxWidth: number,
  minHeight: number,
  maxHeight: number,
  brightnessMin: number,
  brightnessMax: number,
  alphaMin: number,
  alphaMax: number,
) => {
  const brightness = randomInt(brightnessMin, brightnessMax)
  const alpha = randomInt(alphaMin, alphaMax) / 0xFF

  ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${alpha})`

  const width = randomInt(minWidth, maxWidth)
  const height = randomInt(minHeight, maxHeight)

  ctx.fillRect(
    randomInt(0, ctx.canvas.width - width - 1),
    randomInt(0, ctx.canvas.height - height - 1),
    width,
    height,
  )
}
