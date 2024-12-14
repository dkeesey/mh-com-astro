import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Rewind, FastForward, Volume2, VolumeX, Minimize2, Maximize2, X } from 'lucide-react';

interface AudioFile {
  url: string;
  title: string;
}

export default function AudioPlayer({ audioFiles }: { audioFiles: AudioFile[] }) {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isVisible, setIsVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
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
    }
  };

  const handleTrackClick = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(true);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!hasAudioFiles || !isVisible) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out
      ${isMinimized ? 'w-12 h-12' : 'w-80 sm:w-96'}
      bg-background/80 backdrop-blur-sm shadow-lg rounded-lg border border-border/50`}>
      
      <div className="p-0">
        {isMinimized ? (
          <button
            type="button"
            className="w-full h-full flex items-center justify-center hover:bg-accent/50 rounded-lg"
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause current track" : "Play current track"}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span className="sr-only">{isPlaying ? "Pause" : "Play"} current track</span>
          </button>
        ) : (
          <div className="p-4 space-y-4">
            {/* Track Info */}
            <div className="space-y-1">
              <h3 className="text-sm font-medium leading-none truncate">
                {audioFiles[currentTrack].title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {formatTime(currentTime)} / {formatTime(duration)}
              </p>
            </div>

            {/* Progress Slider */}
            <div className="relative w-full h-1.5 bg-accent rounded-full overflow-hidden">
              <div
                className="absolute h-full bg-primary"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={currentTime}
                onChange={(e) => {
                  const newTime = parseFloat(e.target.value);
                  if (audioRef.current) {
                    audioRef.current.currentTime = newTime;
                    setCurrentTime(newTime);
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Seek time in track"
                title="Seek time in track"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="p-1.5 hover:bg-accent/50 rounded-md"
                  onClick={playPrevious}
                  aria-label="Play previous track"
                  title="Previous track"
                >
                  <SkipBack className="h-4 w-4" />
                  <span className="sr-only">Play previous track</span>
                </button>
                
                <button
                  type="button"
                  className="p-2 hover:bg-accent/50 rounded-full"
                  onClick={togglePlayPause}
                  aria-label={isPlaying ? "Pause current track" : "Play current track"}
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? 
                    <Pause className="h-5 w-5" /> : 
                    <Play className="h-5 w-5" />
                  }
                  <span className="sr-only">{isPlaying ? "Pause" : "Play"} current track</span>
                </button>

                <button
                  type="button"
                  className="p-1.5 hover:bg-accent/50 rounded-md"
                  onClick={playNext}
                  aria-label="Play next track"
                  title="Next track"
                >
                  <SkipForward className="h-4 w-4" />
                  <span className="sr-only">Play next track</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="p-1.5 hover:bg-accent/50 rounded-md"
                  onClick={() => {
                    setIsMuted(!isMuted);
                    if (audioRef.current) {
                      audioRef.current.volume = isMuted ? volume : 0;
                    }
                  }}
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? 
                    <VolumeX className="h-4 w-4" /> : 
                    <Volume2 className="h-4 w-4" />
                  }
                  <span className="sr-only">{isMuted ? "Unmute" : "Mute"} audio</span>
                </button>

                <div className="relative w-20 h-1.5 bg-accent rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-primary"
                    style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
                  />
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.1}
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      const newVolume = parseFloat(e.target.value);
                      setVolume(newVolume);
                      setIsMuted(false);
                      if (audioRef.current) {
                        audioRef.current.volume = newVolume;
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    aria-label="Adjust volume"
                    title="Adjust volume"
                  />
                </div>
              </div>
            </div>

            {/* Track List */}
            <div className="mt-4 space-y-1 max-h-32 overflow-y-auto">
              {audioFiles.map((file, index) => (
                <button
                  type="button"
                  key={file.url}
                  className={`w-full text-left px-2 py-1 rounded-md text-sm truncate
                    ${currentTrack === index ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'}`}
                  onClick={() => handleTrackClick(index)}
                  aria-label={`Play ${file.title}`}
                  title={file.title}
                >
                  {file.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Minimize/Close Controls */}
        <div className="absolute top-2 right-2 flex gap-1">
          <button
            type="button"
            className="p-1 hover:bg-accent/50 rounded-md"
            onClick={() => setIsMinimized(!isMinimized)}
            aria-label={isMinimized ? "Expand audio player" : "Minimize audio player"}
            title={isMinimized ? "Expand" : "Minimize"}
          >
            {isMinimized ? 
              <Maximize2 className="h-3 w-3" /> : 
              <Minimize2 className="h-3 w-3" />
            }
            <span className="sr-only">{isMinimized ? "Expand" : "Minimize"} audio player</span>
          </button>
          <button
            type="button"
            className="p-1 hover:bg-accent/50 rounded-md"
            onClick={() => setIsVisible(false)}
            aria-label="Close audio player"
            title="Close"
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Close audio player</span>
          </button>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={audioFiles[currentTrack].url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={playNext}
      />
    </div>
  );
}