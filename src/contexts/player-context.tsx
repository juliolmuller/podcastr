import { createContext, useState } from 'react'
import { Podcast } from '../types'

type PlayerContextInterface = {
  playlist: Podcast[]
  currentPodcast: Podcast
  playPodcast: (podcast: Podcast) => void
}

const PlayerContext = createContext({} as PlayerContextInterface)

function PlayerProvider({ children }) {
  const [playlist, setPlaylist] = useState<Podcast[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentPodcast = playlist[currentIndex] ?? null

  function playPodcast(podcast: Podcast) {
    setPlaylist([...playlist, podcast])
    setCurrentIndex(playlist.length)
  }

  return (
    <PlayerContext.Provider
      value={{
        playlist,
        currentPodcast,
        playPodcast,
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
