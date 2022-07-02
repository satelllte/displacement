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
