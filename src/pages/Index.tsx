import { useState, useRef, useEffect } from "react";
import RevealCard from "@/components/RevealCard";
import VideoModal from "@/components/VideoModal";

const Index = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [ready, setReady] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) video.load();

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setReady(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <video ref={videoRef} src="/reveal-video.mp4" preload="auto" playsInline className="hidden" />

      {!showVideo && (
        ready ? (
          <RevealCard onReveal={() => setShowVideo(true)} />
        ) : (
          <div className="flex flex-col items-center gap-6 animate-pulse">
            <div className="w-20 h-20 rounded-full border-4 border-primary/30 flex items-center justify-center">
              <span className="text-primary text-3xl font-bold">{countdown}</span>
            </div>
            <p className="text-muted-foreground text-sm">Preparing something special…</p>
          </div>
        )
      )}
      <VideoModal open={showVideo} onClose={() => setShowVideo(false)} preloadedVideoRef={videoRef} />
    </div>
  );
};

export default Index;
