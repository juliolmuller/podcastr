import Image from 'next/image'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { usePlayer } from '../../hooks'
import styles from './styles.module.scss'

function Player() {
  const { currentPodcast, ...player } = usePlayer()

  return (
    <div className={styles.container}>
      <header>
        <img src="/img/playing.svg" alt="tocando agora" />
        <span>Tocando agora:</span>
      </header>

      {currentPodcast ? (
        <div className={styles.podcastDetails}>
          <Image
            src={currentPodcast.thumbnail}
            alt="capa do podcast"
            objectFit="cover"
            height="592"
            width="592"
          />
          <strong>{currentPodcast.title}</strong>
          <span>{currentPodcast.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      {currentPodcast && (
        <audio
          ref={player.audioRef}
          src={currentPodcast.url}
          onPause={player.onPause}
          onPlay={player.onPlay}
          loop={player.isLooping}
          autoPlay
        />
      )}

      <footer className={currentPodcast ? '' : styles.empty}>
        <div className={styles.progressBar}>
          <span>00:00</span>
          <div className={styles.slider}>
            {currentPodcast ? (
              <Slider
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ backgroundColor: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                onChange={console.log}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
          <span>00:00</span>
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            title="Embaralhar playlist"
            disabled={!currentPodcast}
            onClick={player.shufflePlaylist}
          >
            <img src="/img/shuffle.svg" alt="modo aleatório" />
          </button>
          <button
            type="button"
            title="Podcast anterior"
            disabled={!player.hasPreviousPodcast}
            onClick={player.previousPodcast}
          >
            <img src="/img/play-previous.svg" alt="tocar anterior" />
          </button>
          <button
            type="button"
            title="Tocar/Pausar"
            disabled={!currentPodcast}
            className={styles.playButton}
            onClick={player.togglePlayPodcast}
          >
            {player.isPlaying ? (
              <img src="/img/pause.svg" alt="pausar" />
            ) : (
              <img src="/img/play.svg" alt="tocar" />
            )}
          </button>
          <button
            type="button"
            title="Próximo podcast"
            disabled={!player.hasNextPodcast}
            onClick={player.nextPodcast}
          >
            <img src="/img/play-next.svg" alt="tocar próximo" />
          </button>
          <button
            type="button"
            title="Repetir podcast"
            disabled={!currentPodcast}
            className={player.isLooping ? styles.isActive : ''}
            onClick={player.toggleLoop}
          >
            <img src="/img/repeat.svg" alt="repetir atual" />
          </button>
        </div>
      </footer>
    </div>
  )
}

export default Player
