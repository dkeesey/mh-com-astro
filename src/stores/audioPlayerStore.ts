import { atom } from 'nanostores';

export interface AudioPlayerState {
  currentTrack: number;
  elapsedTime: number;
  isPlaying: boolean;
}

export const audioPlayerState = atom<AudioPlayerState>({
  currentTrack: 0,
  elapsedTime: 0,
  isPlaying: false,
});
