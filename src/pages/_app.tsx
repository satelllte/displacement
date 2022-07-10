import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { RecoilRoot } from 'recoil'
import { APP_NAME } from '../constants'
import { CanvasContextProvider } from '../context/CanvasContext'
import { RendererContextProvider } from '@/context/RendererContext'

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  const noOffscreen = Boolean(router.query.noOffscreen)

  return (
    <RecoilRoot>
      <CanvasContextProvider>
        <RendererContextProvider noOffscreen={noOffscreen}>
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
