import React from 'react'
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../constants'
import { CanvasContext } from '../context/CanvasContext'

export const Canvas = () => {
  const canvasRef = React.useContext(CanvasContext)

  React.useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement

    const width = DEFAULT_WIDTH
    const height = DEFAULT_HEIGHT
    
    canvas.width = width
    canvas.height = height
  }, [canvasRef])

  return (
    <div className='absolute inset-4 overflow-y-auto'>
      <div className='absolute inset-0 flex justify-center items-center'>
        <div className='relative flex items-center w-full h-full max-w-[500px] max-h-[500px]'>
          <canvas
            width={DEFAULT_WIDTH}
            height={DEFAULT_HEIGHT}
            ref={canvasRef}
            className='drop-shadow-xl absolute max-h-full max-w-full bg-neutral-900'
          />
        </div>
      </div>
    </div>
  )
}
