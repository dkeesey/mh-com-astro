import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Minimize2, GripVertical } from 'lucide-react';

interface AudioFile {
  url: string;
  title: string;
  excerpt: string;
  interviewee?: string;
  timestamp?: string;
  transcript?: string;
  context?: string;
}

type PlayerVariant = 'compact' | 'horizontal' | 'vertical' | 'inline' | 'timeline';

interface AudioPlayerProps {
  audioFiles: AudioFile[];
  variant?: PlayerVariant;
  className?: string;
  showTranscript?: boolean;
  showTimeline?: boolean;
  showTrackList?: boolean;
  isGlobal?: boolean;  // Whether this is the global player that persists
  onTrackSelect?: (index: number) => void;  // Callback for when a track is selected
  initialTrack?: number;  // Initial track to play
  context?: string;  // Contextual information about the audio
  timelineEvents?: {  // For timeline variant
    date: string;
    event: string;
    audioIndex?: number;
  }[];
}

export default function AudioPlayer({ 
  audioFiles,
  variant = 'compact',
  className = '',
  showTranscript = false,
  showTimeline = false,
  showTrackList = false,
  isGlobal = false,
  onTrackSelect,
  initialTrack = 0,
  context,
  timelineEvents = []
}: AudioPlayerProps) {
  const [currentTrack, setCurrentTrack] = useState(initialTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isTrackListVisible, setIsTrackListVisible] = useState(showTrackList);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const volumeControlRef = useRef<HTMLDivElement>(null);

  const hasAudioFiles = Array.isArray(audioFiles) && audioFiles.length > 0;

  // Common player controls
  const PlayerControls = () => (
    <div className="flex items-center space-x-2">
      <button
        onClick={togglePlayPause}
        className="p-2 rounded-full hover:bg-gray-400/60 transition-colors"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      </button>
      {audioFiles.length > 1 && (
        <>
          <button
            onClick={() => handleTrackChange('prev')}
            className="p-2 rounded-full hover:bg-gray-400/60 transition-colors"
            aria-label="Previous track"
          >
            <SkipBack className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleTrackChange('next')}
            className="p-2 rounded-full hover:bg-gray-400/60 transition-colors"
            aria-label="Next track"
          >
            <SkipForward className="h-5 w-5" />
          </button>
        </>
      )}
    </div>
  );

  // Progress bar component
  const ProgressBar = () => {
    const progressWidth = `w-[${Math.floor((currentTime / duration) * 100)}%]`;
    const progressPercent = Math.floor((currentTime / duration) * 100);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (progressRef.current) {
        progressRef.current.setAttribute('aria-valuemin', '0');
        progressRef.current.setAttribute('aria-valuemax', '100');
        progressRef.current.setAttribute('aria-valuenow', progressPercent.toString());
      }
    }, [progressPercent]);
    
    return (
      <div className="relative h-1 bg-gray-200 rounded-full flex-grow">
        <div
          ref={progressRef}
          className={`absolute h-full bg-primary rounded-full ${progressWidth}`}
          role="progressbar"
          aria-label="Audio progress"
        />
        <label htmlFor="audio-progress" className="sr-only">
          Audio time slider
        </label>
        <input
          id="audio-progress"
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleTimeChange}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          title={`Time slider: ${formatTime(currentTime)} of ${formatTime(duration)}`}
          aria-label="Audio time slider"
        />
      </div>
    );
  };

  // Timeline variant specific component
  const TimelineView = () => (
    <div className="relative">
      <div className="absolute left-1/2 w-px h-full bg-gray-200" />
      <div className="space-y-8">
        {timelineEvents.map((event, index) => (
          <div
            key={index}
            className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
          >
            <div className="w-1/2 p-4 bg-white rounded-lg shadow-md">
              <div className="text-sm text-gray-500">{event.date}</div>
              <div className="mt-2">{event.event}</div>
              {typeof event.audioIndex === 'number' && (
                <button
                  onClick={() => handleTrackClick(event.audioIndex!)}
                  className="mt-2 text-primary hover:underline"
                >
                  Listen to related audio
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Inline variant specific component
  const InlineView = () => (
    <div className="border rounded-lg p-4">
      <div className="flex items-start space-x-4">
        <PlayerControls />
        <div className="flex-grow">
          <div className="mb-2">
            <h4 className="font-medium">{currentAudioFile.title}</h4>
            {currentAudioFile.interviewee && (
              <p className="text-sm text-gray-600">
                Interview with {currentAudioFile.interviewee}
              </p>
            )}
          </div>
          <ProgressBar />
          {showTranscript && currentAudioFile.transcript && (
            <div className="mt-4 p-4 bg-gray-50 rounded text-sm">
              {currentAudioFile.transcript}
            </div>
          )}
        </div>
      </div>
      {context && (
        <div className="mt-4 text-sm text-gray-600 border-t pt-4">
          <p>{context}</p>
        </div>
      )}
    </div>
  );

  // Global player specific component
  const GlobalPlayer = () => (
    <div className={`fixed z-50 ${isMinimized ? 'bottom-4 right-4' : 'top-[72px] right-4'}`}>
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Internee Interviews</h3>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:bg-gray-100 rounded-full"
              aria-label={isMinimized ? "Maximize player" : "Minimize player"}
              title={isMinimized ? "Maximize player" : "Minimize player"}
            >
              <Minimize2 className="h-4 w-4" />
            </button>
          </div>
          {!isMinimized && (
            <>
              <PlayerControls />
              <ProgressBar />
              {isTrackListVisible && (
                <div className="mt-4 space-y-2">
                  {audioFiles.map((file, index) => (
                    <button
                      key={index}
                      onClick={() => handleTrackClick(index)}
                      className={`w-full text-left p-2 rounded-md text-sm hover:bg-gray-100
                        ${currentTrack === index ? 'bg-primary text-white' : ''}`}
                    >
                      <div className="font-medium">{file.excerpt}</div>
                      {file.interviewee && (
                        <div className="text-xs opacity-75">
                          Interview with {file.interviewee}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );

  // Compact variant specific component
  const CompactView = () => (
    <div className="border-b border-gray-400/60">
      <div className="border-b border-gray-400/60 pb-2 mb-2">
        <h3 className="text-sm font-semibold text-foreground/80">Internee Interviews</h3>
      </div>
      <div className="p-3 space-y-2">
        <div className="text-sm font-medium line-clamp-2">
          {currentAudioFile.excerpt}
        </div>
        <div className="flex items-center space-x-4">
          <PlayerControls />
          <div className="flex-grow">
            <ProgressBar />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Event handlers
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTrackChange = (direction: 'prev' | 'next') => {
    const newTrack = direction === 'prev'
      ? (currentTrack - 1 + audioFiles.length) % audioFiles.length
      : (currentTrack + 1) % audioFiles.length;
    handleTrackClick(newTrack);
  };

  const handleTrackClick = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(false);
    onTrackSelect?.(index);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  // Utility function to format time
  const formatTime = (time: number): string => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Effect hooks
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (currentTrack < audioFiles.length - 1) {
        handleTrackChange('next');
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack]);

  if (!hasAudioFiles) return null;

  const currentAudioFile = audioFiles[currentTrack];

  return (
    <div className={className}>
      <audio
        ref={audioRef}
        src={currentAudioFile.url}
        preload="metadata"
      />
      
      {variant === 'compact' && <CompactView />}
      {variant === 'horizontal' && <div>Horizontal View</div>}
      {variant === 'vertical' && <div>Vertical View</div>}
      {variant === 'inline' && <InlineView />}
      {variant === 'timeline' && <TimelineView />}
      {isGlobal && <GlobalPlayer />}
    </div>
  );
}