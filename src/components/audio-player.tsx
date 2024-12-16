import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Minimize2, Maximize2, X, GripHorizontal, ChevronDown, GripVertical } from 'lucide-react';

interface AudioFile {
  url: string;
  title: string;
  excerpt: string;
  interviewee?: string;
}

type PlayerVariant = 'compact' | 'horizontal' | 'vertical';

interface AudioPlayerProps {
  audioFiles: AudioFile[];
  variant?: PlayerVariant;
  className?: string;
}

export default function AudioPlayer({ audioFiles, variant = 'compact', className = '' }: AudioPlayerProps) {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isVisible, setIsVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showTrackList, setShowTrackList] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const volumeControlRef = useRef<HTMLDivElement>(null);
  const trackListRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (volumeControlRef.current && !volumeControlRef.current.contains(event.target as Node)) {
        setShowVolumeSlider(false);
      }
      if (trackListRef.current && !trackListRef.current.contains(event.target as Node)) {
        setShowTrackList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const variantStyles = {
    compact: {
      container: 'w-[24rem] max-w-[95vw]',
      content: 'flex-col',
      controls: 'flex-col space-y-4',
    },
    horizontal: {
      container: 'w-[24rem] max-w-[95vw] h-20',
      content: 'flex-row items-center',
      controls: 'flex-row space-x-4',
    },
    vertical: {
      container: 'w-[24rem] max-w-[95vw]',
      content: 'flex-col',
      controls: 'flex-col space-y-4',
    },
  };

  if (!hasAudioFiles || !isVisible) return null;

  const currentAudioFile = audioFiles[currentTrack];
  const title = currentAudioFile.title;

  return (
    <div className={`${className}`}>
      <button
        onClick={() => setShowTrackList(!showTrackList)}
        className="w-full text-center group"
      >
        <div className="flex items-center justify-between bg-[#333] rounded-t-lg">
          <div className="flex items-center px-2 py-1">
            <GripVertical className="h-4 w-4 text-[#ccc]" />
          </div>
          <span className="px-2 py-1 text-sm font-medium
            hover:text-amber-400 hover:font-bold hover:shadow-[0_0_10px_rgba(251,191,36,0.3)]
            active:text-amber-300 active:shadow-[0_0_15px_rgba(251,191,36,0.5)]"
          >
            Internee Interviews
          </span>
          <div className="flex items-center px-2 py-1">
            <GripVertical className="h-4 w-4 text-[#ccc]" />
          </div>
        </div>
      </button>

      <div className="relative flex">
        {/* Track List */}
        <div 
          ref={trackListRef}
          className={`absolute right-full top-0 w-[300px] bg-background/80 backdrop-blur-sm rounded-l-lg border border-border/50 shadow-lg
            transform transition-transform duration-300 ease-in-out ${showTrackList ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="p-4">
            <h3 className="text-sm font-medium mb-2">Track List</h3>
            <div className="space-y-2">
              {audioFiles.map((file, index) => (
                <button
                  key={index}
                  onClick={() => handleTrackClick(index)}
                  className={`w-full text-left p-2 rounded-md text-sm hover:bg-accent/50
                    ${currentTrack === index ? 'bg-accent text-accent-foreground' : ''}`}
                >
                  <div className="font-medium">{file.excerpt}</div>
                  <div className="text-xs text-muted-foreground">{file.title}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Player */}
        <div className={`z-50 transition-all duration-700 ease-in-out
          ${isMinimized ? 'w-12 h-12' : variantStyles[variant].container}
          bg-background/80 backdrop-blur-sm shadow-lg rounded-lg border border-border/50`}>
          {/* Minimize Button */}
          <button
            type="button"
            onClick={() => setIsMinimized(!isMinimized)}
            className="absolute top-2 right-2 p-1 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label={isMinimized ? "Expand audio player" : "Minimize audio player"}
            title={isMinimized ? "Expand" : "Minimize"}
          >
            <Minimize2 className="h-4 w-4" />
            <span className="sr-only">{isMinimized ? "Expand" : "Minimize"} audio player</span>
          </button>

          {!isMinimized && (
            <div className="h-full px-6 py-2 flex flex-col space-y-1.5">
              {/* Track Title */}
              <div className="flex flex-col gap-0.5">
                <div className="text-sm font-medium truncate">
                  {currentAudioFile.excerpt}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {title}
                </div>
              </div>

              {/* Time and Progress */}
              <div className="flex flex-col gap-1">
                <div
                  className="relative w-full h-1.5 bg-accent rounded-full overflow-hidden"
                >
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

                <div className="flex items-center">
                  {/* Time Display */}
                  <div className="text-xs text-muted-foreground px-2">
                    <span>{formatTime(currentTime)}</span>
                    <span className="mx-1">/</span>
                    <span>{formatTime(duration)}</span>
                  </div>

                  {/* Controls */}
                  <div className="flex-1 flex items-center justify-center space-x-1">
                    <button
                      type="button"
                      className="p-1 hover:bg-accent/50 rounded-md"
                      onClick={playPrevious}
                      aria-label="Play previous track"
                      title="Previous track"
                    >
                      <SkipBack className="h-3.5 w-3.5" />
                      <span className="sr-only">Play previous track</span>
                    </button>
                    
                    <button
                      type="button"
                      className="p-1 hover:bg-accent/50 rounded-md"
                      onClick={togglePlayPause}
                      aria-label={isPlaying ? "Pause current track" : "Play current track"}
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? 
                        <Pause className="h-3.5 w-3.5" /> : 
                        <Play className="h-3.5 w-3.5" />
                      }
                      <span className="sr-only">{isPlaying ? "Pause" : "Play"} current track</span>
                    </button>

                    <button
                      type="button"
                      className="p-1 hover:bg-accent/50 rounded-md"
                      onClick={playNext}
                      aria-label="Play next track"
                      title="Next track"
                    >
                      <SkipForward className="h-3.5 w-3.5" />
                      <span className="sr-only">Play next track</span>
                    </button>

                    {/* Volume Controls */}
                    <div className="relative">
                      <button
                        type="button"
                        className="p-1 hover:bg-accent/50 rounded-md relative"
                        onClick={() => {
                          if (isMuted) {
                            setIsMuted(false);
                            if (audioRef.current) {
                              audioRef.current.volume = volume;
                            }
                          } else {
                            setIsMuted(true);
                            if (audioRef.current) {
                              audioRef.current.volume = 0;
                            }
                          }
                          setShowVolumeSlider(!showVolumeSlider);
                        }}
                        aria-label={isMuted ? "Unmute" : "Mute"}
                        title={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                        <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Empty div for spacing */}
                  <div className="w-[88px]"></div>
                </div>
              </div>

              {/* Controls */}
            </div>
          )}
        </div>

        <audio
          ref={audioRef}
          src={audioFiles[currentTrack].url}
          onTimeUpdate={handleTimeUpdate}
          onEnded={playNext}
        />
      </div>
    </div>
  );
}