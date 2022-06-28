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
    imageData.data.set(pixels)
    ctx2d.putImageData(imageData, 0, 0)
  }

  return (
    <Button disabled={disabled} onClick={render}>
      Render
    </Button>
  )
}
