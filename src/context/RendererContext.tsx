import React from 'react'
import { Renderer } from '@/graphics'
import { CanvasContext } from './CanvasContext'

interface RendererContextProviderProps {
  noOffscreen?: boolean
  children: React.ReactNode
}

const defaultValue = undefined

export const RendererContext = React.createContext<Renderer | undefined>(defaultValue)

export const RendererContextProvider: React.FC<RendererContextProviderProps> = ({
  noOffscreen = false,
  children,
}) => {
  const canvasRef = React.useContext(CanvasContext)
  const [renderer, setRenderer] = React.useState<Renderer>()

  React.useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement
    const { width, height } = canvas

    if (noOffscreen) {
      console.info('"noOffscreen" mode activated: OffscreenCanvas API will not be used even if supported')
    }

    new Renderer(
      canvas,
      width,
      height,
      (r: Renderer) => setRenderer(r),
      noOffscreen,
    )
  }, [canvasRef, noOffscreen])

  return (
    <RendererContext.Provider value={renderer}>
      {children}
    </RendererContext.Provider>
  )
}
