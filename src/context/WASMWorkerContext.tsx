import React from 'react'
import { WASMWorkerMessageType } from '../workers/wasm/types'
import type { WASMWorker } from '../workers/wasm/types'

type WASMWorkerContext = WASMWorker | null

interface WASMWorkerContextProviderProps {
  children: React.ReactNode
}

const defaultValue: WASMWorkerContext = null

export const WASMWorkerContext = React.createContext<WASMWorkerContext>(defaultValue)

export const WASMWorkerContextProvider: React.FC<WASMWorkerContextProviderProps> = ({
  children
}) => {
  const [context, setContext] = React.useState<WASMWorkerContext>(defaultValue)

  React.useEffect(() => {
    const worker = new Worker(new URL('../workers/wasm', import.meta.url)) as WASMWorker

    worker.onmessage = (event) => {
      switch (event.data.type) {
        case WASMWorkerMessageType.ready:
          setContext(worker)
          break
      }
    }
  }, [])

  return (
    <WASMWorkerContext.Provider value={context}>
      {children}
    </WASMWorkerContext.Provider>
  )
}
