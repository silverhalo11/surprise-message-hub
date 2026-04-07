interface VideoModalProps {
  open: boolean;
  onClose: () => void;
}

const VideoModal = ({ open, onClose }: VideoModalProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-sm animate-fade-in px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm overflow-hidden rounded-[2rem] bg-card shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          src="/reveal-video-mobile.mp4"
          autoPlay
          muted={false}
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
