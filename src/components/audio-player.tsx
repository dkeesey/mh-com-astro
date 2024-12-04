import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Rewind, FastForward } from 'lucide-react';

interface AudioFile {
  url: string;
  title: string;
}

export default function AudioPlayer({ audioFiles }: { audioFiles: AudioFile[] }) {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const hasAudioFiles = Array.isArray(audioFiles) && audioFiles.length > 0;

  useEffect(() => {
    if (audioRef.current && hasAudioFiles) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack, hasAudioFiles]);

  useEffect(() => {
    if (audioRef.current) {
      const updateDuration = () => {
        setDuration(audioRef.current?.duration || 0);
      };
      audioRef.current?.addEventListener('loadedmetadata', updateDuration);
      return () => audioRef.current?.removeEventListener('loadedmetadata', updateDuration);
    }
  }, [currentTrack]);

  const togglePlayPause = () => {
    if (hasAudioFiles) {
      setIsPlaying(!isPlaying);
    }
  };

  const playNext = () => {
    if (hasAudioFiles) {
      setCurrentTrack((prevTrack) => (prevTrack + 1) % audioFiles.length);
      setIsPlaying(true);
    }
  };

  const playPrevious = () => {
    if (hasAudioFiles) {
      setCurrentTrack((prevTrack) => (prevTrack - 1 + audioFiles.length) % audioFiles.length);
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const handleTrackClick = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(true);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
    }
  };

  const handleFastForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!hasAudioFiles) {
    return <div className="text-center p-4">No audio files available.</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <audio
        ref={audioRef}
        src={audioFiles[currentTrack].url}
        onEnded={playNext}
        onTimeUpdate={handleTimeUpdate}
      >
        <source src={audioFiles[currentTrack].url} type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>

      <div className="mb-4">
        <h2 className="text-xl font-bold text-center">{audioFiles[currentTrack].title}</h2>
      </div>

      <div className="flex justify-center items-center space-x-2 sm:space-x-4 mb-4">
        <button onClick={playPrevious} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300" aria-label="Previous track">
          <SkipBack className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>
        <button onClick={handleRewind} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300" aria-label="Rewind 10 seconds">
          <Rewind className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>
        <button onClick={togglePlayPause} className="p-3 sm:p-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white" aria-label={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? <Pause className="w-6 h-6 sm:w-8 sm:h-8" /> : <Play className="w-6 h-6 sm:w-8 sm:h-8" />}
        </button>
        <button onClick={handleFastForward} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300" aria-label="Fast forward 10 seconds">
          <FastForward className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>
        <button onClick={playNext} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300" aria-label="Next track">
          <SkipForward className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>
      </div>

      <div className="mb-2">
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full"
          aria-label="Seek"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentTime / duration) * 100}%, #e5e7eb ${(currentTime / duration) * 100}%, #e5e7eb 100%)`
          }}
        />
      </div>

      <div className="flex justify-between text-sm mb-4">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {audioFiles.map((file, index) => (
          <div
            key={index}
            onClick={() => handleTrackClick(index)}
            className={`p-2 rounded cursor-pointer ${
              index === currentTrack ? 'bg-blue-100 font-bold' : 'hover:bg-gray-200'
            }`}
          >
            <p className="text-sm sm:text-base truncate">{file.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}