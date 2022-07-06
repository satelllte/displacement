import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { RecoilRoot } from 'recoil'
import { APP_NAME } from '../constants'
import { CanvasContextProvider } from '../context/CanvasContext'
import { RendererContextProvider } from '@/context/RendererContext'
import { WASMContextProvider } from '../context/WASMContext'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <CanvasContextProvider>
        <RendererContextProvider>
          <WASMContextProvider>
            <Head>
              <title>{APP_NAME}</title>
              <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' />
            </Head>
            <Component {...pageProps} />
          </WASMContextProvider>
        </RendererContextProvider>
      </CanvasContextProvider>
    </RecoilRoot>
  )
}

export default App
