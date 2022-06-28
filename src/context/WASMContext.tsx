import React from 'react'

type WASMContext = WASM | null

interface WASMContextProviderProps {
  children: React.ReactNode
}

const defaultValue: WASMContext = null

export const WASMContext = React.createContext<WASMContext>(defaultValue)

export const WASMContextProvider: React.FC<WASMContextProviderProps> = ({
  children
}) => {
  const [wasm, setWasm] = React.useState<WASMContext>(null)

  React.useEffect(() => {
    (async() => {
      const wasm = await import('wasm/wasm_bg.wasm')
      setWasm(wasm)
    })()
  }, [])

  return (
    <WASMContext.Provider value={wasm}>
      {children}
    </WASMContext.Provider>
  )
}
