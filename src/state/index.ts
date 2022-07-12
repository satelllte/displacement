import { atom } from 'recoil'
import { RECOIL_KEYS } from './recoilKeys'

export const backgroundBrightnessState = atom<number>({
  key: RECOIL_KEYS.backgroundBrightness,
  default: 0x20,
})

export const iterationsState = atom<number>({
  key: RECOIL_KEYS.iterations,
  default: 250,
})

export const rectBrightnessMinState = atom<number>({
  key: RECOIL_KEYS.rectBrightnessMin,
  default: 0x00,
})

export const rectBrightnessMaxState = atom<number>({
  key: RECOIL_KEYS.rectBrightnessMax,
  default: 0xFF,
})

export const rectAlphaMinState = atom<number>({
  key: RECOIL_KEYS.rectAlphaMin,
  default: 0x80,
})

export const rectAlphaMaxState = atom<number>({
  key: RECOIL_KEYS.rectAlphaMax,
  default: 0xC0,
})

export const matrixBrightnessMinState = atom<number>({
  key: RECOIL_KEYS.matrixBrightnessMin,
  default: 0x00,
})

export const matrixBrightnessMaxState = atom<number>({
  key: RECOIL_KEYS.matrixBrightnessMax,
  default: 0xFF,
})

export const matrixAlphaMinState = atom<number>({
  key: RECOIL_KEYS.matrixAlphaMin,
  default: 0x80,
})

export const matrixAlphaMaxState = atom<number>({
  key: RECOIL_KEYS.matrixAlphaMax,
  default: 0xC0,
})

export const matrixSizeMinState = atom<number>({
  key: RECOIL_KEYS.matrixSizeMin,
  default: 3,
})

export const matrixSizeMaxState = atom<number>({
  key: RECOIL_KEYS.matrixSizeMax,
  default: 5,
})
