import type { NextPage } from 'next'
import { BottomBarSection } from '../components/BottomBarSection';
import { CanvasSection } from '../components/CanvasSection'
import { Header } from '../components/Header';
import { Layout } from '../components/Layout';
import { SectionsContainer } from '../components/SectionsContainer';
import { SettingsSection } from '../components/SettingsSection';

const Home: NextPage = () => {
  return (
    <>
      <header className='fixed top-0 inset-x-0 h-16 z-10 bg-black/75 drop-shadow-2xl px-4 flex items-center justify-center md:justify-start'>
        <h1 className='text-2xl font-bold md:text-left'>DISPLACEMENT</h1>
      </header>
      <div className='md:flex'>
        <section className='mt-16 h-[calc(100vh-theme(spacing.16))] relative md:flex-1'>
          <div className='absolute inset-4 overflow-y-auto'>
            <div className='absolute inset-0 flex justify-center items-center bg-red-900'>  
              <div className='w-full h-full max-w-[500px] max-h-[500px] bg-red-500'>

              </div>
            </div>
          </div>
        </section>
        <section className='mt-16 h-[calc(100vh-theme(spacing.16))] relative md:flex-1'>
          <div className='absolute inset-4 overflow-y-auto bg-sky-700'>
            
          </div>
        </section>
      </div>
    </>
  )
}

export default Home
