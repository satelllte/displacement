import { randomInt } from '@/utils/random'

export const renderRect = (
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  width: number,
  height: number,
  rectMinWidth: number,
  rectMaxWidth: number,
  rectMinHeight: number,
  rectMaxHeight: number,
  rectBrightnessMin: number,
  rectBrightnessMax: number,
  rectAlphaMin: number,
  rectAlphaMax: number,
) => {
  const brightness = randomInt(rectBrightnessMin, rectBrightnessMax)
  const alpha = randomInt(rectAlphaMin, rectAlphaMax) / 0xFF
  const rectWidth = randomInt(rectMinWidth, rectMaxWidth)
  const rectHeight = randomInt(rectMinHeight, rectMaxHeight)
  ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${alpha})`
  ctx.fillRect(
    randomInt(0, width - rectWidth - 1),
    randomInt(0, height - rectHeight - 1),
    rectWidth,
    rectHeight,
  )
}
