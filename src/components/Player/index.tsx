import Image from 'next/image'
import Slider from 'rc-slider'
import { useState } from 'react'

import { usePlayer } from '~/hooks'
import { convertSecondsToTimeString } from '~/utils/date-time'

import 'rc-slider/assets/index.css'
import styles from './styles.module.scss'

import type { Podcast } from '~/types'

function Player() {
  const { audioRef, ...player } = usePlayer<Podcast>()
  const [currentTime, setCurrentTime] = useState(0)
  const remainingTime = (player.current?.duration ?? 0) - currentTime

  function handlePodcastIsLoaded() {
    audioRef.current.currentTime = 0

    audioRef.current.ontimeupdate = () => {
      setCurrentTime(Math.floor(audioRef.current.currentTime))
    }
  }

  function handleSeek(time: number) {
    if (time < player.current.duration - 2) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  return (
    <div className={styles.container}>
      <header>
        <img src="/img/playing.svg" alt="tocando agora" />
        <span>Tocando agora:</span>
      </header>

      {player.current ? (
        <div className={styles.podcastDetails}>
          <Image
            src={player.current.thumbnail}
            alt="capa do podcast"
            objectFit="cover"
            height="592"
            width="592"
          />
          <strong>{player.current.title}</strong>
          <span>{player.current.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      {player.current && (
        <audio
          ref={audioRef}
          src={player.current.url}
          onLoadedMetadata={handlePodcastIsLoaded}
          autoPlay
        />
      )}

      <footer className={player.current ? '' : styles.empty}>
        <div className={styles.progressBar}>
          <span>{convertSecondsToTimeString(currentTime)}</span>
          <div className={styles.slider}>
            {player.current ? (
              <Slider
                value={currentTime}
                max={player.current?.duration}
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ backgroundColor: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                onChange={handleSeek}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
          <span>{convertSecondsToTimeString(remainingTime)}</span>
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            title="Embaralhar playlist"
            disabled={!player.current}
            onClick={player.shuffle}
          >
            <img src="/img/shuffle.svg" alt="modo aleatório" />
          </button>
          <button
            type="button"
            title="Podcast anterior"
            disabled={!player.hasPrevious}
            onClick={player.playPrevious}
          >
            <img src="/img/play-previous.svg" alt="tocar anterior" />
          </button>
          <button
            type="button"
            title="Tocar/Pausar"
            disabled={!player.current}
            className={styles.playButton}
            onClick={player.togglePlay}
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
            disabled={!player.hasNext}
            onClick={player.playNext}
          >
            <img src="/img/play-next.svg" alt="tocar próximo" />
          </button>
          <button
            type="button"
            title="Repetir podcast"
            disabled={!player.current}
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
