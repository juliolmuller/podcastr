import { useContext } from 'react';

import { PlayerContext } from '../contexts';
import { type PlayerInterface } from '../contexts/player-context';

function usePlayer<T>(): PlayerInterface<T> {
  return useContext(PlayerContext);
}

export default usePlayer;
