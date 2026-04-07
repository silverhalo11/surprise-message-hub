import { useEffect, useState } from "react";
import RevealCard from "@/components/RevealCard";
import VideoModal from "@/components/VideoModal";

const Index = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [ready, setReady] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const preloadLink = document.createElement("link");
    preloadLink.rel = "preload";
    preloadLink.as = "video";
    preloadLink.href = "/reveal-video-mobile.mp4";
    document.head.appendChild(preloadLink);

    const interval = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.clearInterval(interval);
          setReady(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(interval);
      document.head.removeChild(preloadLink);
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      {!showVideo &&
        (ready ? (
          <RevealCard onReveal={() => setShowVideo(true)} />
        ) : (
          <div className="flex flex-col items-center gap-6 animate-pulse">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-primary/30">
              <span className="text-3xl font-bold text-primary">{countdown}</span>
            </div>
            <p className="text-sm text-muted-foreground">Preparing something special…</p>
          </div>
        ))}
      <VideoModal open={showVideo} onClose={() => setShowVideo(false)} />
    </div>
  );
};

export default Index;
