import React from 'react'
import { Renderer } from '@/graphics'
import { CanvasContext } from '@/context/CanvasContext'
import { WASMContext } from '@/context/WASMContext'
import { Button } from '@/components/ui/Button'

export const RenderAction = () => {
  const canvasRef = React.useContext(CanvasContext)
  const worker = React.useContext(WASMContext)

  const [renderInProgress, setRenderInProgress] = React.useState<boolean>(false)

  const disabled = !worker || renderInProgress

  const onRenderComplete = () => {
    setRenderInProgress(false)
  }

  const startRender = () => {
    const canvas = canvasRef.current as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    const renderer = new Renderer(ctx, canvas.width, canvas.height)

    renderer.startRender(1500, onRenderComplete)
  }

  return (
    <Button disabled={disabled} onClick={startRender}>
      Render
    </Button>
  )
}
