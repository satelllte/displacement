import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { WASMContextProvider } from '../context/WASM'
import { APP_NAME } from '../constants'
import { useEffect } from 'react'

const App = ({ Component, pageProps }: AppProps) => {

  useEffect(() => {
    // TODO: notify user that the app is available for offline use
    // ...

    // https://developer.chrome.com/docs/workbox/modules/workbox-window/#register-a-service-worker-and-notify-the-user-the-very-first-time-that-service-worker-is-active
    // @ts-ignore
    const wb = window.workbox
    // @ts-ignore
    wb.addEventListener('activated', (event) => {
      if (!event.isUpdate) {
        console.info('WB | activated | event: ', event)
      }
    })
  }, [])

  return (
    <WASMContextProvider>
      <Head>
        <title>{APP_NAME}</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
      </Head>
      <Component {...pageProps} />
    </WASMContextProvider>
  )
}

export default App
