import { type ReactNode } from 'react';

import { PlayerContext, PlayerProvider } from './player-context';

interface ContextProviderProps {
  children: ReactNode;
}

function ContextProvider({ children }: ContextProviderProps): ReactNode {
  return <PlayerProvider>{children}</PlayerProvider>;
}

export { ContextProvider as default, PlayerContext, PlayerProvider };
