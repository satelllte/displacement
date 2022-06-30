import { atom } from 'recoil'
import { RECOIL_KEYS } from './recoilKeys'

export const iterationsState = atom<number>({
  key: RECOIL_KEYS.iterations,
  default: 50,
})
