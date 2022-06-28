import { WASMContext } from '../context/WASMContext'
import { Canvas } from './Canvas'

export const CanvasContainer = () => {
  return (
    <div className='absolute inset-4 overflow-y-auto'>
      <div className='absolute inset-0 flex justify-center items-center'>
        <div className='relative flex items-center w-full h-full max-w-[500px] max-h-[500px]'>
          <WASMContext.Consumer>
            {({ wasm }) => {
              return wasm ? <Canvas wasm={wasm}/> : null
            }}
          </WASMContext.Consumer>
        </div>
      </div>
    </div>
  )
}
