import { useState } from "react";

interface RevealCardProps {
  onReveal: () => void;
}

const RevealCard = ({ onReveal }: RevealCardProps) => {
  const [tapped, setTapped] = useState(false);

  const handleTap = () => {
    setTapped(true);
    setTimeout(() => onReveal(), 600);
  };

  return (
    <button
      onClick={handleTap}
      disabled={tapped}
      className={`
        relative w-full max-w-sm aspect-[3/4] rounded-3xl
        bg-gradient-to-br from-primary/90 to-primary/60
        shadow-2xl shadow-primary/30
        flex flex-col items-center justify-center gap-6
        transition-all duration-700 ease-out cursor-pointer
        active:scale-95
        ${tapped ? "scale-90 opacity-0" : "animate-float"}
      `}
    >
      {/* Decorative rings */}
      <div className="absolute inset-0 rounded-3xl border border-primary-foreground/20" />
      <div className="absolute inset-3 rounded-2xl border border-primary-foreground/10" />

      {/* Envelope icon */}
      <div className="text-primary-foreground/90 mb-2">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 4L12 13L2 4" />
        </svg>
      </div>

      {/* Message */}
      <p className="text-primary-foreground text-2xl font-semibold tracking-tight text-center px-8 leading-snug">
        I have a question for you
      </p>

      {/* Tap hint */}
      <span className="text-primary-foreground/60 text-sm font-medium animate-pulse mt-4">
        Tap to reveal
      </span>

      {/* Shimmer effect */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent animate-shimmer" />
      </div>
    </button>
  );
};

export default RevealCard;
