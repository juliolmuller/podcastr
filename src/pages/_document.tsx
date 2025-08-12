import BaseDocument, { Head, Html, Main, NextScript } from 'next/document';
import { type ReactElement } from 'react';

class Document extends BaseDocument {
  public render(): ReactElement {
    return (
      <Html lang="pt-BR">
        <Head>
          <meta name="description" content="Aplicação para compartilhamento de podcasts" />
          <link rel="shortcut icon" href="/favicon.png" type="image/png" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
