/* eslint-disable @next/next/no-page-custom-font */
import BaseDocument, { Html, Head, Main, NextScript } from 'next/document'

class Document extends BaseDocument {
  render() { // eslint-disable-line class-methods-use-this
    return (
      <Html lang="pt-BR">
        <Head>
          <meta name="description" content="Aplicação para compartilhamento de podcasts" />
          <link rel="shortcut icon" href="/favicon.png" type="image/png"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
