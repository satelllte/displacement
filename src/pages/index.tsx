import type { NextPage } from 'next'
import Head from 'next/head'
import { WASMExample } from '../components/WASMExample'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>DISPLACEMENT</title>
        <meta name="description" content="Displacement maps generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='min-h-screen p-4 flex flex-col'>
        <h1 className='text-3xl sm:text-4xl lg:text-5xl text-center font-bold my-8 lg:my-12'>
          Welcome to <a href="https://nextjs.org">Next.js</a> with WebAssembly!
        </h1>
        <WASMExample/>
      </main>
    </>
  )
}

export default Home
