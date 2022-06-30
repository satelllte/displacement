import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { WASMContextProvider } from '../context/WASMContext'
import { APP_NAME } from '../constants'
import { CanvasContextProvider } from '../context/CanvasContext'
import { WASMWorkerContextProvider } from '../context/WASMWorkerContext'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <CanvasContextProvider>
      <WASMWorkerContextProvider>
        <WASMContextProvider>
          <Head>
            <title>{APP_NAME}</title>
            <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' />
          </Head>
          <Component {...pageProps} />
        </WASMContextProvider>
      </WASMWorkerContextProvider>
    </CanvasContextProvider>
  )
}

export default App
