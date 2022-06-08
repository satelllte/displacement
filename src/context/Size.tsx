import { ReactNode, useState } from 'react'
import { createContext } from 'react'
import { calcAspectRatio } from '../utils/calcAspectRatio'

const DEFAULT_WIDTH: number = 1024
const DEFAULT_HEIGHT: number = 1024

const initial: ISizeContext = {
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  ratio: calcAspectRatio(DEFAULT_WIDTH, DEFAULT_HEIGHT),
}

export const SizeContext = createContext(initial)

export const SizeContextProvider: React.FC<SizeContextProviderProps> = ({
  children
}) => {
  const [state] = useState<ISizeContext>(initial)

  return (
    <SizeContext.Provider value={state}>
      {children}
    </SizeContext.Provider>
  )
}

interface ISizeContext {
  height: number
  width: number
  ratio: number
}

interface SizeContextProviderProps {
  children: ReactNode
}
