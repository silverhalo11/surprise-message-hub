import { useState, useRef, useEffect } from "react";
import RevealCard from "@/components/RevealCard";
import VideoModal from "@/components/VideoModal";

const Index = () => {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Preload video on mount
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      {/* Hidden preloaded video */}
      <video ref={videoRef} src="/reveal-video.mp4" preload="auto" playsInline className="hidden" />
      
      {!showVideo && <RevealCard onReveal={() => setShowVideo(true)} />}
      <VideoModal open={showVideo} onClose={() => setShowVideo(false)} preloadedVideoRef={videoRef} />
    </div>
  );
};

export default Index;
