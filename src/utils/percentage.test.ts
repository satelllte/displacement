import { describe, expect, test } from 'vitest'
import { percentage } from './percentage'

describe('percentage', () => {
  test('basics', () => {
    expect(percentage(1, 100)).toBeCloseTo(1)
    expect(percentage(5, 100)).toBeCloseTo(5)
    expect(percentage(50, 50)).toBeCloseTo(25)
  })

  test('negative percent flips the sign', () => {
    expect(percentage(-50, 50)).toBeCloseTo(-25)
    expect(percentage(-75, 100)).toBeCloseTo(-75)
  })

  test('fractional numbers', () => {
    expect(percentage(1, 1)).toBeCloseTo(0.01)
    expect(percentage(50, -1)).toBeCloseTo(-0.5)
    expect(percentage(25.5, -1)).toBeCloseTo(-0.255)
    expect(percentage(25, 17.5)).toBeCloseTo(4.375)
  })

  test('100% always gives the same number', () => {
    expect(percentage(100, 0)).toBeCloseTo(0)
    expect(percentage(100, 1)).toBeCloseTo(1)
    expect(percentage(100, 350)).toBeCloseTo(350)
    expect(percentage(100, -20)).toBeCloseTo(-20)
    expect(percentage(100, 25.5)).toBeCloseTo(25.5)
    expect(percentage(100, -145.75)).toBeCloseTo(-145.75)
  })

  test('0% always gives zero', () => {
    expect(percentage(0, 100)).toBeCloseTo(0)
    expect(percentage(0, 50)).toBeCloseTo(0)
    expect(percentage(0, 1)).toBeCloseTo(0)
    expect(percentage(0, 0)).toBeCloseTo(0)
    expect(percentage(0, -1)).toBeCloseTo(0)
    expect(percentage(0, -75)).toBeCloseTo(0)
  })

  test('out of range percent produces higher values', () => {
    expect(percentage(110, 100)).toBeCloseTo(110)
    expect(percentage(1000, 50)).toBeCloseTo(500)
    expect(percentage(-500, 50)).toBeCloseTo(-250)
    expect(percentage(-10000, 1)).toBeCloseTo(-100)
    expect(percentage(175, 5)).toBeCloseTo(8.75)
  })
})
