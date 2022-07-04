import { clamp } from '@/utils/clamp'
import { percentage } from '@/utils/percentage'
import { randomBool, randomInt } from '@/utils/random'

export const randRectPosition = (
  width: number,
  height: number,
  minRectSideLengthPercentage: number = 5,
  maxRectSideLengthPercentage: number = 50,
): {
  x0: number,
  y0: number,
  x1: number,
  y1: number,
} => {
  const xMinLength = Math.round(percentage(minRectSideLengthPercentage, width))
  const xMaxLength = Math.round(percentage(maxRectSideLengthPercentage, width))
  const yMinLength = Math.round(percentage(minRectSideLengthPercentage, height))
  const yMaxLength = Math.round(percentage(maxRectSideLengthPercentage, height))

  const xLength = randomInt(xMinLength, xMaxLength)
  const yLength = randomInt(yMinLength, yMaxLength)

  let x0 = randomInt(0, width - 1)
  let y0 = randomInt(0, height - 1)

  const xPositiveDirection = randomBool()
  const yPositiveDirection = randomBool()

  let x1 = clamp(xPositiveDirection ? x0 + xLength : x0 - xLength, 0, width - 1)
  let y1 = clamp(yPositiveDirection ? y0 + yLength : y0 - yLength, 0, height - 1)

  if (x0 > x1) {
    [x0, x1] = [x1, x0]
  }
  if (y0 > y1) {
    [y0, y1] = [y1, y0]
  }

  return {
    x0,
    y0,
    x1,
    y1,
  }
}
