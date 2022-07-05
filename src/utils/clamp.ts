export const clamp = (
  x: number,
  min: number,
  max: number,
): number => {
  return Math.max(Math.min(x, max), min)
}
