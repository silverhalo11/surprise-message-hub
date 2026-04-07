import { useEffect, useRef } from "react";

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
}

const VideoModal = ({ open, onClose }: VideoModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (open && videoRef.current) {
      videoRef.current.play();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-sm animate-fade-in px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl animate-scale-in bg-card"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src="/reveal-video.mp4"
          controls
          playsInline
          className="w-full"
        />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-foreground/50 text-background flex items-center justify-center text-sm font-bold hover:bg-foreground/70 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default VideoModal;
