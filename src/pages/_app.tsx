import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { RecoilRoot } from 'recoil'
import { APP_NAME } from '../constants'
import { CanvasContextProvider } from '../context/CanvasContext'
import { RendererContextProvider } from '@/context/RendererContext'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <CanvasContextProvider>
        <RendererContextProvider>
          <Head>
            <title>{APP_NAME}</title>
            <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' />
          </Head>
          <Component {...pageProps} />
        </RendererContextProvider>
      </CanvasContextProvider>
    </RecoilRoot>
  )
}

export default App
