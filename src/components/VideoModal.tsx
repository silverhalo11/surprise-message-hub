import { useEffect, useRef } from "react";

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
}

const VideoModal = ({ open, onClose }: VideoModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!open || !videoRef.current) return;

    const video = videoRef.current;
    video.currentTime = 0;

    const playVideo = async () => {
      try {
        await video.play();
      } catch {
        // Ignore autoplay interruptions after mount.
      }
    };

    void playVideo();
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 px-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm overflow-hidden rounded-[2rem] bg-card shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src="/reveal-video-mobile.mp4"
          playsInline
          preload="auto"
          className="block w-full"
        />
        <button
          onClick={onClose}
          aria-label="Close video"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-foreground/50 text-background transition-colors hover:bg-foreground/70"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default VideoModal;
