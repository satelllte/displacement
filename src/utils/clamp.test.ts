import { describe, expect, test } from 'vitest'
import { clamp } from './clamp'

describe('clamp', () => {
  test('nothing changes when the number is inside the range', () => {
    expect(clamp(5, 1, 10)).toEqual(5)
    expect(clamp(-5, -10, 10)).toEqual(-5)
    expect(clamp(0, 0, 1)).toEqual(0)
    expect(clamp(.5, 0, 1)).toEqual(.5)
    expect(clamp(1, 0, 1)).toEqual(1)
  })

  test('clamps when the number is out of range', () => {
    expect(clamp(-1, 0, 1)).toEqual(0)
    expect(clamp(1.5, 0, 1)).toEqual(1)
    expect(clamp(25, 0, 5)).toEqual(5)
    expect(clamp(-15.75, -12.5, 0)).toEqual(-12.5)
  })
})
