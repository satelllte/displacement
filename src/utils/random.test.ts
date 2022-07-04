import { describe, expect, test } from 'vitest'
import { randomInt } from './random'

describe('random', () => {
  describe('randomInt', () => {
    test.each([
      [-3, -1],
      [-2, -1],
      [-1, 0],
      [0, 1],
      [1, 2],
      [1, 3],
    ])('works - random(%i, %i)', (min, max) => {
      for (let i = 0; i < 10; i++) {
        const result = randomInt(min, max)
        expect(result).toBeGreaterThanOrEqual(min)
        expect(result).toBeLessThanOrEqual(max)
      }
    })
  })
})
