import React from 'react'
import { Renderer } from '@/graphics'
import { CanvasContext } from './CanvasContext'

interface RendererContextProviderProps {
  children: React.ReactNode
}

const defaultValue = undefined

export const RendererContext = React.createContext<Renderer | undefined>(defaultValue)

export const RendererContextProvider: React.FC<RendererContextProviderProps> = ({
  children
}) => {
  const canvasRef = React.useContext(CanvasContext)
  const [renderer, setRenderer] = React.useState<Renderer>()

  React.useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement
    new Renderer(
      canvas,
      (r: Renderer) => setRenderer(r),
    )
  }, [canvasRef])

  return (
    <RendererContext.Provider value={renderer}>
      {children}
    </RendererContext.Provider>
  )
}
