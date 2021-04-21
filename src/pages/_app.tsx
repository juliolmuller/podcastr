import '../assets/global.scss'
import Header from '../components/Header'
import Player from '../components/Player'
import styles from '../assets/app.module.scss'

function App({ Component, pageProps }) {
  return (
    <div className={styles.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>

      <Player />
    </div>
  )
}

export default App
