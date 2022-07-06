import React from 'react'
import { Renderer } from '@/graphics'
import { CanvasContext } from './CanvasContext'

interface RendererContextProviderProps {
  children: React.ReactNode
}

const defaultValue = React.createRef<Renderer>() as React.MutableRefObject<Renderer>

export const RendererContext = React.createContext<React.MutableRefObject<Renderer | undefined>>(defaultValue)

export const RendererContextProvider: React.FC<RendererContextProviderProps> = ({
  children
}) => {
  const canvasRef = React.useContext(CanvasContext)
  const rendererRef = React.useRef<Renderer>()

  React.useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    rendererRef.current = new Renderer(ctx, canvas.width, canvas.height)
  }, [canvasRef])

  return (
    <RendererContext.Provider value={rendererRef}>
      {children}
    </RendererContext.Provider>
  )
}
