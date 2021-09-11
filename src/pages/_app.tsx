import NextApp from 'next/app'
import ContextProvider from '~/contexts'
import Header from '~/components/Header'
import Player from '~/components/Player'

import '~/global-styles.scss'
import styles from './styles.module.scss'

class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props

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
    )
  }
}

export default App
