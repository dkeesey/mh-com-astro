import { useStore } from '@nanostores/react';
import AudioPlayer from "@components/audio-player";
import { interviewAudioFiles } from '@data/interview-audio';
import { audioPlayerState } from '@stores/audioPlayerStore';
import { useEffect, useRef } from 'react';

interface AudioPlayerSectionProps {
  className?: string;
}

export function AudioPlayerSection({ className = '' }: AudioPlayerSectionProps) {
  const state = useStore(audioPlayerState);
  const mountedRef = useRef(true);

  // Cleanup on unmount
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const cleanup = () => {
      mountedRef.current = false;
      const currentState = audioPlayerState.get();
      if (currentState.isPlaying) {
        timeoutId = setTimeout(() => {
          if (!mountedRef.current) {
            audioPlayerState.set(currentState);
          }
        }, 50);
      }
    };

    return () => {
      cleanup();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const handleTimeUpdate = (time: number) => {
    if (mountedRef.current) {
      audioPlayerState.set({ ...state, elapsedTime: time });
    }
  };

  const handleTrackChange = (track: number) => {
    if (mountedRef.current) {
      audioPlayerState.set({ ...state, currentTrack: track });
    }
  };

  const handlePlayPause = (playing: boolean) => {
    if (mountedRef.current) {
      audioPlayerState.set({ ...state, isPlaying: playing });
    }
  };

  return (
    <div className="sticky top-0 z-10 bg-gray-900 py-4">
      <div className={`w-[400px] mx-auto ${className}`}>
        <AudioPlayer
          audioFiles={interviewAudioFiles}
          variant="compact"
          className="bg-black text-white rounded-lg shadow-lg"
          initialTrack={state.currentTrack}
          currentTime={state.elapsedTime}
          isPlaying={state.isPlaying}
          onTimeUpdate={handleTimeUpdate}
          onTrackChange={handleTrackChange}
          onPlayPause={handlePlayPause}
        />
      </div>
    </div>
  );
}
