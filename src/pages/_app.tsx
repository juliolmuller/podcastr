import NextApp from 'next/app';
import { type ReactElement } from 'react';

import Header from '~/components/Header';
import Player from '~/components/Player';
import ContextProvider from '~/contexts';

import '~/global-styles.scss';
import styles from './styles.module.scss';

class App extends NextApp {
  render(): ReactElement {
    const { Component, pageProps } = this.props;

    return (
      <div className={styles.appWrapper}>
        <ContextProvider>
          <main>
            <Header />
            <Component {...pageProps} />
          </main>

          <Player />
        </ContextProvider>
      </div>
    );
  }
}

export default App;
