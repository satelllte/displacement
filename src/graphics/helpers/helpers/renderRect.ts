import { randomInt } from '@/utils/random'

export const renderRect = (
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  width: number,
  height: number,
  rectMinWidth: number,
  rectMaxWidth: number,
  rectMinHeight: number,
  rectMaxHeight: number,
  brightnessMin: number,
  brightnessMax: number,
  alphaMin: number,
  alphaMax: number,
) => {
  const brightness = randomInt(brightnessMin, brightnessMax)
  const alpha = randomInt(alphaMin, alphaMax) / 0xFF

  ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${alpha})`

  const rectWidth = randomInt(rectMinWidth, rectMaxWidth)
  const rectHeight = randomInt(rectMinHeight, rectMaxHeight)

  ctx.fillRect(
    randomInt(0, width - rectWidth - 1),
    randomInt(0, height - rectHeight - 1),
    rectWidth,
    rectHeight,
  )
}
