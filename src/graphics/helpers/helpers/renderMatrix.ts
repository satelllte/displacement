import { randomInt } from '@/utils/random'

export const renderMatrix = (
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  width: number,
  height: number,
  matrixSpacing: number,
  matrixTileSize: number,
  matrixBrightnessMin: number,
  matrixBrightnessMax: number,
  matrixAlphaMin: number,
  matrixAlphaMax: number,
  matrixColsMin: number,
  matrixColsMax: number,
  matrixRowsMin: number,
  matrixRowsMax: number,
) => {
  const brightness = randomInt(matrixBrightnessMin, matrixBrightnessMax)
  const alpha = randomInt(matrixAlphaMin, matrixAlphaMax) / 0xFF

  ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${alpha})`

  const cols = randomInt(matrixColsMin, matrixColsMax)
  const rows = randomInt(matrixRowsMin, matrixRowsMax)
  const matrixWidth = cols * matrixTileSize + matrixSpacing * (cols - 1)
  const matrixHeight = rows * matrixTileSize + matrixSpacing * (rows - 1)

  const x0 = randomInt(0, width - matrixWidth - 1)
  const y0 = randomInt(0, height - matrixHeight - 1)

  let x = x0
  let y = y0

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      ctx.fillRect(x, y, matrixTileSize, matrixTileSize)
      y += matrixTileSize + matrixSpacing
    }
    x += matrixTileSize + matrixSpacing
    y = y0
  }
}
