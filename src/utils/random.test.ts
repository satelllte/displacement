import { describe, expect, test } from 'vitest'
import { randomBool, randomInt } from './random'

describe('random', () => {
  const retries = 20

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
      let wasTrue = false
      let wasFalse = false
      
      for (let i = 0; i < retries; i++) {
        const result = randomBool()
        expect(result).toBeTypeOf('boolean')
        if (!wasTrue && result === true) wasTrue = true
        if (!wasFalse && result === false) wasFalse = true
      }

      expect(wasTrue).toEqual(true)
      expect(wasFalse).toEqual(true)
    })
  })
})
