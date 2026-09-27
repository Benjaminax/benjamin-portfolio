import { useRef, useState } from 'react';

interface ProjectThumbnailProps {
  image: string;
  title: string;
  video?: string;
  className?: string;
}

export const ProjectThumbnail: React.FC<ProjectThumbnailProps> = ({
  image,
  title,
  video,
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const startPreview = (pointerType: string) => {
    if (pointerType !== 'mouse' || !video) return;
    setIsPlaying(true);
    const element = videoRef.current;
    if (!element) return;

    element.muted = true;
    void element.play().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      console.error(`Unable to play the ${title} project preview.`, error);
    });
  };

  const stopPreview = () => {
    setIsPlaying(false);
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onPointerEnter={(event) => startPreview(event.pointerType)}
      onPointerLeave={stopPreview}
    >
      <img
        src={image}
        alt={`${title} project preview`}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {video && (
        <video
          ref={videoRef}
          src={video}
          muted
          playsInline
          loop
          preload="metadata"
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
};
