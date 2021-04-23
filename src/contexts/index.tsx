import { PlayerContext, PlayerProvider } from './player-context'

function ContextProvider({ children }) {
  return (
    <PlayerProvider>
      {children}
    </PlayerProvider>
  )
}

export {
  ContextProvider as default,
  PlayerContext,
  PlayerProvider,
}
