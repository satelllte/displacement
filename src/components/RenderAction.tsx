import React from 'react'
import { CanvasContext } from '../context/CanvasContext'
import { WASMContext } from '../context/WASMContext'
import { randomInt } from '../utils/random'
import { Button } from './Button'

export const RenderAction = () => {
  const canvasRef = React.useContext(CanvasContext)
  const wasm = React.useContext(WASMContext)

  const disabled = !wasm

  const render = () => {
    if (!wasm) {
      throw new Error('WASM module is not ready yet')
    }

    const canvas = canvasRef.current as HTMLCanvasElement
    const { width, height } = canvas
    const ctx2d = canvas.getContext('2d') as CanvasRenderingContext2D
    const imageData = ctx2d.getImageData(0, 0, width, height)
    const pointer = wasm.getBufferPointer()
    const pixels = new Uint8ClampedArray(wasm.memory.buffer, pointer, width * height * 4)

    wasm.fillColor(
      randomInt(0x00, 0x99),
      randomInt(0x00, 0x99),
      randomInt(0x00, 0x99),
      width,
      height,
    )

    for (let i = 0; i < 100; i++) {
      const x0 = randomInt(0, width - 1)
      const y0 = randomInt(0, height - 1)
      const x1 = Math.min(x0 + randomInt(10, 100), width - 1)
      const y1 = Math.min(y0 + randomInt(10, 100), height - 1)
      wasm.fillRect(
        randomInt(0x00, 0x99),
        randomInt(0x00, 0x99),
        randomInt(0x00, 0x99),
        x0,
        y0,
        x1,
        y1,
        width,
      )
    }

    imageData.data.set(pixels)
    ctx2d.putImageData(imageData, 0, 0)
  }

  return (
    <Button disabled={disabled} onClick={render}>
      Render
    </Button>
  )
}
