import { describe, expect, test } from 'vitest'
import { randomBool, randomInt } from './random'

describe('random', () => {
  const retries = 10

  describe('randomInt', () => {
    test.each([
      [-3, -1],
      [-2, -1],
      [-1, 0],
      [0, 1],
      [1, 2],
      [1, 3],
    ])('works - random(%i, %i)', (min, max) => {
      for (let i = 0; i < retries; i++) {
        const result = randomInt(min, max)
        expect(result).toBeGreaterThanOrEqual(min)
        expect(result).toBeLessThanOrEqual(max)
      }
    })
  })

  describe('randomBool', () => {
    test('works', () => {
      for (let i = 0; i < retries; i++) {
        const result = randomBool()
        expect(result).toBeTypeOf('boolean')
        expect(result === true || result === false).toBeTruthy()
      }
    })
  })
})
