import type { NextPage } from 'next'
import { useState } from 'react'
import { CanvasSection } from '../components/CanvasSection'
import { Layout } from '../components/Layout';

const Home: NextPage = () => {
  const [settingsOpened, setSettingsOpened] = useState(false);
  return (
    <Layout containerClassName='flex justify-between flex-col md:flex-row'>
      <CanvasSection className='flex-1'/>
      <section id="settings-section" className={`p-4 fixed bg-black/75 inset-x-0 h-4/5 drop-shadow-xl md:drop-shadow-none transition-transform ease-out-quad duration-300 ${settingsOpened ? '-translate-y-full' : ''} md:translate-y-0 top-full md:h-auto md:static md:flex-1 box-border border-t md:border-l md:border-t-0 border-Xborder`}>
        <button className='md:hidden absolute right-4 top-4' onClick={() => setSettingsOpened(false)}>Close</button>
        <h2>Settings</h2>
        <p>...</p>
      </section>
      <div className='p-4 text-center md:hidden border-t border-Xborder'>
        <button onClick={() => setSettingsOpened(true)}>Open Settings</button>
      </div>
    </Layout>
  )
}

export default Home
