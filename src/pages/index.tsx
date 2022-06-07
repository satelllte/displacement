import type { NextPage } from 'next'
import { useState } from 'react'
import { WASMExample } from '../components/WASMExample'

const Home: NextPage = () => {
  const [settingsOpened, setSettingsOpened] = useState(false);
  return (
    <div className='absolute inset-0 overflow-hidden flex flex-col'>
      <header className='p-4 bg-red-900'>Header</header>
      <main className='relative flex-1 flex justify-between flex-col md:flex-row'>
        <section className='p-4 flex-1 bg-green-900'>Canvas</section>
        <section className={`p-4 fixed inset-x-0 h-2/3 bg-blue-900 transition-transform ease-out duration-150 ${settingsOpened ? '-translate-y-full' : ''} transform-gpu top-full md:h-auto md:static md:flex-1`}>
          Settings
          <button className={`md:hidden`} onClick={() => setSettingsOpened(false)}>Close settings</button>
        </section>
        <div className='p-4 text-center md:hidden'>
          <button onClick={() => setSettingsOpened(true)}>Open Settings</button>
        </div>
      </main>
    </div>
  )
}

export default Home
