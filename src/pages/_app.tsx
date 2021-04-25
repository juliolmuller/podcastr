import '../assets/global.scss'
import Header from '../components/Header'
import Player from '../components/Player'
import ContextProvider from '../contexts'
import styles from './_app.module.scss'

function App({ Component, pageProps }) {
  return (
    <div className={styles.wrapper}>
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

export default App
