import { useEffect, useRef, RefObject } from "react";

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  preloadedVideoRef: RefObject<HTMLVideoElement>;
}

const VideoModal = ({ open, onClose, preloadedVideoRef }: VideoModalProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && preloadedVideoRef.current && containerRef.current) {
      const video = preloadedVideoRef.current;
      video.className = "w-full rounded-2xl";
      video.style.objectFit = "cover";
      containerRef.current.prepend(video);
      video.currentTime = 0;
      video.play();
    }
  }, [open, preloadedVideoRef]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-sm animate-fade-in px-4"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl animate-scale-in bg-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-foreground/50 text-background flex items-center justify-center text-sm font-bold hover:bg-foreground/70 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default VideoModal;
