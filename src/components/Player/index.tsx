import styles from './styles.module.scss'

function Player() {
  return (
    <div className={styles.container}>
      <header>
        <img src="/img/playing.svg" alt="tocando agora" />
        <span>Tocando agora:</span>
      </header>

      <div className={styles.emptyPlayer}>
        <strong>Selecione um podcast para ouvir</strong>
      </div>

      <footer className={styles.empty}>
        <div className={styles.progressBar}>
          <span>00:00</span>
          <div className={styles.slider}>
            <div className={styles.emptySlider} />
          </div>
          <span>00:00</span>
        </div>

        <div className={styles.controls}>
          <button type="button">
            <img src="/img/shuffle.svg" alt="modo aleatório" />
          </button>
          <button type="button">
            <img src="/img/play-previous.svg" alt="tocar anterior" />
          </button>
          <button type="button" className={styles.playButton}>
            <img src="/img/play.svg" alt="tocar ou pausar" />
          </button>
          <button type="button">
            <img src="/img/play-next.svg" alt="tocar próximo" />
          </button>
          <button type="button">
            <img src="/img/repeat.svg" alt="repetir atual" />
          </button>
        </div>
      </footer>
    </div>
  )
}

export default Player
