import { Html, Head, Main, NextScript } from 'next/document'
import { APP_DESCRIPTION, APP_NAME } from '../constants'

const Document = () => {
  return (
    <Html lang='en'>
      <Head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='application-name' content={APP_NAME} />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content={APP_NAME} />
        <meta name='description' content={APP_DESCRIPTION} />
        <meta name="keywords" content="displacement, displacement maps, displacement generator, displacement maps generator" />
        <meta name='theme-color' content='#000000' />
        <link rel="icon" href="/favicon.ico" />
        <link rel='manifest' href='/manifest.json' crossOrigin='use-credentials' />
      </Head>
      <body className='bg-black text-white'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
