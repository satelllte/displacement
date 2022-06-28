import type { NextPage } from 'next'
import { Canvas } from '../components/Canvas';
import { WASMContext } from '../context/WASMContext';

const Home: NextPage = () => {
  return (
    <>
      <header className='fixed top-0 inset-x-0 h-16 z-10 bg-black/75 drop-shadow-2xl px-4 flex items-center justify-center md:justify-start'>
        <h1 className='text-2xl font-bold md:text-left'>DISPLACEMENT</h1>
      </header>
      <div className='md:flex'>
        <section className='mt-16 h-[calc(100vh-theme(spacing.16))] relative md:flex-1'>
          <div className='absolute inset-4 overflow-y-auto'>
            <div className='absolute inset-0 flex justify-center items-center'>
              <div className='relative flex items-center w-full h-full max-w-[500px] max-h-[500px]'>
                <WASMContext.Consumer>
                  {({ wasm }) => {
                    return wasm ? <Canvas wasm={wasm}/> : null
                  }}
                </WASMContext.Consumer>
              </div>
            </div>
          </div>
        </section>
        <section className='mt-16 h-[calc(100vh-theme(spacing.16))] relative md:flex-1'>
          <div className='absolute inset-4 flex flex-col justify-between'>
            <h2 className='mb-8 text-xl'>Options</h2>
            <button className='p-4 w-full bg-neutral-800/50 hover:bg-neutral-800/75 active:bg-neutral-800 transition-colors outline-none focus:outline-2 focus:outline-neutral-800'>Render</button>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home
