import shuffleCollection from 'lodash.shuffle';
import {
  type ComponentRef,
  createContext,
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';

export interface PlayerInterface<T> {
  addToPlaylist: (tracks: T, immediate?: boolean) => void;
  audioRef: RefObject<HTMLAudioElement>;
  CreatePlaylist: (tracks: T[], startIndex?: number) => void;
  current: T;
  hasNext: boolean;
  hasPrevious: boolean;
  isLooping: boolean;
  isPlaying: boolean;
  playlist: T[];
  playNext: () => void;
  playPrevious: () => void;
  shuffle: () => void;
  toggleLoop: () => void;
  togglePlay: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PlayerContext = createContext({} as PlayerInterface<any>);

export function PlayerProvider({ children }): ReactNode {
  const audioRef = useRef<ComponentRef<'audio'>>(null);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTrack = playlist[currentIndex] ?? null;
  const hasPrevious = Boolean(playlist[currentIndex - 1]);
  const hasNext = Boolean(playlist[currentIndex + 1]);
  const [isLooping, setIsLooping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  function CreatePlaylist<T>(tracks: T[], startIndex?: number): void {
    setCurrentIndex(startIndex ?? 0);
    setIsPlaying(!isNaN(startIndex));
    setPlaylist(tracks);
  }

  function addToPlaylist<T>(track: T, immediate = false): void {
    setPlaylist([...playlist, track]);

    if (immediate) {
      setCurrentIndex(playlist.length);
      setIsPlaying(true);
    }
  }

  function togglePlay(): void {
    setIsPlaying((currValue) => !currValue);
  }

  function toggleLoop(): void {
    setIsLooping((currValue) => !currValue);
  }

  function playPrevious(): void {
    if (hasPrevious) {
      setCurrentIndex((currValue) => currValue - 1);
    }
  }

  function playNext(): void {
    if (hasNext) {
      setCurrentIndex((currValue) => currValue + 1);
    }
  }

  function shuffle(): void {
    if (playlist.length) {
      playlist.splice(currentIndex, 1);
      const newPlaylist = shuffleCollection(playlist);
      newPlaylist.unshift(currentTrack);
      setPlaylist(newPlaylist);
      setCurrentIndex(0);
      setIsPlaying(true);
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLooping;

      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isLooping]);

  useEffect(() => {
    if (audioRef.current) {
      const ref = audioRef.current;
      const onPlay = (): void => setIsPlaying(true);
      const onPause = (): void => setIsPlaying(false);
      const onEnded = (): void => playNext();

      ref.addEventListener('play', onPlay);
      ref.addEventListener('pause', onPause);
      ref.addEventListener('ended', onEnded);

      return (): void => {
        ref.removeEventListener('play', onPlay);
        ref.removeEventListener('pause', onPause);
        ref.removeEventListener('ended', onEnded);
      };
    }
  }, []);

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
  );
}
