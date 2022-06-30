import React from 'react'
import { WASMWorkerMessageType } from '../workers/wasm/types'
import type { WASMWorker } from '../workers/wasm/types'

type WASMContext = WASMWorker | null

interface WASMContextProviderProps {
  children: React.ReactNode
}

const defaultValue: WASMContext = null

export const WASMContext = React.createContext<WASMContext>(defaultValue)

export const WASMContextProvider: React.FC<WASMContextProviderProps> = ({
  children
}) => {
  const [context, setContext] = React.useState<WASMContext>(defaultValue)

  React.useEffect(() => {
    const worker: WASMWorker = new Worker(new URL('../workers/wasm', import.meta.url))

    worker.onmessage = (event) => {
      switch (event.data.type) {
        case WASMWorkerMessageType.ready:
          setContext(worker)
          break
      }
    }
  }, [])

  return (
    <WASMContext.Provider value={context}>
      {children}
    </WASMContext.Provider>
  )
}
