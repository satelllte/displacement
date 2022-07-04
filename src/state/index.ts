import { atom } from 'recoil'
import { RECOIL_KEYS } from './recoilKeys'

export const backgroundBrightnessState = atom<number>({
  key: RECOIL_KEYS.backgroundBrightness,
  default: 0x80,
})

export const iterationsState = atom<number>({
  key: RECOIL_KEYS.iterations,
  default: 500,
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
