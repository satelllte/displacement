import { ReactNode, useEffect, useState } from 'react'
import { createContext } from 'react'

interface WASMContextProps {
  wasm?: WASM
}

interface WASMContextProviderProps {
  children: ReactNode
}

const initial: WASMContextProps = {}

export const WASMContext = createContext<WASMContextProps>(initial)

export const WASMContextProvider: React.FC<WASMContextProviderProps> = ({
  children
}) => {
  const [state, setState] = useState<WASMContextProps>(initial)

  useEffect(() => {
    (async() => {
      const wasm = await import('wasm/wasm_bg.wasm')
      setState({ wasm })
    })()
  }, [])

  return (
    <WASMContext.Provider value={state}>
      {children}
    </WASMContext.Provider>
  )
}
