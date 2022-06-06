import type { NextPage } from 'next'
import Head from 'next/head'
import { WASMExample } from '../components/WASMExample'

const APP_NAME = 'DISPLACEMENT'
const APP_DESCRIPTION = 'Displacement maps generator'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='application-name' content={APP_NAME} />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content={APP_NAME} />
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
        <meta name='description' content={APP_DESCRIPTION} />
        <meta name="keywords" content="displacement, displacement maps, displacement generator, displacement maps generator" />
        <meta name='theme-color' content='#000000' />
        <link rel="icon" href="/favicon.ico" />
        <link rel='manifest' href='/manifest.json' crossOrigin={process.env.NODE_ENV === 'development' ? 'use-credentials' : undefined}/>
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
