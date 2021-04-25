import { useContext } from 'react'
import { PlayerContext } from '../contexts'
import { PlayerInterface } from '../contexts/player-context'

function usePlayer<T>() {
  return useContext<PlayerInterface<T>>(PlayerContext)
}

export default usePlayer
