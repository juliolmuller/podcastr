import shuffleCollection from 'lodash.shuffle'
import { createContext, MutableRefObject, useEffect, useRef, useState } from 'react'

export interface PlayerInterface<T> {
  audioRef: MutableRefObject<HTMLAudioElement>
  isPlaying: boolean
  isLooping: boolean
  hasPrevious: boolean
  hasNext: boolean
  playlist: T[]
  current: T
  CreatePlaylist: (tracks: T[], startIndex?: number) => void
  addToPlaylist: (tracks: T, immediate?: boolean) => void
  playPrevious: () => void
  playNext: () => void
  togglePlay: () => void
  toggleLoop: () => void
  shuffle: () => void
}

export const PlayerContext = createContext({} as PlayerInterface<any>)

export function PlayerProvider({ children }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playlist, setPlaylist] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentTrack = playlist[currentIndex] ?? null
  const hasPrevious = Boolean(playlist[currentIndex - 1])
  const hasNext = Boolean(playlist[currentIndex + 1])
  const [isLooping, setIsLooping] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  function CreatePlaylist<T>(tracks: T[], startIndex?: number) {
    setCurrentIndex(startIndex ?? 0)
    setIsPlaying(!isNaN(startIndex))
    setPlaylist(tracks)
  }

  function addToPlaylist<T>(track: T, immediate = false) {
    setPlaylist([...playlist, track])

    if (immediate) {
      setCurrentIndex(playlist.length)
      setIsPlaying(true)
    }
  }

  function togglePlay() {
    setIsPlaying((currValue) => !currValue)
  }

  function toggleLoop() {
    setIsLooping((currValue) => !currValue)
  }

  function playPrevious() {
    hasPrevious && setCurrentIndex((currValue) => currValue - 1)
  }

  function playNext() {
    hasNext && setCurrentIndex((currValue) => currValue + 1)
  }

  function shuffle() {
    if (playlist.length) {
      playlist.splice(currentIndex, 1)
      const newPlaylist = shuffleCollection(playlist)
      newPlaylist.unshift(currentTrack)
      setPlaylist(newPlaylist)
      setCurrentIndex(0)
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLooping
      isPlaying
        ? audioRef.current.play()
        : audioRef.current.pause()
    }
  }, [isPlaying, isLooping])

  useEffect(() => { // eslint-disable-line consistent-return
    if (audioRef.current) {
      const ref = audioRef.current
      const onPlay = () => setIsPlaying(true)
      const onPause = () => setIsPlaying(false)
      const onEnded = () => playNext()

      ref.addEventListener('play', onPlay)
      ref.addEventListener('pause', onPause)
      ref.addEventListener('ended', onEnded)

      return () => {
        ref.removeEventListener('play', onPlay)
        ref.removeEventListener('pause', onPause)
        ref.removeEventListener('ended', onEnded)
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        isPlaying,
        isLooping,
        hasPrevious,
        hasNext,
        playlist,
        current: currentTrack,
        CreatePlaylist,
        addToPlaylist,
        playPrevious,
        playNext,
        togglePlay,
        toggleLoop,
        shuffle,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
