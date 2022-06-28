import type { NextPage } from 'next'
import { Canvas } from '../components/Canvas';
import { Options } from '../components/Options';

const Home: NextPage = () => {
  return (
    <>
      <header className='fixed top-0 inset-x-0 h-16 z-10 bg-black/75 drop-shadow-2xl px-4 flex items-center justify-center md:justify-start'>
        <h1 className='text-2xl font-bold md:text-left'>DISPLACEMENT</h1>
      </header>
      <div className='md:flex'>
        <section className='mt-16 h-[calc(100vh-theme(spacing.16))] relative md:flex-1'>
          <Canvas/>
        </section>
        <section className='mt-16 h-[calc(100vh-theme(spacing.16))] relative md:flex-1'>
          <Options/>
        </section>
      </div>
    </>
  )
}

export default Home
