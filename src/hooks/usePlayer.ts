import { useContext } from 'react'
import { PlayerContext } from '../contexts'

function usePlayer() {
  return useContext(PlayerContext)
}

export default usePlayer
