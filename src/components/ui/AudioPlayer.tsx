import React, { useEffect, useRef, useState } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

interface Track {
  title: string;
  url: string;
  duration: string;
  description?: string;
  date?: string;
}

interface AudioPlayerProps {
  tracks: Track[];
  currentTrackIndex: number;
  onTrackChange?: (index: number) => void;
}

const plyrOptions = {
  controls: [
    'play',
    'progress',
    'current-time',
    'duration',
    'mute',
    'volume',
    'settings',
  ],
  loadSprite: false,
  iconUrl: 'plyr.svg'
};

export function AudioPlayer({ tracks, currentTrackIndex, onTrackChange }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [player, setPlayer] = useState<Plyr | null>(null);
  const [activeTrack, setActiveTrack] = useState(currentTrackIndex);

  useEffect(() => {
    if (audioRef.current && !player) {
      const newPlayer = new Plyr(audioRef.current, plyrOptions);
      setPlayer(newPlayer);
    }

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, []);

  useEffect(() => {
    setActiveTrack(currentTrackIndex);
  }, [currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      const currentTrack = tracks[activeTrack];
      audioRef.current.src = currentTrack.url;
      audioRef.current.play().catch(error => {
        console.error('Error playing track:', error);
      });
    }
  }, [activeTrack, tracks]);

  const handleTrackChange = (index: number) => {
    setActiveTrack(index);
    if (onTrackChange) {
      onTrackChange(index);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Player */}
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-2">{tracks[activeTrack].title}</h2>
        {tracks[activeTrack].description && (
          <p className="text-gray-400 mb-4">{tracks[activeTrack].description}</p>
        )}
        <audio ref={audioRef} className="plyr-react plyr" />
      </div>

      {/* Track List */}
      <div className="space-y-1">
        {tracks.map((track, index) => (
          <button
            key={track.url}
            onClick={() => handleTrackChange(index)}
            className={`w-full text-left p-4 rounded-lg transition-colors ${
              index === activeTrack
                ? 'bg-white text-gray-900'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className={`font-medium ${
                  index === activeTrack ? 'text-gray-900' : 'text-white'
                }`}>{track.title}</h3>
                {track.description && (
                  <p className={`text-sm mt-1 ${
                    index === activeTrack ? 'text-gray-600' : 'text-gray-300'
                  }`}>{track.description}</p>
                )}
              </div>
              <span className={`text-sm ml-4 ${
                index === activeTrack ? 'text-gray-500' : 'text-gray-300'
              }`}>{track.duration}</span>
            </div>
            {track.date && (
              <div className={`text-xs mt-1 ${
                index === activeTrack ? 'text-gray-500' : 'text-gray-400'
              }`}>{track.date}</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
