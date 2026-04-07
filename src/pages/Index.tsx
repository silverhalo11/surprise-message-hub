import { useEffect, useState } from "react";
import RevealCard from "@/components/RevealCard";
import VideoModal from "@/components/VideoModal";

const MIN_WAIT_SECONDS = 3;

const Index = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [timerDone, setTimerDone] = useState(false);
  const [countdown, setCountdown] = useState(MIN_WAIT_SECONDS);

  useEffect(() => {
    const preloadVideo = document.createElement("video");
    preloadVideo.src = "/reveal-video-mobile.mp4";
    preloadVideo.preload = "auto";
    preloadVideo.playsInline = true;
    preloadVideo.muted = true;

    const handleReady = () => setVideoReady(true);
    preloadVideo.addEventListener("loadeddata", handleReady, { once: true });
    preloadVideo.load();

    const interval = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.clearInterval(interval);
          setTimerDone(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(interval);
      preloadVideo.removeEventListener("loadeddata", handleReady);
      preloadVideo.pause();
      preloadVideo.src = "";
      preloadVideo.load();
    };
  }, []);

  const ready = timerDone && videoReady;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      {!showVideo &&
        (ready ? (
          <RevealCard onReveal={() => setShowVideo(true)} />
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-primary/30">
              <span className="text-3xl font-bold text-primary">{countdown}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {videoReady ? "Almost ready…" : "Loading video in background…"}
            </p>
          </div>
        ))}
      <VideoModal open={showVideo} onClose={() => setShowVideo(false)} />
    </div>
  );
};

export default Index;
