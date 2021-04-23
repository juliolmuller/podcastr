import { createContext, MutableRefObject, useRef, useState } from 'react'
import { Podcast } from '../types'

type PlayerContextInterface = {
  hasPreviousPodcast: boolean
  hasNextPodcast: boolean
  currentPodcast: Podcast
  isPlaying: boolean
  isRandom: boolean
  isLooping: boolean
  audioRef: MutableRefObject<HTMLAudioElement>
  addToPlaylist: (podcast: Podcast) => void
  togglePlayPodcast: () => void
  toggleRandom: () => void
  toggleLoop: () => void
  previousPodcast: () => void
  nextPodcast: () => void
  onPause: () => void
  onPlay: () => void
}

const PlayerContext = createContext({} as PlayerContextInterface)

function PlayerProvider({ children }) {
  const audioRef = useRef<HTMLAudioElement>()
  const [isRandom, setIsRandom] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playlist, setPlaylist] = useState<Podcast[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentPodcast = playlist[currentIndex] ?? null
  const hasPreviousPodcast = Boolean(playlist[currentIndex - 1])
  const hasNextPodcast = Boolean(playlist[currentIndex + 1])

  function addToPlaylist(podcast: Podcast) {
    setPlaylist([...playlist, podcast])
    setCurrentIndex(playlist.length)
    setIsPlaying(true)
  }

  function togglePlayPodcast() {
    isPlaying
      ? audioRef.current?.pause()
      : audioRef.current?.play()
    setIsPlaying((currValue) => !currValue)
  }

  function toggleRandom() {
    setIsRandom((currValue) => !currValue)
  }

  function toggleLoop() {
    setIsLooping((currValue) => !currValue)
  }

  function previousPodcast() {
    console.log(hasPreviousPodcast)
    hasPreviousPodcast && setCurrentIndex((currValue) => currValue - 1)
  }

  function nextPodcast() {
    hasNextPodcast && setCurrentIndex((currValue) => currValue + 1)
  }

  function onPause() {
    setIsPlaying(false)
  }

  function onPlay() {
    setIsPlaying(true)
  }

  return (
    <PlayerContext.Provider
      value={{
        addToPlaylist,
        hasPreviousPodcast,
        hasNextPodcast,
        currentPodcast,
        isPlaying,
        isRandom,
        isLooping,
        audioRef,
        togglePlayPodcast,
        toggleRandom,
        toggleLoop,
        previousPodcast,
        nextPodcast,
        onPause,
        onPlay,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export {
  PlayerContext,
  PlayerProvider,
}
