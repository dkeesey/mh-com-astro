declare module 'plyr-react' {
  import { ComponentType, RefObject } from 'react';

  export interface PlyrProps {
    source?: {
      type: 'audio' | 'video';
      sources: Array<{
        src: string;
        type?: string;
      }>;
      title?: string;
    };
    options?: {
      controls?: Array<
        | 'play'
        | 'progress'
        | 'current-time'
        | 'duration'
        | 'mute'
        | 'volume'
        | 'settings'
      >;
      keyboard?: {
        focused?: boolean;
        global?: boolean;
      };
      [key: string]: any;
    };
    className?: string;
  }

  export interface PlyrInstance {
    source: {
      type: string;
      sources: Array<{
        src: string;
        type?: string;
      }>;
    };
    play(): Promise<void>;
    pause(): void;
    stop(): void;
    restart(): void;
    rewind(seekTime: number): void;
    forward(seekTime: number): void;
    getCurrentTime(): number;
    getDuration(): number;
    getVolume(): number;
    isMuted(): boolean;
    isPlaying(): boolean;
    [key: string]: any;
  }

  declare const Plyr: ComponentType<PlyrProps> & {
    prototype: {
      plyr: PlyrInstance;
    };
  };

  export default Plyr;
}
