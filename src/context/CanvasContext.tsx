import React from 'react'

interface CanvasContextProviderProps {
  children: React.ReactNode
}

const defaultValue = React.createRef<HTMLCanvasElement>()

export const CanvasContext = React.createContext<React.RefObject<HTMLCanvasElement>>(defaultValue)

export const CanvasContextProvider: React.FC<CanvasContextProviderProps> = ({
  children,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  return (
    <CanvasContext.Provider value={canvasRef}>
      {children}
    </CanvasContext.Provider>
  )
}
