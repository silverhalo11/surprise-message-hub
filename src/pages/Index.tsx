import { useState } from "react";
import RevealCard from "@/components/RevealCard";
import VideoModal from "@/components/VideoModal";

const Index = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <RevealCard onReveal={() => setShowVideo(true)} />
      <VideoModal open={showVideo} onClose={() => setShowVideo(false)} />
    </div>
  );
};

export default Index;
