import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { WASMContextProvider } from '../context/WASM'
import { SizeContextProvider } from '../context/Size'
import { APP_NAME } from '../constants'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <WASMContextProvider>
      <SizeContextProvider>
        <Head>
          <title>{APP_NAME}</title>
          <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
        </Head>
        <Component {...pageProps} />
      </SizeContextProvider>
    </WASMContextProvider>
  )
}

export default App
