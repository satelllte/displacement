import React from 'react'
import { CanvasContext } from '@/context/CanvasContext'
import { WASMContext } from '@/context/WASMContext'
import { Button } from '@/components/ui/Button'
import { randomInt } from '@/utils/random'

export const RenderAction = () => {
  const canvasRef = React.useContext(CanvasContext)
  const worker = React.useContext(WASMContext)

  const [renderInProgress, setRenderInProgress] = React.useState<boolean>(false)

  const disabled = !worker || renderInProgress

  const renderNative = () => {
    const canvas = canvasRef.current as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    let i = 0

    const draw = () => {
      for (let j = i; j <= i + 10; j++) {
        ctx.fillStyle = `rgba(${0x99}, 192, 192, 0.02)`
        ctx.fillRect(
          randomInt(0, canvas.width - 1),
          randomInt(0, canvas.height - 1),
          randomInt(512, 1024),
          randomInt(512, 1024),
        )
      }

      i += 10

      if (i < 250) {
        requestAnimationFrame(draw)
      }
    }

    requestAnimationFrame(draw)
  }

  return (
    <Button disabled={disabled} onClick={renderNative}>
      Render
    </Button>
  )
}
