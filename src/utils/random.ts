export const randomInt = (min: number, max: number): number => {
  min = Math.ceil(min) // eslint-disable-line no-param-reassign
  max = Math.floor(max) // eslint-disable-line no-param-reassign
  return Math.floor(Math.random() * (max - min + 1)) + min
}
