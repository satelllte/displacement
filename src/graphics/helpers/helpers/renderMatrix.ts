import { randomInt } from '@/utils/random'

export const renderMatrix = (
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  spacing: number,
  tileSize: number,
  brightnessMin: number,
  brightnessMax: number,
  alphaMin: number,
  alphaMax: number,
  colsMin: number,
  colsMax: number,
  rowsMin: number,
  rowsMax: number,
) => {
  const brightness = randomInt(brightnessMin, brightnessMax)
  const alpha = randomInt(alphaMin, alphaMax) / 0xFF

  ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${alpha})`

  const cols = randomInt(colsMin, colsMax)
  const rows = randomInt(rowsMin, rowsMax)
  const width = cols * tileSize + spacing * (cols - 1)
  const height = rows * tileSize + spacing * (rows - 1)

  const x0 = randomInt(0, ctx.canvas.width - width - 1)
  const y0 = randomInt(0, ctx.canvas.height - height - 1)

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
