import { type ReactNode } from 'react';

import { PlayerContext, PlayerProvider } from './player-context';

function ContextProvider({ children }): ReactNode {
  return <PlayerProvider>{children}</PlayerProvider>;
}

export { ContextProvider as default, PlayerContext, PlayerProvider };
